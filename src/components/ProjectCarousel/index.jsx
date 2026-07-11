import { useInView, motion } from "framer-motion"
import { useRef,useState,useCallback,useEffect  } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation,FreeMode}from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import aboutUs5 from '../../assets/images/about-us/about-us-5.webp'
import { projectsService } from "../../services/projectsService";
import {LocalizedLink} from '../../components/LocalizedLink';
import { ArrowRight} from 'lucide-react';
const PROJECTS = [
    {
        id: 1,
        src: aboutUs2,
        title: 'Cantonada',
        desc: 'Nestled in the heart of Sóller, Cantonada is a century-old townhouse reimagined for modern living.',
        link: '/projects/cantonada',
    },
    {
        id: 2,
        src: aboutUs3,
        title: 'Vistavall',
        desc: 'Set atop Valldemossa, offering panoramic views and year-round sunshine.',
        link: '/projects/vistavall',
    },
    {
        id: 3,
        src: aboutUs4,
        title: 'Mon Cor',
        desc: 'Built in 1903 during the most prosperous time in Mallorca\'s modern history, Mon Cor was an architectural marvel that set the benchmark...',
        link: '/projects/mon-cor',
    },
    {
        id: 4,
        src: aboutUs5,
        title: 'Sa M...',
        desc: 'Where the story of Berrow began...',
        link: '/projects/sa-m',
    },
]
const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return `https://cdn.latelia.com/latelia/${imagePath}`;
  };
function ProjectCarousel({ excludeProjectId = null }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
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
    useEffect(() => {
        if (projects.length > 0) {
            if (excludeProjectId) {
                const filtered = projects.filter(project => project.id !== excludeProjectId);
                setFilteredProjects(filtered);
            } else {
                setFilteredProjects(projects);
            }
        }
    }, [projects, excludeProjectId]);
    console.log(projects)
    return (
        <section ref={ref} className="w-full py-16 xl:py-24 overflow-hidden">
            <Swiper
                modules={[FreeMode]}
                freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
                slidesPerView="auto"
                spaceBetween={20}
                grabCursor={true}
                style={{ paddingLeft: '60px', paddingRight: '60px' }}
            >
                {filteredProjects.map((project, i) => (
                    <SwiperSlide
                        key={project.id}
                        style={{ width: '380px' }}
                        className="!h-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {/* Image */}
                            <LocalizedLink to={`/projects/${project.id}`}>
                                <div className="w-full h-[320px] rounded-2xl overflow-hidden mb-5">
                                    <img
                                        src={getImageUrl(project.src)}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                        draggable={false}
                                    />
                                </div>
                            </LocalizedLink>

                            {/* Title */}
                            <h3
                                className="text-bg-secondary mb-2"
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                                    fontWeight: 400,
                                    lineHeight: 1.2,
                                }}
                            >
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="text-[#4a5050] mb-4"
                                style={{
                                    fontFamily: 'InstrumentSans',
                                    fontSize: '14px',
                                    lineHeight: 1.6,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {project.description}
                            </p>

                            {/* View Project link */}
                            <LocalizedLink
                                to={`/projects/${project.id}`}
                                className="inline-flex items-center gap-2 text-bg-secondary text-[14px] group font-bold"
                                style={{ fontFamily: 'InstrumentSans' }}
                            >
                                View Project
                                <ArrowRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </LocalizedLink>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default ProjectCarousel;