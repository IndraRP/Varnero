import { motion, useScroll, useTransform , AnimatePresence} from "motion/react";
import { useRef, useEffect, useState  } from "react";
import Image1 from "@/assets/image2.jpg";
import Image2 from "@/assets/image3.jpg";
import Image3 from "@/assets/image4.jpg";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const images = [Image1, Image2, Image3];

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // ganti setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
      id="about"
    >

      <div className="mx-auto max-w-[1500px] px-6 pt-16 md:px-10 md:pt-32">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-white/40" />

            <span className="text-[9px] tracking-[0.35em] text-white/40">
              02 — ABOUT
            </span>
          </div>

          <span className="hidden text-[9px] tracking-[0.3em] text-white/30 md:block">
            VARNERO / 2026
          </span>
        </motion.div>

      </div>

      <div className="mx-auto mt-8 w-full max-w-[1500px] px-4 sm:mt-10 sm:px-6 md:mt-20 md:px-10">
        <div
          className="
            relative
            h-[55vh]
            min-h-[400px]
            w-full
            overflow-hidden

            sm:h-[60vh]
            sm:min-h-[450px]

            md:h-[70vh]
            md:min-h-[500px]
          "
        >
          {/* IMAGE */}
          <AnimatePresence mode="wait">
  <motion.div
    key={currentImage}
    initial={{
      opacity: 0,
      scale: 1.05,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 1.02,
    }}
    transition={{
      duration: 0.8,
      ease: "easeInOut",
    }}
    style={{
      y: imageY,
      scale: imageScale,
    }}
    className="absolute inset-[-8%]"
  >
    <img
      src={images[currentImage]}
      alt={`VARNERO campaign ${currentImage + 1}`}
      className="
        h-full
        w-full
        object-cover
        object-center
        grayscale
      "
    />
  </motion.div>
</AnimatePresence>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/35" />

          {/* IMAGE TEXT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              absolute
              bottom-5
              left-5
              right-5

              sm:bottom-6
              sm:left-6

              md:bottom-10
              md:left-10
              md:right-auto
            "
          >
            <p
              className="
                text-[7px]
                font-medium
                leading-none
                tracking-[0.2em]
                text-white/60
                whitespace-nowrap

                sm:text-[8px]
                sm:tracking-[0.3em]

                md:text-[9px]
                md:tracking-[0.4em]
              "
            >
              VARNERO CAMPAIGN / 001
            </p>
          </motion.div>

          {/* CORNER NUMBER */}
          <div
            className="
              absolute
              right-5
              top-5

              text-[7px]
              tracking-[0.2em]
              text-white/40

              sm:right-6
              sm:top-6
              sm:text-[8px]

              md:right-12
              md:top-12
              md:text-[9px]
              md:tracking-[0.3em]
            "
          >
            01 / 01
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 py-32 md:px-10 md:py-48">

        <div className="grid gap-16 md:grid-cols-12">

          {/* LABEL */}

          <div className="md:col-span-3">

            <span className="text-[9px] tracking-[0.35em] text-white/30">
              OUR PHILOSOPHY
            </span>

          </div>


          {/* TEXT */}

          <div className="md:col-span-8 md:col-start-5">

            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
              }}
              className="
                text-[clamp(2rem,4vw,4.5rem)]
                font-light
                leading-[1.05]
                tracking-[-0.05em]
                text-white/70
              "
            >
              We don't make clothes to tell you{" "}
              <MagneticWord>who</MagneticWord>{" "}
              to be.

              <br />

              We make them for the{" "}
              <MagneticWord>version</MagneticWord>{" "}
              of you that refuses to{" "}
              <MagneticWord>blend in.</MagneticWord>
            </motion.p>

          </div>

        </div>

      </div>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <div className="border-y border-white/10">

        <div className="mx-auto grid max-w-[1500px] md:grid-cols-3">

          <Value
            number="01"
            title="IDENTITY"
            text="Your clothes should feel like an extension of yourself."
          />

          <Value
            number="02"
            title="MOVEMENT"
            text="Designed for people who never stay in one place."
          />

          <Value
            number="03"
            title="ATTITUDE"
            text="Less about following the culture. More about creating your own."
          />

        </div>

      </div>

      <div className="overflow-hidden mt-20 pt-20 pb-20 bg-white">

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            w-max
            whitespace-nowrap
            text-[clamp(4rem,9vw,9rem)]
            font-medium
            tracking-[-0.08em]
            text-black/90
          "
        >

          VARNERO&nbsp;&nbsp;&nbsp; VARNERO&nbsp;&nbsp;&nbsp;
          VARNERO&nbsp;&nbsp;&nbsp; VARNERO&nbsp;&nbsp;&nbsp;
          VARNERO&nbsp;&nbsp;&nbsp; VARNERO&nbsp;&nbsp;&nbsp;
          VARNERO&nbsp;&nbsp;&nbsp; VARNERO

        </motion.div>

      </div>

    </section>
  );
}

function MagneticWord({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.span
      whileHover={{
        x: 8,
        color: "#ffffff",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        inline-block
        cursor-pointer
        border-b
        border-white/20
        text-white
      "
    >
      {children}
    </motion.span>
  );
}

function Value({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover="hover"
      className="
        group
        relative
        min-h-[280px]
        border-white/10
        p-8
        md:border-r
        md:p-12
      "
    >

      <div className="flex justify-between">

        <span className="text-[9px] tracking-[0.3em] text-white/30">
          {number}
        </span>

        <motion.span
          variants={{
            hover: {
              rotate: 45,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 15,
          }}
          className="text-white/30"
        >
          ↗
        </motion.span>

      </div>


      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">

        <motion.h3
          variants={{
            hover: {
              x: 8,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          className="
            mb-4
            text-xl
            font-medium
            tracking-tight
          "
        >
          {title}
        </motion.h3>

        <p className="max-w-xs text-xs leading-[1.8] text-white/35">
          {text}
        </p>

      </div>

    </motion.div>
  );
}