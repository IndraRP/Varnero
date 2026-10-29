interface ProductFormProps {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  warna: string;
  setWarna: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductForm({ setSize, size, setWarna, warna }: ProductFormProps) {
    return (
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

                 <div>
                   <label className="block text-[11px] uppercase tracking-[0.18em] text-white/70 mb-4">
                     Select Color
                   </label>

                   <div className="flex flex-wrap gap-2 justify-center">
                     {[
                       { label: "Putih", dotClass: "bg-white border-black/20" },
                       { label: "Hitam", dotClass: "bg-black border-white/40" },
                     ].map((item) => (
                       <button
                         key={item.label}
                         type="button"
                         onClick={() => setWarna(item.label)}
                         className={`
                           flex
                           items-center
                           gap-2.5
                           h-12
                           px-5
                           rounded-full
                           text-xs
                           font-medium
                           border
                           transition-all
                           ${
                             warna === item.label
                               ? "bg-white text-black border-white"
                               : "bg-transparent text-white/50 border-white/[0.12] hover:border-white/40 hover:text-white"
                           }
                         `}
                       >
                         <span
                           className={`w-3 h-3 rounded-full border ${item.dotClass}`}
                         />
                         {item.label}
                       </button>
                     ))}
                   </div>
                 </div>
     
               </div>
             </div>
    );
}
