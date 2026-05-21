type HeroCTACardProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

export function HeroCTACard({ open, onClose, className = "" }: HeroCTACardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-white transition-all duration-300 ease ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      } ${className}`}
      role="dialog"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full text-sm text-[#0A0F2E]/50 transition-colors hover:bg-black/5 hover:text-[#0A0F2E]"
        onClick={onClose}
        aria-label="Fermer"
      >
        ✕
      </button>
      <img
        src="/images/Professional_photo_of_3_young_french_lawyers.png"
        alt="Équipe Lazarègue Avocats"
        className="h-[160px] w-full object-cover object-top"
      />
      <img
        src="/images/logo.png"
        alt="Lazarègue Avocats"
        className="hero-cta-logo"
      />
      <div className="space-y-1.5 px-4 pb-4 text-sm text-[#0A0F2E]">
        <a
          href="tel:0181706200"
          className="block font-mono text-[12px] text-[#0A0F2E]/70 hover:text-[#1A47FF]"
        >
          01 81 70 62 00
        </a>
        <a
          href="mailto:contact@lazaregue-avocats.fr"
          className="block font-mono text-[11px] text-[#0A0F2E]/60 hover:text-[#1A47FF]"
        >
          contact@lazaregue-avocats.fr
        </a>
        <p className="text-[12px] text-[#0A0F2E]/60">
          18 rue de Tilsitt, 75017 Paris
        </p>
      </div>
    </div>
  );
}
