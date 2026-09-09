import { useEffect, useState } from "react";

interface Collection {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  bahan: string;
  status: number;
  image: string;
  images: string[];
}

interface ArticleModalProps {
  collection: Collection | null;
  onClose: () => void;
}

export function ArticleModal({
  collection,
  onClose,
}: ArticleModalProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Reset carousel setiap kali collection berubah
  useEffect(() => {
    setCurrentImage(0);
  }, [collection]);

  // ESC untuk close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (!collection) return;

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [collection, onClose]);

  // Lock body scroll ketika modal terbuka
  useEffect(() => {
    if (!collection) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [collection]);

  if (!collection) return null;

  const totalImages = collection.images.length;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/90
        p-3
        backdrop-blur-md
        md:p-8
      "
      onClick={onClose}
    >

      {/* MODAL CONTAINER */}

      <div
        className="
          relative flex h-[96vh] w-full max-w-7xl flex-col overflow-hidden
          border border-white/10 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.8)] md:h-[94vh] md:flex-row "
        onClick={(event) => event.stopPropagation()}
      >

        {/* =====================================================
            CLOSE
        ====================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute
            right-5
            top-5
            z-[100]
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/50
            text-lg
            text-white/60
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-white/50
            hover:bg-white
            hover:text-black
          "
        >
          ×
        </button>


        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div
          className=" relative flex h-[48vh] w-full shrink-0 flex-col bg-[#111] sm:h-[52vh] md:h-auto md:w-[60%] "
        >

          {/* MAIN IMAGE */}

          <div
            className="
              relative
              flex-1
              overflow-hidden
              bg-[#151515]
            "
          >

            <img
              key={currentImage}
              src={collection.images[currentImage]}
              alt={`${collection.title} ${currentImage + 1}`}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-contain
                p-6
                transition-opacity
                duration-500
                md:p-14
              "
            />


            {/* IMAGE COUNTER */}

            <div
              className="
                absolute
                left-6
                top-6
                text-[9px]
                tracking-[0.3em]
                text-white/40
              "
            >
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
                className="
                  absolute
                  left-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-black/40
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/50
                  hover:bg-white
                  hover:text-black
                "
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
                className="
                  absolute
                  right-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-black/40
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/50
                  hover:bg-white
                  hover:text-black
                "
              >
                →
              </button>
            )}

          </div>


          {/* =====================================================
              THUMBNAILS
          ====================================================== */}

          <div
            className="
              flex
              gap-2
              overflow-x-auto
              border-t
              border-white/10
              bg-[#0a0a0a]
              p-3
            "
          >

            {collection.images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`
                  relative
                  h-16
                  w-16
                  shrink-0
                  overflow-hidden
                  border
                  transition-all
                  duration-300
                  ${currentImage === index
                    ? "border-white opacity-100"
                    : "border-white/10 opacity-35 hover:opacity-70"
                  }
                `}
              >

                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />

                {currentImage === index && (
                  <div className="
                    absolute
                    inset-0
                    border-2
                    border-white
                  " />
                )}

              </button>
            ))}

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            hidden
            w-[40%]
            flex-col
            justify-between
            border-l
            border-white/10
            bg-[#0b0b0b]
            p-10
            md:flex
            lg:p-14
          "
        >

          <div>

            {/* TOP META */}

            <div
              className="
                mb-12
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  text-[9px]
                  tracking-[0.35em]
                  text-white/30
                "
              >
                COLLECTION {collection.number}
              </span>

              <span
                className="
                  text-[9px]
                  tracking-[0.25em]
                  text-white/30
                "
              >
                2026
              </span>

            </div>


            {/* SUBTITLE */}

            <p
              className="
                mb-3
                text-[9px]
                tracking-[0.3em]
                text-white/40
              "
            >
              {collection.subtitle}
            </p>


            {/* TITLE */}

            <h2
              className="
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
                text-white
                lg:text-7xl
              "
            >
              {collection.title}
            </h2>


            {/* DIVIDER */}

            <div className="
              my-10
              h-px
              w-full
              bg-white/10
            " />


            {/* DESCRIPTION */}

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/45
              "
            >
              {collection.description}
            </p>


            {/* PRODUCT INFO */}

            <div className="mt-12 space-y-5">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >

                <span
                  className="
                    text-[9px]
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  CATEGORY
                </span>

                <span
                  className="
                    text-xs
                    tracking-wider
                    text-white/80
                  "
                >
                  {collection.category}
                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >

                <span
                  className="
                    text-[9px]
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  MATERIAL
                </span>

                <span
                  className="
                    text-xs
                    tracking-wider
                    text-white/80
                  "
                >
                  {collection.bahan}
                </span>

              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >

                <span
                  className="
                    text-[9px]
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  STATUS
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-white/80
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-white
                    "
                  />

                  AVAILABLE

                </span>

              </div>

            </div>

          </div>


          {/* BOTTOM */}

          <div className="py-4">
{/* 
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                text-[9px]
                tracking-[0.25em]
                text-white/30
              "
            >

              <span>
                PRODUCT VIEW
              </span>

              <span>
                {String(currentImage + 1).padStart(2, "0")}
                {" — "}
                {String(totalImages).padStart(2, "0")}
              </span>

            </div> */}


            <button
              type="button"
              onClick={() => {
                window.location.href = "/po";
              }}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                border
                border-white/20
                px-6
                py-4
                text-[9px]
                font-medium
                tracking-[0.25em]
                text-white
                transition-all
                duration-500
                hover:border-white
                hover:bg-white
                hover:text-black
              "
            >

              <span>
                ORDER NOW
              </span>

              <span
                className="
                  text-lg
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE INFO
        ====================================================== */}
        <div className="flex flex-1 min-h-0 flex-col overflow-y-auto bg-[#0b0b0b] p-6 md:hidden">
            <div
              className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
            >
              <span
                className="
                    text-[8px]
                    tracking-[0.3em]
                    text-white/30
                  "
              >
                COLLECTION {collection.number}
              </span>

              <span
                className="
                    text-[8px]
                    tracking-[0.25em]
                    text-white/30
                  "
              >
                2026
              </span>
            </div>

            <p
              className="
                  mb-2
                  text-[8px]
                  tracking-[0.3em]
                  text-white/40
                "
            >
              {collection.subtitle}
            </p>

            <h2
              className="
                  text-4xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  text-white
                  sm:text-5xl
                "
            >
              {collection.title}
            </h2>


            <div className="mb-8">
              <p
                className="
                    mb-2
                    text-[8px]
                    tracking-[0.3em]
                    text-white/30
                  "
              >
                DESCRIPTION
              </p>

              <p
                className="
                    max-w-xl
                    text-sm
                    leading-6
                    text-white/50
                  "
              >
                {collection.description}
              </p>
            </div>

            <div className="space-y-5">

              {/* CATEGORY */}

              <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-6
                    border-b
                    border-white/10
                    pb-4
                  "
              >
                <span
                  className="
                      shrink-0
                      text-[8px]
                      tracking-[0.25em]
                      text-white/30
                    "
                >
                  CATEGORY
                </span>

                <span
                  className="
                      text-right
                      text-[10px]
                      tracking-wider
                      text-white/80
                    "
                >
                  {collection.category}
                </span>
              </div>


              {/* STATUS */}

              <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-6
                    border-b
                    border-white/10
                    pb-4
                  "
              >
                <span
                  className="
                      text-[8px]
                      tracking-[0.25em]
                      text-white/30
                    "
                >
                  STATUS
                </span>

                <span
                  className="
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      text-white/80
                    "
                >
                  <span
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-white
                      "
                  />

                  AVAILABLE
                </span>
              </div>

              {/* MATERIAL */}

              <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-6
                    border-b
                    border-white/10
                    pb-4
                  "
              >
                <span
                  className="
                      text-[8px]
                      tracking-[0.25em]
                      text-white/30
                    "
                >
                  MATERIAL
                </span>

                <span
                  className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        text-white/80
                      "
                >

                  {collection.bahan}
                </span>
              </div>

            </div>


            {/* PRODUCT VIEW */}

            <div className="mt-8 pb-2">

                {/* <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    text-[8px]
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  <span>
                    PRODUCT VIEW
                  </span>

                  <span>
                    {String(currentImage + 1).padStart(2, "0")}
                    {" — "}
                    {String(totalImages).padStart(2, "0")}
                  </span>
                </div> */}

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/po";
                  }}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    border
                    border-white/20
                    px-5
                    py-4
                    text-[8px]
                    font-medium
                    tracking-[0.25em]
                    text-white
                    transition-all
                    duration-500
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <span>
                    ORDER NOW
                  </span>

                  <span
                    className="
                      text-lg
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </button>

              </div>

        </div>

      </div>
    </div>
  );
}