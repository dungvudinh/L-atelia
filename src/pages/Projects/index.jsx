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
import { LocalizedLink } from "../../components/LocalizedLink/index.jsx";
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

function Projects() {
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
        { id: 'available', label: 'Available', count: projects.filter(p => p.status === 'available').length },
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
        <div className="w-full overflow-x-hidden">
            {/* MAIN SLIDER - Full screen trên mobile và tablet */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                }}
                className="overflow-hidden w-screen h-screen sm:h-screen md:h-screen lg:h-screen"
            >
                {
                    SLIDE_ITEMS.map((slideItem, index) => (
                        <SwiperSlide key={slideItem.id} className="w-screen h-screen">
                            <div className="w-full h-full relative bg-black">
                                <OptimizedImage
                                    src={slideItem.src}
                                    className={`w-full h-full object-cover object-center transition-opacity duration-100
                                        ${loaded ? 'slide-image-animate' : 'opacity-0'}
                                    `}
                                    onLoad={() => {
                                        if (index === 0) setLoaded(true);
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
                                        className="text-white text-[14px] sm:text-[16px] md:text-[18px] leading-tight tracking-widest flex items-center justify-center gap-2 sm:gap-3"
                                    >
                                        <div className="h-[1px] bg-white w-8 sm:w-12" style={{opacity: 1, transformOrigin:'100% 50% 0px'}}></div>
                                        Dự án
                                        <div className="h-[1px] bg-white w-8 sm:w-12" style={{opacity: 1, transformOrigin:'100% 50% 0px'}}></div>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
                                        className="text-white/75 text-[24px] sm:text-[36px] md:text-[48px] lg:text-[55px]xl:text-[64px] mt-3 sm:mt-4 max-w-3xl leading-tight px-4"
                                    >
                                        Những thiết kế nhà độc bản được phát triển bởi Latelia
                                    </motion.p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* SUBTITLE */}
            <div className="mt-8 sm:mt-12 md:mt-16 xl:mt-40 mb-8 sm:mb-12 md:mb-16 xl:mb-40 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto w-full sm:w-11/12 md:w-9/12 lg:w-10/12 xl:max-w-[1000px] text-center">
                        <div className="text-center">
                            <p className="text-bg-secondary/70 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-medium uppercase tracking-wide">
                                Mô hình bán trước - xây sau
                            </p>
                            <h1 className="text-bg-secondary text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-medium mt-2" style={{ lineHeight: 1.2 }}>
                                Vì sao Art Latelia được lựa chọn?
                            </h1>
                        </div>
                        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-bg-secondary mt-3 sm:mt-4 px-2 sm:px-0" style={{fontFamily:'Nunito Sans'}}>
                            Trong bất động sản, điều quan trọng không chỉ là mua được gì,
                            mà là mua theo cách nào. Latelia phát triển các công trình theo mô hình bán trước – xây sau, bởi chúng tôi tin đây là cách làm minh bạch – tối ưu – bền vững cho cả người mua ở thực lẫn nhà đầu tư.
                        </p>
                    </div>
                </FadeUpSection>
            </div>

            {/* LIST PROJECT */}
            <div className="mt-8 sm:mt-12 md:mt-16 xl:mt-8 mb-10 xl:mb-40 lg:mb-20 flex justify-center px-4">
                <div className="w-full max-w-full sm:max-w-[900px] xl:max-w-screen-xl">
                    {/* FILTER - Mobile responsive */}
                    <div className="overflow-x-auto pb-2 -mx-2 px-2">
                        <ul className="text-[14px] sm:text-[16px] md:text-[20px] flex gap-2 sm:gap-3 min-w-max">
                            {filters.map((filter, index) => (
                                <li
                                    key={filter.id}
                                    onClick={() => setProjectFilterId(index)}
                                    className={`relative overflow-hidden px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md cursor-pointer text-bg-secondary group whitespace-nowrap
                                        ${index === projectFilterId ? 'bg-bg-secondary text-white' : 'bg-[#f4f7f4]'}`}
                                >
                                    <span className="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0 text-[16px] sm:text-[14px] md:text-[20px]">
                                        {filter.label}
                                        {filter.count > 0 && (
                                            <span className="ml-1 text-[12px] md:text-sm xl:text-lg opacity-60">({filter.count})</span>
                                        )}
                                    </span>
                                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out px-4 sm:px-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-[12px] sm:text-[14px] md:text-[16px]">
                                        {filter.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-8">
    {filteredProjects.length === 0 ? (
        <p className="text-center text-bg-secondary text-[18px] py-20" style={{ fontFamily: 'Nunito Sans' }}>
            No projects found.
        </p>
    ) : (
        <ul className={`grid ${projectFilterId === 2 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-5 md:gap-y-15`}>
            {filteredProjects.map((project, index) => (
                <FadeUpSection key={project.id || index}>
                    <li className="group cursor-pointer">
                        {projectFilterId === 0 || projectFilterId === 1 ? (
                            // Style All / For Sale
                            <>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={getImageUrl(project.src)}
                                        alt={project.alt || project.title}
                                        className="w-full h-[300px] sm:h-[400px] md:h-[105%] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl" />
                                    <span className="absolute top-4 md:top-10 left-4 md:left-10 bg-white text-bg-secondary text-[16px] md:text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                        {project.type === 'sale' ? 'For sale' : 'For rent'}
                                    </span>
                                    {/* Text overlay - chỉ hiển thị trên tablet/desktop */}
                                    <div className="hidden md:block absolute bottom-4 md:bottom-8 left-4 md:left-10 text-white">
                                        <h3 className="md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px]">
                                            {project.title}
                                        </h3>
                                        <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{ fontFamily: 'Nunito Sans' }}>
                                            {project.description}
                                        </p>
                                        <LocalizedLink
                                            to={`/projects/${project.id}`}
                                            className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-bold hover:gap-2 transition-all duration-200"
                                            style={{ fontFamily: 'Nunito Sans' }}
                                        >
                                            View Project
                                            <ChevronRight size={16} />
                                        </LocalizedLink>
                                    </div>
                                </div>
                                {/* Text bên dưới ảnh - chỉ hiển thị trên mobile */}
                                <div className="md:hidden text-bg-secondary mt-3">
                                    <h3 className="text-[28px] leading-[34px]">
                                        {project.title}
                                    </h3>
                                    <p className="text-[14px] leading-[20px] mt-2 line-clamp-2" style={{ fontFamily: 'Nunito Sans' }}>
                                        {project.description}
                                    </p>
                                    <LocalizedLink
                                        to={`/projects/${project.id}`}
                                        className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-bold hover:gap-2 transition-all duration-200"
                                        style={{ fontFamily: 'Nunito Sans' }}
                                    >
                                        View Project
                                        <ChevronRight size={16} />
                                    </LocalizedLink>
                                </div>
                            </>
                        ) : (
                            // Style Sold
                            <>
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <img
                                        src={getImageUrl(project.src)}
                                        alt={project.alt || project.title}
                                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <span className="absolute top-8 left-8 bg-white text-bg-secondary text-[20px] font-medium px-3 py-1 rounded-md shadow-sm">
                                        {project.status === 'sold' ? 'Sold' : 'For Sale'}
                                    </span>
                                </div>
                                <div className="text-bg-secondary">
                                    <h3 className="md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[54px] text-[28px] leading-[34px]">
                                        {project.title}
                                    </h3>
                                    <p className="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mt-2 line-clamp-2" style={{ fontFamily: 'Nunito Sans' }}>
                                        {project.description}
                                    </p>
                                    <a
                                        href={`/projects/${convertToSlug(project.title)}`}
                                        className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-bold hover:gap-2 transition-all duration-200"
                                        style={{ fontFamily: 'Nunito Sans' }}
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

export default Projects;