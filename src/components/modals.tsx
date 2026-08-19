import { AnimatePresence, motion } from "motion/react";
import {X, ArrowUpRight} from "lucide-react";
import {FaInstagram} from "react-icons/fa";
import { SiShopee } from "react-icons/si";

    const socials = [
    {
        name: "Instagram",
        handle:"@varnero",
        icon: FaInstagram,
        url: "https://www.instagram.com/varnero_/",
    },
    {
        name: "TikTok",
        handle:"@varnero",
        icon: null,
        url: "https://tiktok.com",
    },
    {
        name: "Shopee",
        handle: "Varnero",
        icon: SiShopee,
        url: "https://shopee.co.id/shop/597783876",
    },
    ];

    interface SocialModalProps {
      isOpen: boolean;
      onClose: () => void;
    }

  export default function SocialModal({
      isOpen,
      onClose,
    }: SocialModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-50
              bg-black/60
              backdrop-blur-md
            "
          />

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[calc(100%-32px)]
              max-w-[720px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              bg-[#111]
              text-white
            "
          >
            {/* TOP */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                px-6
                py-5

                sm:px-8
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    tracking-[0.4em]
                    text-white/40
                  "
                >
                  VARNERO / SOCIAL
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  transition
                  duration-300
                  hover:bg-white
                  hover:text-black
                "
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-6 py-10 sm:px-10 sm:py-14">

              {/* TITLE */}
              <div className="mb-10">
                <p
                  className="
                    mb-4
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/40
                  "
                >
                  Connect with us
                </p>

                <h2
                  className="
                    text-4xl
                    font-light
                    tracking-[-0.04em]

                    sm:text-6xl
                  "
                >
                  FOLLOW
                  <br />
                  THE MOVEMENT.
                </h2>
              </div>

              {/* SOCIAL LIST */}
              <div>
                {socials.map((social, index) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.1 + index * 0.08,
                        duration: 0.4,
                      }}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        py-5

                        sm:py-6
                      "
                    >
                      <div className="flex items-center gap-4">
                        {/* NUMBER */}
                        <span
                          className="
                            w-6
                            text-[8px]
                            tracking-[0.2em]
                            text-white/30
                          "
                        >
                          0{index + 1}
                        </span>

                        {/* ICON */}
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            transition
                            duration-300
                            group-hover:bg-white
                            group-hover:text-black
                          "
                        >
                          {Icon ? (
                            <Icon
                              size={15}
                              strokeWidth={1.5}
                            />
                          ) : (
                            <span className="text-base font-medium">
                              {social.name === "TikTok"
                                ? "♪"
                                : "𝕏"}
                            </span>
                          )}
                        </div>

                        {/* NAME */}
                        <div>
                          <p
                            className="
                              text-lg
                              font-light
                              tracking-tight
                              text-left
                              sm:text-xl
                            "
                          >
                            {social.name}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-[8px]
                              tracking-[0.2em]
                              text-white/30
                              text-left
                            "
                          >
                            {social.handle}
                          </p>
                        </div>
                      </div>

                      {/* ARROW */}
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          transition-all
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                          group-hover:border-white
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* FOOTER */}
              <div className="pt-8">
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.35em]
                    text-white/20
                  "
                >
                  Stay connected · Stay different
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}