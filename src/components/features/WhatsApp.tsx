export default function WhatsApp() {
  return (
    <div className="fixed z-20 p-3 bottom-8 right-8 group">
      <a
        href="https://wa.me/5493516330700"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/whatsapp-logo-icon.png"
          alt="WhatsApp"
          className="object-cover w-16 h-16 sm:w-20 sm:h-20"
        />
        <span className="absolute hidden px-2 py-1 mb-2 text-sm rounded bottom-5 right-24 group-hover:block bg-[#f1f1f1] text-[#212121]">
          Contáctanos
        </span>
      </a>
    </div>
  );
}
