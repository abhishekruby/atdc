export default function FloatingWhatsApp() {
  return (
    <a
      className="fixed bottom-8 right-8 z-[60] bg-tertiary-fixed text-on-tertiary-fixed w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_12px_32px_rgba(0,16,62,0.15)] hover:scale-110 active:scale-95 transition-all"
      href="https://wa.me/911234567890" // Placeholder number
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        className="material-symbols-outlined text-4xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        chat
      </span>
    </a>
  );
}
