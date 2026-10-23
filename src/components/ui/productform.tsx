interface ProductFormProps {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductForm({ setSize, size, setQty, qty }: ProductFormProps) {
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
    );
}