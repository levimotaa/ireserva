import React, { useState } from "react";
import Modal from "./Modal";

export default function ContatoModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const [inputs, setInputs] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setEnviado(true);
    setLoading(false);
    setTimeout(onClose, 1200);
  }
  if (enviado) {
    return (
      <Modal open={open} onClose={onClose} ariaLabel="Contato">
        <div className="min-w-[200px] py-12 flex flex-col items-center">
          <span className="text-green-600 font-bold text-2xl">Mensagem enviada 🚀</span>
        </div>
      </Modal>
    );
  }
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Contato">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-bold mb-1 text-[#1A1B4B]">Fale conosco</h2>
        <input
          name="nome"
          type="text"
          placeholder="Seu nome"
          className="rounded-lg border bg-[#F5F6FA] px-4 py-3 text-lg text-[#1A1B4B] placeholder-gray-400 focus:ring-2 ring-[#FF6B6B] outline-none"
          value={inputs.nome}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail para contato"
          className="rounded-lg border bg-[#F5F6FA] px-4 py-3 text-lg text-[#1A1B4B] placeholder-gray-400 focus:ring-2 ring-[#FF6B6B] outline-none"
          value={inputs.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <textarea
          name="mensagem"
          placeholder="Mensagem"
          rows={4}
          className="rounded-lg border bg-[#F5F6FA] px-4 py-2 text-lg text-[#1A1B4B] placeholder-gray-400 focus:ring-2 ring-[#FF6B6B] outline-none resize-none"
          value={inputs.mensagem}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-xl font-semibold rounded-lg py-3 transition" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </Modal>
  );
}
