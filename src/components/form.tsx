import { useState } from "react";
import { submitPO } from "../services/poService";
import ProofOfOrder from './ui/proofoforder';
import ProductForm from './ui/productform';
import CustomerForm from './ui/customerform';
import { partnerCodes } from './partnercode';
import SuccessForm from './ui/successform';

export default function POForm() {

  const [nama, setNama] = useState("");
  const [nohp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [partner, setPartner] = useState("");
  const [size, setSize] = useState("");
  const [kota, setKota] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [status, setStatus] = useState<string>("DP");
  const [file, setFile] = useState<File | null>(null);

  const [uploadType, setUploadType] = useState('file');
  const [fileLink, setFileLink] = useState('');

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!nama || !nohp || !alamat || !kota || !partner || !size || !qty || !file) {
      alert("Ada Field yang Belum Diisi!!!");
      return;
    }

    const isValidPartner = partnerCodes.includes(partner);

    if (!isValidPartner) {
        alert("Kode partner tidak valid atau tidak terdaftar!");
        return;
    }

    try {
      setLoading(true);
      const result = await submitPO({
        nama,
        nohp,
        alamat,
        partner,
        size,
        qty,
        kota,
        status,
        file
      });

      setWaUrl(result.waUrl);
      setSuccess(true);

      setNama("");
      setNoHp("");
      setKota("");
      setAlamat("");
      setPartner("");
      setSize("");
      setQty(1);
      setFile(null);
      setStatus("DP");
      setStep(1);

    } catch (error) {
        console.error("Detail Error:", error);
        alert("Gagal mengirim PO: " + (error instanceof Error ? error.message : String(error))); 
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <SuccessForm 
        setSuccess={setSuccess}
        waUrl={waUrl}
      />
    );
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="w-full max-w-6xl mx-auto text-white"
>
  <div className="grid lg:grid-cols-[1fr_360px] gap-6">

    {/* FORM */}
    <div className="relative overflow-hidden mt-6">

      <div className="absolute -top-32 -right-32 w-72 h-72 bg-white/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative p-6 sm:p-8 md:p-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-white" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
              Varnero / Order
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">
            Purchase Order<span className="text-white/30">.</span>
          </h1>
          <div className="flex justify-center">
            <p className="mt-3 text-sm text-white/40 max-w-md leading-relaxed">
            {step === 1 
                ? "Isi detail informasi customer dan produk pesanan kamu." 
                : "Unggah bukti pembayaran atau tautan file PO kamu."}
            </p>
          </div>
        </div>

        {/* STEP 1: Customer & Product Form */}
        {step === 1 && (
            <div className="space-y-6">
              <CustomerForm 
                nama={nama}
                setNama={setNama}
                setNoHp={setNoHp}
                nohp={nohp}
                setPartner={setPartner}
                partner={partner}
                setAlamat={setAlamat}
                alamat={alamat}
                setKota={setKota}
                kota={kota}
              />

              <ProductForm 
                size={size} 
                setSize={setSize}
                qty={qty}
                setQty={setQty}
              />

              {/* Tombol Lanjut ke Step 2 */}
              <button
                type="button"
                onClick={() => {
                  if (!nama || !nohp || !alamat) {
                    alert("Harap lengkapi data customer terlebih dahulu!");
                    return;
                  }
                  setStep(2);
                }}
                className="
                  group
                  relative
                  w-full
                  h-16
                  overflow-hidden
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  text-sm
                  transition-all
                  hover:bg-white/90
                  active:scale-[0.99]
                  mt-6
                "
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Lanjut ke Upload Bukti
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </div>
        )}

        {/* STEP 2: Proof of Order & Submit */}
        {step === 2 && (
          <div className="space-y-6">
            <ProofOfOrder 
              file={file} 
              setFile={setFile} 
              status={status}
              setStatus={setStatus}
              uploadType={uploadType} 
              setUploadType={setUploadType} 
              fileLink={fileLink} 
              setFileLink={setFileLink} 
            />

            <div className="flex gap-4 mt-6">
              {/* Tombol Kembali ke Step 1 */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="
                  w-1/3
                  h-16
                  rounded-full
                  border
                  border-white/[0.15]
                  bg-transparent
                  text-white
                  font-semibold
                  text-sm
                  transition-all
                  hover:bg-white/[0.05]
                  hover:border-white/30
                "
              >
                ← Kembali
              </button>

              {/* Tombol Submit Akhir */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  relative
                  w-2/3
                  h-16
                  overflow-hidden
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  text-sm
                  transition-all
                  hover:bg-white/90
                  active:scale-[0.99]
                  disabled:opacity-40
                "
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "Mengirim..." : "Submit Purchase Order"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* =========================
        ORDER SUMMARY
    ========================== */}
    <div className="lg:sticky lg:top-16 h-fit mt-0 lg:mt-16">

      <div className="rounded-[0px] bg-white text-black p-7 md:p-8 m-5 md:m-0">

        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-2">
              Order Summary
            </p>

            <p className="text-2xl font-bold tracking-tight text-black/70 mt-2">
              Your Order
            </p>
          </div>

          <span className="text-xs font-mono text-black/30">
            #PO
          </span>
        </div>


        {/* PRODUCT PREVIEW */}
        <div className="rounded-2xl bg-black text-white p-5 mb-6">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-semibold text-lg text-left">
                First Blood
              </h3>

              <p className="text-xs text-white/40 mt-1">
                Longsleeve Boxy
              </p>
            </div>

            <span className="text-xs text-white/40">
              {size || "—"}
            </span>

          </div>


          <div className="mt-8 pt-4 border-t border-white/10 flex justify-between text-xs">

            <span className="text-white/40">
              Quantity
            </span>

            <span className="font-semibold">
              {qty} pcs
            </span>

          </div>

        </div>


        {/* CUSTOMER SUMMARY */}
        <div className="space-y-4">

          <div className="flex justify-between gap-4">
            <span className="text-xs text-black/40">
              Customer
            </span>

            <span className="text-xs font-medium text-right">
              {nama || "—"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-xs text-black/40">
              WhatsApp
            </span>

            <span className="text-xs font-medium">
              {nohp || "—"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-xs text-black/40">
              Partner
            </span>

            <span className="text-xs font-medium">
              {partner || "—"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-xs text-black/40">
              Delivery
            </span>

            <span className="text-xs font-medium text-right max-w-[160px]">
              {alamat || "—"}
            </span>
          </div>

        </div>


        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-black/10">

          <p className="text-[10px] leading-relaxed text-black/40">
            Dengan melakukan submit, kamu memastikan bahwa
            informasi order yang diberikan sudah benar.
          </p>

        </div>

      </div>

    </div>

  </div>
</form>
  );
}