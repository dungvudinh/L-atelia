import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide2 from '../../assets/images/slides/slide2.jpg';

import slide10 from '../../assets/images/slides/slide10.jpg';
import slide11 from '../../assets/images/slides/slide11.jpg';
import {  ChevronRight } from "lucide-react";
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import { motion, AnimatePresence,useScroll,useTransform  } from 'framer-motion'
import { useInView } from "framer-motion";
import logo from '../../assets/images/logo.png';
import JoinNewsletter from "../../components/JoinNewsletter";
import FollowUs from "../../components/FollowUs";

const PROJECTS = [
    {
      title: "Mon Cor",
      description: "Built in 1903 during the most prosperous time in Mallorca's modern history, Mon Cor was an architectural marvel that set the benchmark for 20th century living.",
      status: "Sold",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    },
    {
      title: "Vistavall",
      description: "Set atop Valldemossa, offering panoramic views and year-round sunshine.",
      status: "Sold",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    },
    {
        title: "Vistavall",
        description: "Set atop Valldemossa, offering panoramic views and year-round sunshine.",
        status: "Sold",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      },
  ];
const venues = [
  {
    id: 1,
    slug: "soller-tennis-club",
    name: "Sóller Tennis Club",
    description: "A wellness and lifestyle community for local neighbours, international friends and touring pros.",
    image: slide11, // import ảnh tương ứng
    cta: "Visit Sóller Tennis Club",
    link: "/venues/soller-tennis-club",
  },
  {
    id: 2,
    slug: "patiki-beach",
    name: "Patiki Beach",
    description: "An extension of home, a beach shack for us all. You are invited to eat, drink and just be.",
    image: slide11,
    cta: "Visit Patiki Beach",
    link: "/venues/patiki-beach",
  },
  {
    id: 3,
    slug: "pueblo",
    name: "Pueblo",
    description: "A modern bistro for the heart of Sóller, serving fresh, seasonal produce sustainably sourced.",
    image: slide11,
    cta: "Visit Pueblo",
    link: "/venues/pueblo",
  },
]
const BANNER_IMAGES = [
    "https://cdn.sanity.io/images/bxdajbsn/production/228e1c8f6b1c6e96adacf0bbdedb4d0a418c04b1-4000x3076.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/96494324d88cc4526bdc56376411b6138e39e779-4000x4000.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/a726e8941d2121cd6566e13cbbc0b2a8716d1374-3780x2520.jpg",
  ]

const sizeMap = {
  sm: { width: "25%",  height: 160 },
  md: { width: "25%",  height: 240 },
  lg: { width: "25%",  height: 340 },
};
const images = [
  { src: slide10, size: "sm" },
  { src: slide10, size: "md" },
  { src: slide10, size: "lg" },
  { src: slide10, size: "md" },
  { src: slide10, size: "sm" },
];

function Landing() {
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const ref = useRef();
    const {t} = useTranslation(["landing", "common"]);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [40, -40])
    useEffect(()=>{
      const handleScroll = () => 
      {
        const currentScrollY= window.scrollY;
        setCurrentScrollY(currentScrollY);
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return ( 
        <div className="">
            {/* MAIN SLIDER */}
            <Banner />
            <div className="py-[60px] lg:py-[100px] flex justify-center px-4">
              <div className="xl:max-w-screen-2xl lg:max-w-[900px] flex flex-col items-center">
                <div
                  className="relative z-50 -translate-y-50 text-center bg-white h-[500px] flex flex-col items-center"
                  style={{
                    opacity: Math.min(currentScrollY / 500, 0.8),
                    transform: `translateY(${-Math.min(currentScrollY * 0.3, 60)}px)`,
                  }}
                >
                  <h1 className="text-4xl text-bg-secondary">
                    Berrow is a family-led architectural design-build team based in Mallorca.
                  </h1>
                  <ProjectGallery />
                  <div className="mb-5 w-full max-w-[772px] text-center md:mb-7 md:w-10/12">
                    <h4 className="text-bg-secondary text-[20px] leading-[24px] xs:text-[24px] xs:leading-[28px] md:text-[28px] md:leading-[34px] lg:text-[32px] lg:leading-[38px] text-center">
                    We transform local properties that are full of stories and character into luxury finished homes for modern buyers.
                    </h4>
                  </div>
                  
                </div>
                <div ref={ref} className="mt-[-150px] relative w-full">
                  <img src={slide2} className="rounded-2xl h-full w-full"/>
                  <motion.h4
                    style={{ y }}
                    className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 xs:text-[60px] sm:text-[70px] md:text-[80px] md:leading-[96px] lg:text-[96px]"
                  >
                    You've arrrived
                  </motion.h4>
                </div>
                <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                  <FadeUpSection>
                      <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                          <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                          Each project presents a different challenge.
                          </h1>
                          <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                          Whether we’re renovating a dilapidated building or designing a new low-impact home, our philosophy is always the same. We use the finest natural materials from the island and partner with local contractors who understand the region’s history and can help us build a home that respects its surroundings.
                          </p>
                          <a
                              href="#"
                              className="mt-4 inline-flex items-center justify-center gap-1 text-[12px] leading-[18px] xs:text-[14px] xs:leading-[20px] sm:text-[16px] sm:leading-[24px] font-bold hover:gap-2 transition-all duration-200"
                              style={{fontFamily:'InstrumentSans'}}>
                                View All Project
                              <ChevronRight size={16} />
                          </a>
                      </div>
                  </FadeUpSection>
                </div>

                <ProjectGrid/>

                <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                  <FadeUpSection>
                      <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                          <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                          Opened by Berrow for everyone in the community.
                          </h1>
                          <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                          A collection of social spaces and hospitality concepts where you can feel at home. We opened each of these businesses to strengthen our local community and welcome people moving into the area.
                          </p>
                      </div>
                  </FadeUpSection>
                </div>
                <VenuesGrid />
                <JoinNewsletter />
                <FollowUs />
              </div>
            </div>
            
            <Footer withContact={true}/>
        </div>
    );
}



const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const divRef = useRef();
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % BANNER_IMAGES.length)
      }, 5000) // đổi ảnh mỗi 5 giây
  
      return () => clearInterval(timer)
    }, [])

    useEffect(()=>{
      const handleScroll = () => 
      {
        const currentScrollY= window.scrollY;
        setCurrentScrollY(currentScrollY);
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
      <div className="relative w-full h-svh overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <div style={{filter: `blur(${Math.min(currentScrollY / 100, 10)}px)`}} className="relative w-full h-full">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <motion.img
                  src={BANNER_IMAGES[currentIndex]}
                  alt="banner"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl gap-12 z-10">
              <div className="flex items-center gap-12 relative">
                <LocalizedLink to="/projects" className="link-underline cursor-pointer absolute left-[-300px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Projects
                </LocalizedLink>
                <LocalizedLink to="/media" className="link-underline cursor-pointer absolute left-[-140px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Media
                </LocalizedLink>
                <img src={logo} className="h-[130px]"/>
                <LocalizedLink to="/about" className="link-underline cursor-pointer absolute right-[-140px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  About Us
                </LocalizedLink>
                <LocalizedLink to="/contact" className="link-underline cursor-pointer absolute right-[-300px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Contact
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
        {/* White overlay tăng dần khi cuộn, đạt 100% opacity = trắng hoàn toàn */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "white",
            opacity: Math.min(currentScrollY / 250, 1)
          }}
        />
    
        {/* Gradient chân ảnh */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: "35%",
            background: "linear-gradient(to bottom, transparent 0%, white 100%)",
          }}
        />
      </div>
    )
}
const ProjectGallery = () => (
  <div className="flex items-center justify-center gap-4 px-8 py-12 w-full">
    {images.map((img, i) => {
      const { width, height } = sizeMap[img.size];
      return (
        <div
          key={i}
          className="flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 "
          style={{ width, height }}
        >
          <img
            src={img.src}
            alt={`project-${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      );
    })}
  </div>
);const FadeUpSection = ({ children }) => {
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
const ProjectGrid = ()=>
{
  return (
    <div>
      <ul className={`grid grid-cols-3 gap-5`}>
        {PROJECTS.map((project, index) => (
            <FadeUpSection key={index}>
                <li  className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4 h-[400px]">
                      <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                      {/* <span className="absolute top-8 left-8 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                          {project.status}
                      </span> */}
                  </div>
                  <div className="text-bg-secondary">
                      <h3 className="md:text-[28px] md:leading-[34px] lg:text-[32px] lg:leading-[38px] text-[28px] leading-[34px] xs:text-[28px] xs:leading-[34px]">{project.title}</h3>
                      <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{fontFamily:'InstrumentSans'}}>
                          {project.description}
                      </p>
                      <a
                          href="#"
                          className="mt-4 inline-flex items-center justify-center gap-1 text-[12px] leading-[18px] xs:text-[14px] xs:leading-[20px] sm:text-[16px] sm:leading-[24px] font-bold hover:gap-2 transition-all duration-200"
                      style={{fontFamily:'InstrumentSans'}}>
                          View Project
                          <ChevronRight size={16} />
                      </a>
                  </div>
                </li>
            </FadeUpSection>
        ))}
    </ul>
    </div>
  )
}
const VenuesGrid = ()=>
  {
    return (
      <div>
        <ul className={`grid grid-cols-3 gap-5`}>
          {venues.map((venue, index) => (
              <FadeUpSection key={index}>
                  <li  className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl mb-4 h-[600px]">
                        <img
                            src={venue.image}
                            alt={venue.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                        {/* <span className="absolute top-8 left-8 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                            {project.status}
                        </span> */}
                    </div>
                    <div className="text-bg-secondary">
                        <h3 className="md:text-[28px] md:leading-[34px] lg:text-[32px] lg:leading-[38px] text-[28px] leading-[34px] xs:text-[28px] xs:leading-[34px]">{venue.name}</h3>
                        <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{fontFamily:'InstrumentSans'}}>
                            {venue.description}
                        </p>
                        <a
                            href="#"
                            className="mt-4 inline-flex items-center justify-center gap-1 text-[12px] leading-[18px] xs:text-[14px] xs:leading-[20px] sm:text-[16px] sm:leading-[24px] font-bold hover:gap-2 transition-all duration-200"
                        style={{fontFamily:'InstrumentSans'}}>
                            View Project
                            <ChevronRight size={16} />
                        </a>
                    </div>
                  </li>
              </FadeUpSection>
          ))}
      </ul>
      </div>
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
export default Landing;