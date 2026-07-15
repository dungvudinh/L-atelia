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
import img11 from '../../assets/images/img11.webp'
import banner2 from '../../assets/images/banner/banner2.webp'
import banner3 from '../../assets/images/banner/banner3.webp'
import banner4 from '../../assets/images/banner/banner4.webp'
import banner5 from '../../assets/images/banner/banner5.webp'

const BANNER_IMAGES = [
  banner2,
  banner3,
  banner4,
  banner5
  ]

const sizeMap = {
  sm: { width: "16%",  height: 160 },
  md: { width: "16%",  height: 240 },
  lg: { width: "16%",  height: 340 },
};
const mobileSizeMap = {
  md: { width: "30%", height: 120 },
  lg: { width: "30%", height: 160 },
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
    
    // Thêm các class này vào component Landing của bạn

return ( 
  <div className="w-full overflow-x-hidden">
      {/* MAIN SLIDER */}
      <Banner />
      
      <div className="py-[30px] sm:py-[60px] lg:py-[100px] flex justify-center px-4">
          <div className="w-full max-w-full sm:max-w-[900px] xl:max-w-screen-2xl flex flex-col items-center mx-auto md:px-4 px-0">
              
              {/* Hero Section - Mobile responsive */}
              <div
                  className="relative z-50 -translate-y-[30px] sm:-translate-y-[50px] text-center bg-white min-h-[300px] sm:h-[500px] flex flex-col items-center w-full md:px-4 sm:px-0"
                  style={{
                      opacity: Math.min(currentScrollY / 800, 0.8),
                      transform: `translateY(${-Math.min(currentScrollY * 0.3, 60)}px)`,
                  }}
              >
                  <h1 className="text-[20px] sm:text-[28px] md:text-[32px] lg:text-[40px] text-bg-secondary font-medium leading-tight sm:leading-normal ">
                      Latelia là đơn vị phát triển bất động sản tại thành phố biển Đà Nẵng
                  </h1>
                  
                  <ProjectGallery />
                  
                  <div className="mb-5 w-full max-w-full sm:max-w-[772px] text-center md:mb-7 px-4 sm:px-0">
                      <h4 className="text-bg-secondary text-[16px] leading-[22px] xs:text-[20px] xs:leading-[26px] md:text-[24px] md:leading-[30px] lg:text-[32px] lg:leading-[38px] text-center">
                          Chúng tôi phát triển các dự án tại Đà Nẵng – thành phố đáng sống, nơi hội tụ thiên nhiên, nhịp sống hiện đại và tiềm năng bền vững.
                      </h4>
                  </div>
              </div>

              {/* Image with overlay - Mobile */}
              <div ref={ref} className="xl:mt-[80px] md:mt-[-80px] mt-[-80px] w-full flex justify-center items-center px-4 sm:px-0">
                  <div className="relative w-full max-w-full sm:max-w-[900px] xl:max-w-screen-2xl flex items-center justify-between mx-auto">
                      <img 
                          src={img11} 
                          className="rounded-2xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-full w-full object-cover"
                          alt="Latelia" 
                      />

                      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

                      <motion.div
                          style={{ y }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center w-full px-4"
                      >
                          <h4 className="text-[36px] xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-medium tracking-tight">
                              L'ATELIA
                          </h4>
                          <p className="text-[16px] xs:text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-light italic mt-2 md:mt-4">
                              Khởi đầu từ một niềm tin
                          </p>
                      </motion.div>
                  </div>
              </div>

              {/* About Section - Mobile */}
              <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-8 sm:mt-4 flex justify-center px-4">
                  <FadeUpSection>
                      <div className="mx-auto w-full sm:w-11/12 md:w-9/12 lg:w-10/12 text-center">
                          <h1 className="text-bg-secondary text-[28px] sm:text-[36px] md:text-[48px] text-center font-medium leading-tight sm:leading-normal">
                              Chúng tôi chọn xây những ngôi nhà có dấu ấn.
                          </h1>
                          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-bg-secondary mt-3 sm:mt-4 px-2 sm:px-0" style={{fontFamily:'Nunito Sans'}}>
                              Art Latelia được hình thành từ mong muốn kiến tạo nên những công trình nhà ở mang giá trị nghệ thuật, kiến trúc hiện đại và cảm xúc sống trọn vẹn cho chủ nhân. 
                              Mỗi ngôi nhà là một tác phẩm được "đo ni đóng giày" theo phong cách sống, gu thẩm mĩ và tầm nhìn dài hạn của người sở hữu.
                          </p>
                          <LocalizedLink
                              to="/projects"
                              className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] sm:text-[16px] font-bold hover:gap-2 transition-all duration-200"
                              style={{fontFamily:'Nunito Sans'}}>
                              View All Project
                              <ChevronRight size={16} />
                          </LocalizedLink>
                      </div>
                  </FadeUpSection>
              </div>

              <ProjectGrid projects={projects}/>

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
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl gap-12 z-10">
              <div className="flex items-center gap-12 relative">
                <LocalizedLink to="/projects" className="hidden md:block link-underline cursor-pointer absolute left-[-300px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Dự án
                </LocalizedLink>
                <LocalizedLink to="/media" className="hidden md:block link-underline cursor-pointer absolute left-[-140px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Media
                </LocalizedLink>
                <img src={logo} className="h-[100px] md:h[130px]"/>
                <LocalizedLink to="/about" className="hidden md:block link-underline cursor-pointer absolute right-[-180px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Về chúng tôi
                </LocalizedLink>
                <LocalizedLink to="/contact" className="hidden md:block link-underline cursor-pointer absolute right-[-340px]
                text-underline text-[32px] leading-[38px] md:text-[24px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">
                  Liên hệ
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
        {/* White overlay tăng dần khi cuộn, đạt 100% opacity = trắng hoàn toàn */}
        <div
          className="absolute inset-0 pointer-events-none h-full"
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
const ProjectGallery = () => {
  // Lấy 3 item ở giữa (md, lg, md)
  const mobileImages = images.slice(1, 4); // index 1, 2, 3
  
  return (
    <>
      {/* Mobile: hiển thị 3 item md, lg, md */}
      <div className="flex items-center justify-center gap-2 px-2 py-6 w-full md:hidden">
        {mobileImages.map((img, i) => {
          const size = mobileSizeMap[img.size];
          return (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ 
                width: size.width, 
                height: size.height 
              }}
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
      
      {/* Desktop: hiển thị tất cả 5 item */}
      <div className="hidden md:flex items-center justify-center gap-4 xl:px-8 py-12 px-0 w-full">
        {images.map((img, i) => {
          const { width, height } = sizeMap[img.size];
          return (
            <div
              key={i}
              className={`flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105  md:h-[${height*3/2}px]`}
              style={{ width }}
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
    </>
  );
};
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
const ProjectGrid = ({projects}) => {
  const getImageUrl = (imagePath) => {
      if (!imagePath) return '';
      return `https://cdn.latelia.com/latelia/${imagePath}`;
  };
  
  return (
      <div className="flex justify-center items-center w-full px-4 sm:px-0">
          <div className="w-full max-w-full sm:max-w-[900px] xl:max-w-screen-2xl mx-auto">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {projects.map((project, index) => (
                      <FadeUpSection key={index}>
                          <li className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-2xl mb-3 sm:mb-4 h-[250px] sm:h-[350px] md:h-[400px]">
                                  <img
                                      src={getImageUrl(project.src)}
                                      alt={project.title}
                                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                  />
                              </div>
                              <div className="text-bg-secondary px-2 sm:px-0">
                                  <h3 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-tight sm:leading-normal">
                                      {project.title}
                                  </h3>
                                  <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2 sm:line-clamp-3" 
                                     style={{fontFamily:'Nunito Sans'}}>
                                      {project.description}
                                  </p>
                                  <LocalizedLink
                                      to={`/projects/${project.id}`}
                                      className="mt-3 sm:mt-4 inline-flex items-center justify-center gap-1 text-[14px] sm:text-[16px] font-bold hover:gap-2 transition-all duration-200"
                                      style={{fontFamily:'Nunito Sans'}}>
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
  );
};

export default Landing;