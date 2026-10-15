-- Draft for the first InsForge migration.
-- After linking a project, create the migration with:
-- npx -y @insforge/cli db migrations new create-content-model
-- Then move this SQL into the generated migration and apply it on a backend branch.

CREATE TABLE public.content_editors (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL CHECK (key ~ '^[a-z0-9][a-z0-9-]*$'),
  locale TEXT NOT NULL DEFAULT 'es-CL',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  payload JSONB NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  updated_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX site_content_one_draft_per_key_locale
  ON public.site_content (key, locale)
  WHERE status = 'draft';

CREATE UNIQUE INDEX site_content_one_published_per_key_locale
  ON public.site_content (key, locale)
  WHERE status = 'published';

CREATE INDEX site_content_lookup
  ON public.site_content (key, locale, status, updated_at DESC);

CREATE INDEX site_content_created_by
  ON public.site_content (created_by);

CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagekit_file_id TEXT UNIQUE,
  path TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  width INTEGER CHECK (width IS NULL OR width > 0),
  height INTEGER CHECK (height IS NULL OR height > 0),
  focal_x NUMERIC(5, 4) CHECK (focal_x IS NULL OR focal_x BETWEEN 0 AND 1),
  focal_y NUMERIC(5, 4) CHECK (focal_y IS NULL OR focal_y BETWEEN 0 AND 1),
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX media_assets_created_by ON public.media_assets (created_by);

ALTER TABLE public.content_editors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_content_editor(required_role TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.content_editors
    WHERE user_id = (SELECT auth.uid())
      AND (required_role IS NULL OR role = required_role)
  );
$$;

REVOKE ALL ON FUNCTION public.is_content_editor(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_content_editor(TEXT) TO authenticated;

CREATE POLICY "editors can read their role"
ON public.content_editors
FOR SELECT TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "everyone can read published content"
ON public.site_content
FOR SELECT TO anon, authenticated
USING (status = 'published');

CREATE POLICY "editors can read all content"
ON public.site_content
FOR SELECT TO authenticated
USING ((SELECT public.is_content_editor()));

CREATE POLICY "editors can create drafts"
ON public.site_content
FOR INSERT TO authenticated
WITH CHECK (
  (SELECT public.is_content_editor())
  AND status = 'draft'
  AND created_by = (SELECT auth.uid())
  AND updated_by = (SELECT auth.uid())
);

CREATE POLICY "editors can update drafts"
ON public.site_content
FOR UPDATE TO authenticated
USING (
  status = 'draft'
  AND (SELECT public.is_content_editor())
)
WITH CHECK (
  status = 'draft'
  AND updated_by = (SELECT auth.uid())
  AND (SELECT public.is_content_editor())
);

CREATE POLICY "everyone can read media metadata"
ON public.media_assets
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "editors can create media metadata"
ON public.media_assets
FOR INSERT TO authenticated
WITH CHECK (
  created_by = (SELECT auth.uid())
  AND (SELECT public.is_content_editor())
);

CREATE POLICY "editors can update media metadata"
ON public.media_assets
FOR UPDATE TO authenticated
USING ((SELECT public.is_content_editor()))
WITH CHECK ((SELECT public.is_content_editor()));

GRANT USAGE ON SCHEMA public TO anon, authenticated;

REVOKE ALL ON public.content_editors FROM anon, authenticated;
GRANT SELECT (user_id, role, display_name, created_at)
  ON public.content_editors TO authenticated;

REVOKE ALL ON public.site_content FROM anon, authenticated;
GRANT SELECT (key, locale, status, payload, updated_at, published_at)
  ON public.site_content TO anon;
GRANT SELECT (id, key, locale, status, payload, published_at, created_at, updated_at), INSERT
  ON public.site_content TO authenticated;
GRANT UPDATE (payload, updated_by) ON public.site_content TO authenticated;

REVOKE ALL ON public.media_assets FROM anon, authenticated;
GRANT SELECT (id, path, url, alt_text, width, height, focal_x, focal_y, updated_at)
  ON public.media_assets TO anon, authenticated;
GRANT INSERT ON public.media_assets TO authenticated;
GRANT UPDATE (alt_text, focal_x, focal_y) ON public.media_assets TO authenticated;

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();

CREATE TRIGGER media_assets_updated_at
  BEFORE UPDATE ON public.media_assets
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();

CREATE OR REPLACE FUNCTION public.publish_site_content(target_id UUID)
RETURNS public.site_content
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  target public.site_content;
BEGIN
  IF NOT public.is_content_editor() THEN
    RAISE EXCEPTION 'content editor role required';
  END IF;

  SELECT * INTO target
  FROM public.site_content
  WHERE id = target_id AND status = 'draft'
  FOR UPDATE;

  IF target.id IS NULL THEN
    RAISE EXCEPTION 'draft not found';
  END IF;

  UPDATE public.site_content
  SET status = 'archived', updated_by = (SELECT auth.uid())
  WHERE key = target.key
    AND locale = target.locale
    AND status = 'published';

  UPDATE public.site_content
  SET status = 'published',
      published_at = NOW(),
      updated_by = (SELECT auth.uid())
  WHERE id = target.id
  RETURNING * INTO target;

  RETURN target;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_site_content(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_site_content(UUID) TO authenticated;

COMMENT ON TABLE public.site_content IS
  'Small versioned page payloads. Normalize sections into child tables if payloads become large or independently queried.';

COMMENT ON FUNCTION public.publish_site_content(UUID) IS
  'Atomically archives the current published revision and publishes one validated draft.';
