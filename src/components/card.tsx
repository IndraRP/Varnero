import { CometCard } from "./ui/comet-card";

const collections = [
  {
    number: "01",
    title: "ESSENTIALS",
    subtitle: "THE EVERYDAY UNIFORM",
    description: "Built for the ones who move differently.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "AFTER DARK",
    subtitle: "NIGHT / CITY / MOVEMENT",
    description: "A darker expression of the VARNERO identity.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
  },
];

export function CometCardDemo() {
  return (
    <section className="px-6 py-24 text-white md:px-10 md:py-32" id="collections">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-white/40" />

              <span className="text-[9px] font-medium tracking-[0.3em] text-white/40">
                03 / COLLECTION
              </span>
            </div>

            <h2 className="text-5xl font-medium tracking-[-0.07em] md:text-7xl">
              THE DROP.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-white/40">
            A collection built around movement, individuality and
            understated expression.
          </p>
        </div>


        {/* COLLECTION CARDS */}
        <div className="grid gap-5 md:grid-cols-2">

          {collections.map((collection) => (
            <CometCard key={collection.number}>

              <button
                type="button"
                className="
                  group
                  relative
                  flex
                  w-full
                  cursor-pointer
                  flex-col
                  overflow-hidden
                  rounded-[0px]
                  border
                  border-white/10
                  bg-[#151515]
                  p-2
                  text-left
                  transition-colors
                  duration-500
                  hover:border-white/20
                "
                aria-label={`View ${collection.title} collection`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "none",
                  opacity: 1,
                }}
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0px]">

                  <img
                    loading="lazy"
                    src={collection.image}
                    alt={collection.title}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      grayscale
                      contrast-90
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.04]
                    "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.2) 0px 10px 30px",
                    }}
                  />

                  {/* DARK OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/10
                      to-transparent
                    "
                  />

                  {/* TOP NUMBER */}
                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      text-[9px]
                      tracking-[0.3em]
                      text-white/50
                    "
                  >
                    {collection.number}
                  </div>


                  {/* VIEW */}
                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      group-hover:border-white/50
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <span className="text-sm transition-transform duration-500 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </div>


                  {/* IMAGE TEXT */}
                  <div className="absolute bottom-6 left-6 right-6">

                    <p className="mb-2 text-[9px] tracking-[0.25em] text-white/50">
                      {collection.subtitle}
                    </p>

                    <h3
                      className="
                        text-4xl
                        font-medium
                        tracking-[-0.06em]
                        text-white
                        md:text-5xl
                      "
                    >
                      {collection.title}
                    </h3>

                  </div>

                </div>


                {/* CARD FOOTER */}
                <div className="flex items-center justify-between px-3 py-4">

                  <p className="max-w-[260px] text-xs leading-relaxed text-white/40">
                    {collection.description}
                  </p>

                  <span
                    className="
                      shrink-0
                      text-[9px]
                      font-medium
                      tracking-[0.2em]
                      text-white/50
                      transition-colors
                      group-hover:text-white
                    "
                  >
                    EXPLORE →
                  </span>

                </div>

              </button>

            </CometCard>
          ))}

        </div>

      </div>
    </section>
  );
}