import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from './Layout';

interface Line {
  txt: string;
  c: string;
  spd: number;
}

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<{ text: string; className: string }[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const lines: Line[] = [
    { txt: '$ openclaw init --user nodo23', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  openclaw v2.1 · verificando entorno...', c: 'text-white/30', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  ✓ Motor: operativo', c: 'text-accent-green', spd: 7 },
    { txt: '  ✓ Tus datos: en tu máquina (nada sale de aquí)', c: 'text-accent-green', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '$ openclaw onboarding --start', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  Iniciando tu espacio de trabajo...', c: 'text-white/30', spd: 7 },
    { txt: '  Configurando entorno local...', c: 'text-white/30', spd: 7 },
    { txt: '  Verificando privacidad...', c: 'text-white/30', spd: 7 },
    { txt: '  Conectando con la comunidad Nodo23...', c: 'text-white/30', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '  [comunidad]   ✓ acceso concedido', c: 'text-accent-green', spd: 7 },
    { txt: '  [skool]       → skool.com/nodo23', c: 'text-accent-teal', spd: 7 },
    { txt: '  [workspace]   ✓ entorno listo', c: 'text-accent-green', spd: 7 },
    { txt: '  [privacidad]  ✓ cifrado activo', c: 'text-accent-green', spd: 7 },
    { txt: '  [skills]      ✓ automatizaciones base instaladas', c: 'text-accent-green', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '$ openclaw status', c: 'text-accent-blue', spd: 26 },
    { txt: '', c: '', spd: 0 },
    { txt: '  [inbox]       ✓ activo · procesando emails', c: 'text-accent-green', spd: 7 },
    { txt: '  [whatsapp]    ✓ activo · webhook operativo', c: 'text-accent-green', spd: 7 },
    { txt: '  [calendario]  ✓ activo · 1 reunión preparada', c: 'text-accent-green', spd: 7 },
    { txt: '  [seguridad]   ✓ activo · verificado', c: 'text-accent-green', spd: 7 },
    { txt: '', c: '', spd: 0 },
    { txt: '✓ Onboarding completado. Bienvenido.', c: 'text-accent-green', spd: 14 },
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

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden pt-[56px]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}></div>
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(ellipse at center,rgba(52,211,153,.07) 0%,transparent 70%)', filter: 'blur(40px)' }}></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-5 w-full pt-10">
          <div className="fade-target mb-7 inline-flex items-center gap-2 border border-[#2c2c2c] rounded-full px-4 py-1.5 max-w-full overflow-hidden">
            <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green shrink-0"></span>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[.05em] md:tracking-[.1em] text-[#999] whitespace-nowrap overflow-hidden text-ellipsis">
              Nodo23 · Automatizaciones de IA · Tus datos, tu máquina
            </span>
          </div>

          <h1 className="fade-target font-medium tracking-[-0.025em] leading-[1.08] max-w-[820px]">
            <span className="block text-[clamp(15px,1.6vw,22px)] text-white/40 font-normal tracking-wide mb-2.5">
              Tienes 12 apps de IA abiertas.
            </span>
            <span className="hero-gradient text-[clamp(24px,4.5vw,54px)]">Todas prometen.<br/>Ninguna hace el trabajo.</span>
          </h1>

          <p className="fade-target mt-6 max-w-[580px] leading-[1.65] text-[15px] md:text-[17px] text-white/50 px-2">
            Un skill es una automatización de IA que trabaja por ti: responde emails, resume reuniones, organiza tu CRM. OpenClaw es el motor que las ejecuta — en tu máquina, con tus datos. Nodo23 te enseña a montarlo.
          </p>

          <div className="fade-target flex flex-wrap justify-center gap-3 mt-9">
            <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="btn-shimmer rounded-full px-7 py-3 text-[14px] font-medium text-[#141414]">Únete al Skool →</a>
            <a href="#metodo" className="rounded-full px-7 py-3 text-[14px] font-medium border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Conoce el método</a>
          </div>
          <p className="fade-target mt-5 font-mono text-[10px] md:text-[11px] text-[#999] px-2">
            Freelancers · Solopreneurs · PYMEs — sin tocar una línea de código
          </p>
        </div>

        {/* TICKER */}
        <div className="w-full overflow-hidden py-5 bg-dark-2 border-y border-[#2c2c2c] mt-14">
          <div className="marquee-track">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex gap-10 pr-10 font-mono text-[12px] text-[#999] whitespace-nowrap">
                <span>tus datos · tu máquina</span><span className="text-accent-green">✦</span>
                <span>automatizaciones que no se rompen</span><span className="text-accent-green">✦</span>
                <span>en producción · no en tutoriales</span><span className="text-accent-green">✦</span>
                <span>tus datos nunca salen de tu equipo</span><span className="text-accent-green">✦</span>
                <span>nodo_bot 24/7</span><span className="text-accent-green">✦</span>
                <span>sin atarte a ningún SaaS</span><span className="text-accent-green">✦</span>
                <span>openclaw</span><span className="text-accent-green">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-target relative mt-14 w-full max-w-[660px] px-5 mx-auto">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot bg-[#ff5f57]"></span>
              <span className="t-dot bg-[#febc2e]"></span>
              <span className="t-dot bg-[#28c840]"></span>
              <span className="t-title">openclaw · nodo activo</span>
              <span className="flex items-center gap-1.5 ml-auto">
                <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green"></span>
                <span className="text-[10px] text-white/20">live</span>
              </span>
            </div>
            <div ref={terminalBodyRef} className="pt-4 px-4 pb-24 code-mask h-[310px] overflow-y-auto font-mono text-[12px] leading-[2]">
              {terminalLines.map((line, i) => (
                <div key={i} className={line.className}>{line.text}</div>
              ))}
              {isTyping && <span className="cursor-blink text-accent-green">▋</span>}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-dark to-transparent"></div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-[#1a1a1a]"></span><span className="bg-white/4"></span>
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/2"></span>
      </div>

      <div className="ornament-divider">
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/4"></span><span className="bg-white/2"></span>
        <span className="bg-[#1a1a1a]"></span>
      </div>

      {/* EL PROBLEMA */}
      <section className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[1100px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// el problema</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-12 text-[clamp(26px,3.5vw,42px)]">
            No te falta IA.<br/><span className="text-accent-green">Te falta un sistema que funcione sin ti.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { id: '01', title: 'Consumes, no construyes', text: 'Tienes 23 pestañas abiertas de ChatGPT, un tutorial de n8n a medias, tres cursos sin terminar y una carpeta de "automatizaciones" que no abriste desde marzo. Todo listo para empezar. Llevas así seis meses.' },
              { id: '02', title: 'Usas herramientas que no se hablan entre sí', text: 'Cada SaaS que contratas promete IA. Pero ninguno sabe cómo trabajas tú, ninguno se conecta con los demás y todos te cobran aunque no los uses.' },
              { id: '03', title: 'Cuando algo falla, estás solo', text: 'La integración expira, el modelo cambia, el flujo se rompe. Y no tienes a nadie que entienda tu caso concreto para ayudarte a arreglarlo.' }
            ].map((item) => (
              <div key={item.id} className="fade-target rounded-lg border border-[#2c2c2c] p-6 card-hover">
                <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-4 block">// {item.id}</span>
                <h3 className="text-[17px] font-medium mb-3">{item.title}</h3>
                <p className="text-[14px] leading-[1.65] text-white/50">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-[#1a1a1a]"></span><span className="bg-white/4"></span>
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
      </div>

      {/* LA SOLUCIÓN / TABS */}
      <section id="metodo" className="w-full flex justify-center px-5 py-24 bg-dark-2">
        <div className="max-w-[900px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// la solución</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-4 text-[clamp(26px,3.5vw,42px)]">
            Automatizaciones de IA que trabajan para ti.<br/><span className="text-white/35">Construidas sobre OpenClaw.</span>
          </h2>
          <p className="fade-target text-[16px] leading-[1.65] mb-2 max-w-[660px] text-white/50">
            No más tutoriales a medias. No más herramientas genéricas. Un sistema hecho para cómo tú trabajas — que cada día que lo usas hace un poco más por ti.
          </p>
          <p className="fade-target text-[12px] font-mono text-white/20 mb-10 italic">
            *Disponible desde Skool en todos los niveles
          </p>

          <div className="fade-target grid grid-cols-2 md:flex md:flex-nowrap border-b border-[#2c2c2c] mb-8">
            {['01 Directo', '02 Control', '03 Acompañado', '04 Tuyo'].map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`font-mono text-[11px] md:text-[12px] px-2 md:px-5 py-3 border-b-2 transition-all text-center ${activeTab === i ? 'text-accent-green border-accent-green' : 'border-transparent text-[#999]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="fade-target">
            {activeTab === 0 && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-[20px] font-medium mb-4">Entras hoy. En una hora tienes OpenClaw corriendo.</h3>
                  <div className="space-y-2.5 text-[15px] text-white/55">
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Proceso de bienvenida guiado por nodo_bot</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Acceso inmediato a todos los skills de Nodo23</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Acceso inmediato a la comunidad</div>
                  </div>
                </div>
                <div className="fade-target">
                  <div className="terminal shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                    <div className="terminal-bar">
                      <span className="t-dot bg-[#ff5f57]"></span>
                      <span className="t-dot bg-[#febc2e]"></span>
                      <span className="t-dot bg-[#28c840]"></span>
                      <span className="t-title">onboarding · chat</span>
                      <span className="flex items-center gap-1.5 ml-auto">
                        <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green"></span>
                        <span className="text-[10px] text-white/20">activo</span>
                      </span>
                    </div>
                    <div className="p-5 space-y-4 text-[12px] font-mono">
                      <div className="flex gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                        <div className="rounded-lg px-4 py-2.5 bg-accent-green/6 border border-accent-green/15">
                          <p className="text-white/80">Hola. Soy nodo_bot. ¿A qué te dedicas?</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="rounded-lg px-4 py-2.5 max-w-[78%] bg-white/6">
                          <p className="text-white/80">Freelance de diseño. Clientes por proyecto.</p>
                        </div>
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] bg-[#2c2c2c] text-[#666]">tú</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                        <div className="rounded-lg px-4 py-3 bg-accent-green/6 border border-accent-green/15">
                          <p className="mb-2 text-white/75">Perfecto. Tu cuello de botella suele ser el seguimiento de clientes. Empieza por el skill de CRM freelance. Aquí tienes el paso a paso para instalarlo: [enlace]. Cuando lo tengas corriendo, escríbeme y lo configuramos juntos.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-[20px] font-medium mb-4">Tu sistema, exactamente como tú quieres que funcione.</h3>
                  <p className="text-[15px] text-white/55 leading-[1.6] mb-6">
                    Cada skill se configura a tu forma de trabajar. No adaptas tu flujo al sistema — el sistema se adapta a ti.
                  </p>
                  <div className="space-y-2.5 text-[15px] text-white/55">
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Documentación clara de cada skill que instalas</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Ajusta, modifica y expande tu sistema cuando quieras</div>
                  </div>
                </div>
                <div className="fade-target">
                  <div className="terminal shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                    <div className="terminal-bar">
                      <span className="t-dot bg-[#ff5f57]"></span>
                      <span className="t-dot bg-[#febc2e]"></span>
                      <span className="t-dot bg-[#28c840]"></span>
                      <span className="t-title">configuración · chat</span>
                      <span className="flex items-center gap-1.5 ml-auto">
                        <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green"></span>
                        <span className="text-[10px] text-white/20">activo</span>
                      </span>
                    </div>
                    <div className="p-5 space-y-4 text-[12px] font-mono">
                      <div className="flex gap-3 justify-end">
                        <div className="rounded-lg px-4 py-2.5 max-w-[78%] bg-white/6">
                          <p className="text-white/80">Quiero que el resumen de inbox no incluya newsletters. Solo clientes y proveedores.</p>
                        </div>
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] bg-[#2c2c2c] text-[#666]">tú</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                        <div className="rounded-lg px-4 py-2.5 bg-accent-green/6 border border-accent-green/15">
                          <p className="text-white/80">Hecho. He actualizado el filtro del skill de inbox. A partir de ahora solo te llegan emails de contactos en tu CRM. ¿Quieres que también filtre por palabras clave o te vale así?</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="rounded-lg px-4 py-2.5 max-w-[78%] bg-white/6">
                          <p className="text-white/80">También quiero que si un cliente lleva más de 3 días sin respuesta, me avise por WhatsApp.</p>
                        </div>
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] bg-[#2c2c2c] text-[#666]">tú</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                        <div className="rounded-lg px-4 py-2.5 bg-accent-green/6 border border-accent-green/15">
                          <p className="text-white/80">Perfecto. Regla añadida al skill de seguimiento. ¿A partir de qué hora del día quieres recibir ese aviso?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-[20px] font-medium mb-4">Mientras aprendes, te acompaño. Cuando algo se rompe, lo resolvemos juntos.</h3>
                  <div className="space-y-2.5 text-[15px] text-white/55">
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> nodo_bot disponible 24/7 para cualquier duda</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Comunidad activa de gente construyendo en paralelo</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Sesiones 1:1 con Orlando en el plan VIP</div>
                  </div>
                </div>
                <div className="fade-target">
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10 font-mono text-[13px] leading-[1.6]">
                    <div className="text-accent-green mb-4"># La idea es simple:</div>
                    <div className="text-white/80 ml-4">→ Instalas tú.</div>
                    <div className="text-white/80 ml-4">→ Entiendes tú.</div>
                    <div className="text-white/80 ml-4 mb-4">→ Reparas tú.</div>
                    <div className="text-white/40"># Nosotros estamos detrás por si acaso.</div>
                    <div className="text-white/40"># Pero cada semana necesitas menos ayuda.</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-[20px] font-medium mb-4">Si mañana desaparecemos, tu sistema sigue funcionando.</h3>
                  <p className="text-[15px] text-white/55 leading-[1.6] mb-6">
                    Todo lo que construimos se ejecuta en tu máquina. No en la nuestra. No hay nada que "devolver" porque nunca salió de tu entorno. Eso no es un eslogan — es la arquitectura.
                  </p>
                  <div className="space-y-2.5 text-[15px] text-white/55">
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Tus datos: en tu máquina</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Tus skills: tu código</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> Tu sistema: siempre tuyo</div>
                    <div className="flex items-start gap-2"><span className="text-accent-green">✓</span> ¿Dejas Nodo23? Todo es tuyo.</div>
                  </div>
                </div>
                <div className="fade-target">
                  <div className="p-6 rounded-lg bg-accent-blue/5 border border-accent-blue/20">
                    <div className="font-mono text-[11px] text-accent-blue uppercase tracking-widest mb-4">Stack de Soberanía</div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[13px] text-white/40">Infraestructura</span>
                        <span className="text-[13px] text-white/80">Local / VPS Propio</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[13px] text-white/40">Base de Datos</span>
                        <span className="text-[13px] text-white/80">Vectorial Local</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[13px] text-white/40">Modelos (LLM)</span>
                        <span className="text-[13px] text-white/80">Open Source / API Keys</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-white/40">Propiedad</span>
                        <span className="text-[13px] text-accent-green">100% Usuario</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/4"></span><span className="bg-white/2"></span>
      </div>

      {/* NODO_BOT */}
      <section id="nodo-bot" className="w-full flex justify-center px-5 py-24 bg-[#F6F6F6]">
        <div className="max-w-[1100px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-accent-green">// nodo_bot</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-4 text-[clamp(26px,3.5vw,42px)] text-[#1a1a1a]">
            nodo_bot conoce tu sistema. Y te guía antes de que te pierdas.
          </h2>
          <p className="fade-target text-[16px] leading-[1.7] mb-12 max-w-[620px] text-black/45">
            No es un chatbot genérico. Está entrenado en todo lo que hemos construido — para que tú no tengas que buscarlo ni esperar a nadie.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="fade-target space-y-4">
              {[
                { title: 'Setup guiado', text: 'Te acompaña paso a paso en tu primera instalación de OpenClaw. Nada se queda sin hacer.' },
                { title: 'Soporte cuando algo falla', text: 'Diagnóstico directo, soluciones concretas. Sin esperar tickets ni 72 horas.' },
                { title: 'Onboarding personalizado', text: 'Conoce tu caso, tus herramientas y tus prioridades. Te lleva directo a lo que necesitas primero.' }
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-[#e0e0e0] p-5 bg-white transition-all hover:shadow-sm">
                  <h3 className="text-[15px] font-medium mb-2 flex items-center gap-2 text-[#1a1a1a]">
                    <span className="text-accent-green">→</span> {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-black/50">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="fade-target">
              <div className="terminal shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                <div className="terminal-bar">
                  <span className="t-dot bg-[#ff5f57]"></span>
                  <span className="t-dot bg-[#febc2e]"></span>
                  <span className="t-dot bg-[#28c840]"></span>
                  <span className="t-title">nodo_bot · demo</span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green"></span>
                    <span className="text-[10px] text-white/20">activo</span>
                  </span>
                </div>
                <div className="p-5 space-y-4 text-[12px] font-mono">
                  <div className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                    <div className="rounded-lg px-4 py-2.5 bg-accent-green/6 border border-accent-green/15">
                      <p className="text-white/80">Hola. ¿Qué está fallando?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-lg px-4 py-2.5 max-w-[78%] bg-white/6">
                      <p className="text-white/80">El agente de WhatsApp no envía mensajes.</p>
                    </div>
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] bg-[#2c2c2c] text-[#666]">tú</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] bg-accent-green/15 text-accent-green">nb</span>
                    <div className="rounded-lg px-4 py-3 bg-accent-green/6 border border-accent-green/15">
                      <p className="mb-2 text-white/75">Comprobando... el webhook de WhatsApp Business expiró. Renuévalo con:</p>
                      <p className="text-[11px] p-2 rounded mb-2 bg-white/4 text-accent-blue">$ openclaw auth refresh --app whatsapp</p>
                      <p className="text-white/50">Ejecuta eso y probamos de nuevo. Si sigue fallando, escríbeme.</p>
                    </div>
                  </div>
                  <div className="pt-1 flex justify-center">
                    <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="btn-shimmer rounded-full px-6 py-2 text-[12px] font-medium text-[#141414]">Probar nodo_bot →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[1100px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// los skills</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-4 text-[clamp(26px,3.5vw,42px)]">
            No vendemos cursos. Instalamos piezas que trabajan solas.
          </h2>
          <p className="fade-target text-[16px] leading-[1.65] mb-12 max-w-[660px] text-white/50">
            Cada skill es una automatización real: la configuras una vez y trabaja mientras tú haces otra cosa.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="fade-target rounded-lg border border-[#2c2c2c] p-6 card-hover">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-4 block">// skill · RRSS</span>
              <h3 className="text-[18px] font-medium mb-3">Gestión de redes sociales</h3>
              <p className="text-[14px] leading-[1.65] text-white/50 mb-4">El skill analiza tu historial, genera posts en tu tono y los programa. Tú solo pides y revisas.</p>
              <p className="text-[13px] font-mono text-accent-green">Ejemplo real: "3 horas semanales → 20 minutos de revisión."</p>
            </div>
            <div className="fade-target rounded-lg border border-[#2c2c2c] p-6 card-hover">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-4 block">// skill · FINANZAS</span>
              <h3 className="text-[18px] font-medium mb-3">Control financiero automático</h3>
              <p className="text-[14px] leading-[1.65] text-white/50 mb-4">Busca y recibe nuevas facturas. Cada semana tienes un resumen de ingresos, gastos y alertas si algo no cuadra.</p>
              <p className="text-[13px] font-mono text-accent-green">Ejemplo real: "Cierras el mes sin rebuscar entre recibos."</p>
            </div>
            <div className="fade-target rounded-lg border border-[#2c2c2c] p-6 card-hover">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-4 block">// skill · CRM</span>
              <h3 className="text-[18px] font-medium mb-3">Seguimiento de clientes</h3>
              <p className="text-[14px] leading-[1.65] text-white/50 mb-4">Sabe en qué punto está cada lead. Te avisa cuándo hacer seguimiento y redacta el mensaje según el contexto anterior.</p>
              <p className="text-[13px] font-mono text-accent-green">Ejemplo real: "Ningún cliente se te cae por falta de seguimiento."</p>
            </div>
          </div>

          <div className="fade-target rounded-lg border border-accent-green/30 p-8 bg-accent-green/5">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <span className="font-mono text-[11px] text-accent-green uppercase tracking-wider mb-2 block">// · nuevo cada semana ·</span>
                <h3 className="text-[22px] font-medium mb-3">Un skill nuevo cada semana.</h3>
                <p className="text-[15px] leading-[1.65] text-white/60">Lo instalamos en directo, contigo, desde cero. Al acabar, lo tienes funcionando en tu entorno. No en un tutorial. En producción.</p>
              </div>
              <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="shrink-0 rounded-full px-8 py-3.5 text-[14px] font-medium bg-accent-green text-[#141414] hover:bg-accent-green/90 transition-all">Ver próximo coworking →</a>
            </div>
          </div>
        </div>
      </section>

      <div className="ornament-divider">
        <span className="bg-[#1a1a1a]"></span><span className="bg-white/4"></span>
        <span className="bg-white/2"></span><span className="bg-[#1a1a1a]"></span>
        <span className="bg-white/2"></span>
      </div>

      {/* DOS CAMINOS */}
      <section id="caminos" className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[1100px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// ¿cómo quieres hacerlo?</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-12 text-[clamp(26px,3.5vw,42px)]">
            Aprende y construye tú.<br/>O lo hacemos nosotros.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="fade-target rounded-lg border border-[#2c2c2c] p-7 flex flex-col">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-4">// aprende y construye · desde $0/mes</span>
              <h3 className="text-[20px] font-medium mb-4">Comunidad Nodo23</h3>
              <p className="text-[14px] leading-[1.65] mb-6 text-white/50">Únete a la comunidad en Skool. Cada semana un skill nuevo, en directo, con gente que está en el mismo punto que tú. En 60 días tienes tu Nodo funcionando y lo entiendes por dentro.</p>
              <div className="space-y-2.5 text-[13px] flex-1 text-white/55">
                <div><span className="text-accent-green">✓</span> Coworking semanal gratuito</div>
                <div><span className="text-accent-green">✓</span> Mastermind con skills descargables</div>
                <div><span className="text-accent-green">✓</span> Acompañamiento VIP 1:1</div>
                <div><span className="text-accent-green">✓</span> Desde Gratis</div>
              </div>
              <div className="mt-6 pt-5 border-t border-[#2c2c2c]">
                <a href="#planes" className="rounded-full px-6 py-2.5 text-[13px] font-medium border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all inline-block">Ver planes →</a>
              </div>
            </div>

            <div className="fade-target rounded-lg border border-accent-green p-7 flex flex-col bg-accent-green/3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent-green">// hecho para ti · desde €200/mes</span>
              <h3 className="text-[20px] font-medium mb-4">Nodo Personal</h3>
              <p className="text-[14px] leading-[1.65] mb-6 text-white/50">No quieres pasar por la curva de aprendizaje. Lo entendemos. Construimos tu Nodo en tu infraestructura, lo dejamos funcionando y lo mejoramos cada mes.</p>
              <div className="space-y-2.5 text-[13px] flex-1 text-white/60">
                <div><span className="text-accent-green">✓</span> Setup y gestión incluida</div>
                <div><span className="text-accent-green">✓</span> Se ejecuta en tu infraestructura</div>
                <div><span className="text-accent-green">✓</span> Mejoras mensuales continuas</div>
                <div><span className="text-accent-green">✓</span> Desde €200/mes</div>
              </div>
              <div className="mt-6 pt-5 border-t border-accent-green/20">
                <Link to="/nodo-personal" className="btn-shimmer inline-block rounded-full px-6 py-2.5 text-[13px] font-medium text-[#141414]">Ver Nodo Personal →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

           {/* PLANES */}
      <section id="planes" className="w-full flex justify-center px-5 py-24 bg-dark-2">
        <div className="max-w-[1100px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// acceso a la comunidad</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-12 text-[clamp(26px,3.5vw,42px)]">
            Planes Skool
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            <div className="fade-target rounded-lg border border-[#2c2c2c] p-6 flex flex-col">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-2">Coworking</span>
              <p className="text-[13px] mb-5 text-white/45">Comunidad abierta. Sesiones en directo.</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[32px] font-bold">Gratis</span>
              </div>
              <p className="text-[11px] font-mono mb-5 text-white/40">acceso libre</p>
              <div className="space-y-2 text-[13px] flex-1 text-white/55">
                <div>🧠 Comunidad abierta en Skool</div>
                <div>📅 Sesiones de coworking semanales</div>
                <div>📼 Grabaciones de las sesiones</div>
                <div>🤖 nodo_bot en modo demo</div>
              </div>
              <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="mt-6 rounded-full px-6 py-2.5 text-[13px] font-medium text-center border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Entrar gratis →</a>
            </div>

            <div className="fade-target rounded-lg border border-[#2c2c2c] p-6 flex flex-col bg-white/2">
              <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider mb-2">Mastermind</span>
              <p className="text-[13px] mb-5 text-white/45">Skills listos para instalar. Soporte.</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[32px] font-bold">$23</span>
                <span className="text-[14px] text-white/40">/mes</span>
                <span className="text-[13px] line-through ml-1 text-white/25">$46</span>
              </div>
              <p className="text-[11px] font-mono mb-2 text-white/40">precio fundador · 50 plazas</p>
              <div className="mb-5">
                <div className="spots-bar mb-1.5"><div className="spots-bar-fill w-[70%]"></div></div>
                <p className="font-mono text-[10px] text-white/35">Quedan ~15 plazas a este precio</p>
              </div>
              <div className="space-y-2 text-[13px] flex-1 text-white/55">
                <div>📦 Skills descargables listos para usar</div>
                <div>🎥 Video tutoriales de instalación</div>
                <div>💬 Hilos de soporte colectivo</div>
                <div>🧠 nodo_bot con memoria (acompañamiento)</div>
                <div>❓ Q&A exclusivos mensuales</div>
              </div>
              <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="mt-6 rounded-full px-6 py-2.5 text-[13px] font-medium text-center border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Únete al Mastermind →</a>
            </div>

            <div className="fade-target rounded-lg border border-accent-green p-6 flex flex-col bg-accent-green/3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-green">VIP</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-accent-green text-accent-green">premium</span>
              </div>
              <p className="text-[13px] mb-5 text-white/45">Acompañamiento directo 1:1.</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[32px] font-bold text-accent-green">$99</span>
                <span className="text-[14px] text-white/40">/mes</span>
              </div>
              <p className="text-[11px] font-mono mb-5 text-accent-green">acceso prioritario</p>
              <div className="space-y-2 text-[13px] flex-1 text-white/60">
                <div><span className="text-accent-green">✓</span> Todo lo de Mastermind</div>
                <div>📞 1 llamada 1:1 de 2h con Orlando</div>
                <div>🚀 Prioridad absoluta en soporte</div>
                <div>💎 Acceso anticipado a nuevos skills</div>
                <div>🎯 Sesiones Q&A exclusivas VIP</div>
              </div>
              <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="mt-6 btn-shimmer rounded-full px-6 py-2.5 text-[13px] font-medium text-center text-[#141414]">Solicitar VIP →</a>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-[#2c2c2c]">
            <div className="fade-target rounded-lg border border-accent-green p-8 bg-accent-green/3">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <span className="font-mono text-[11px] text-accent-green uppercase tracking-wider mb-2 block">// hecho para ti · desde €200/mes</span>
                  <h3 className="text-[24px] font-medium mb-3">Nodo Personal</h3>
                  <p className="text-[15px] leading-[1.65] text-white/50">No quieres pasar por la curva de aprendizaje. Lo entendemos. Construimos tu Nodo en tu infraestructura, lo dejamos funcionando y lo mejoramos cada mes.</p>
                </div>
                <Link to="/nodo-personal" className="shrink-0 btn-shimmer rounded-full px-8 py-3.5 text-[14px] font-medium text-[#141414]">Ver Nodo Personal →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full flex justify-center px-5 py-24 bg-dark">
        <div className="max-w-[760px] w-full">
          <div className="fade-target mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[.1em] text-[#999]">// preguntas</span>
          </div>
          <h2 className="fade-target font-medium leading-[1.15] mb-10 text-[clamp(26px,3.5vw,42px)]">
            Lo que vas a preguntar.
          </h2>
          <div className="space-y-0">
            {[
              { q: '¿Qué es OpenClaw exactamente?', a: 'OpenClaw es un agente de IA que opera tu ordenador de forma autónoma. No es un chatbot; es un operador. Tú defines el qué, y el agente resuelve el cómo ejecutando acciones reales en tu navegador, archivos o emails.' },
              { q: '¿Necesito saber programar?', a: 'No. Instalamos el sistema por ti o te damos las herramientas listas para usar. Si sabes copiar y pegar y tienes ganas de implementar sistemas reales, tienes todo lo necesario. No vendemos cursos, vendemos sistemas funcionando.' },
              { q: '¿Cuánto tarda en estar funcionando?', a: 'En los servicios 1:1 (Nodo Personal), el setup está incluido y suele estar listo en 48-72h. En la comunidad, el onboarding es continuo: entras hoy y hoy mismo empiezas a ver cómo funciona el sistema.' },
              { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin permanencia. Sin letra pequeña. Los sistemas que instalamos en tu máquina son tuyos para siempre por soberanía digital, incluso si dejas de pagar la cuota de mantenimiento.' },
              { q: '¿El objetivo es que dependa de vosotros?', a: 'Sistemas, no sermones. El éxito para nosotros es que tu sistema funcione tan bien que no nos necesites para el día a día. Estamos aquí para mejorar el sistema, no para que dependas de nosotros.' }
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

      {/* CTA FINAL */}
      <section className="relative w-full flex justify-center px-5 py-32 bg-dark-2">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}></div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(ellipse at center,rgba(52,211,153,.06) 0%,transparent 70%)', filter: 'blur(40px)' }}></div>

        <div className="relative z-10 max-w-[620px] w-full flex flex-col items-center text-center fade-target">
          <h2 className="font-medium leading-[1.1] tracking-[-0.02em] text-[clamp(32px,4.5vw,56px)]">
            Llevas un rato leyendo.<br/>Algo de aquí resonó.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-white/45">
            El jueves es el próximo coworking en directo. Entra hoy y ya tienes tu primer skill corriendo esta semana.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <a href="https://www.skool.com/nodo23-automatiza-de-verdad-4941" target="_blank" className="btn-shimmer rounded-full px-8 py-3.5 text-[15px] font-medium text-[#141414]">Únete al Skool →</a>
            <a href="#planes" className="rounded-full px-8 py-3.5 text-[15px] font-medium border border-[#2c2c2c] text-[#999] hover:text-[#f6f6f6] hover:border-[#444] transition-all">Ver planes</a>
          </div>
          <p className="mt-5 font-mono text-[11px] text-[#999]">Entras hoy · Cancelas cuando quieras · El sistema es siempre tuyo</p>
        </div>
      </section>
    </Layout>
  );
}
