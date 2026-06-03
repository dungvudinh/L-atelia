import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import logo from '../../../assets/images/logo.png'
import { Instagram } from '../../../assets/icons';

const NAV_LINKS = ["Projects", "Collection", "Studio", "Culture", "Our Story", "Join Us", "Contact"]
const WELCOME_TEXT = "Welcome home."

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer className="bg-bg-secondary rounded-t-3xl mt-16 overflow-hidden">
      
      {/* Top: nav + brand + contact */}
      <div className="flex justify-between items-start px-10 md:px-16 pt-16 pb-20">
        
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] 
                translate-x-0 hover:translate-x-4 transition-transform duration-300 ease-out inline-block"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-end justify-between h-full gap-12">
          <img src={logo} className="w-16 md:w-25 md:mx-0" />
          <div className="text-right text-white/80 text-[20px] leading-[24px] leading-[1.6]">
            <p className="cursor-pointer hover:opacity-70 transition-opacity duration-300">Carrer de Batac, 19</p>
            <p className="mb-4 hover:opacity-70 transition-opacity duration-300">07100 Sóller, Illes Balears, Spain</p>
            <p className="hover:opacity-70 transition-opacity duration-300">+34 854 55 82 57</p>
            <p className="mb-4 hover:opacity-70 transition-opacity duration-300">studio@berrow.com</p>
            <a
              href="https://instagram.com/berrowprojects"
              className="inline-flex items-center gap-2 hover:opacity-40 transition-opacity duration-300"
            >
              @berrowprojects
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: "Welcome home." — từng chữ cái */}
      <div ref={ref} className="px-6 md:px-10 pb-10 flex flex-wrap">
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
            className="text-white text-[13vw] leading-[1] tracking-tight"
            style={{ display: char === " " ? "inline" : "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

    </footer>
  )
}

export default Footer