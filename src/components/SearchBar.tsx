import React, { useState } from "react";

type Props = {
  onSearch: (filters: { destino: string; checkin: string; checkout: string }) => void;
  initialValues: { destino: string; checkin: string; checkout: string };
};

export default function SearchBar({ onSearch, initialValues }: Props) {
  const [filters, setFilters] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      className="w-full max-w-screen-lg bg-white rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-2 p-4 md:p-6 items-start"
      onSubmit={handleSubmit}
    >
      {/* Destino */}
      <div className="flex flex-col gap-1">
        <label
          className="text-sm font-medium text-[#1A1B4B]"
          htmlFor="destino"
        >
          Destino
        </label>
        <div className="flex flex-1 border rounded-lg items-center px-4 py-3 bg-[#F5F6FA]">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.86-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            value={filters.destino}
            onChange={(e) => setFilters({ ...filters, destino: e.target.value })}
            name="destino"
            id="destino"
            autoComplete="off"
            className="w-full outline-none text-lg text-[#1A1B4B] placeholder-gray-400 bg-transparent"
            placeholder="Digite o destino"
            type="text"
          />
        </div>
      </div>

      {/* Check-in */}
      <div className="flex flex-col gap-1">
        <label
          className="text-sm font-medium text-[#1A1B4B]"
          htmlFor="checkin"
        >
          Check-in
        </label>
        <div className="flex flex-1 border rounded-lg items-center px-4 py-3 bg-[#F5F6FA]">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4M8 2v4m-4 4h16" />
          </svg>
          <input
            value={filters.checkin}
            onChange={(e) => setFilters({ ...filters, checkin: e.target.value })}
            name="checkin"
            id="checkin"
            autoComplete="off"
            className="w-full outline-none text-lg text-[#1A1B4B] placeholder-gray-400 bg-transparent"
            type="date"
          />
        </div>
      </div>

      {/* Check-out */}
      <div className="flex flex-col gap-1">
        <label
          className="text-sm font-medium text-[#1A1B4B]"
          htmlFor="checkout"
        >
          Check-out
        </label>
        <div className="flex flex-1 border rounded-lg items-center px-4 py-3 bg-[#F5F6FA]">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4M8 2v4m-4 4h16" />
          </svg>
          <input
            value={filters.checkout}
            onChange={(e) => setFilters({ ...filters, checkout: e.target.value })}
            name="checkout"
            id="checkout"
            autoComplete="off"
            className="w-full outline-none text-lg text-[#1A1B4B] placeholder-gray-400 bg-transparent"
            type="date"
          />
        </div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="flex-shrink-0 w-full md:w-auto px-8 py-3 bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-xl font-semibold rounded-lg shadow transition-all duration-200 hover:shadow-lg hover:shadow-[#FF6B6B]/20 mt-6 md:mt-8"
      >
        Pesquisar
      </button>
    </form>
  );
}
