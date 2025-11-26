import React from "react";

export default function Contacto() {
  return (
    <section className="py-12 md:py-20 bg-[#2f2b27]" id="contacto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contáctanos
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto md:mx-0">
            Envíanos un mensaje y responderemos tus consultas a la brevedad.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-[#141313] p-6 rounded-lg">
            <form className="space-y-5" aria-label="Formulario de contacto">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-white/80 text-sm font-semibold mb-2"
                >
                  Nombre
                </label>
                <input
                  name="nombre"
                  type="text"
                  id="nombre"
                  placeholder="Tu nombre completo"
                  className="w-full bg-[#2f2b27] text-white px-4 py-3 rounded-lg border border-white/10 focus:border-[#bfa16a] focus:outline-none focus:ring-2 focus:ring-[#bfa16a]/30 transition"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="block text-white/80 text-sm font-semibold mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  name="correo"
                  type="email"
                  id="correo"
                  placeholder="tu@email.com"
                  className="w-full bg-[#2f2b27] text-white px-4 py-3 rounded-lg border border-white/10 focus:border-[#bfa16a] focus:outline-none focus:ring-2 focus:ring-[#bfa16a]/30 transition"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-white/80 text-sm font-semibold mb-2"
                >
                  Teléfono
                </label>
                <input
                  name="telefono"
                  type="tel"
                  id="telefono"
                  placeholder="(+54) 3765 000000"
                  className="w-full bg-[#2f2b27] text-white px-4 py-3 rounded-lg border border-white/10 focus:border-[#bfa16a] focus:outline-none focus:ring-2 focus:ring-[#bfa16a]/30 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-white/80 text-sm font-semibold mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  rows="4"
                  placeholder="Cuéntanos más detalles..."
                  className="w-full bg-[#2f2b27] text-white px-4 py-3 rounded-lg border border-white/10 focus:border-[#bfa16a] focus:outline-none focus:ring-2 focus:ring-[#bfa16a]/30 transition resize-none"
                  aria-required="true"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto text-[#2f2b27] bg-[#bfa16a] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#a78d5f] transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]/50"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-[#141313] rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title="Mapa - BlackGold Barbers"
                  src="https://www.google.com/maps?q=Av.+Kingsway+123&output=embed"
                  className="w-full h-60 md:h-64 border-0"
                  loading="lazy"
                  aria-label="Mapa de la ubicación de BlackGold Barbers"
                ></iframe>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 text-white/90 mt-1 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                  </svg>
                  <p className="text-white/70">Av. Kingsway 123, Oficina 2B</p>
                </div>

                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 text-white/90 mt-1 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.11 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.66.32 1.3.59 1.91a1 1 0 0 1-.24 1.09L7.5 8.91a16 16 0 0 0 6 6l1.16-1.16a1 1 0 0 1 1.09-.24c.61.27 1.25.47 1.91.59a1 1 0 0 1 .75 1V21z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a
                    href="tel:+543765000000"
                    className="text-white/70 hover:underline"
                  >
                    (+54) 3765 000000
                  </a>
                </div>

                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 text-white/90 mt-1 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M4 4h16v16H4z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M22 6.5l-10 7L2 6.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a
                    href="mailto:hola@blackgoldbarbers.com"
                    className="text-white/70 hover:underline"
                  >
                    hola@blackgoldbarbers.com
                  </a>
                </div>

                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 text-white/90 mt-1 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M12 7v6l4 2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-white/70">Lun–Sáb: 9:00–19:00</p>
                    <p className="text-white/70">Dom: 10:00–16:00</p>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex items-center gap-2 bg-[#2f2b27] hover:bg-[#bfa16a] text-white hover:text-[#2f2b27] px-4 py-2.5 rounded-lg transition duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 6.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">Instagram</span>
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex items-center gap-2 bg-[#2f2b27] hover:bg-[#bfa16a] text-white hover:text-[#2f2b27] px-4 py-2.5 rounded-lg transition duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v7h4v-7h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
