import Link from "next/link";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac-700 focus-visible:ring-offset-4"
      aria-label="Clínica Linnen, inicio"
    >
      <svg
        viewBox="0 0 54 54"
        aria-hidden="true"
        className="h-11 w-11 overflow-visible"
      >
        <circle cx="27" cy="27" r="26" fill="#F8F3FA" />
        <path
          d="M12 26.4c5.6 9.8 24.7 13 32-2.8"
          fill="none"
          stroke="#5B356B"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M27 27.4V12.8m0 4.2c-4.8-.2-7.5-2.3-8.5-6.2 4.7-.5 7.3 1.5 8.5 6.2Zm.2 3.8c4.6-.5 7.4-2.9 8.3-7-4.7-.2-7.4 2.2-8.3 7Z"
          fill="none"
          stroke="#60BFB6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="35.5" r="1.4" fill="#B795C1" />
        <circle cx="23" cy="38" r="1.1" fill="#60BFB6" />
        <circle cx="35" cy="36.7" r="1.5" fill="#B795C1" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.8rem] font-semibold tracking-[0.08em] text-lilac-700">
            LINNEN
          </span>
          <span className="mt-0.5 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Odontología humanizada
          </span>
        </span>
      )}
    </Link>
  );
}
