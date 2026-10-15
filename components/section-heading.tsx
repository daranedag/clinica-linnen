export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${
          inverse ? "text-aqua-100" : "text-aqua-800"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-8 ${inverse ? "text-white/75" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
