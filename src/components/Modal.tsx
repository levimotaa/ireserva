import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
};

export default function Modal({ open, onClose, children, ariaLabel }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center animate-fadein"
      aria-modal="true"
      aria-label={ariaLabel}
      role="dialog"
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-7 max-w-md w-full mx-4 animate-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-700 p-1.5 rounded-full focus:outline-none"
          aria-label="Fechar modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {children}
      </div>
      <style>{`
        .animate-modal { animation: pop .2s cubic-bezier(.4,0,.2,1); }
        @keyframes pop { 0% { transform: scale(.97); opacity:0; } 100% { transform: scale(1); opacity:1; } }
        .animate-fadein { animation: fadein .25s; }
        @keyframes fadein { from{ opacity:0; } to{ opacity:1; } }
      `}</style>
    </div>
  );
}
