import { useState } from "react";
import { submitPO } from "../services/poService";
import ProofOfOrder from './ui/proofoforder';
import ProductForm from './ui/productform';
import CustomerForm from './ui/customerform';
import { partnerCodes } from './partnercode';
import SuccessForm from './ui/successform';

interface AlertState {
  open: boolean;
  title: string;
  message: string;
  missingFields?: string[];
  targetStep?: number;
}

export default function POForm() {

  const [nama, setNama] = useState("");
  const [nohp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [partner, setPartner] = useState("");
  const [size, setSize] = useState("");
  const [warna, setWarna] = useState("");
  const [kota, setKota] = useState("");
  const [status, setStatus] = useState<string>("DP");
  const [file, setFile] = useState<File | null>(null);

  const [uploadType, setUploadType] = useState('file');
  const [fileLink, setFileLink] = useState('');

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const [alertModal, setAlertModal] = useState<AlertState>({
    open: false,
    title: "",
    message: "",
    missingFields: [],
  });

  function showAlert(
    title: string,
    message: string,
    missingFields: string[] = [],
    targetStep?: number
  ) {
    setAlertModal({
      open: true,
      title,
      message,
      missingFields,
      targetStep,
    });
  }

  function closeAlert() {
    const nextStep = alertModal.targetStep;
    setAlertModal((prev) => ({ ...prev, open: false }));
    if (nextStep) {
      setStep(nextStep);
    }
  }

  function getMissingStep1Fields() {
    const missing: string[] = [];
    if (!nama.trim()) missing.push("Nama Lengkap");
    if (!nohp.trim()) missing.push("Nomor WhatsApp");
    if (!partner.trim()) missing.push("Kode Partner / Affiliator");
    if (!alamat.trim()) missing.push("Alamat Pengiriman");
    if (!kota.trim()) missing.push("Kota Pengiriman");
    if (!size) missing.push("Ukuran Produk (Size)");
    if (!warna) missing.push("Warna Produk");
    return missing;
  }

  function handleNextStep() {
    const missingStep1 = getMissingStep1Fields();

    if (missingStep1.length > 0) {
      showAlert(
        "Data Belum Lengkap",
        "Mohon lengkapi bagian berikut sebelum lanjut ke pembayaran:",
        missingStep1
      );
      return;
    }

    if (!partnerCodes.includes(partner.trim())) {
      showAlert(
        "Kode Partner Tidak Valid",
        `Kode "${partner}" tidak terdaftar. Pastikan huruf besar/kecil sudah sesuai.`
      );
      return;
    }

    setStep(2);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    const missingStep1 = getMissingStep1Fields();
    const missingAll = [...missingStep1];
    if (!file) {
      missingAll.push("Bukti Pembayaran (Upload File)");
    }

    if (missingAll.length > 0) {
      showAlert(
        "Field Belum Diisi",
        "Mohon lengkapi data berikut sebelum mengirim Purchase Order:",
        missingAll,
        missingStep1.length > 0 ? 1 : undefined
      );
      return;
    }

    const isValidPartner = partnerCodes.includes(partner.trim());

    if (!isValidPartner) {
      showAlert(
        "Kode Partner Tidak Valid",
        `Kode "${partner}" tidak terdaftar di sistem kami.`,
        [],
        1
      );
      return;
    }

    try {
      setLoading(true);
      const result = await submitPO({
        nama,
        nohp,
        alamat,
        partner: partner.trim(),
        size,
        warna,
        kota,
        status,
        file: file as File
      });

      setWaUrl(result.waUrl);
      setSuccess(true);

      setNama("");
      setNoHp("");
      setKota("");
      setAlamat("");
      setPartner("");
      setSize("");
      setWarna("");
      setFile(null);
      setStatus("DP");
      setStep(1);

    } catch (error) {
      console.error("Detail Error:", error);
      showAlert(
        "Gagal Mengirim PO",
        error instanceof Error ? error.message : String(error)
      );
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
    <>
      {/* CUSTOM DARK & WHITE ALERT MODAL */}
      {alertModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fadeIn"
          onClick={closeAlert}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b] p-6 sm:p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top White Accent Line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Header Badge & Icon */}
            <div className="flex items-center justify-between mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">
                  Varnero Alert
                </span>
              </div>

              <button
                type="button"
                onClick={closeAlert}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:bg-white hover:text-black"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white pb-2">
              {alertModal.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-white/60 pb-5">
              {alertModal.message}
            </p>

            {/* Missing Fields List (White Secondary Box) */}
            {alertModal.missingFields && alertModal.missingFields.length > 0 && (
              <div className="mb-6 rounded-xl border border-white/15 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 pb-3">
                  Belum Diisi ({alertModal.missingFields.length})
                </p>
                <ul className="space-y-2">
                  {alertModal.missingFields.map((field) => (
                    <li
                      key={field}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                        !
                      </span>
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* White Secondary Action Button */}
            <button
              type="button"
              onClick={closeAlert}
              className="w-full h-12 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Mengerti & Lengkapi
            </button>
          </div>
        </div>
      )}

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
                      warna={warna}
                      setWarna={setWarna}
                    />

                    {/* Tombol Lanjut ke Step 2 */}
                    <button
                      type="button"
                      onClick={handleNextStep}
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
                    {size ? `${size}${warna ? ` / ${warna}` : ""}` : (warna || "—")}
                  </span>

                </div>


                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between text-xs">

                  <span className="text-white/40">
                    Quantity
                  </span>

                  <span className="font-semibold">
                    1 pcs
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
    </>
  );
}
