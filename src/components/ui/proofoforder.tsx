import qris100 from "@/assets/qris100.jpeg";
import qris160 from "@/assets/qris160.jpeg";

interface ProofOfOrderProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  uploadType?: string;
  setUploadType?: React.Dispatch<React.SetStateAction<string>>;
  fileLink?: string;
  setFileLink?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProofOfOrder({ file, setFile, status, setStatus }: ProofOfOrderProps) {
  const isDP = status.toUpperCase() !== "FULL";

  const nominalDP = "Rp 100.000";
  const nominalFull = "Rp 160.000";

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] text-white/30 font-mono">03</span>
        <h2 className="text-xs uppercase tracking-[0.25em] font-semibold">
          Proof of Order & Payment
        </h2>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      {/* Box QRIS & Informasi Pembayaran */}
      <div className="mb-6 p-6 rounded-2xl border border-white/[0.12] bg-white/[0.02] text-center">
        <p className="text-xs text-white/50 uppercase tracking-[0.15em] mb-2">
          Scan QRIS untuk Pembayaran
        </p>

        {/* Tab Pilihan Pembayaran (DP / Full) */}
        <div className="flex items-center justify-center gap-2 mb-4 p-1 bg-white/[0.03] border border-white/[0.08] rounded-0 max-w-[240px] mx-auto mt-4">
          <button
            type="button"
            onClick={() => setStatus("DP")}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${
              isDP
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            DP (100k)
          </button>
          <button
            type="button"
            onClick={() => setStatus("Full")}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${
              !isDP
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            Full (160k)
          </button>
        </div>

        {/* Nominal yang Harus Dibayar */}
        <div className="mb-4">
          <span className="text-[10px] text-white/40 uppercase tracking-widest block">Total Tagihan</span>
          <span className="text-2xl font-bold tracking-tight text-white">
            {isDP ? nominalDP : nominalFull}
          </span>
        </div>

        {/* Gambar QRIS */}
        <div>
            {/* Kotak QRIS */}
            <div className="w-48 h-60 mx-auto bg-white rounded-xl p-0 flex items-center justify-center shadow-lg mb-3">
                <img 
                    src={isDP ? qris100 : qris160}
                    alt="QRIS Varnero" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML = '<span class="text-black text-xs font-bold font-mono">[ QRIS IMAGE ]</span>';
                        }
                    }}
                />
            </div>

            {/* Tombol Download */}
            <div className="text-center mb-1">
                <a 
                    href={isDP ? qris100 : qris160} 
                    download={`QRIS-Varnero-${status.toUpperCase()}.jpg`}
                    className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black text-xs font-semibold rounded-lg shadow transition-colors"
                >
                    Download QRIS
                </a>
            </div>
        </div>
        <p className="text-[11px] text-white/40">Gunakan GoPay, OVO, Dana, BCA, atau Mobile Banking apa saja.</p>
      </div>

      {/* Input Jenis Pembayaran (DP atau Full) */}
      <div className="mb-6 p-6 rounded-2xl border border-white/[0.12] bg-white/[0.02] mt-4">
        <label className="block text-xs text-white/50 uppercase tracking-[0.15em] mb-4 text-center">
          Jenis Pembayaran
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["DP", "Full"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`h-12 rounded-xl text-xs font-semibold uppercase tracking-[0.15em] border transition-all ${
                status === item
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/60 border-white/[0.12] hover:border-white/40 hover:text-white"
              }`}
            >
              {item === "DP" ? "DP (Rp 100.000)" : "Full (Rp 160.000)"}
            </button>
          ))}
        </div>
      </div>

      {/* Area Upload Bukti Transfer */}
      <div className="mb-6 p-6 rounded-2xl border border-white/[0.12] bg-white/[0.02] text-center mt-4">
        <label className="block text-xs text-white/50 uppercase tracking-[0.15em] mb-4">
          Upload Bukti Transfer
        </label>
        <label className="group relative flex flex-col items-center justify-center min-h-[150px] rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.025] cursor-pointer overflow-hidden transition-all hover:bg-white/[0.05] hover:border-white/30">
          <div className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-black transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
          </div>
          <span className="text-sm font-medium">
            {file ? file.name : "Upload bukti pembayaran"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-1">
            JPG / PNG / PDF
          </span>
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] ?? null;
              setFile(selectedFile);
            }}
          />
        </label>
      </div>
    </div>
  );
}