interface CustomerFormProps {
  nama: string;
  setNama: React.Dispatch<React.SetStateAction<string>>;
  nohp: string;
  setNoHp: React.Dispatch<React.SetStateAction<string>>;
  partner: string;
  setPartner: React.Dispatch<React.SetStateAction<string>>;
  alamat: string;
  setAlamat: React.Dispatch<React.SetStateAction<string>>;
  kota: string;
  setKota: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomerForm({ nama, setNama, setNoHp, nohp, setPartner, partner, setAlamat, alamat, setKota, kota }: CustomerFormProps) {
    return (
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


          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
              WhatsApp
            </label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-white/30">
                +62
              </span>
              <input
                type="number"
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
    );
}