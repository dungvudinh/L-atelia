import { useState, useRef } from "react";
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
import { motion } from 'framer-motion'
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
const SLIDE_ITEMS_2 = [
    {id:1, src:slide10 },
    {id:2, src:slide11 },
    {id:3, src:slide12 },
]

function Project() {
    const {t} = useTranslation(["landing", "common"]);
    const [projectFilterId, setProjectFilterId] = useState(0);
    const [loaded, setLoaded] = useState(false);
    return ( 
        <div className="">
            {/* MAIN SLIDER */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                }}
                className="overflow-hidden"
            >
                {
                    SLIDE_ITEMS.map((slideItem, index) => (
                        <SwiperSlide key={slideItem.id}>
                            <div className="w-full xl:h-screen h-[300px] md:h-[500px] relative bg-black"> {/* 👈 bg-black */}
                                <OptimizedImage
                                    src={slideItem.src}
                                    className={`w-full h-full object-cover object-center transition-opacity duration-100
                                        ${loaded ? 'slide-image-animate' : 'opacity-0'} // 👈 ẩn cho đến khi load
                                    `}
                                    onLoad={() => {
                                        if (index === 0) setLoaded(true); // 👈 chỉ trigger khi ảnh đầu tiên load xong
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
                                        className="text-white text-[18px] md:text-[18px] xl:text-[18px]  leading-tight tracking-widest flex items-center justify-center gap-3"
                                    >
                                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                                        Projects
                                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
                                        className="text-white/75 text-[64px] md:text-[64px] xl:text-[64px] mt-4 max-w-xl"
                                    >
                                        One-of-a-kind homes, developed by L'atelia
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
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* SUBTITLE */}
            <div className="xl:mt-40 mb-10 xl:mb-40 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        Our first project was a bold vision to transform more than a century of stories into a modern home that will last for the next 100 years and beyond.
                        </h1>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                        We have since completed several projects. Each one is close to our hearts and driven by our vision, without a specific buyer in mind. When searching for a new opportunity, we are drawn to the fundamentals that make a place feel special. The location, light, space, proportions, sense of history, energy, and relationship to its surroundings.
                        </p>
                        <p style={{fontFamily:'InstrumentSans'}} className="text-[20px] text-bg-secondary mt-2">
                        Then we transform this potential into a timeless home that’s luxurious, authentic, and feels like it has always belonged.
                        </p>
                    </div>
                </FadeUpSection>
            </div>
            {/* LIST PROJECT */}
            <div className="xl:mt-8 mb-10 xl:mb-40 lg:mb-20 mt-4 flex justify-center px-4">
                <div className="xl:max-w-screen-xl lg:max-w-[900px]  w-full md:gap-4">
                    {/* FILTER */}
                    <ul className="text-[20px] flex gap-3">
                        {PROJECT_FILTERS.map((filter, index) => (
                            <li
                            key={index}
                            onClick={() => setProjectFilterId(index)}
                            className={`relative overflow-hidden px-6 py-2 rounded-md cursor-pointer text-bg-secondary group
                                ${index === projectFilterId ? 'bg-bg-secondary text-white' : 'bg-[#f4f7f4]'}`}
                            >
                            {/* Text hiện tại - trượt lên khi hover */}
                            <span className={`block transition-all duration-300 ease-in-out
                                ${'group-hover:-translate-y-full group-hover:opacity-0'}`}>
                                {filter}
                            </span>

                            {/* Text từ dưới lên - chỉ hiện khi hover */}
                            <span className={`absolute inset-0 flex items-center justify-center
                                transition-all duration-300 ease-in-out px-6
                                ${'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                {filter}
                            </span>
                            </li>
                        ))}
                        </ul>
                    {/* CONTENT */}
                    <div className="mt-8">
                        <ul className={`grid ${projectFilterId === 2 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-x-4 ${projectFilterId !== 2 ? 'gap-y-15' : 'gap-y-15'}`}>
                            {PROJECTS.map((project, index) => (
                                <FadeUpSection key={index}>
                                    <li  className="group cursor-pointer">
                                        {projectFilterId === 0 || projectFilterId === 1 ? (
                                        // --- Style All / For Sale: text đè lên ảnh ---
                                        <div className="relative overflow-hidden rounded-2xl h-[105%]">
                                            <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover  "
                                            />

                                            {/* Gradient overlay phía dưới */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl" />

                                            {/* Badge */}
                                            <span className=" absolute top-10 left-10 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                            For Sale
                                            </span>

                                            {/* Nội dung góc dưới trái */}
                                            <div className="absolute bottom-8 left-10 right-10 text-white">
                                                <h3 className=" md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px] xs:text-[28px] xs:leading-[34px]">{project.title}</h3>
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
                                        </div>

                                        ) : (
                                        <>
                                            <div className="relative overflow-hidden rounded-2xl mb-4 h-[105%]">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                                />
                                                <span className="absolute top-8 left-8 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="text-bg-secondary">
                                                <h3 className=" md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px] xs:text-[28px] xs:leading-[34px]">{project.title}</h3>
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
                                        </>
                                        )}

                                    </li>
                                </FadeUpSection>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <section className="pb-24 px-4 text-center">
                {/* Tiêu đề */}
                <h2
                    className="text-bg-secondary leading-[34px] text-[28px] lg:leading-[54px] md:text-[38px] lg:text-[48px] leading-[1.15]  max-w-[772px] mx-auto mb-10"
                >
                    Join our world of Mediterranean design and quiet luxury.
                </h2>

                {/* Form */}
                <div className="flex flex-col items-center gap-3 w-full max-w-[360px] mx-auto">
                    <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-5 py-3 rounded-md bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
                    style={{ fontFamily: 'InstrumentSans' }}
                    />
                    <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-5 py-3 rounded-lg bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
                    style={{ fontFamily: 'InstrumentSans' }}
                    />
                    <button
                        className="mt-2 py-3 px-8 rounded-lg bg-bg-secondary text-white text-[20px] cursor-pointer
                        relative overflow-hidden group"
                    >
                     <span className={`block transition-all duration-300 ease-in-out
                                ${'group-hover:-translate-y-full group-hover:opacity-0'}`}>
                                Join Now
                            </span>

                            {/* Text từ dưới lên - chỉ hiện khi hover */}
                            <span className={`absolute inset-0 flex items-center justify-center
                                transition-all duration-300 ease-in-out px-6
                                ${'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                Join Now
                            </span>
                    </button>
                </div>
            </section>
            {/* Follow Us Section */}
            <section className="px-4 md:px-8 lg:px-12 pb-16">
            {/* Label */}
                <p className="text-bg-secondary md:text-[20px] md:leading-[24px] text-[16px] leading-[20px] mb-6 mr-2" >
                    Follow us
                    @
                    <a href="https://instagram.com/berrowprojects" className="underline decoration-1 underline-offset-2">
                    L'ateliaprojects
                    </a>
                </p>
                <InViewSlider images={INSTAGRAM_IMAGES} />
           
            </section>
            <Footer withContact={true}/>
        </div>
    );
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
export default Project;