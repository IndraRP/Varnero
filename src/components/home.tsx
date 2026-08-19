import { useEffect, useState } from "react";
import heroImage from "@/assets/hero.png";

export default function Home() {
  const [, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#0b0b0b] text-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">

        {/* IMAGE */}
        <div className="absolute inset-0">

          <img
            src={heroImage}
            alt="VARNERO campaign"
            className="
              h-full w-full
              object-cover
              object-center
              grayscale
              mt-20
            "
          />

          {/* DARK OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-black/35
            "
          />

          {/* LEFT GRADIENT */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-black/80
              via-black/30
              to-transparent
            "
          />

          {/* BOTTOM GRADIENT */}
          <div
            className="
              absolute inset-x-0 bottom-0
              h-1/2
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />

        </div>


        {/* HERO CONTENT */}
        <div
          className="
            relative z-10
            flex min-h-screen
            items-end
          "
        >

          <div
            className="
              mx-auto w-full
              max-w-[1500px]
              px-6 pb-14
              md:px-10 md:pb-20
            "
          >

            {/* TOP LABEL */}
            <div className="mb-8 flex items-center gap-4">

              <span className="text-[9px] tracking-[0.3em] text-white/50">
                01
              </span>

              <span className="h-px w-12 bg-white/30" />

              <span className="text-[9px] tracking-[0.3em] text-white/50">
                NEW COLLECTION — 2026
              </span>

            </div>


            {/* TITLE */}
            <h1
              className="
                max-w-4xl
                font-[Space_Grotesk]
                text-[clamp(4rem,10vw,10rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.08em]
              "
            >
              NOT MADE
              <br />
              TO FIT IN.
            </h1>


            {/* BOTTOM CONTENT */}
            <div
              className="
                mt-10
                flex flex-col
                gap-8
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <p
                className="
                  max-w-sm
                  text-sm
                  leading-relaxed
                  text-white/50
                "
              >
                VARNERO explores the space between
                individuality, movement and everyday
                expression.
              </p>


              <a
                href="#collections"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  gap-6
                  border-b
                  border-white/40
                  pb-3
                  text-[10px]
                  font-medium
                  tracking-[0.25em]
                  transition
                  hover:border-white
                "
              >
                EXPLORE COLLECTION

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-2
                  "
                >
                  →
                </span>
              </a>

            </div>

          </div>

        </div>


        {/* SIDE LABEL */}
        <div
          className="
            absolute
            right-6
            top-1/2
            hidden
            -translate-y-1/2
            [writing-mode:vertical-rl]
            md:block
          "
        >
          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-white/40
            "
          >
            VARNERO / PRATAMA GROUP
          </span>
        </div>

      </section>

    </main>
  );
}