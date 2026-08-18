import { useEffect, useState } from "react";
import SocialModal from "@/components/modals";

const MENU = [
  { label: "ABOUT", href: "#about" },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "SOCIAL MEDIA", href: "" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-all duration-500
          ${
            scrolled
              ? "bg-black/90 backdrop-blur-md py-4"
              : "bg-transparent py-7"
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">

          {/* LOGO */}
          <a
            href="#"
            className="group relative z-50 text-2xl font-black tracking-[-0.08em] text-white"
          >
            VARNERO
            <span
              className="
                absolute -bottom-1 left-0 h-[1px] w-0
                bg-white transition-all duration-300
                group-hover:w-full
              "
            />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-10 md:flex">
            {MENU.map((item) => {
              const isSocial = item.label === "SOCIAL MEDIA";

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (isSocial) {
                      setSocialOpen(true);
                    } else {
                      window.location.href = item.href;
                    }
                  }}
                  className="
                    group
                    relative
                    text-[11px]
                    font-medium
                    tracking-[0.2em]
                    text-white/80
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {item.label}

                  <span
                    className="
                      absolute
                      -bottom-2
                      left-0
                      h-[1px]
                      w-0
                      bg-white
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </button>
              );
            })}
          </div>
                    
          {/* RIGHT */}
          <div className="hidden items-center gap-8 md:flex">

              {/* <button
                className="
                  text-[11px] tracking-[0.2em]
                  text-white/80 transition
                  hover:text-white
                "
              >
                SEARCH
              </button> */}

            <a href="https://shopee.co.id/shop/597783876" target="_blank">
              <button
                className="
                  text-[11px] tracking-[0.2em]
                  text-white/80 transition
                  hover:text-white
                "
              >
                GET YOURS
              </button>
            </a>

            {/* <button
              className="
                flex items-center gap-2
                text-[11px] tracking-[0.2em]
                text-white/80 transition
                hover:text-white
              "
            >
              CART
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/30 px-1 text-[9px]">
                0
              </span>
            </button> */}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <span
              className={`
                block h-[1px] bg-white transition-all duration-300
                ${menuOpen ? "w-6 translate-y-[4px] rotate-45" : "w-6"}
              `}
            />

            <span
              className={`
                block h-[1px] bg-white transition-all duration-300
                ${menuOpen ? "w-6 -translate-y-[1px] -rotate-45" : "w-4"}
              `}
            />
          </button>
        </div>
      </nav>

      <SocialModal
        isOpen={socialOpen}
        onClose={() => setSocialOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-40 bg-black
          transition-all duration-500
          md:hidden
          ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      >
        <div className="flex h-full flex-col justify-center px-8">

          <p className="mb-8 text-[10px] tracking-[0.3em] text-white/40">
            VARNERO / MENU
          </p>

          <div className="flex flex-col">
            {MENU.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  group flex items-center
                  border-b border-white/10
                  py-5
                "
              >
                <span className="
                  mr-5 text-xs text-white/30
                ">
                  0{index + 1}
                </span>

                <span className="
                  text-4xl font-medium
                  tracking-[-0.05em] text-white
                  transition-transform duration-300
                  group-hover:translate-x-3
                ">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10 flex gap-6 text-[10px] tracking-[0.2em] text-white/40">
            <a href="https://www.instagram.com/varnero_/"><span>INSTAGRAM</span></a>
            <a href="https://tiktok.com"><span>TIKTOK</span></a>
            <a href="https://shopee.co.id/shop/597783876"><span>SHOPEE</span></a>
            <a href="https://wa.me/6282131211769"><span>CONTACT</span></a>
          </div>

        </div>
      </div>
    </>
  );
}