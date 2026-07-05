import { useState, useRef, useEffect} from 'react'
import aboutUs from '../../assets/images/about-us/about-us-final.jpg'
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import aboutUs5 from '../../assets/images/about-us/about-us-5.webp'
import aboutUs6 from '../../assets/images/about-us/about-us-6.webp'
import logo from '../../assets/images/logo.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode}from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from '../../layouts/components/Footer'
import OptimizedImage from '../../components/OptimizedImage'
import {LocalizedLink} from '../../components/LocalizedLink';
import { motion } from 'framer-motion'
import { useInView } from "framer-motion";
import JoinNewsletter from '../../components/JoinNewsletter'
import FollowUs from '../../components/FollowUs'
import ProjectCarousel from '../../components/ProjectCarousel'

const TIMELINE_ITEMS = [
    {
        id: 1,
        year: '2017',
        events: [
            { text: 'Archie and Monty Berrow purchase ', link: 'Patiki Townhouse', after: ' and work alongside the building team on the reformation' }
        ]
    },
    {
        id: 2,
        year: '2019',
        events: [
            { link: 'Patiki Townhouse', after: ' is completed and sold' },
            { text: "The Berrow's open ", link: 'Patiki Beach', after: ' and run it as a family' }
        ]
    },
    {
        id: 3,
        year: '2020',
        events: [
            { link: 'Canoneta Townhouse', after: ' is purchased' },
            { text: 'The Berrow brothers sign a lease for a small office in the centre of Sóller' },
            { text: 'The first client projects are signed, ', link: 'Casa Mares', after: ' and 1902' }
        ]
    },
    {
        id: 4,
        year: '2021',
        events: [
            { text: "The Berrow brothers secure their first concession and start its transformation" },
            { text: 'The team starts to grow, with new roles in marketing and administration' },
            { text: 'Two new client projects start' },
            { link: 'Canoneta Townhouse', after: ' is completed' },
            { link: 'Mon Cor', after: ' is purchased' }
        ]
    },
    {
        id: 5,
        year: '2022',
        events: [
            { text: 'Office expands to a larger space in Sóller' },
            { link: 'Mon Cor', after: ' renovation begins' },
            { text: 'Three new client projects signed' },
            { text: 'Design Studio officially launches' }
        ]
    },
]
const GALLERY_IMAGES = [
    { src: aboutUs2,  width: 1000, rounded: false },
    { src: aboutUs3,   width: 1000, rounded: true  },
    { src: aboutUs4,  width: 1000, rounded: true  },
    { src: aboutUs5,  width: 1000, rounded: true  },
    { src: aboutUs6,   width: 1000, rounded: false },
]

function About()
{
    const [loaded, setLoaded] = useState(true);
    return (
        <div className="">
            {/* Hero Image */}
            <div className='w-full xl:h-screen h-[300px] md:h-[500px] relative'>
                <OptimizedImage src={aboutUs} alt="" 
                    className={`w-full h-full object-cover object-center transition-opacity duration-100
                                ${loaded ? 'slide-image-animate' : 'opacity-0'} // 👈 ẩn cho đến khi load`} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
                        className="text-white text-[18px] md:text-[18px] xl:text-[18px]  leading-tight tracking-widest flex items-center justify-center gap-3"
                    >
                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                        About Us
                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
                        className="text-white/75 text-[64px] md:text-[64px] xl:text-[64px] mt-4 max-w-xl"
                    >
                        One team. <br/> One set of standards.
                    </motion.p>
                    {/* <motion.div
                        initial={{ scaleX: 0 }}
                        animate={loaded ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="h-[1px] bg-white/60 w-16 mt-6"
                        style={{ originX: 0.5 }}
                    /> */}
                </div>
            </div>
            
            {/* Section 1: About History */}
            {/* SUBTITLE */}
            <div className="xl:mt-40 mb-10 xl:mb-40 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        Berrow is a multi-disciplinary property practice, working exclusively across Mallorca. We design and build exceptional homes that stand the test of time.
                        </h1>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                        Our in-house expertise spans the entire property development cycle, including search and acquisition, architecture and design, project management, interior design, and sales — offering a fully integrated approach whether working on an in-house development or on behalf of our clients.
                        </p>
                    </div>
                </FadeUpSection>
            </div>
            {/* <TimelineSection /> */}
            <ImageStrip />
            <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        An architecture & design studio, property developer, and collection of lifestyle brands, all under one roof.
                        </h1>
                    </div>
                </FadeUpSection>
            </div>
            <VennDiagram />
            <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        Creating iconic homes we’re all proud to walk our families through for generations to come.
                        </h1>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                        Although we moved here from the UK, we have a lifetime of memories from Sóller. It’s where we spent our childhood holidays and it’s home to our first property renovation, Patiki Townhouse.
                        </p>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-4">
                        Our development approach is rooted in collaboration with local artisans, builders and suppliers. As well as supporting our community, they share their unparalleled understanding of the island’s history and traditional building practices. This means that when we breathe new life into neglected properties, we’re able to honour their character, protect their stories, and ensure they're enjoyed for generations to come.
                        </p>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-4">
                        We’re a family business that puts families first. This value runs through everything we do, from our projects at Berrow to the hospitality and community projects we are creating in the area.
                        </p>
                    </div>
                </FadeUpSection>
            </div>
            <ProjectCarousel />
            <JoinNewsletter />
            <FollowUs />
            <Footer withContact={false}/>
        </div>
    )
}
function TimelineSection() {
    const sectionRef = useRef(null)
    const lineRef = useRef(null)
    const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

    useEffect(() => {
        if (isSectionInView && lineRef.current) {
            setTimeout(() => {
                lineRef.current.style.width = '100%'
            }, 400)
        }
    }, [isSectionInView])

    return (
        <section ref={sectionRef} className="px-6 xl:px-16 py-20 xl:py-32 overflow-hidden">
            {/* Line + Dots row */}
            <div className="relative mb-10">
                {/* Background line */}
                <div className="w-full h-[1px] bg-[#c5bba8] absolute top-[50%]" />
                {/* Animated progress line */}
                <div
                    ref={lineRef}
                    style={{
                        width: '0%',
                        transition: 'width 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        height: '1px',
                        background: '#1a2a2a',
                        position: 'absolute',
                        top: '50%',
                    }}
                />
                {/* Dots row — aligned with grid columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 relative">
                    {TIMELINE_ITEMS.map((item, index) => (
                        <DotOnly key={item.id} index={index} isSectionInView={isSectionInView} />
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
                {TIMELINE_ITEMS.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}

function DotOnly({ index, isSectionInView }) {
    return (
        <div className="flex items-center py-2">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: index * 0.12 + 0.5,
                }}
                className="w-2 h-2 rounded-full bg-[#1a2a2a]"
            />
        </div>
    )
}

function TimelineItem({ item, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
            }}
        >
            {/* Year */}
            <p className="text-bg-secondary text-[15px] font-semibold tracking-wide mb-4">
                {item.year}
            </p>

            {/* Events */}
            <ul className="space-y-2">
                {item.events.map((ev, i) => (
                    <li key={i} className="text-[13px] text-[#4a5050] leading-relaxed" style={{ fontFamily: 'InstrumentSans' }}>
                        {ev.text}
                        {ev.link && (
                            <LocalizedLink to="#" className="underline underline-offset-2 decoration-[#c5bba8] hover:decoration-[#1a2a2a] transition-colors text-bg-secondary">
                                {ev.link}
                            </LocalizedLink>
                        )}
                        {ev.after}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
function ImageStrip() {
    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 py-2">
            <Swiper
                modules={[FreeMode, Autoplay]}
                freeMode={{
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.6,
                }}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                loopAdditionalSlides={2}
                speed={5000}
                slidesPerView="auto"
                spaceBetween={20}
                grabCursor={true}
            >
                {GALLERY_IMAGES.map((img, i) => (
                    <SwiperSlide
                        key={i}
                        style={{ width: img.width }}
                        className="!h-auto"
                    >
                        <div
                            className={`
                                overflow-hidden
                                h-[82vh] 
                                                             
                                ${img.rounded ? 'rounded-2xl' : ''}
                            `}
                            style={{ width: img.width }}
                        >
                            <img
                                src={img.src}
                                alt=""
                                className="w-full h-full object-cover object-center"
                                draggable={false}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
function VennDiagram() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const fadeScale = (delay) => ({
        initial: { opacity: 0, scale: 0.5 },
        animate: isInView ? { opacity: 1, scale: 1 } : {},
        transition: {
            duration: 0.6,
            delay,
            ease: [0.34, 1.56, 0.64, 1],
        },
    })

    return (
        <div ref={ref} className="flex items-center justify-center w-full py-16 xl:py-24">
            {/* Container cố định maxWidth để SVG và labels cùng tỉ lệ */}
            <div className="relative w-full" style={{ maxWidth: '790px' }}>
            <svg
                viewBox="0 0 700 650"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="circle-top">
                            <circle cx="350" cy="210" r="210" />
                        </clipPath>
                        <clipPath id="intersect-top-left">
                            <circle cx="230" cy="420" r="210" />
                        </clipPath>
                    </defs>

                    {/* 3 vòng tròn chính */}
                    <circle cx="350" cy="210" r="210" fill="#e8ecea" fillOpacity="0.75" />
                    <circle cx="230" cy="420" r="210" fill="#e8ecea" fillOpacity="0.75" />
                    <circle cx="470" cy="420" r="210" fill="#e8ecea" fillOpacity="0.75" />

                    {/* Vùng giao đôi */}
                    <circle cx="230" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#circle-top)" />
                    <circle cx="470" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#circle-top)" />
                    <circle cx="470" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#intersect-top-left)" />

                    {/* Vùng giao cả 3 — màu #C6D3D5 solid */}
                    <g clipPath="url(#circle-top)">
                        <g clipPath="url(#intersect-top-left)">
                            <circle cx="470" cy="420" r="210" fill="#C6D3D5" />
                        </g>
                    </g>
                </svg>

                

                {/* Architecture & Design — tâm circle trên */}
                <motion.div
                    {...fadeScale(0.1)}
                    className="absolute text-center"
                    style={{
                        left: '43%',
                        top: '20%',          // cy=210 → 210/620 ≈ 34%, phần trên circle
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                        Architecture<br />& Design
                    </p>
                </motion.div>

                {/* Sales & Marketing — tâm circle trái dưới */}
                <motion.div
                    {...fadeScale(0.3)}
                    className="absolute text-center"
                    style={{
                        left: '14%',         // cx=185 → 185/600 ≈ 31%
                        top: '65%',          // cy=410 → 410/620 ≈ 66%, phần dưới circle
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                        Sales &amp;<br />Marketing
                    </p>
                </motion.div>

                {/* Development — tâm circle phải dưới */}
                <motion.div
                    {...fadeScale(0.5)}
                    className="absolute text-center"
                    style={{
                        left: '70%',         // cx=415 → 415/600 ≈ 69%
                        top: '65%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                        Development
                    </p>
                </motion.div>

                {/* Logo — tâm giao nhau của 3 vòng */}
                <motion.img
                    {...fadeScale(0.7)}
                    src={logo}
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        width: 'clamp(80px, 14%, 160px)',
                        left: '43%',
                        top: '47%',          // điểm giao giữa 3 vòng
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>
        </div>
    )
}
const FadeUpSection = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    )
}
const InViewSlider = ({ images }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
  
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ x: "30%" }}
          animate={isInView ? { x: 0 } : { x: "30%" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            scrollbar={{ draggable: true }}
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "200px" }}
                className="rounded-2xl overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <img
                    src={img}
                    alt={`instagram-${index}`}
                    className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    )
  }
export default About;