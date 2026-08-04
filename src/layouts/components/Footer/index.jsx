import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import logo from '../../../assets/images/logo.png'
import { Instagram } from '../../../assets/icons';
import { LocalizedLink } from "../../../components/LocalizedLink";

const NAV_LINKS = [
  { name: 'Dự án', to: '/projects' },
  { name: 'Media', to: '/media' },
  { name: 'Về chúng tôi', to: '/about' },
  { name: 'Liên hệ', to: '/contact' }
]
const WELCOME_TEXT = "Welcome home."

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer className="bg-bg-secondary rounded-t-3xl mt-16 overflow-hidden">

      {/* Top: logo + nav + contact */}
      <div className="flex justify-center items-center pt-12 md:pt-16 pb-12 md:pb-20">
        <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] flex flex-col md:flex-row md:justify-between md:items-start mx-auto !px-4 md:px-0 gap-10 md:gap-0">

          {/* Logo: hiện riêng ở đầu trên mobile, ẩn ở tablet/desktop (dùng logo trong cột phải) */}
          <img src={logo} alt="" className="w-14 md:hidden" />

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link, index) => (
              <LocalizedLink
                key={index}
                to={link.to}
                className="text-white text-[28px] leading-[34px] sm:text-[32px] sm:leading-[38px] md:text-[48px] md:leading-[54px] 
                  translate-x-0 hover:translate-x-4 transition-transform duration-300 ease-out inline-block"
              >
                {link.name}
              </LocalizedLink>
            ))}
          </nav>

          <div className="flex flex-col items-start md:items-end justify-between md:h-full gap-8 md:gap-12">
            {/* Logo mặc định cho tablet/desktop */}
            <img src={logo} alt="" className="hidden md:block w-20 lg:w-25 md:mx-0" />

            <div className="text-left md:text-right text-white/80 text-[18px] md:text-[20px] leading-[1.6]">
              <p className="cursor-pointer hover:opacity-70 transition-opacity duration-300">Đà Nẵng</p>
              <p className="hover:opacity-70 transition-opacity duration-300">0964282298</p>
              <p className="mb-4 hover:opacity-70 transition-opacity duration-300">latelia.sale@gmail.com</p>
              {/* <a
                href="https://instagram.com/berrowprojects"
                className="inline-flex items-center gap-2 hover:opacity-40 transition-opacity duration-300"
              >
                @berrowprojects
                <Instagram />
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: "Welcome home." — từng chữ cái */}
      <div ref={ref} className="px-6 md:px-10 pb-10 flex flex-wrap justify-center">
        <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] mx-auto !px-4 md:px-0 mb-6 flex justify-center">
          {WELCOME_TEXT.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-white text-[11vw] leading-[1] tracking-tight"
              style={{ display: char === " " ? "inline" : "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer
