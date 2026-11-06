import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collections } from "../card";

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const collection =
    collections.find((item) => item.number === id) ?? collections[0];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImage(0);
  }, [id]);

  useEffect(() => {
    if (!collection) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentImage((prev) =>
          prev === collection.images.length - 1 ? 0 : prev + 1
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentImage((prev) =>
          prev === 0 ? collection.images.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [collection]);

  if (!collection) return null;

  const totalImages = collection.images.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* TOP BAR / BACK NAVIGATION */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md md:px-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
            ←
          </span>
          <span>Back to Collection</span>
        </button>

        <span className="text-[10px] font-mono tracking-[0.3em] text-white/40">
          VARNERO / {collection.number}
        </span>
      </header>

      {/* MAIN PAGE CONTENT */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row md:py-10 md:px-6 lg:px-10">
        <div className="flex w-full flex-col overflow-hidden border-b border-white/10 bg-[#0a0a0a] md:border md:flex-row">
          {/* LEFT SIDE: GALLERY */}
          <div className="relative flex h-[52vh] w-full shrink-0 flex-col bg-[#111] sm:h-[60vh] md:h-[80vh] md:w-[60%]">
            <div className="relative flex-1 overflow-hidden bg-[#151515]">
              <img
                key={currentImage}
                src={collection.images[currentImage]}
                alt={`${collection.title} ${currentImage + 1}`}
                className="absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500 md:p-14"
              />

              {/* IMAGE COUNTER */}
              <div className="absolute left-6 top-6 text-[9px] tracking-[0.3em] text-white/40">
                {String(currentImage + 1).padStart(2, "0")}
                {" / "}
                {String(totalImages).padStart(2, "0")}
              </div>

              {/* PREVIOUS */}
              {totalImages > 1 && (
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === 0 ? totalImages - 1 : prev - 1
                    )
                  }
                  className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-black"
                >
                  ←
                </button>
              )}

              {/* NEXT */}
              {totalImages > 1 && (
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === totalImages - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-black"
                >
                  →
                </button>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#0a0a0a] p-3">
              {collection.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden border transition-all duration-300 ${
                    currentImage === index
                      ? "border-white opacity-100"
                      : "border-white/10 opacity-35 hover:opacity-70"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  {currentImage === index && (
                    <div className="absolute inset-0 border-2 border-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: DETAILS (DESKTOP & MOBILE UNIFIED) */}
          <div className="flex flex-1 flex-col justify-between border-t border-white/10 bg-[#0b0b0b] p-6 sm:p-10 md:w-[40%] md:border-l md:border-t-0 lg:p-14">
            <div>
              {/* TOP META */}
              <div className="mb-8 flex items-center justify-between md:mb-12">
                <span className="text-[9px] tracking-[0.35em] text-white/30">
                  COLLECTION {collection.number}
                </span>

                <span className="text-[9px] tracking-[0.25em] text-white/30">
                  2026
                </span>
              </div>

              {/* SUBTITLE */}
              <p className="mb-3 text-[9px] tracking-[0.3em] text-white/40">
                {collection.subtitle}
              </p>

              {/* TITLE */}
              <h1 className="text-4xl font-medium leading-[0.9] tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                {collection.title}
              </h1>

              {/* DIVIDER */}
              <div className="my-8 h-px w-full bg-white/10 md:my-10" />

              {/* DESCRIPTION */}
              <p className="max-w-md text-sm leading-7 text-white/45">
                {collection.description}
              </p>

              {/* PRODUCT INFO */}
              <div className="mt-10 space-y-5 md:mt-12">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[9px] tracking-[0.25em] text-white/30">
                    CATEGORY
                  </span>

                  <span className="text-xs tracking-wider text-white/80">
                    {collection.category}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[9px] tracking-[0.25em] text-white/30">
                    MATERIAL
                  </span>

                  <span className="text-xs tracking-wider text-white/80">
                    {collection.bahan}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[9px] tracking-[0.25em] text-white/30">
                    STATUS
                  </span>

                  <span className="flex items-center gap-2 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER NOW BUTTON */}
            <div className="mt-10 pt-4">
              <button
                type="button"
                onClick={() => navigate("/po")}
                className="group flex w-full items-center justify-between border border-white/20 px-6 py-4 text-[9px] font-medium tracking-[0.25em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
              >
                <span>ORDER NOW</span>

                <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
