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
          className="object-cover w-12 h-12 sm:w-14 sm:h-14"
        />
        <span className="absolute hidden px-2 py-1 mb-2 text-sm rounded bottom-5 right-16 lg:right-20 group-hover:block bg-[#f1f1f1] text-[#212121]">
          Contáctanos
        </span>
      </a>
    </div>
  );
}
