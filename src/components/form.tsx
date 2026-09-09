import { useState } from "react";
import { submitPO } from "../services/poService";

export default function POForm() {

  const [nama, setNama] = useState("");
  const [nohp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [partner, setPartner] = useState("");
  const [size, setSize] = useState("");
  const [kota, setKota] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!nama || !nohp || !alamat || !kota || !partner || !size || !qty || !file) {
      alert("Ada Field yang Wajib Diisi!!!");
      return;
    }

    try {
      setLoading(true);
      await submitPO({
        nama,
        nohp,
        alamat,
        partner,
        size,
        qty,
        kota,
        file
      });

      setSuccess(true);

      setNama("");
      setNoHp("");
      setKota("");
      setAlamat("");
      setPartner("");
      setSize("");
      setQty(1);
      setFile(null);

    } catch (error) {

      console.error(error);

      alert("Gagal mengirim PO");

    } finally {

      setLoading(false);

    }
  }

  if (success) {
    return (
      <div>
        <h2>PO Berhasil Dikirim</h2>

        <p>
          Terima kasih. PO Anda sudah diterima.
        </p>

        <button
          onClick={() => setSuccess(false)}
        >
          Buat PO Lagi
        </button>
      </div>
    );
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="w-full max-w-6xl mx-auto text-white"
>
  <div className="grid lg:grid-cols-[1fr_360px] gap-6">

    {/* =========================
        MAIN FORM
    ========================== */}
    <div className="relative overflow-hidden mt-6">

      {/* subtle glow */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-white/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative p-6 sm:p-8 md:p-10">

        {/* HEADER */}
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
                Isi detail pesanan kamu. Pastikan informasi yang diberikan
                sudah sesuai sebelum melakukan submit.
            </p>
          </div>
        </div>


        {/* =========================
            CUSTOMER
        ========================== */}
        <div className="mb-10">

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] text-white/30 font-mono">
              01
            </span>

            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Customer
            </h2>

            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>


          <div className="grid sm:grid-cols-2 gap-x-5 gap-y-6">

            {/* Nama */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Indra"
                className="
                  w-full
                  h-14
                  px-0
                  bg-transparent
                  border-0
                  border-b
                  border-white/[0.15]
                  rounded-none
                  text-base
                  text-white
                  placeholder:text-white/20
                  outline-none
                  transition-all
                  focus:border-white
                "
              />
            </div>


            {/* WhatsApp */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                WhatsApp
              </label>

              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-white/30">
                  +62
                </span>

                <input
                  type="tel"
                  value={nohp}
                  onChange={(e) => setNoHp(e.target.value)}
                  placeholder="8123456789"
                  className="
                    w-full
                    h-14
                    pl-9
                    pr-0
                    bg-transparent
                    border-0
                    border-b
                    border-white/[0.15]
                    rounded-none
                    text-base
                    text-white
                    placeholder:text-white/20
                    outline-none
                    focus:border-white
                    transition-all
                  "
                />
              </div>
            </div>


            {/* Partner */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                Kode Partner / Affiliator
              </label>

              <input
                type="text"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                placeholder="1N6R4"
                className="
                  w-full
                  h-14
                  px-0
                  bg-transparent
                  border-0
                  border-b
                  border-white/[0.15]
                  rounded-none
                  text-base
                  text-white
                  placeholder:text-white/20
                  outline-none
                  focus:border-white
                  transition-all
                "
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                Alamat Pengiriman
              </label>

              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Jalan Danau Ranau, Sawojajar, Malang"
                rows={2}
                className="
                  w-full
                  px-0
                  py-3
                  bg-transparent
                  border-0
                  border-b
                  border-white/[0.15]
                  rounded-none
                  text-base
                  text-white
                  placeholder:text-white/20
                  outline-none
                  resize-none
                  focus:border-white
                  transition-all
                "
              />
            </div>

            {/* Alamat */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                Kota Pengiriman
              </label>

              <textarea
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                placeholder="Malang"
                rows={2}
                className="
                  w-full
                  px-0
                  py-3
                  bg-transparent
                  border-0
                  border-b
                  border-white/[0.15]
                  rounded-none
                  text-base
                  text-white
                  placeholder:text-white/20
                  outline-none
                  resize-none
                  focus:border-white
                  transition-all
                "
              />
            </div>

          </div>
        </div>


        {/* =========================
            PRODUCT
        ========================== */}
        <div className="mb-10">

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] text-white/30 font-mono">
              02
            </span>

            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Product
            </h2>

            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>


          <div className="grid sm:grid-cols-2 gap-8">

            {/* SIZE */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-4">
                Select Size
              </label>

              <div className="flex flex-wrap gap-2">

                {["S", "M", "L", "XL", "XXL"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`
                      min-w-[52px]
                      h-12
                      px-4
                      rounded-full
                      text-xs
                      font-medium
                      border
                      transition-all
                      ${
                        size === item
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-white/50 border-white/[0.12] hover:border-white/40 hover:text-white"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}

              </div>
            </div>


            {/* QTY */}
            <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-4">
                    Quantity
                </label>

                <div className="w-full">
                    <div className="flex items-center justify-between w-full h-14 rounded-full border border-white/[0.12] bg-white/[0.03] px-2">
                        <button
                            type="button"
                            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                            className="
                            w-10 h-10
                            rounded-full
                            flex items-center justify-center
                            text-white/50
                            hover:bg-white
                            hover:text-black
                            transition-all
                            "
                        >
                            −
                        </button>

                        <span className="text-sm font-semibold">
                            {qty}
                        </span>

                        <button
                            type="button"
                            onClick={() => setQty((prev) => prev + 1)}
                            className="
                            w-10 h-10
                            rounded-full
                            flex items-center justify-center
                            text-white/50
                            hover:bg-white
                            hover:text-black
                            transition-all
                            "
                        >
                            +
                        </button>
                    </div>
                </div>
                </div>

          </div>
        </div>


        {/* =========================
            UPLOAD
        ========================== */}
        <div className="mb-10">

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] text-white/30 font-mono">
              03
            </span>

            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Proof of Order
            </h2>

            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>


          <label
            className="
              group
              relative
              flex
              flex-col
              items-center
              justify-center
              min-h-[170px]
              rounded-2xl
              border
              border-dashed
              border-white/[0.15]
              bg-white/[0.025]
              cursor-pointer
              overflow-hidden
              transition-all
              hover:bg-white/[0.05]
              hover:border-white/30
            "
          >

            <div
              className="
                w-12 h-12
                rounded-full
                border border-white/[0.12]
                flex items-center justify-center
                mb-4
                group-hover:bg-white
                group-hover:text-black
                transition-all
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
            </div>


            <span className="text-sm font-medium">
              {file
                ? file.name
                : "Upload bukti PO"}
            </span>

            <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-2">
              JPG / PNG / PDF
            </span>


            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => {
                const selectedFile =
                  e.target.files?.[0] ?? null;

                setFile(selectedFile);
              }}
            />

          </label>
        </div>


        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
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
            disabled:opacity-40
          "
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? "Mengirim..." : "Submit Purchase Order"}

            {!loading && (
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </span>
        </button>

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