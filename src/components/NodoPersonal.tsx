import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import Layout from './Layout';

interface Line {
  txt: string;
  c: string;
  spd: number;
}

export default function NodoPersonal() {
  const [terminalLines, setTerminalLines] = useState<{ text: string; className: string }[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const lines: Line[] = [
    { txt: '$ nodo init --user webmaster@nodo23.co', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  nodo v1.2 · verificando entorno...', c: 'text-white/30', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  ✓ Infraestructura: VPS EU', c: 'text-accent-green', spd: 7 },
    { txt: '  ✓ Datos: cifrados en reposo · TLS activo', c: 'text-accent-green', spd: 7 },
    { txt: '  ✓ Propiedad: tú. Siempre.', c: 'text-accent-green', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '$ nodo skills --list', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  Cargando skills activos...', c: 'text-white/30', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  [01] skill:inbox .............. ✓ activo', c: 'text-accent-green', spd: 7 },
    { txt: '  [02] skill:reunion ............ ✓ activo', c: 'text-accent-green', spd: 7 },
    { txt: '  [03] skill:finanzas ........... ✓ activo', c: 'text-accent-green', spd: 7 },
    { txt: '  [04] skill:contenido .......... ✓ activo', c: 'text-accent-green', spd: 7 },
    { txt: '  [05] skill:ventas ............. ✓ activo', c: 'text-accent-green', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '$ nodo brief --morning', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  Generando brief del día...', c: 'text-white/30', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  📬 3 emails que necesitan tu atención', c: 'text-accent-teal', spd: 7 },
    { txt: '  📅 Reunión en 2h — contexto preparado', c: 'text-accent-teal', spd: 7 },
    { txt: '  ⚠  Renovación Figma en 3 días (€168/año)', c: 'text-accent-orange', spd: 7 },
    { txt: '  📈 Lead en WhatsApp sin responder (48h)', c: 'text-accent-purple', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  Tiempo: 1.2s · Todo en tu máquina.', c: 'text-accent-teal', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '✓ Nodo Personal activo. Buenos días.', c: 'text-accent-green', spd: 14 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-target').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let currentLineIndex = 0;
    
    const typeNextLine = async () => {
      if (currentLineIndex >= lines.length) {
        setIsTyping(false);
        return;
      }

      const line = lines[currentLineIndex];
      
      if (!line.txt) {
        setTerminalLines(prev => [...prev, { text: '\u00A0', className: '' }]);
        currentLineIndex++;
        setTimeout(typeNextLine, 280);
        return;
      }

      let currentText = "";
      const charInterval = line.spd;
      
      for (let i = 0; i <= line.txt.length; i++) {
        currentText = line.txt.substring(0, i);
        setTerminalLines(prev => {
          const newLines = [...prev];
          if (i === 0) {
            newLines.push({ text: currentText, className: line.c });
          } else {
            newLines[newLines.length - 1] = { text: currentText, className: line.c };
          }
          return newLines;
        });
        await new Promise(r => setTimeout(r, charInterval));
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }

      currentLineIndex++;
      setTimeout(typeNextLine, line.c.includes('text-accent-blue') ? 620 : 160);
    };

    const timer = setTimeout(typeNextLine, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout isNodoPersonal>
      {/* HERO */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-[56px]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}></div>
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(ellipse at center,rgba(52,211,153,.07) 0%,transparent 70%)', filter: 'blur(40px)' }}></div>

        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[820px] mx-auto pt-10">
          <div className="fade-target mb-7 inline-flex items-center gap-2 border border-[#2c2c2c] rounded-full px-4 py-1.5 max-w-full overflow-hidden">
            <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green shrink-0"></span>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[.05em] md:tracking-[.1em] text-[#999] whitespace-nowrap overflow-hidden text-ellipsis">
              Nodo Personal · Automatizaciones de IA · Tu infraestructura
            </span>
          </div>

          <h1 className="fade-target font-medium tracking-[-0.025em] leading-[1.08]">
            <span className="block text-[clamp(15px,1.6vw,22px)] text-white/40 font-normal tracking-wide mb-2.5">
              El 60% lo monta cualquiera.
            </span>
            <span className="hero-gradient text-[clamp(28px,4.5vw,54px)]">El otro 40%<br/>es lo que funciona.</span>
          </h1>

          <p className="fade-target mt-6 max-w-[580px] leading-[1.65] text-[17px] text-white/50">
            Te construimos un sistema de skills de IA que se ejecuta en tu máquina. Empezamos por lo que más tiempo te roba. Lo configuramos en menos de una semana y lo mejoramos cada mes.
          </p>

          <div className="fade-target flex flex-wrap justify-center gap-3 mt-9">
            <a href="#consulta" className="btn-shimmer rounded-full px-7 py-3 text-[14px] font-medium text-[#141414]">Consulta Gratuita →</a>
            <a href="#como" className="rounded-full px-7 py-3 text-[14px] font-medium border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Cómo funciona</a>
          </div>
          <p className="fade-target mt-5 font-mono text-[11px] text-[#999]">
            Setup incluido · €200/mes · sin contrato
          </p>
        </div>

        <div className="fade-target relative mt-14 w-full max-w-[660px] px-5 mx-auto">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot bg-[#ff5f57]"></span>
              <span className="t-dot bg-[#febc2e]"></span>
              <span className="t-dot bg-[#28c840]"></span>
              <span className="t-title">nodo personal · skills activos</span>
              <span className="flex items-center gap-1.5 ml-auto">
                <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green"></span>
                <span className="text-[10px] text-white/20">live</span>
              </span>
            </div>
            <div ref={terminalBodyRef} className="p-4 code-mask h-[310px] overflow-y-auto font-mono text-[12px] leading-[2]">
              {terminalLines.map((line, i) => (
                <div key={i} className={line.className}>{line.text}</div>
              ))}
              {isTyping && <span className="cursor-blink text-accent-green">▋</span>}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-dark to-transparent"></div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-[#1a1a1a]"></span><span className="bg-white/4"></span>
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/2"></span>
      </div>

      {/* EL PROBLEMA */}
      <section id="como" className="relative w-full flex justify-center px-5 py-24 bg-dark-2">
        <div className="max-w-[760px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// el problema</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] text-[clamp(26px,3.5vw,42px)]">
            Sabes que la IA puede hacer esto.<br/><span className="text-accent-green">¿Por qué no lo está haciendo?</span>
          </h2>
          <div className="fade-target mt-8 space-y-5 text-[16px] leading-[1.75] text-white/55">
            <p>Porque hay un abismo entre "la IA puede organizar tu email" y tener algo que organiza tu email, filtra lo importante, te prepara el brief del día y te recuerda que llevas cuatro días sin contestar a ese contacto — sin que tú toques nada.</p>
            <p>Llegar ahí significa configurar prompts, conectar APIs, montar un sistema de memoria, decidir dónde ejecutarlo, arreglar lo que se rompe y pulir durante semanas hasta que el resultado es realmente bueno.</p>
            <p>La mayoría empieza, llega al 60% y lo deja.</p>
            <p className="text-[#f6f6f6] font-medium">Nosotros hacemos el 100%. Nos cuentas cómo trabajas. Construimos los skills, los desplegamos en tu infraestructura para seguirlo mejorando cada mes.</p>
          </div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/4"></span><span className="bg-white/2"></span>
        <span className="bg-[#1a1a1a]"></span>
      </div>

      {/* TABLA DE TIEMPO */}
      <section className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[860px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// lo que hace tu nodo</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-10 text-[clamp(26px,3.5vw,42px)]">
            Lo que hace tu Nodo<br/><span className="text-white/35">mientras tú haces lo que importa.</span>
          </h2>

          <div className="fade-target rounded-lg overflow-hidden border border-[#2c2c2c]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-white/4">
                  <th className="py-3 px-4 text-left font-mono text-[11px] text-[#999] uppercase tracking-wider">Tarea</th>
                  <th className="py-3 px-4 text-left font-mono text-[11px] text-[#999] uppercase tracking-wider">Sin tu Nodo</th>
                  <th className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider text-accent-green">Con tu Nodo</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {[
                  { task: 'Empezar el día', without: 'Abres el email y ya perdiste el foco', with: 'Te dice qué importa hoy, en orden' },
                  { task: 'Después de cada reunión', without: 'Tú transcribes, tú asignas, tú recuerdas', with: 'Resumido, con los seguimientos anotados' },
                  { task: 'Bandeja de entrada', without: '45 minutos cada mañana, mínimo', with: 'Filtrado y priorizado antes de que te levantes' },
                  { task: 'Seguimiento de proyectos', without: 'Abres cuatro apps, preguntas, buscas', with: 'Le preguntas al Nodo. Responde en segundos.' },
                  { task: 'Control de gastos', without: 'Fin de mes, con sorpresas', with: 'Monitorizado en tiempo real' },
                  { task: 'Final del día', without: 'No sabes bien qué hiciste ni qué queda', with: 'Resumen listo, mañana ya preparada' }
                ].map((row, i) => (
                  <tr key={i} className="compare-row border-t border-[#2c2c2c]">
                    <td className="py-3 px-4 font-medium text-[#f6f6f6]">{row.task}</td>
                    <td className="py-3 px-4">{row.without}</td>
                    <td className="py-3 px-4 text-accent-green">{row.with}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fade-target mt-6 font-mono text-[13px] text-white/40">
            // En nuestra experiencia, un sistema que puede revolucionar como trabajas y liberarte de tareas que no disfrutas hacer.
          </p>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-[#1a1a1a]"></span><span className="bg-white/4"></span>
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
      </div>

      {/* SOBERANÍA */}
      <section id="soberania" className="w-full flex justify-center px-5 py-24 bg-[#F6F6F6]">
        <div className="max-w-[760px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#888]">// tus datos, tu máquina</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] text-[clamp(26px,3.5vw,42px)] text-[#1a1a1a]">
            Si mañana desaparecemos,<br/><span className="text-accent-green">tu sistema sigue siendo tuyo, encendido.</span>
          </h2>
          <div className="fade-target mt-8 space-y-5 text-[16px] leading-[1.75] text-black/55">
            <p>Por primera vez, puedes tener un sistema de IA avanzado que es tuyo de verdad. No una cuenta en la plataforma de otro. No una suscripción que cambia sus condiciones cada trimestre. Un sistema que corre en tu infraestructura, con tus datos, y que nadie puede apagar por ti.</p>
            <p><strong className="text-[#1a1a1a]">Tus skills se ejecutan en tu máquina. No en la nuestra.</strong> Te ayudamos a elegir dónde: un Mac Mini en tu oficina, un VPS en Europa, un servidor dedicado. No vendemos hosting — te asesoramos para que elijas el que mejor te encaja.</p>
            <p><strong className="text-[#1a1a1a]">Tus claves y contraseñas no salen de tu entorno.</strong> Nosotros accedemos para configurar y mejorar, pero tus datos viajan por tu infraestructura.</p>
            <p><strong className="text-[#1a1a1a]">Todo queda documentado.</strong> Cada skill, cada conexión, cada decisión. Si mañana decides que no nos necesitas, te llevas todo — el sistema y el conocimiento de cómo funciona.</p>
          </div>

          <div className="fade-target mt-10 rounded-lg border border-[#e0e0e0] p-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🖥️', text: 'Infraestructura controlada' },
                { icon: '📉', text: 'Menos dependencias' },
                { icon: '💻', text: 'Ordenador propio o VPS' },
                { icon: '✓', text: 'Zero lock-in' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-[#1a1a1a]">
                  <span className="text-accent-green">{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/4"></span><span className="bg-white/2"></span>
      </div>

      {/* PRECIOS */}
      <section id="precios" className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[1000px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// precios</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-12 text-[clamp(26px,3.5vw,42px)]">
            Sin permanencia. Sin&nbsp;letra&nbsp;pequeña.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="fade-target rounded-lg border border-accent-green p-8 flex flex-col bg-accent-green/3">
              <span className="font-mono text-[11px] uppercase tracking-wider mb-2 text-accent-green">Nodo Freelance</span>
              <p className="text-[13px] mb-4 text-white/45">Para profesionales independientes. Instalación y Setup incluido.</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[42px] font-bold text-accent-green">€200</span>
                <span className="text-[16px] text-white/40">/mes</span>
              </div>
              <p className="text-[12px] font-mono mb-6 text-white/35">Setup incluido</p>
              <div className="space-y-3 text-[14px] flex-1 text-white/55">
                <div>✓ Dos llamadas mensuales 1:1 para mejora continua</div>
                <div>✓ Setup completo de OpenClaw</div>
                <div>✓ Todos los skills del Kit activos</div>
                <div>✓ Plan de adopción de IA</div>
                <div>✓ Gestión y mantenimiento</div>
                <div>✓ Soporte continuo por Telegram o WhatsApp</div>
                <div>✓ No tocas nada del servidor, ¡solo chateas con nosotros y OpenClaw!</div>
              </div>
              <a href="#consulta" className="mt-8 btn-shimmer rounded-full px-8 py-3.5 text-[14px] font-medium text-center text-[#141414]">Consulta gratuita →</a>
            </div>

            <div className="fade-target rounded-lg border border-[#2c2c2c] p-8 flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider mb-2 text-[#999]">Nodo Pyme</span>
              <p className="text-[13px] mb-4 text-white/45">Para equipos de 2-10 personas. Setup incluido.</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[42px] font-bold">€400</span>
                <span className="text-[16px] text-white/40">/mes</span>
              </div>
              <p className="text-[12px] font-mono mb-6 text-white/35">Setup incluido</p>
              <div className="space-y-3 text-[14px] flex-1 text-white/55">
                <div>✓ Todo lo de Freelance</div>
                <div>✓ Plan de adopción de IA en organizaciones</div>
                <div>✓ Skills para gestión de equipos</div>
                <div>✓ Integración del sistema en el equipo</div>
              </div>
              <a href="#consulta" className="mt-8 rounded-full px-8 py-3.5 text-[14px] font-medium text-center border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Consulta gratuita →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full flex justify-center px-5 py-24 bg-dark-2">
        <div className="max-w-[760px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// preguntas</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-10 text-[clamp(26px,3.5vw,42px)]">
            Lo que vas a preguntar.
          </h2>
          <div className="space-y-0">
            {[
              { q: 'Si no hacéis hosting, ¿quién mantiene el servidor?', a: 'Te asesoramos para elegir la opción que menos mantenimiento requiera. Para la mayoría es un VPS europeo con actualizaciones automáticas — no necesitas ser técnico. Si algo falla, lo resolvemos en remoto.' },
              { q: '¿En qué se diferencia de instalar OpenClaw yo mismo?', a: 'En lo mismo que se diferencia comprar los ingredientes de que te cocine un chef. Cada Nodo viene con skills probados, configuración a medida y mejora continua. Recibes el sistema funcionando, no los deberes.' },
              { q: '¿Qué necesito yo aportar?', a: 'Un lugar donde ejecutarlo (Servidor VPS o tu propio mac local, te ayudamos a elegirlo) y las respuestas al cuestionario inicial. Del resto nos encargamos nosotros.' },
              { q: '¿Cuánto tarda en estar listo?', a: 'Dependiendo de tu implicación inicial. La mayoría están funcionando en menos de una semana. Algunos en 48 horas.' },
              { q: '¿Puedo cancelar?', a: 'Mes a mes. Sin contrato. Todo está en tu máquina desde el primer día — no hay nada que "entregar" porque nunca salió de tu entorno.' },
              { q: 'Si cancelo, ¿pierdo algo?', a: 'No. Los skills, la configuración y la documentación son tuyos. Lo único que pierdes es la mejora continua y el soporte. El sistema sigue funcionando tal cual.' }
            ].map((item, i) => (
              <details key={i} className="fade-target border-t border-[#2c2c2c] group">
                <summary className="py-5 cursor-pointer flex justify-between items-center text-[15px] font-medium hover:text-accent-green transition-colors list-none">
                  {item.q}
                  <Plus className="text-[#999] group-open:rotate-45 transition-transform w-5 h-5" />
                </summary>
                <p className="pb-5 text-[14px] leading-[1.65] text-white/50">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
