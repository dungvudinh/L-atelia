import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronDown, Check, Scale } from "lucide-react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
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
const FadeImage = ({ src, alt = "", className = "", style = {}, delay = 0, aspectRatio = "4/5" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden ${className} rounded-3xl`}
            style={{ aspectRatio, ...style }}
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

const ScaleImage = ({ src, alt = "", className = "", style = {} }) => {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
    const y = useTransform(scrollYProgress, [0, 1], [60, 0])

    return (
        <div ref={ref} className={` ${className}`} style={{ ...style }}>
            <motion.div style={{ scale, y }} className="w-full rounded-2xl md:rounded-3xl">
                <OptimizedImage
                    src={src}
                    alt={alt}
                    className=" object-cover rounded-3xl w-full h-full"
                />
            </motion.div>
        </div>
    )
}

// ── 3. BrochureLink ────────────────────────────────────────────────────
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

// ── 4. SpecBadge ──────────────────────────────────────────────────────
const SpecBadge = ({ spec }) => (
    <span
        className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 text-sm border border-bg-secondary/20 rounded-full text-bg-secondary
        text-[13px] leading-[18px] xs:text-[14px] sm:text-[16px] sm:leading-[22px]"
        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(12px, 1vw, 14px)' }}
    >
        {spec.text}
    </span>
)

// ── 5. SectionAccordion ───────────────────────────────────────────────
const SectionAccordion = ({ section }) => {
    const [open, setOpen] = useState(false)
    return (
        <FadeUpSection>
            <div className="pb-8 sm:pb-10 md:pb-14">
                <div className="max-w-[820px] mx-auto px-4 sm:px-6 text-center">
                    <h3
                        className="text-bg-secondary mb-4 sm:mb-6 md:mb-8 tracking-wide"
                        style={{
                            fontSize: 'clamp(24px, 3.5vw, 46px)', lineHeight: 1.2,
                            letterSpacing: '0.02em',
                        }}
                    >
                        {section.title}
                    </h3>

                    <div className="w-full mx-auto">
                        <p
                            className="text-bg-secondary/70"
                            style={{
                                fontSize: 'clamp(15px, 1.3vw, 19px)',
                                lineHeight: 1.8,
                                fontFamily: 'Nunito Sans'
                            }}
                        >
                            {section.shortDescription}
                        </p>

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
                                        style={{ fontSize: 'clamp(14px, 1.1vw, 20px)', letterSpacing: '0.2px' }}
                                    >
                                        {section.fullDescription}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
    return (
        <div>
            {/* ════════════════════════════════════════
                ① HERO BANNER
            ════════════════════════════════════════ */}
            <div className="w-full h-screen relative overflow-hidden">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        style={{ fontSize: 'clamp(32px, 7vw, 72px)', fontWeight: 400, lineHeight: 1.05, marginBottom: '14px' }}
                    >
                        {project.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-x-0 gap-y-2 mb-5 sm:mb-6"
                        style={{ fontSize: 'clamp(14px, 1.1vw, 22px)', letterSpacing: '0.2px' }}
                    >
                        {project?.propertyFeatures?.length > 0 && project.propertyFeatures.map((feature, i) => (
                            <span key={feature._id || i} className="flex items-center opacity-90">
                                {feature.text}
                                {i < project.propertyFeatures.length - 1 && <span className="mx-2 sm:mx-3 opacity-40">|</span>}
                            </span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
                        className="mb-4 sm:mb-5"
                    >
                        <span
                            className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-white text-bg-secondary font-medium"
                            style={{ fontSize: 'clamp(16px, 1vw, 25px)' }}
                        >
                            {project.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                    </motion.div>

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
            <div className="mt-14 sm:mt-20 md:mt-28 xl:mt-40 mb-8 sm:mb-10 md:mb-16 xl:mb-32 flex justify-center px-5 sm:px-6">
                <FadeUpSection>
                    <div className="max-w-[760px] text-center">
                        <h2
                            className="text-bg-secondary"
                            style={{ fontSize: 'clamp(24px, 3.5vw, 46px)', lineHeight: 1.2 }}
                        >
                            {project.title}
                        </h2>
                        <p
                            className="text-bg-secondary/70 mt-5 sm:mt-6 md:mt-8"
                            style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.7 }}
                        >
                            {project.description}
                        </p>
                        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center">
                            <BrochureLink to={`/view-brochure/${project._id}`} />
                        </div>
                    </div>
                </FadeUpSection>
            </div>

            {/* ════════════════════════════════════════
                ③ PHOTO GALLERY — BLOCK 1-3
            ════════════════════════════════════════ */}
            <div className="px-4 md:px-8 xl:px-14 flex items-center justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] space-y-3 flex flex-col items-center">
                    {/* Ảnh 1 — full width */}
                    <ScaleImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`}
                        className="w-full sm:w-[85%] md:w-[80%] h-full"
                    />

                    {/* Ảnh 2 + 3 — dọc trên mobile, ngang từ sm trở lên */}
                    <div className="flex flex-col sm:flex-row w-full mt-6 sm:mt-10 xl:mt-16 mb-4 sm:mb-5 gap-4 sm:gap-8 md:gap-12 xl:gap-20 items-center justify-center">
                        <ScaleImage
                            src={`${BASE_CDN_URL}${project?.gallery?.[2]?.key}`}
                            className="w-full sm:flex-1"
                            delay={0}
                        />
                        <ScaleImage
                            src={`${BASE_CDN_URL}${project?.gallery?.[3]?.key}`}
                            className="w-full sm:flex-1"
                            delay={0.1}
                        />
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ④ SPECIFICATIONS
            ════════════════════════════════════════ */}
            <div className="mt-14 sm:mt-20 md:mt-28 xl:mt-36 px-5 sm:px-6 flex items-center justify-center">
                <div className="w-full xl:max-w-screen-xl lg:max-w-[900px]">
                    <FadeUpSection>
                        {/* Property Features grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 mb-8 sm:mb-10 md:mb-14 pb-8 sm:pb-10 md:pb-14 border-b border-bg-secondary/10">
                            {project?.propertyFeatures?.map(({ text, _id }, index) => (
                                <div key={_id || index} className="border-l border-bg-secondary/20 pl-3 sm:pl-4">
                                    <p className="text-bg-secondary text-[14px] xs:text-[15px] sm:text-[18px] md:text-[20px] uppercase tracking-widest">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Property Highlights */}
                        {project?.propertyHighlights?.length > 0 && (
                            <div className="mb-8 sm:mb-10">
                                <h3 className="text-bg-secondary font-medium mb-4 sm:mb-5"
                                    style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
                                    Property Highlights
                                </h3>
                                <div className="space-y-6 sm:space-y-8 md:space-y-10">
                                    {project?.propertyHighlights.map((highlight, i) => {
                                        const features = highlight.featureSections?.filter(
                                            (f) => f.name?.trim() || f.description?.trim()
                                        );

                                        return (
                                            <div key={highlight._id ?? i} className="space-y-2 sm:space-y-3">
                                                {highlight.title && (
                                                    <h3
                                                        className="text-bg-secondary flex items-start gap-2 sm:gap-3"
                                                        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(17px, 1.6vw, 22px)' }}
                                                    >
                                                        <Check size={18} className="mt-1 flex-shrink-0 text-bg-secondary" />
                                                        {highlight.title}
                                                    </h3>
                                                )}

                                                {highlight.description && (
                                                    <p
                                                        className="text-bg-secondary/70 pl-6 sm:pl-7 md:pl-8 whitespace-pre-line"
                                                        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(14px, 1.2vw, 17px)' }}
                                                    >
                                                        {highlight.description}
                                                    </p>
                                                )}

                                                {features?.length > 0 && (
                                                    <ul className="pl-6 sm:pl-7 md:pl-8 space-y-2 border-l border-bg-secondary/15">
                                                        {features.map((f) => (
                                                            <li key={f._id} className="pl-3 sm:pl-4">
                                                                {f.name && (
                                                                    <span
                                                                        className="block text-bg-secondary/90"
                                                                        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
                                                                    >
                                                                        {f.name}
                                                                    </span>
                                                                )}
                                                                {f.description && (
                                                                    <span
                                                                        className="block text-bg-secondary/60"
                                                                        style={{ fontFamily: 'Nunito Sans', fontSize: 'clamp(12px, 1vw, 15px)' }}
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
                        )}

                        {/* Specifications pills */}
                        {project?.specifications?.length > 0 && (
                            <div>
                                <h3 className="text-bg-secondary mb-3 sm:mb-4 text-[14px] leading-[20px] xs:text-[15px] sm:text-[18px] sm:leading-[26px]"
                                    style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Specifications
                                </h3>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {project?.specifications.map((spec, i) => (
                                        <SpecBadge key={i} spec={spec} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </FadeUpSection>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑤ GALLERY — BLOCK 4-5
            ════════════════════════════════════════ */}
            <div className="mt-8 sm:mt-10 md:mt-14 xl:mt-16 px-4 md:px-8 xl:px-14 flex justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] flex flex-col items-center">
                    <ScaleImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[4]?.key}`}
                        className="w-full sm:w-[85%] md:w-[80%] h-full"
                    />
                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑥ CÁC PHẦN ĐẶC BIỆT — Accordion
            ════════════════════════════════════════ */}
            <div className="mt-8 sm:mt-10 md:mt-14 xl:mt-16 flex items-center justify-center">
                <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px]">

                    {project?.specialSections && project?.gallery && (() => {
                        const sections = project.specialSections;
                        const images = project.gallery;
                        let imageIndex = 5;
                        const elements = [];

                        const getNextThreeImages = () => {
                            if (imageIndex >= images.length) return null;
                            const result = [];
                            for (let i = 0; i < 3 && imageIndex < images.length; i++) {
                                result.push(images[imageIndex]);
                                imageIndex++;
                            }
                            return result;
                        };

                        const renderImageGroup = (key, nextImages) => (
                            <div key={key} className="px-4 md:px-8 xl:px-14 space-y-3 flex flex-col items-center pb-10 sm:pb-14 md:pb-20">
                                <ScaleImage
                                    src={`${BASE_CDN_URL}${nextImages[0]?.key}`}
                                    className="w-full sm:w-[85%] md:w-[80%] h-full"
                                    delay={0}
                                />

                                {(nextImages[1] || nextImages[2]) && (
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 xl:gap-20 mt-6 sm:mt-10 md:mt-14 xl:mt-20 items-center justify-center">
                                        {nextImages[1] && (
                                            <ScaleImage
                                                src={`${BASE_CDN_URL}${nextImages[1].key}`}
                                                className="w-full sm:flex-1 h-full"
                                                delay={0}
                                            />
                                        )}
                                        {nextImages[2] && (
                                            <ScaleImage
                                                src={`${BASE_CDN_URL}${nextImages[2].key}`}
                                                className="w-full sm:flex-1"
                                                delay={0.1}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        );

                        sections.forEach((section, index) => {
                            elements.push(
                                <SectionAccordion key={`section-${index}`} section={section} />
                            );

                            const nextImages = getNextThreeImages();
                            if (nextImages && nextImages.length > 0) {
                                elements.push(renderImageGroup(`images-${index}`, nextImages));
                            }
                        });

                        let extraIndex = 0;
                        let remainingImages = getNextThreeImages();
                        while (remainingImages && remainingImages.length > 0) {
                            elements.push(renderImageGroup(`extra-images-${extraIndex}`, remainingImages));
                            extraIndex++;
                            remainingImages = getNextThreeImages();
                        }

                        return elements;
                    })()}
                </div>
            </div>

            <ProjectCarousel excludeProjectId={projectId} />
            <JoinNewsletter />
            <FollowUs />
            <Footer withContact={false} />
        </div>
    )
}
export default ProjectDetail