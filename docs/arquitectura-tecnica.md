# Arquitectura técnica

## Decisión

La primera versión usa Next.js con App Router y renderizado en servidor. El sitio público consume contenido a través de una capa de repositorio que funciona como BFF: la interfaz nunca conoce la estructura interna de InsForge ni utiliza credenciales privilegiadas.

```text
Página pública / API
        │
        ▼
Servicio de contenido (BFF)
        │
        ├── InsForge: revisión publicada
        └── Contenido local: fallback para desarrollo y contingencia

Medios ──► ImageKit CDN y transformaciones
           └── SVG local cuando ImageKit aún no está configurado
```

## Capas

- `app/`: interfaz pública, SEO, rutas API y futuro panel.
- `app/api/content`: frontera BFF cacheable para otros consumidores.
- `lib/content`: tipos, validación, contenido de respaldo y repositorios.
- `lib/insforge`: creación del cliente de lectura. Sólo usa la clave anónima.
- `components/clinic-image.tsx`: entrega por ImageKit cuando existe un endpoint y fallback local durante la demo.
- `infra/insforge/content-model.sql`: diseño revisable de la primera migración; no se aplica hasta vincular un proyecto.

## Modelo editorial

`site_content` usa revisiones pequeñas en JSON porque cada página se lee completa y el payload inicial es liviano. Los estados son:

- `draft`: editable por administradores o editores.
- `published`: única revisión visible públicamente para cada página e idioma.
- `archived`: historial de publicaciones anteriores.

La función `publish_site_content` publica de forma atómica y conserva la versión anterior. Si el contenido crece o tratamientos/profesionales necesitan búsquedas independientes, deben normalizarse en tablas hijas.

## Seguridad y SSO futuro

- Las identidades vivirán en `auth.users` de InsForge.
- `content_editors` asigna los roles `admin` y `editor`.
- El navegador nunca recibe `INSFORGE_API_KEY` ni una clave privada de ImageKit.
- El contenido público sólo puede leer revisiones publicadas.
- Los editores crean y modifican borradores; la publicación se realiza mediante una función controlada.
- `/admin` ya está reservado y marcado como `noindex`, pero no debe habilitar edición hasta integrar el SSO y proteger la ruta en servidor.

Para el SSO se recomienda definir primero el proveedor real —Google Workspace, Microsoft Entra ID, Auth0, WorkOS u otro— y luego implementar la sesión SSR con `@insforge/sdk/ssr`.

## Configuración

Copiar `.env.example` a `.env.local` y completar:

- `NEXT_PUBLIC_INSFORGE_URL`
- `NEXT_PUBLIC_INSFORGE_ANON_KEY`
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

Sin esas variables, la web sigue operativa con el contenido y la ilustración locales.

## Activación de InsForge

1. Vincular el repositorio a un proyecto de InsForge.
2. Crear una rama de backend para no experimentar sobre producción.
3. Generar una migración con `npx -y @insforge/cli db migrations new create-content-model`.
4. Mover el SQL de `infra/insforge/content-model.sql` a la migración generada.
5. Revisar y aplicar la migración en la rama.
6. Crear el primer usuario editor y cargar la revisión `home` como contenido publicado.
7. Configurar las variables locales con la URL y la clave anónima de la rama.
8. Ejecutar pruebas de lectura pública, edición autenticada y publicación antes de fusionar.

## Activación de ImageKit

1. Crear el endpoint público en ImageKit.
2. Subir el recurso de portada a `/clinica-linnen/hero-acompanamiento.webp` o cambiar la ruta en el componente.
3. Configurar `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`.
4. Mantener la clave privada fuera del navegador; cuando exista el panel, las firmas de carga deben generarse en una ruta BFF protegida.

## Caché

La portada y `/api/content` se revalidan cada cinco minutos. Al incorporar el panel, una publicación puede invalidar la caché mediante un webhook o una Server Action autorizada, evitando sondeos frecuentes a InsForge.
