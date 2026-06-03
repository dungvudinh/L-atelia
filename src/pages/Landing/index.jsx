import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide2 from '../../assets/images/slides/slide2.jpg';
import slide3 from '../../assets/images/slides/slide3.jpg';
import slide4 from '../../assets/images/slides/slide4.jpg';
import slide5 from '../../assets/images/slides/slide5.jpg';
import slide6 from '../../assets/images/slides/slide6.jpg';
import slide7 from '../../assets/images/slides/slide7.jpg';
import slide8 from '../../assets/images/slides/slide8.jpg';
import slide9 from '../../assets/images/slides/slide9.jpg';
import slide10 from '../../assets/images/slides/slide10.jpg';
import slide11 from '../../assets/images/slides/slide11.jpg';
import slide12 from '../../assets/images/slides/slide12.jpg';
import logoText from '../../assets/images/logo-text.png';
import { ArrowRight, ChevronRight } from "lucide-react";
import img2 from '../../assets/images/img2.jpg';
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import OptimizedImage from "../../components/OptimizedImage";
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from "framer-motion";
const SLIDE_ITEMS = [
    {id:1, src:slide2 },
    // {id:2, src:slide3 },
    // {id:3, src:slide4 },
    // {id:4, src:slide6 },
    // {id:4, src:slide7 },
    // {id:4, src:slide8 },
    // {id:4, src:slide9 },
]
const PROJECT_FILTERS= ['All', 'For Sale', 'Sold'];
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
  const INSTAGRAM_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
]
const BANNER_IMAGES = [
    "https://cdn.sanity.io/images/bxdajbsn/production/228e1c8f6b1c6e96adacf0bbdedb4d0a418c04b1-4000x3076.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/96494324d88cc4526bdc56376411b6138e39e779-4000x4000.jpg",
    "https://cdn.sanity.io/images/bxdajbsn/production/a726e8941d2121cd6566e13cbbc0b2a8716d1374-3780x2520.jpg",
  ]
const SLIDE_ITEMS_2 = [
    {id:1, src:slide10 },
    {id:2, src:slide11 },
    {id:3, src:slide12 },
]

function Landing() {
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const {t} = useTranslation(["landing", "common"]);
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
            <div className="relative z-50 -translate-y-50 text-center text-white">
              <h1 className="text-4xl opacity-0" style={{opacity: Math.min(currentScrollY / 500, 0.8)}}>Berrow is a family</h1>

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
        <div className="absolute inset-0 h-full w-full" style={{opacity: 1 - Math.min(currentScrollY / 500, 0.8)}}>
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
                {/* Hiệu ứng Ken Burns: ảnh zoom chậm từ 1 → 1.1 */}
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
            <div className="absolute top-1/2 left-1/2 text-white text-4xl hover:underline cursor-pointer">
              Dự án
            </div>

          </div>
        </div>
  
        {/* Overlay tối nhẹ */}

        {/* Nội dung đè lên ảnh */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-[48px] md:text-[64px] font-serif leading-tight max-w-3xl">
            Berrow is a family-led architectural design-build team based in Mallorca.
          </h1>
        </div> */}
  
        {/* Dots indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNER_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div> */}
      </div>
    )
}
  
export default Landing;