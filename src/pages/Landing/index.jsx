import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide2 from '../../assets/images/slides/slide2.jpg';

import {  ChevronRight } from "lucide-react";
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import { motion, AnimatePresence,useScroll,useTransform  } from 'framer-motion'
import { useInView } from "framer-motion";
import logo from '../../assets/images/logo.png';
import JoinNewsletter from "../../components/JoinNewsletter";
import FollowUs from "../../components/FollowUs";
import {projectsService} from '../../services/projectsService.js'
import img5 from '../../assets/images/img5.webp'
import img6 from '../../assets/images/img6.webp'
import img7 from '../../assets/images/img7.webp'
import img8 from '../../assets/images/img8.webp'
import img9 from '../../assets/images/img9.webp'
import img10 from '../../assets/images/img10.jpg'
const BANNER_IMAGES = [
    "https://cdn.sanity.io/images/bxdajbsn/production/228e1c8f6b1c6e96adacf0bbdedb4d0a418c04b1-4000x3076.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/96494324d88cc4526bdc56376411b6138e39e779-4000x4000.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/a726e8941d2121cd6566e13cbbc0b2a8716d1374-3780x2520.jpg",
  ]

const sizeMap = {
  sm: { width: "16%",  height: 160 },
  md: { width: "16%",  height: 240 },
  lg: { width: "16%",  height: 340 },
};
const images = [
  { src: img5, size: "sm" },
  { src: img6, size: "md" },
  { src: img7, size: "lg" },
  { src: img8, size: "md" },
  { src: img9, size: "sm" },
];

function Landing() {
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading,setLoading]= useState(true);
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
    const fetchProjects = useCallback(async () => {
            try {
    
            const response = await projectsService.getProjects();
            const transformedProjects = response.data?.projects?.map(project => ({
                id: project._id || project.id,
                src: project.heroImage?.thumbnailKey || project.gallery?.[0]?.thumbnailKey || project.heroImage?.key,
                alt: project.title,
                title: project.title,
                description: project.description,
                location: project.location,
                price: project.price,
                type: project.type,
                status: project.status || 'available',
                brochure: project.brochure,
                constructionProgress: project.constructionProgress,
                designImages: project.designImages,
                floorPlans: project.floorPlans,
                gallery: project.gallery,
                propertyFeatures: project.propertyFeatures,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
            })) || [];
    
            // const finalProjects = transformedProjects.length > 0 ? transformedProjects : FALLBACK_IMAGES;
            setProjects(transformedProjects);
            } catch (err) {
              console.error('Failed to fetch projects:', err);
            // setProjects(FALLBACK_IMAGES);
            // setFilteredProjects(FALLBACK_IMAGES);
            } 
    }, []);
    useEffect(() => {
        fetchProjects();
    }, []);
    
    return ( 
        <div className="">
            {/* MAIN SLIDER */}
            <Banner />
            <div className="py-[60px] lg:py-[100px] flex justify-center px-4">
              <div className="xl:max-w-screen-2xl lg:max-w-[900px] flex flex-col items-center mx-auto !px-4 md:px-0 ">
                <div
                  className="relative z-50 -translate-y-50 text-center bg-white h-[500px] flex flex-col items-center w-full"
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
                <div ref={ref} className="mt-[-150px]  w-full flex justify-center items-center" >
                  <div className="relative w-full xl:max-w-screen-2xl flex items-center justify-between lg:max-w-[900px] mx-auto !px-4 md:px-0">
                    <img src={img10} className="rounded-2xl h-full w-full"/>
                    <motion.h4
                      style={{ y }}
                      className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 xs:text-[60px] sm:text-[70px] md:text-[80px] md:leading-[96px] lg:text-[96px]"
                    >
                      You've arrrived
                    </motion.h4>

                  </div>
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
                          <LocalizedLink
                              to="/projects"
                              className="mt-4 inline-flex items-center justify-center gap-1 text-[12px] leading-[18px] xs:text-[14px] xs:leading-[20px] sm:text-[16px] sm:leading-[24px] font-bold hover:gap-2 transition-all duration-200"
                              style={{fontFamily:'InstrumentSans'}}>
                                View All Project
                              <ChevronRight size={16} />
                          </LocalizedLink>
                      </div>
                  </FadeUpSection>
                </div>

                <ProjectGrid projects={projects}/>

                {/* <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
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
                </div> */}
                {/* <VenuesGrid /> */}
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
);
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
const ProjectGrid = ({projects})=>
{
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return `https://cdn.latelia.com/latelia/${imagePath}`;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] mx-auto !px-4 md:px-0">
          <ul className={`grid grid-cols-3 gap-5`}>
            {projects.map((project, index) => (
                <FadeUpSection key={index}>
                    <li  className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-2xl mb-4 h-[400px]">
                          <img
                              src={getImageUrl(project.src)}
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
                          <LocalizedLink
                            to={`/projects/${project.id}`}
                              className="mt-4 inline-flex items-center justify-center gap-1 text-[12px] leading-[18px] xs:text-[14px] xs:leading-[20px] sm:text-[16px] sm:leading-[24px] font-bold hover:gap-2 transition-all duration-200"
                          style={{fontFamily:'InstrumentSans'}}>
                              View Project
                              <ChevronRight size={16} />
                          </LocalizedLink>
                      </div>
                    </li>
                </FadeUpSection>
            ))}
        </ul>

      </div>
    </div>
  )
}

export default Landing;