import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronDown, Check, Scale } from "lucide-react"
import { motion, AnimatePresence, useInView,useScroll,useTransform  } from "framer-motion"
import { useParams } from "react-router-dom"
import { LocalizedLink } from "../../components/LocalizedLink"
import OptimizedImage from "../../components/OptimizedImage"
import Footer from "../../layouts/components/Footer"
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import JoinNewsletter from "../../components/JoinNewsletter"
import FollowUs from "../../components/FollowUs"
import ProjectCarousel from "../../components/ProjectCarousel"
import { projectsService } from "../../services/projectsService"
import PageTransition from "../../components/PageTransition"
const BASE_CDN_URL = 'https://cdn.latelia.com/latelia/'

// ── 1. FadeUpSection ──────────────────────────────────────────────────────
const FadeUpSection = ({ children, delay = 0 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    )
}

// ── 2. FadeImage — ảnh animate khi scroll ─────────────────────────────────
const FadeImage = ({ src, alt = "", className = "", style = {}, delay = 0,aspectRatio = "4/5" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden ${className} rounded-3xl`}
            style={{aspectRatio, ...style}}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
        >
            <motion.div
                className="w-full h-full rounded-3xl"
                initial={{ scale: 1.07 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay }}
            >
                <OptimizedImage src={src} alt={alt} className="w-full h-full object-cover rounded-3xl" />
            </motion.div>
        </motion.div>
    )
}
const ScaleImage = ({
    src,
    alt = "",
    className = "",
    style = {},
  }) => {
    const ref = useRef(null)
  
    const { scrollYProgress } = useScroll({
      target: ref,
      // progress = 0: mép trên ảnh chạm đáy viewport (ảnh vừa xuất hiện)
      // progress = 1: ảnh đã nằm giữa viewport (đã cuộn tới)
      offset: ["start end", "center center"],
    })
  
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
    const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  
    return (
      <div
        ref={ref}
        className={`overflow-hidden ${className} rounded-3xl`}
        style={{ ...style }}
      >
        <motion.div style={{ scale, y }} className="w-full">
          <OptimizedImage
            src={src}
            alt={alt}
            className=" object-cover rounded-3xl "
          />
        </motion.div>
      </div>
    )
  }
// ── 3. BrochureLink — nút View Brochure tái sử dụng ──────────────────────
const BrochureLink = ({ to, light = false, className = "" }) => (
    <LocalizedLink
        to={to}
        className={`inline-flex items-center gap-2 group font-bold ${className}`}
        style={{
            fontFamily: 'Nunito Sans',
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: light ? '#fff' : 'var(--color-bg-secondary, #1a1a1a)',
            textDecoration: 'none',
            letterSpacing: '0.3px',
        }}
    >
        View Brochure
        <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
    </LocalizedLink>
)

// ── 4. SpecBadge — pill specification ────────────────────────────────────
const SpecBadge = ({ spec }) => (
    <span
        className="inline-block px-3 py-1.5 text-sm border border-bg-secondary/20 rounded-full text-bg-secondary"
        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(12px, 1vw, 14px)' }}
    >
        {spec.text}
    </span>
)

// ── 5. SectionAccordion — phần đặc biệt với Read More ────────────────────
const SectionAccordion = ({ section }) => {
    const [open, setOpen] = useState(false)
    return (
        <FadeUpSection>
            <div className="pb-10 md:pb-14">
                <div className="max-w-[820px] mx-auto px-4 text-center">
                    <h3
                        className="text-bg-secondary mb-6 md:mb-8 tracking-wide"
                        style={{
                            fontSize: 'clamp(26px, 3.5vw, 46px)', lineHeight: 1.2,
                            letterSpacing: '0.02em',
                        }}
                    >
                        {section.title}
                    </h3>

                    <div className="w-full mx-auto">
                        <p
                            className="text-bg-secondary/70"
                            style={{
                                fontSize: 'clamp(15px, 1.3vw, 18px)',
                                lineHeight: 1.9,
                                fontFamily:'Nunito Sans'
                            }}
                        >
                            {section.shortDescription}
                        </p>

                        {/* Read More expand */}
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p
                                        className="text-bg-secondary/70 mt-4"
                                        style={{ fontSize: 'clamp(15px, 1.1vw, 20px)', letterSpacing: '0.2px' }}
                                    >
                                        {section.fullDescription}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* <button
                            onClick={() => setOpen(o => !o)}
                            className="flex items-center gap-1.5 mt-5 mx-auto text-bg-secondary font-medium group"
                            style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(13px, 1vw, 15px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            {open ? 'Read less' : 'Read more'}
                            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown size={14} />
                            </motion.span>
                        </button> */}
                    </div>
                </div>
            </div>
        </FadeUpSection>
    )
}

// ── 6. MAIN COMPONENT ─────────────────────────────────────────────────────
function ProjectDetail() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchProjectDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            
            
            if (!projectId) {
                throw new Error('Project ID is required');
            }

            const response = await projectsService.getProjectById(projectId);
            const galleryUrls = response.data?.gallery?.map(item => `${BASE_CDN_URL}${item.key}`) || [];
            // Set project data
            setProject(response.data || response);
            
        } catch (err) {
            console.error('❌ Failed to fetch project detail:', err);
            setError(err.message || 'Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        if (projectId) {
            fetchProjectDetail();
        }
    }, [projectId]);
    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-txt-gray text-lg">Loading project details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h2 className="text-xl">Error</h2>
                        <p>{error}</p>
                        <button 
                            onClick={fetchProjectDetail}
                            className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Project not found
    if (!project) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        <h2 className="text-xl">Project Not Found</h2>
                        <p>The requested project could not be found.</p>
                        <LocalizedLink to="/projects">
                            <button className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700">
                                Back to Projects
                            </button>
                        </LocalizedLink>
                    </div>
                </div>
            </div>
        );
    }

    // TODO: thay bằng fetch thực tế
    // const project = MOCK_PROJECT

    return (
        <div>
            {/* ════════════════════════════════════════
                ① HERO BANNER
            ════════════════════════════════════════ */}
            <div className="w-full h-screen relative overflow-hidden ">
                <OptimizedImage
                    src={`${BASE_CDN_URL}${project?.gallery?.[0]?.key}`} 
                    alt={project.name}
                    className="object-cover w-full h-full object-center"
                    style={{ filter: 'brightness(0.68)' }}
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 100%, transparent 60%)' }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

                    {/* Project name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 400, lineHeight: 1.05, marginBottom: '16px' }}
                    >
                        {project.name}
                    </motion.h1>

                    {/* Features row — từ project.features */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-0 mb-6"
                        style={{ fontSize: 'clamp(15px, 1.1vw, 22px)', letterSpacing: '0.2px' }}
                    >
                        
                        {project?.propertyFeatures?.length > 0 && project.propertyFeatures.map((feature, i) => (
                            <span key={feature._id || i} className="flex items-center opacity-90">
                                {feature.text}
                                {i < project.propertyFeatures.length - 1 && <span className="mx-3 opacity-40">|</span>}
                            </span>
                        ))}
                    </motion.div>

                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
                        className="mb-5"
                    >
                        <span
                            className="inline-block px-4 py-1.5 rounded-lg bg-white text-bg-secondary font-medium"
                            style={{ fontSize: 'clamp(20px, 1vw, 25px)' }}
                        >
                            {project.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                    </motion.div>

                    {/* Brochure CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                    >
                        <BrochureLink to={`/view-brochure/${project._id}`} light />
                    </motion.div>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ② INTRO TEXT
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-40 mb-16 xl:mb-32 flex justify-center px-6">
                <FadeUpSection>
                    <div className="max-w-[760px] text-center">
                        <h2
                            className="text-bg-secondary"
                            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', lineHeight: 1.2 }}
                        >
                            {project.title}
                        </h2>
                        <p
                            className="text-bg-secondary/70 mt-8"
                            style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.7 }}
                        >
                            {project.description}
                        </p>
                        <div className="mt-10 flex justify-center">
                            <BrochureLink to={`/view-brochure/${project._id}`}  />
                        </div>
                    </div>
                </FadeUpSection>
            </div>

            {/* ════════════════════════════════════════
                ③ PHOTO GALLERY — BLOCK 1-3
            ════════════════════════════════════════ */}
            <div className="px-4 md:px-8 xl:px-14  flex items-center justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] space-y-3 flex flex-col items-center">
                    {/* Ảnh 1 — full width */}
                    <ScaleImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                        className="w-[80%] h-full"
                        // style={{ height: 'clamp(200px, 40vw, 660px)' }}
                    />

                    {/* Ảnh 2 + 3 — 2 cột bằng nhau */}
                    <div className="flex w-full mt-20 gap-20 flex-row items-center justify-center">
                        <ScaleImage
                              src={`${BASE_CDN_URL}${project?.gallery?.[2]?.key}`} 
                            className="flex-1 w-full"
                            delay={0}
                        />
                        <ScaleImage
                            src={`${BASE_CDN_URL}${project?.gallery?.[3]?.key}`} 
                            className="flex-1 w-full "
                            delay={0.1}
                        />
                    </div>
                    
                </div>

            </div>

            {/* ════════════════════════════════════════
                ④ SPECIFICATIONS
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-36 px-6">
                <div className="max-w-[900px] mx-auto">
                    <FadeUpSection>
                        {/* Property Features grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mb-14 pb-14 border-b border-bg-secondary/10">
                        {project?.propertyFeatures?.map(({ text, _id }, index) => (
                            <div key={_id || index}>
                                <p className="text-bg-secondary/40 text-sm uppercase tracking-widest mb-1"
                                    style={{ fontFamily: 'Nunito Sans' }}>
                                    {text}
                                </p>
                                {/* <p className="text-bg-secondary font-medium"
                                        style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
                                        {value}
                                    </p> */}
                            </div>
                        ))}
                        </div>

                        {/* Property Highlights */}
                        <div className="mb-10">
                            <h3 className="text-bg-secondary font-medium mb-5"
                                style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
                                Property Highlights
                            </h3>
                            {/* <ul className="space-y-2">
                                {project?.propertyHighlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-bg-secondary/70"
                                        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
                                        <Check size={16} className="mt-0.5 flex-shrink-0 text-bg-secondary" />
                                        {h}
                                    </li>
                                ))}
                            </ul> */}
                            <div className="space-y-10">
                                {project?.propertyHighlights.map((highlight, i) => {
                                    const features = highlight.featureSections?.filter(
                                        (f) => f.name?.trim() || f.description?.trim()
                                    );

                                    return (
                                        <div key={highlight._id ?? i} className="space-y-3">
                                            {/* Title */}
                                            {highlight.title && (
                                                <h3
                                                    className="text-bg-secondary flex items-start gap-3"
                                                    style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(18px, 1.6vw, 22px)' }}
                                                >
                                                    <Check size={18} className="mt-1 flex-shrink-0 text-bg-secondary" />
                                                    {highlight.title}
                                                </h3>
                                            )}

                                            {/* Description */}
                                            {highlight.description && (
                                                <p
                                                    className="text-bg-secondary/70 pl-8 whitespace-pre-line"
                                                    style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(15px, 1.2vw, 17px)' }}
                                                >
                                                    {highlight.description}
                                                </p>
                                            )}

                                            {/* Feature sections */}
                                            {features?.length > 0 && (
                                                <ul className="pl-8 space-y-2 border-l border-bg-secondary/15">
                                                    {features.map((f) => (
                                                        <li key={f._id} className="pl-4">
                                                            {f.name && (
                                                                <span
                                                                    className="block text-bg-secondary/90"
                                                                    style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(14px, 1.1vw, 16px)' }}
                                                                >
                                                                    {f.name}
                                                                </span>
                                                            )}
                                                            {f.description && (
                                                                <span
                                                                    className="block text-bg-secondary/60"
                                                                    style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(13px, 1vw, 15px)' }}
                                                                >
                                                                    {f.description}
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Specifications pills */}
                        <div>
                            <h3 className="text-bg-secondary font-medium mb-4"
                                style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
                                Specifications
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.specifications.map((spec, i) => (
                                    <SpecBadge key={i} spec={spec} />
                                ))}
                            </div>
                        </div>
                    </FadeUpSection>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑤ GALLERY — BLOCK 4-5 + TEXT XEN
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-36 px-4 md:px-8 xl:px-14 flex justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] flex flex-col items-center">
                    {/* Block 4: full-width */}
                    <ScaleImage src={`${BASE_CDN_URL}${project?.gallery?.[4]?.key}`}  className="w-[80%] h-full"
                        // style={{ height: 'clamp(280px, 52vw, 840px)' }} 
                        />
                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑥ CÁC PHẦN ĐẶC BIỆT — Accordion
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-36 flex items-center justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px]">

                    {project?.specialSections && project?.gallery && (() => {
                        const sections = project.specialSections;
                        const images = project.gallery;
                        let imageIndex = 5; // Bắt đầu từ gallery[8]
                        const elements = [];

                        // Hàm lấy 3 ảnh tiếp theo
                        const getNextThreeImages = () => {
                            if (imageIndex >= images.length) return null;
                            
                            const result = [];
                            for (let i = 0; i < 3 && imageIndex < images.length; i++) {
                                result.push(images[imageIndex]);
                                imageIndex++;
                            }
                            return result;
                        };

                        // Lặp qua từng section và thêm 3 ảnh sau mỗi section
                        sections.forEach((section, index) => {
                            // Thêm Section
                            elements.push(
                                <SectionAccordion key={`section-${index}`} section={section} />
                            );

                            // Thêm 3 ảnh sau section (nếu còn ảnh)
                            const nextImages = getNextThreeImages();
                            if (nextImages && nextImages.length > 0) {
                                elements.push(
                                    <div key={`images-${index}`} className="px-4 md:px-8 xl:px-14 space-y-3 flex flex-col items-center pb-20">
                                        {/* Ảnh 1 — full width */}
                                        <ScaleImage
                                            src={`${BASE_CDN_URL}${nextImages[0]?.key}`}
                                            className="w-[80%] h-full"
                                            // style={{ height: 'clamp(200px, 40vw, 560px)' }}
                                            delay={0}
                                        />

                                        {/* Ảnh 2 + 3 — 2 cột bằng nhau */}
                                        <div className="flex gap-20 mt-20 flex-row items-center justify-center">
                                            {nextImages[1] && (
                                                <ScaleImage
                                                    src={`${BASE_CDN_URL}${nextImages[1].key}`}
                                                    className="flex-1 w-full h-full"
                                                    delay={0}
                                                />
                                            )}
                                            {nextImages[2] && (
                                                <ScaleImage
                                                    src={`${BASE_CDN_URL}${nextImages[2].key}`}
                                                    className="flex-1 w-full"
                                                    delay={0.1}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        });

                        return elements;
                    })()}
                </div>
            </div>
            <ProjectCarousel excludeProjectId={projectId}/>
            <JoinNewsletter />
            <FollowUs />
            <Footer withContact={false} />
        </div>
    )
}
export default ProjectDetail
