"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./soporte-eve.module.css";

const CONFIG = {
  whatsapp: "56967666652",
  email: "contacto@energica.city",
  telefono: "+56 9 6766 6652",
  telefonoLink: "+56967666652",
  horario: "Lun a Vie, 9:00 a 18:00",
};

const Chevron = () => (
  <svg
    className={styles.chev}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Check = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export default function SoporteEveClient() {
  const searchParams = useSearchParams();
  // El QR de cada cartel puede llevar el punto en la URL (/soporte_eve?p=E-14)
  const punto = (searchParams.get("p") || "").trim();

  const waMessage = punto
    ? `Hola, necesito ayuda con una carga en EVE. Estoy en el punto de carga ${punto}.`
    : "Hola, necesito ayuda con una carga en EVE.";
  const waHref = `https://api.whatsapp.com/send/?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(waMessage)}&type=phone_number&app_absent=0`;

  const mailSubject = punto ? `Soporte EVE — punto ${punto}` : "Soporte EVE";
  const mailBody = `Hola,\n\nNecesito ayuda con una carga en EVE.\n\nPunto de carga o estacionamiento: ${punto}\nFecha y hora de la carga: \nMonto pagado: \nCorreo del pago: \n\nDescripción del problema:\n`;
  const mailHref = `mailto:${CONFIG.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  // Solo una pregunta abierta a la vez, dentro de cada grupo
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    rootRef.current
      ?.querySelectorAll<HTMLElement>(`.${styles.faq}`)
      .forEach((faq) => {
        const items = faq.querySelectorAll("details");
        items.forEach((d) => {
          const onToggle = () => {
            if (d.open)
              items.forEach((o) => {
                if (o !== d) o.open = false;
              });
          };
          d.addEventListener("toggle", onToggle);
          cleanups.push(() => d.removeEventListener("toggle", onToggle));
        });
      });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.wrap}>
        <div className={styles.topbar}>
          <div className={styles.logo}>
            <Image
              src="/images/logos/energica-wordmark.png"
              alt="Enérgica City"
              width={122}
              height={18}
              priority
            />
          </div>
          <div className={styles.tag}>Soporte EVE</div>
        </div>

        <header className={styles.hero}>
          <div className={styles.eyebrow}>Puntos de carga EVE</div>
          <h1>¿Tuviste un problema con tu carga?</h1>
          <p>
            Acá están las respuestas a lo que más nos preguntan y las tres
            formas de hablar con nosotros.
          </p>
          {punto && (
            <div className={styles.point}>
              Estás en el punto <b>{punto}</b>
            </div>
          )}
        </header>

        <main className={styles.body}>
          {/* CONTACTO */}
          <section id="contacto" style={{ marginTop: 0 }}>
            <div className={`${styles.card} ${styles.contact}`}>
              <a
                className={`${styles.btn} ${styles.primary}`}
                href={waHref}
                target="_blank"
                rel="noopener"
              >
                <span className={styles.ico} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.25 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
                  </svg>
                </span>
                <span className={styles.txt}>
                  <span className={styles.t}>Escríbenos por WhatsApp</span>
                  <span className={styles.s}>
                    La vía más rápida. Respondemos en minutos.
                  </span>
                </span>
                <Chevron />
              </a>

              <a className={`${styles.btn} ${styles.mail}`} href={mailHref}>
                <span className={styles.ico} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="m3 7 8.1 5.4a1.6 1.6 0 0 0 1.8 0L21 7" />
                  </svg>
                </span>
                <span className={styles.txt}>
                  <span className={styles.t}>Envíanos un correo</span>
                  <span className={styles.s}>{CONFIG.email}</span>
                </span>
                <Chevron />
              </a>

              <a
                className={`${styles.btn} ${styles.tel}`}
                href={`tel:${CONFIG.telefonoLink}`}
              >
                <span className={styles.ico} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6.5 3h3l1.5 4-2 1.3a12.5 12.5 0 0 0 6.7 6.7L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
                  </svg>
                </span>
                <span className={styles.txt}>
                  <span className={styles.t}>Llámanos</span>
                  <span className={styles.s}>
                    {CONFIG.telefono} · {CONFIG.horario}
                  </span>
                </span>
                <Chevron />
              </a>
            </div>
          </section>

          {/* LÍNEA DE TIEMPO DE UNA CARGA */}
          <section>
            <div className={styles.sectionHead}>
              <h2>Así funciona una carga</h2>
              <p>Entender estos cinco pasos resuelve la mayoría de las dudas.</p>
            </div>

            <div className={styles.card}>
              <div className={styles.flow}>
                <div className={styles.step}>
                  <div className={styles.dot}>1</div>
                  <div>
                    <h3>Conectas el cable</h3>
                    <p>
                      Primero al auto y al punto de carga, firme en ambos
                      extremos.
                    </p>
                    <div className={styles.tip}>
                      <b>Conecta antes de pagar.</b> El punto espera cerca de 2
                      minutos a detectar el cable. Si pagas primero y no
                      alcanzas a conectar, la sesión se cancela sola.
                    </div>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.dot}>2</div>
                  <div>
                    <h3>Pagas un monto estimado</h3>
                    <p>
                      Se calcula con el tiempo que elegiste y la potencia del
                      punto. Es solo para autorizar la carga, no es el cobro
                      final.
                    </p>
                  </div>
                </div>

                <div className={`${styles.step} ${styles.live}`}>
                  <div className={styles.dot}>3</div>
                  <div>
                    <h3>La carga parte</h3>
                    <p>
                      El punto se enciende y empieza a entregar energía. Puede
                      tardar unos segundos en partir.
                    </p>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.dot}>4</div>
                  <div>
                    <h3>La carga termina</h3>
                    <p>
                      Se detiene al cumplir el tiempo, cuando tu auto lo decide
                      o si la desconectas. Te llega el comprobante por correo.
                    </p>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.dot}>5</div>
                  <div>
                    <h3>Se devuelve el excedente</h3>
                    <p>
                      Al día hábil siguiente comparamos lo que pagaste con la
                      energía real que recibió tu auto.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.refund}>
                <div className={styles.k}>Devoluciones</div>
                <h3>El excedente se procesa al día hábil siguiente</h3>
                <p>
                  Nuestra plataforma revisa todas las cargas del día anterior,
                  sea cual sea el motivo por el que sobró saldo, y envía la
                  devolución a Mercado Pago de forma automática.
                </p>
                <p>
                  La devolución es <b>total</b> si la carga nunca entregó
                  energía, o <b>parcial</b> si tu auto cargó menos de lo
                  estimado. No tienes que pedirla. El tiempo en que se refleja
                  en tu tarjeta o cuenta depende de tu banco o emisor.
                </p>
              </div>
            </div>
          </section>

          {/* PREGUNTAS FRECUENTES */}
          <section id="faq">
            <div className={styles.sectionHead}>
              <h2>Preguntas frecuentes</h2>
              <p>Toca una pregunta para ver la respuesta.</p>
            </div>

            <div className={styles.group}>
              <div className={styles.groupTitle}>Pagos y devoluciones</div>
              <div className={`${styles.card} ${styles.faq}`}>
                <details>
                  <summary>
                    Pagué y la carga nunca partió. ¿Pierdo la plata?
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      No. Si la sesión no entregó energía, la devolución es del{" "}
                      <b>100%</b> y se procesa al día hábil siguiente, sin que
                      tengas que pedirla.
                    </p>
                    <p>
                      La causa más común es que el cable se conectó después de
                      pagar. Conéctalo primero, revisa que quede firme en el
                      auto y en el punto, y paga después.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    ¿Por qué me cobraron más de lo que cargué?
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      El monto que pagas al inicio es una <b>estimación</b>{" "}
                      basada en el tiempo que seleccionaste y la potencia del
                      punto. Sirve para autorizar la sesión.
                    </p>
                    <p>
                      Tu auto casi siempre recibe menos energía que ese máximo
                      teórico: depende de su cargador interno, del nivel de
                      batería y de la temperatura. Esa diferencia vuelve a ti al
                      día hábil siguiente.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    ¿Cuánto se demora en llegar la devolución?
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      La enviamos a Mercado Pago al <b>día hábil siguiente</b>{" "}
                      de tu carga. Si cargaste un viernes, sábado o domingo, se
                      procesa el lunes.
                    </p>
                    <p>
                      Desde ahí, el tiempo en que aparece en tu cuenta o tarjeta
                      lo define tu banco o el emisor de tu medio de pago.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    Mi pago fue rechazado
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Reintenta con otro medio de pago. En estacionamientos
                      subterráneos la señal es débil y el pago puede cortarse a
                      medio camino.
                    </p>
                    <p>
                      Si el cobro aparece en tu app pero la carga no partió,{" "}
                      <b>no vuelvas a pagar sin avisarnos</b>: escríbenos por
                      WhatsApp con la hora y el número del punto.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    No me llegó el comprobante de la carga
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Se envía al correo con el que pagaste, al terminar la
                      sesión. Revisa las carpetas de spam y promociones.
                    </p>
                    <p>
                      Si no está, escríbenos con la fecha, la hora aproximada y
                      el punto de carga, y te lo reenviamos.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className={styles.group}>
              <div className={styles.groupTitle}>Durante la carga</div>
              <div className={`${styles.card} ${styles.faq}`}>
                <details>
                  <summary>
                    Pagué, conecté el cable y no pasa nada
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Revisa primero que el conector esté bien puesto en ambos
                      extremos: es la causa número uno. Algunos autos también
                      necesitan estar cerrados o desbloqueados para permitir la
                      carga.
                    </p>
                    <p>
                      Si el punto no responde después de un par de minutos,
                      desconecta el cable, espera un momento y vuelve a
                      intentar. Si sigue igual, escríbenos: lo pagado se
                      devuelve.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    La carga se detuvo antes de tiempo
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>Suele ocurrir por tres motivos:</p>
                    <ul>
                      <li>
                        Tu auto llegó a su límite: batería llena o un tope de
                        carga programado en el vehículo.
                      </li>
                      <li>El cable se movió o quedó suelto.</li>
                      <li>
                        Se cortó la comunicación entre el punto y la plataforma.
                      </li>
                    </ul>
                    <p>
                      Puedes volver a conectar e iniciar una nueva sesión. La
                      energía que no alcanzaste a consumir se devuelve al día
                      hábil siguiente.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    Cargué menos kWh de los que esperaba
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      La velocidad de carga la define principalmente tu auto, no
                      el punto: el cargador interno del vehículo, el porcentaje
                      de batería (sobre 80% baja mucho) y la temperatura.
                    </p>
                    <p>
                      Además, el edificio reparte la potencia disponible entre
                      los puntos en uso para no sobrecargar la instalación
                      eléctrica.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    ¿Puedo dejar el auto enchufado después de que termina?
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Mejor no. Cuando la sesión termina, el punto deja de
                      entregar energía pero sigue ocupado, y ningún otro vecino
                      puede usarlo.
                    </p>
                    <p>
                      Desconecta el cable y libera el estacionamiento apenas
                      puedas.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className={styles.group}>
              <div className={styles.groupTitle}>El punto de carga</div>
              <div className={`${styles.card} ${styles.faq}`}>
                <details>
                  <summary>
                    El punto tiene luz roja o muestra un error
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Significa que se detuvo por protección: una falla
                      eléctrica, temperatura alta o un conector que no quedó
                      bien bloqueado.
                    </p>
                    <p>
                      Desconecta el cable, espera un minuto y vuelve a conectar.
                      Si el error se repite, <b>no sigas usando ese punto</b> y
                      repórtalo con su número.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    El punto aparece ocupado y no hay ningún auto
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      Puede haber quedado una sesión abierta. Escríbenos por
                      WhatsApp con el número del punto y lo liberamos de forma
                      remota.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    ¿Qué hago si el punto está dañado o el cable está en mal
                    estado?
                    <span className={styles.plus} aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      No lo uses y avísanos de inmediato. Si puedes, mándanos
                      una foto por WhatsApp junto con el número del punto: nos
                      permite despachar al técnico correcto a la primera.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* DATOS PARA REPORTAR */}
          <section>
            <div className={`${styles.card} ${styles.ready}`}>
              <h3>Ten esto a mano al escribirnos</h3>
              <ul>
                <li>
                  <Check />
                  Número del punto de carga o del estacionamiento
                </li>
                <li>
                  <Check />
                  Fecha y hora aproximada de la carga
                </li>
                <li>
                  <Check />
                  Monto pagado y medio de pago
                </li>
                <li>
                  <Check />
                  Correo con el que hiciste el pago
                </li>
              </ul>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.logo}>
            <Image
              src="/images/logos/energica-wordmark.png"
              alt="Enérgica City"
              width={95}
              height={14}
            />
          </div>
          <div>EVE · Gestión de carga para edificios y condominios</div>
          <div className={styles.hours}>
            Atención telefónica: {CONFIG.horario}
          </div>
          <div style={{ marginTop: 10 }}>
            <a href="https://www.energica.city" target="_blank" rel="noopener">
              energica.city
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
