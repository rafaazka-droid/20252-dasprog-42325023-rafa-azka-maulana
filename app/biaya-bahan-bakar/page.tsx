"use client";

import { useState } from "react";

export default function BiayaBahanBakar() {
  const [konsumsiBBM, setKonsumsiBBM] = useState<string>("");
  const [jarakPerjalanan, setJarakPerjalanan] = useState<string>("");
  const [hargaBBM, setHargaBBM] = useState<string>("");

  const [hasil, setHasil] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const hitungBiaya = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setHasil(null);

    const konsumsi = parseFloat(konsumsiBBM);
    const jarak = parseFloat(jarakPerjalanan);
    const harga = parseFloat(hargaBBM);

    if (isNaN(konsumsi) || isNaN(jarak) || isNaN(harga)) {
      setError("Semua field harus diisi dengan angka!");
      return;
    }

    if (konsumsi <= 0 || jarak <= 0 || harga <= 0) {
      setError("Angka yang dimasukkan harus lebih besar dari 0!");
      return;
    }

    // Rumus pembagian agar hasilnya Rp 200.000 sesuai soal UTS
    const totalLiter = jarak / konsumsi;
    const totalBiaya = totalLiter * harga;

    setHasil(totalBiaya);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-xl font-bold text-center text-emerald-400 mb-6">
          Kalkulator Biaya Bahan Bakar
        </h1>

        <form onSubmit={hitungBiaya} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Rata-rata Pemakaian BBM (km/liter):
            </label>
            <input
              type="text"
              placeholder="Contoh: 10"
              value={konsumsiBBM}
              onChange={(e) => setKonsumsiBBM(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Rencana Jarak Perjalanan (km):
            </label>
            <input
              type="text"
              placeholder="Contoh: 200"
              value={jarakPerjalanan}
              onChange={(e) => setJarakPerjalanan(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Harga Bahan Bakar per Liter (Rp):
            </label>
            <input
              type="text"
              placeholder="Contoh: 10000"
              value={hargaBBM}
              onChange={(e) => setHargaBBM(e.target.value)}
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 font-semibold py-2.5 px-4 rounded transition duration-200"
          >
            Hitung Biaya
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm text-center">
            {error}
          </div>
        )}

        {hasil !== null && (
          <div className="mt-6 p-4 bg-emerald-900/40 border border-emerald-500 rounded text-center">
            <p className="text-sm text-gray-300">Total Biaya Perjalanan:</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              Rp {hasil.toLocaleString("id-ID")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}