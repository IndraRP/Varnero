interface SuccessFormProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  waUrl: string;
}

export default function SuccessForm({ setSuccess, waUrl }: SuccessFormProps) {
    return ( <div className="min-h-[400px] flex items-center justify-center px-4 py-12 bg-black"> <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-8 text-center shadow-2xl sm:p-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    
                {/* Success Icon */}
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]">
                    <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
    
                {/* Status Label */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
                        Submission Successful
                    </span>
                </div>
    
                {/* Title */}
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
                    PO Berhasil
                    <br />
                    <span className="text-gray-400">Dikirim.</span>
                </h2>
    
                {/* Description */}
                <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-gray-400">
                    Terima kasih telah melakukan pemesanan.
                    Langkah terakhir, <span className="font-semibold text-white">wajib konfirmasi PO</span> kamu
                    ke WhatsApp admin kami agar pesanan dapat segera diproses.
                </p>
    
                {/* Divider */}
                <div className="mb-6 h-px mt-3 w-full bg-white/10" />
    
                {/* WhatsApp Confirm Button */}
                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#1ebe5b] active:scale-[0.98]"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Konfirmasi via WhatsApp
                </a>
    
                {/* Action Button */}
                <button
                    onClick={() => setSuccess(false)}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.05] active:scale-[0.98]"
                >
                    Buat PO Lagi
                    <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M5 12h14m-7-7l7 7-7 7"
                        />
                    </svg>
                </button>
    
                {/* Footer */}
                <p className="pt-5 text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    Purchase Order System
                </p>
            </div>
        </div>
    );    
}
    