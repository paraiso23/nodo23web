import React, { useEffect, useRef } from 'react';
import Layout from './Layout';

const C = {
  bg: '#141414', paper: '#F5F5F0', green: '#34d399',
  greenDark: '#0f7a50', greenDeep: '#1a3d2e',
  grey: '#2a2a2a', greyLight: '#8a8a8a',
};

const SKILLS = [
  { id: 'skillz01_rrss', name: 'La Influencer', role: 'Redes sociales', emoji: '📱' },
  { id: 'skillz02_email', name: 'La Portera', role: 'Email / bandeja', emoji: '📬' },
  { id: 'skillz03_leads', name: 'La Cazadora', role: 'Lead generation', emoji: '🎯' },
  { id: 'skillz04_dms', name: 'El Contesta', role: 'DMs y comentarios', emoji: '💬' },
  { id: 'skillz05_copy', name: 'El Ghostwriter', role: 'Contenido escrito', emoji: '✍️' },
  { id: 'skillz06_billing', name: 'La Cobradora', role: 'Facturación / cobros', emoji: '💰' },
  { id: 'skillz07_agenda', name: 'La PA', role: 'Agenda / reuniones', emoji: '📅' },
  { id: 'skillz08_crm', name: 'El Seguidor', role: 'Seguimiento clientes', emoji: '🔍' },
  { id: 'skillz09_onboard', name: 'El Anfitrión', role: 'Onboarding clientes', emoji: '🤝' },
  { id: 'skillz10_reports', name: 'El CFO', role: 'Reportes / analítica', emoji: '📊' },
];

const PROVIDERS = [
  { name: 'OpenClaw' }, { name: 'Claude Code' },
  { name: 'ChatGPT' }, { name: 'Gemini' },
];

function PixelBlocks({ position }) {
  const pos = { tl: 'top-0 left-0', tr: 'top-0 right-0', bl: 'bottom-0 left-0', br: 'bottom-0 right-0' }[position];
  return (
    <div className={`absolute ${pos} pointer-events-none select-none`}>
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <div className="absolute" style={{ width: '48px', height: '48px', top: '8px', left: '8px', backgroundColor: C.green, opacity: 0.9 }} />
        <div className="absolute" style={{ width: '32px', height: '32px', top: '32px', left: '32px', backgroundColor: C.greenDark, opacity: 0.6 }} />
        <div className="absolute" style={{ width: '16px', height: '16px', top: '0', left: '56px', backgroundColor: C.greenDeep, opacity: 0.4 }} />
        <div className="absolute" style={{ width: '16px', height: '16px', top: '56px', left: '0', backgroundColor: C.grey, opacity: 0.3 }} />
      </div>
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll('.fade-target').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const rootRef = useFadeIn();
  return (
    <Layout>
      <div ref={rootRef} className="relative min-h-screen" style={{ backgroundColor: C.bg }}>
        <nav className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '18px', color: C.paper }}>NODO23</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 400, fontSize: '12px', color: C.green, letterSpacing: '0.15em' }}>SKILLZ</span>
          </div>
          <a href="https://skool.com/nodo23" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-semibold px-4 py-2 rounded transition-all duration-200" style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: C.green, color: C.bg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Empezar →</a>
        </nav>

        <section className="relative pt-32 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
          <PixelBlocks position="tr" /><PixelBlocks position="bl" />
          <div className="fade-target"><p className="mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: C.green, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Tu equipo de agentes AI</p></div>
          <h1 className="fade-target" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 1.05, color: C.paper, maxWidth: '800px' }}>Un agente.<br /><span style={{ color: C.green }}>Un rol.</span><br />Por el precio de una cena.</h1>
          <p className="fade-target mt-6 max-w-xl" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: C.greyLight, lineHeight: 1.6 }}>SKILLZ son agentes con nombre propio y función específica. Los instalas en tu proveedor de IA favorito y funcionan. Sin configuraciones técnicas. Sin contratar a nadie.</p>
          <div className="fade-target mt-10 flex flex-wrap gap-4">
            <a href="https://skool.com/nodo23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold transition-all duration-200 hover:scale-105" style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: C.green, color: C.bg, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Empezar gratis →</a>
            <a href="#skills" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold border transition-all duration-200 hover:bg-white/5" style={{ fontFamily: 'JetBrains Mono, monospace', borderColor: 'rgba(255,255,255,0.15)', color: C.paper, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ver skills</a>
          </div>
        </section>

        <div className="overflow-hidden border-y border-white/5 py-4">
          <div className="marquee-track">
            {[...SKILLS, ...SKILLS].map((s, i) => (<span key={i} className="mx-6 whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: C.greyLight, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{s.emoji} {s.name}</span>))}
          </div>
        </div>

        <section className="relative py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
          <PixelBlocks position="tl" />
          <div className="fade-target mb-12">
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: C.green, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Cómo funciona</p>
            <h2 className="mt-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 48px)', color: C.paper, textTransform: 'uppercase' }}>Tres pasos. Cero técnica.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ num: '01', title: 'Elige tu skill', desc: '¿Necesitas alguien que cobre? La Cobradora. ¿Que escriba? El Ghostwriter. Cada skill tiene nombre, rol y personalidad.' },{ num: '02', title: 'Instala', desc: 'Copia la skill a tu proveedor (OpenClaw, Claude, ChatGPT...). Sin Docker. Sin Google Cloud. Sin calls de configuración.' },{ num: '03', title: 'Funciona', desc: 'Tu agente empieza a trabajar. Gestiona RRSS, responde DMs, cobra facturas, genera reportes. 24/7.' }].map((step) => (
              <div key={step.num} className="fade-target p-6 rounded-lg border border-white/8 transition-all duration-200 hover:bg-white/4">
                <span className="block mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '40px', fontWeight: 700, color: C.green, opacity: 0.3 }}>{step.num}</span>
                <h3 className="mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 700, color: C.paper }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: C.greyLight, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="relative py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
          <PixelBlocks position="br" />
          <div className="fade-target mb-12">
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: C.green, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Catálogo</p>
            <h2 className="mt-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 48px)', color: C.paper, textTransform: 'uppercase' }}>Los 10 agentes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {SKILLS.map((skill) => (
              <div key={skill.id} className="fade-target group p-4 md:p-5 rounded-lg border border-white/8 transition-all duration-200 hover:border-white/20 hover:bg-white/4 text-center">
                <span className="block text-2xl md:text-3xl mb-2">{skill.emoji}</span>
                <span className="block mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 700, color: C.paper }}>{skill.name}</span>
                <span className="block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: C.greyLight }}>{skill.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="relative py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
          <PixelBlocks position="tl" /><PixelBlocks position="br" />
          <div className="fade-target mb-12 text-center">
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: C.green, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Portabilidad</p>
            <h2 className="mt-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 40px)', color: C.paper, textTransform: 'uppercase' }}>Tu inversión no se pierde</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: C.greyLight, lineHeight: 1.6 }}>Las skills funcionan en cualquier proveedor. Hoy usas OpenClaw, mañana Claude, pasado ChatGPT. La skill se porta. El conocimiento es tuyo.</p>
          </div>
          <div className="fade-target flex flex-wrap justify-center gap-4 md:gap-6">
            {PROVIDERS.map((p) => (<div key={p.name} className="px-6 py-4 rounded-lg border border-white/8 transition-all duration-200 hover:border-white/20" style={{ minWidth: '140px', textAlign: 'center' }}><span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', fontWeight: 700, color: C.paper }}>{p.name}</span></div>))}
          </div>
        </section>

        <section className="relative py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto text-center">
          <div className="fade-target">
            <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 56px)', color: C.bg, textTransform: 'uppercase', lineHeight: 1.1 }}><span className="inline-block px-4 py-2 rounded" style={{ backgroundColor: C.green }}>¿Lo instalamos?</span></h2>
            <p className="mt-6 max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: C.greyLight, lineHeight: 1.6 }}>Empieza gratis. Entra a la comunidad. Prueba una skill. Si te gusta, te quedas.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://skool.com/nodo23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold transition-all duration-200 hover:scale-105" style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: C.green, color: C.bg, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>skool.com/nodo23 →</a>
            </div>
            <p className="mt-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: C.greyLight, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Gratis para entrar · $23/mes kit completo</p>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 px-6 md:px-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '14px', color: C.greyLight }}>NODO23</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: C.greyLight, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Sistemas, no sermones.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://skool.com/nodo23" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.greyLight }} className="hover:text-white transition-colors">Skool</a>
            <a href="https://t.me/nodo_23_bot" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.greyLight }} className="hover:text-white transition-colors">Telegram</a>
            <a href="https://github.com/paraiso23" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.greyLight }} className="hover:text-white transition-colors">GitHub</a>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
