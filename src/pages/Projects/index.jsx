import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide2 from '../../assets/images/slides/slide2.jpg';

import {  ChevronRight } from "lucide-react";
import Footer from "../../layouts/components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import { motion } from 'framer-motion'
import { useInView } from "framer-motion";
import JoinNewsletter from "../../components/JoinNewsletter";
import FollowUs from "../../components/FollowUs";
import {projectsService} from '../../services/projectsService.js'
const SLIDE_ITEMS = [
    {id:1, src:slide2 },
]
const FALLBACK_IMAGES = [
  {
    id: 1,
    title: "Mon Cor",
    description: "Built in 1903 during the most prosperous time in Mallorca's modern history.",
    status: "available",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
  {
    id: 2,
    title: "Vistavall",
    description: "Set atop Valldemossa, offering panoramic views and year-round sunshine.",
    status: "sold",
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  },
];
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return `https://cdn.latelia.com/latelia/${imagePath}`;
};
const convertToSlug = (title) => {
  return title
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') || 'project';
};

function Project() {
    const {t} = useTranslation(["landing", "common"]);
    const [projectFilterId, setProjectFilterId] = useState(0);
    const [loaded, setLoaded] = useState(false);
    // ---- Data States ----
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const filters = [
        { id: 'all', label: 'All', count: projects.length },
        { id: 'available', label: 'For Sale', count: projects.filter(p => p.status === 'available').length },
        { id: 'sold', label: 'Sold', count: projects.filter(p => p.status === 'sold').length },
    ];
    const fetchProjects = useCallback(async () => {
        try {
        setLoading(true);
        setError(null);

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

        const finalProjects = transformedProjects.length > 0 ? transformedProjects : FALLBACK_IMAGES;
        setProjects(finalProjects);
        setFilteredProjects(finalProjects);
        } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Using fallback data.');
        setProjects(FALLBACK_IMAGES);
        setFilteredProjects(FALLBACK_IMAGES);
        } finally {
        setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    useEffect(() => {
        const activeFilter = filters[projectFilterId]?.id;
        if (activeFilter === 'all') {
        setFilteredProjects(projects);
        } else {
        setFilteredProjects(projects.filter(p => p.status === activeFilter));
        }
    }, [projectFilterId, projects]);
    if (loading) {
    return (
        <div className="mt-20 flex justify-center items-center min-h-screen px-4">
            <div className="text-center">
            <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-txt-gray text-lg">Loading projects...</p>
            </div>
        </div>
        );
    }
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
                        {filters.map((filter, index) => (
                        <li
                            key={filter.id}
                            onClick={() => setProjectFilterId(index)}
                            className={`relative overflow-hidden px-6 py-2 rounded-md cursor-pointer text-bg-secondary group
                            ${index === projectFilterId ? 'bg-bg-secondary text-white' : 'bg-[#f4f7f4]'}`}
                        >
                            <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                            {filter.label}
                            {filter.count > 0 && (
                                <span className="ml-1 text-sm opacity-60">({filter.count})</span>
                            )}
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out px-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            {filter.label}
                            </span>
                        </li>
                        ))}
                    </ul>
                    {/* CONTENT */}
                    <div className="mt-8">
                        {filteredProjects.length === 0 ? (
                        <p className="text-center text-bg-secondary text-[18px] py-20" style={{ fontFamily: 'InstrumentSans' }}>
                            No projects found.
                        </p>
                        ) : (
                        <ul className={`grid ${projectFilterId === 2 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-15`}>
                            {filteredProjects.map((project, index) => (
                            <FadeUpSection key={project.id || index}>
                                <li className="group cursor-pointer">
                                {projectFilterId === 0 || projectFilterId === 1 ? (
                                    // Style All / For Sale
                                    <div className="relative overflow-hidden rounded-2xl h-[105%]">
                                    <img
                                        src={getImageUrl(project.src)}
                                        alt={project.alt || project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl" />
                                    <span className="absolute top-10 left-10 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                        For Sale
                                    </span>
                                    <div className="absolute bottom-8 left-10 right-10 text-white">
                                        <h3 className="md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px]">
                                        {project.title}
                                        </h3>
                                        <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{ fontFamily: 'InstrumentSans' }}>
                                        {project.description}
                                        </p>
                                        <a
                                        href={`/projects/${convertToSlug(project.title)}`}
                                        className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-bold hover:gap-2 transition-all duration-200"
                                        style={{ fontFamily: 'InstrumentSans' }}
                                        >
                                        View Project
                                        <ChevronRight size={16} />
                                        </a>
                                    </div>
                                    </div>
                                ) : (
                                    // Style Sold
                                    <>
                                    <div className="relative overflow-hidden rounded-2xl mb-4 h-[105%]">
                                        <img
                                        src={getImageUrl(project.src)}
                                        alt={project.alt || project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        />
                                        <span className="absolute top-8 left-8 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                        {project.status === 'sold' ? 'Sold' : 'For Sale'}
                                        </span>
                                    </div>
                                    <div className="text-bg-secondary">
                                        <h3 className="md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px]">
                                        {project.title}
                                        </h3>
                                        <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{ fontFamily: 'InstrumentSans' }}>
                                        {project.description}
                                        </p>
                                        <a
                                        href={`/projects/${convertToSlug(project.title)}`}
                                        className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-bold hover:gap-2 transition-all duration-200"
                                        style={{ fontFamily: 'InstrumentSans' }}
                                        >
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
                        )}
                    </div>
                </div>
            </div>
            <JoinNewsletter />
            <FollowUs />
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

export default Project;