import { color, motion } from "motion/react";
import Swal from 'sweetalert2'

const links = [
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "https://wa.me/6282131211769" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/varnero_/" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Shopee", href: "https://shopee.co.id/shop/597783876" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">

      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-6 pt-24 md:px-10 md:pt-32">

        <div className="grid gap-16 md:grid-cols-12">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >

            <p className="mb-6 text-[9px] tracking-[0.35em] text-white/30">
              STAY IN THE LOOP
            </p>

            <h2
              className="
                max-w-3xl
                text-[clamp(2.8rem,6vw,6rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              DON'T MISS
              <br />
              <span className="text-white/30">
                WHAT'S NEXT.
              </span>
            </h2>

          </motion.div>


          {/* NEWSLETTER */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="md:col-span-4 md:col-start-9"
          >

            <p className="mb-8 max-w-sm text-xs leading-[1.8] text-white/35">
              New drops, collections and things worth knowing.
              No spam. Just VARNERO.
            </p>

            <form className="group relative" onSubmit={handlePost}>

              <input
                type="email"
                placeholder="YOUR EMAIL"
                name='email'
                className="
                  w-full
                  border-b
                  border-white/20
                  bg-transparent
                  py-4
                  pr-12
                  text-xs
                  tracking-[0.15em]
                  text-white
                  outline-none
                  placeholder:text-white/25
                  focus:border-white/60
                "
              />

              <button
                type="submit"
                className="
                  absolute
                  right-0
                  top-1/2
                  -translate-y-1/2
                  text-lg
                  text-white/40
                  transition-all
                  duration-300
                  group-hover:text-white
                "
              >
                →
              </button>

            </form>

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="mx-auto mt-24 max-w-[1500px] px-6 md:px-10">

        <div className="h-px w-full bg-white/10" />

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-10">

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}

          <div>

            <div
              className="
                text-2xl
                font-semibold
                tracking-[-0.06em]
                pb-3
              "
            >
              VARNERO
            </div>

            <p className="text-[10px] leading-[1.8] text-white/30">
              Independent clothing label.
              Made for those who refuse to blend in.
            </p>

          </div>


          {/* MENU */}

          <FooterColumn title="EXPLORE" items={links} />


          {/* SOCIAL */}

          <FooterColumn title="FOLLOW" items={socials} />


          {/* CONTACT */}

          <div>

            <p className="mb-6 text-[9px] tracking-[0.3em] text-white/30">
              CONTACT
            </p>

            <a
              href="mailto:varnero190@gmail.com"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                text-white/60
                transition-colors
                hover:text-white
              "
            >
              varnero190@gmail.com

              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                ↗
              </motion.span>
            </a>

          </div>

        </div>

      </div>


      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="overflow-hidden border-y border-white/[0.06] py-8">

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            w-max
            whitespace-nowrap
            text-[clamp(3rem,7vw,8rem)]
            font-medium
            leading-none
            tracking-[-0.07em]
            text-white/[0.05]
          "
        >
          VARNERO&nbsp;&nbsp; / &nbsp;&nbsp;
          CREATE YOUR OWN&nbsp;&nbsp; / &nbsp;&nbsp;
          VARNERO&nbsp;&nbsp; / &nbsp;&nbsp;
          CREATE YOUR OWN&nbsp;&nbsp; / &nbsp;&nbsp;
          VARNERO&nbsp;&nbsp; / &nbsp;&nbsp;
          CREATE YOUR OWN&nbsp;&nbsp; / &nbsp;&nbsp;
          VARNERO&nbsp;&nbsp; / &nbsp;&nbsp;
          CREATE YOUR OWN
        </motion.div>

      </div>


      {/* =====================================================
          BIG BRAND
      ===================================================== */}

      <div className="px-4 pb-6 pt-20 md:px-8 md:pt-28">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            select-none
            text-center
            text-[clamp(4rem,18vw,18rem)]
            font-semibold
            leading-[0.7]
            tracking-[-0.1em]
            text-white
          "
        >
          VARNERO
        </motion.div>

      </div>


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-6 pb-8 pt-16 md:px-10">

        <div
          className="
            flex
            flex-col
            justify-between
            gap-4
            border-t
            border-white/10
            pt-6
            text-[9px]
            tracking-[0.15em]
            text-white/25
            md:flex-row
          "
        >

          <span>
            © 2026 VARNERO. ALL RIGHTS RESERVED.
          </span>

          <div className="flex gap-6">

            <a
              href="#"
              className="transition-colors hover:text-white/70"
            >
              PRIVACY
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white/70"
            >
              TERMS
            </a>

          </div>

          <span>
            JAKARTA — ID
          </span>

        </div>

      </div>

    </footer>
  );
}


/* =====================================================
   FOOTER COLUMN
===================================================== */

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>

      <p className="mb-6 text-[9px] tracking-[0.3em] text-white/30">
        {title}
      </p>

      <div className="flex flex-col gap-3">

        {items.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{
              x: 6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              text-sm
              text-white/50
              transition-colors
              hover:text-white
            "
          >

            <span>
              {item.label}
            </span>

            <span
              className="
                text-xs
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:opacity-100
              "
            >
              ↗
            </span>

          </motion.a>
        ))}

      </div>

    </div>
  );
}

const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;

  const target = form as typeof form & {
    email: { value: string };
  };

  const inputValue: { [key: string]: string } = {
    Email: target.email.value,
  };

  console.log(inputValue);

  const baseURL =
    `https://script.google.com/macros/s/AKfycbw6AU1bpzAx4-V-p336ouN0-2j77a59XThj1Z0JK8JMoXieozP7YrOI96PYR5JA2e8c/exec`;

  const formData = new FormData();

  Object.keys(inputValue).forEach((key) => {
    formData.append(key, inputValue[key]);
  });

  try {
    Swal.fire({
      title: "Sending...",
      text: "Please wait a moment.",
      background: "#111111",
      color: "#ffffff",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await fetch(baseURL, {
      method: "POST",
      body: formData,
    });

    console.log("Status:", res.status);
    console.log("OK:", res.ok);

    if (res.ok) {
      // Reset menggunakan reference yang sudah disimpan
      form.reset();

      Swal.fire({
        title: "You're In.",
        text: "Thanks for joining us. We'll keep you posted.",
        icon: "success",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#ffffff",
        confirmButtonText: "Continue",
        iconColor: "#ffffff",
        customClass: {
          popup: "rounded-none",
          confirmButton:
            "rounded-none px-6 py-2 text-black font-medium",
        },
      });
    } else {
      Swal.fire({
        title: "Something Went Wrong.",
        text: "We couldn't complete your request. Please try again.",
        icon: "error",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#ffffff",
        confirmButtonText: "Try Again",
        iconColor: "#ffffff",
        customClass: {
          popup: "rounded-none",
          confirmButton:
            "rounded-none px-6 py-2 text-black font-medium",
        },
      });
    }
  } catch (e) {
    console.error("Error during fetch:", e);

    Swal.fire({
      title: "Connection Error.",
      text: "Please check your connection and try again.",
      icon: "error",
      background: "#111111",
      color: "#ffffff",
      confirmButtonColor: "#ffffff",
      confirmButtonText: "Close",
      iconColor: "#ffffff",
      customClass: {
        popup: "rounded-none",
        confirmButton:
          "rounded-none px-6 py-2 text-black font-medium",
      },
    });
  }
};