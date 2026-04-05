import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  isNodoPersonal?: boolean;
}

export default function Layout({ children, isNodoPersonal }: LayoutProps) {
  return (
    <div className="bg-dark min-h-screen">
      {/* NAVBAR */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 h-[56px] w-full overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-3 md:px-5 h-full flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <span className="font-mono text-[14px] md:text-[15px] font-medium">Nodo<span className="text-accent-green">23</span></span>
            <span className="pulse-dot w-[6px] h-[6px] md:w-[7px] md:h-[7px] rounded-full bg-accent-green"></span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {isNodoPersonal ? (
              <>
                <Link to="/" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">← Comunidad</Link>
                <a href="#como" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Cómo funciona</a>
                <a href="#skills" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Skills</a>
                <a href="#soberania" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Tu infraestructura</a>
                <a href="#precios" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Precios</a>
              </>
            ) : (
              <>
                <a href="#metodo" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Método</a>
                <a href="#skills" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Skills</a>
                <a href="#nodo-bot" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">nodo_bot</a>
                <a href="#planes" className="font-mono text-[13px] text-[#999] hover:text-[#f6f6f6] transition-colors">Planes</a>
              </>
            )}
          </div>
          <a 
            href={isNodoPersonal ? "#consulta" : "https://www.skool.com/nodo23-automatiza-de-verdad-4941"} 
            target={isNodoPersonal ? undefined : "_blank"}
            className="btn-shimmer rounded-full px-3 py-1.5 md:px-5 md:py-2 text-[12px] md:text-[13px] font-medium text-[#141414] shrink-0 whitespace-nowrap"
          >
            {isNodoPersonal ? "Consulta" : "Unirse"}
          </a>
        </div>
      </nav>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className={`w-full border-t border-[#2c2c2c] ${isNodoPersonal ? 'bg-dark-2' : 'bg-dark'}`}>
        <div className="max-w-[1200px] mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <span className="font-mono text-[15px] font-medium">Nodo<span className="text-accent-green">23</span></span>
            <span className="pulse-dot w-[6px] h-[6px] rounded-full bg-accent-green inline-block ml-1"></span>
            <p className="mt-3 text-[13px] text-[#999]">Sistemas, no sermones.</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[.12em] text-[#999] mb-4">{isNodoPersonal ? 'Nodo Personal' : 'Producto'}</h4>
            <div className="space-y-2.5 text-[13px]">
              <a href="#como" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Cómo funciona</a>
              <a href="#skills" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Skills</a>
              {isNodoPersonal ? (
                <a href="#precios" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Precios</a>
              ) : (
                <>
                  <a href="#nodo-bot" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">nodo_bot</a>
                  <Link to="/nodo-personal" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Nodo Personal</Link>
                </>
              )}
              {!isNodoPersonal && <a href="#planes" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Planes</a>}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[.12em] text-[#999] mb-4">{isNodoPersonal ? 'Comunidad' : 'Recursos'}</h4>
            <div className="space-y-2.5 text-[13px]">
              <Link to="/" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Nodo23 Home</Link>
              <a href="#" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Blog</a>
              {!isNodoPersonal && <a href="#" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">OpenClaw</a>}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[.12em] text-[#999] mb-4">Legal</h4>
            <div className="space-y-2.5 text-[13px]">
              <a href="#" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Privacidad</a>
              <a href="#" className="block text-[#999] hover:text-[#f6f6f6] transition-colors">Términos</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-5 py-4 border-t border-[#2c2c2c] flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#999]">© Nodo23 2026 · Sistemas, no sermones.</span>
          <span className="font-mono text-[11px] text-[#999]">Hecho en Canarias</span>
        </div>
      </footer>
    </div>
  );
}
