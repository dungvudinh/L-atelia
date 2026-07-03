import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
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
const BASE_CDN_URL = 'https://cdn.latelia.com/latelia/'
const MOCK_PROJECT = {
    id: 1,
    name: 'Mira Calma',
    status: 'For Sale',                          // 'For Sale' | 'Sold' | 'Under Offer'
    price: '4.250.000 €',
    location: 'Valldemossa',
    brochureUrl: '/view-brochure/1?filter=0',

    // Property Features (hiển thị ở banner + specs section)
    features: {
        bedrooms: 4,
        bathrooms: 4,
        studio: true,                            // Independent studio
        constructedArea: '345 m²',
        plotArea: '687 m²',
    },

    // Specifications — array of strings
    specifications: [
        'Infinity saltwater pool with green tiling',
        'Private roof terrace with spectacular views',
        'Underfloor heating & ducted A/C',
        'Sound system integrated',
        'Parking for 2 cars',
        'Immaculate renovation',
    ],

    // Property Highlights — array of strings (bullet points)
    highlights: [
        'Located in UNESCO Serra de Tramuntana',
        'En-suite bedrooms throughout',
        'Single-level living with panoramic views',
        'Ancient pines and Mediterranean planting',
    ],

    // Ảnh — array theo thứ tự layout gallery
    images: [
        { id: 1, src: aboutUs2, aspect: 'landscape' },
        { id: 2, src: aboutUs2, aspect: 'landscape' },
        { id: 3, src: aboutUs2, aspect: 'portrait' },
        { id: 4, src: aboutUs2, aspect: 'portrait-tall' },
        { id: 5, src: aboutUs2, aspect: 'landscape' },
        { id: 6, src: aboutUs2, aspect: 'landscape' },
        { id: 7, src: aboutUs2, aspect: 'landscape' },
        { id: 8, src: aboutUs2, aspect: 'portrait' },
        { id: 9, src: aboutUs2, aspect: 'landscape' },
        { id: 10, src: aboutUs2, aspect: 'landscape' },
        { id: 11, src: aboutUs2, aspect: 'landscape' },
        { id: 12, src: aboutUs2, aspect: 'landscape' },
    ],

    // Các phần đặc biệt — array với read more
    sections: [
        {
            id: 'architecture',
            title: 'Architecture & Setting',
            shortDescription: 'Set above Valldemossa within the UNESCO-protected Serra de Tramuntana, Miracalma enjoys a privileged position among ancient pines.',
            fullDescription: "Set above Valldemossa within the UNESCO-protected Serra de Tramuntana, Miracalma enjoys a privileged position among ancient pines and Mediterranean planting, with sweeping views across the mountains. Designed to embrace Mallorca's afternoon light, the house sits naturally within its surroundings, combining contemporary architecture with traditional Mallorcan craftsmanship.",
        },
        {
            id: 'interiors',
            title: 'Interiors',
            shortDescription: "Natural stone and oak define the home's character, creating warm, tactile interiors.",
            fullDescription: "Natural stone and oak define the home's character, creating warm, tactile interiors that feel both timeless and deeply connected to the landscape. Living spaces unfold across a single level, where generous openings frame the mountains and establish a seamless relationship between indoors and out.",
        },
        {
            id: 'outdoor',
            title: 'Outdoor Living',
            shortDescription: "Private, peaceful and immersed in nature, Miracalma offers a rare opportunity to live within one of Mallorca's most distinguished settings.",
            fullDescription: 'The infinity saltwater pool with signature green tiling reflects the surrounding pine canopy. A private roof terrace commands 360° views of the Serra de Tramuntana, while the generous plot of 687m² ensures complete privacy and serenity.',
        },
    ],
}
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
const FadeImage = ({ src, alt = "", className = "", style = {}, delay = 0 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden ${className} rounded-3xl`}
            style={style}
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

// ── 3. BrochureLink — nút View Brochure tái sử dụng ──────────────────────
const BrochureLink = ({ to, light = false, className = "" }) => (
    <LocalizedLink
        to={to}
        className={`inline-flex items-center gap-2 group font-bold ${className}`}
        style={{
            fontFamily: 'InstrumentSans',
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
const SpecBadge = ({ text }) => (
    <span
        className="inline-block px-3 py-1.5 text-sm border border-bg-secondary/20 rounded-full text-bg-secondary"
        style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(12px, 1vw, 14px)' }}
    >
        {text}
    </span>
)

// ── 5. SectionAccordion — phần đặc biệt với Read More ────────────────────
const SectionAccordion = ({ section }) => {
    const [open, setOpen] = useState(false)
    return (
        <FadeUpSection>
            <div className="border-t border-bg-secondary/10 py-10 md:py-14">
                <div className="max-w-[900px] mx-auto px-4">
                    {/* Layout: title bên trái, text bên phải — giống Berrow */}
                    <div className="md:grid md:grid-cols-[2fr_3fr] md:gap-16">
                        <h3
                            className="text-bg-secondary font-medium mb-4 md:mb-0"
                            style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.2 }}
                        >
                            {section.title}
                        </h3>
                        <div>
                            <p
                                className="text-bg-secondary/70"
                                style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.7 }}
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
                                            style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.7 }}
                                        >
                                            {section.fullDescription}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setOpen(o => !o)}
                                className="flex items-center gap-1.5 mt-5 text-bg-secondary font-medium group"
                                style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(13px, 1vw, 15px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            >
                                {open ? 'Read less' : 'Read more'}
                                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown size={14} />
                                </motion.span>
                            </button>
                        </div>
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
    const imgs = project?.images;  // alias ngắn
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    // Fetch project detail from API
    const fetchProjectDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            
            
            if (!projectId) {
                throw new Error('Project ID is required');
            }

            const response = await projectsService.getProjectById(projectId);
            
            // Set project data
            setProject(response.data || response);
            
        } catch (err) {
            console.error('❌ Failed to fetch project detail:', err);
            setError(err.message || 'Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Clear error for this field when user types
        if (formErrors[id]) {
            setFormErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };
        const validateForm = () => {
        const errors = {};
        
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        }
        
        return errors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        try {
            setSubmitting(true);
            setFormErrors({});
            
            // Gửi chỉ 5 trường: 4 từ form + projectTitle
            const requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                projectTitle: project?.title || 'Unknown Project'
            };
            
            
            const response = await projectsService.submitProjectContactForm(
                projectId, 
                requestData
            );
            
            if (response.success) {
                setSubmitSuccess(true);
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                });
                
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormErrors({
                submit: error.response?.data?.message || 'Failed to submit form. Please try again.'
            });
        } finally {
            setSubmitting(false);
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
                        <h2 className="text-xl font-semibold">Error</h2>
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
                        <h2 className="text-xl font-semibold">Project Not Found</h2>
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
            <div className="w-full h-[300px] md:h-[500px] xl:h-screen relative overflow-hidden">
                <OptimizedImage
                    src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                    alt={project.name}
                    className="object-cover w-full h-full object-center"
                    style={{ filter: 'brightness(0.68)' }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
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
                        style={{ fontSize: 'clamp(13px, 1.1vw, 16px)', letterSpacing: '0.2px' }}
                    >
                        {/* {[
                            `${project.features.bedrooms} Bedrooms${project.features.studio ? ' + Independent Studio' : ''}`,
                            `${project.features.bathrooms} Bathrooms`,
                            `${project.features.constructedArea} Constructed Area`,
                            project.location,
                        ].map((spec, i, arr) => (
                            <span key={i} className="flex items-center opacity-90">
                                {spec}
                                {i < arr.length - 1 && <span className="mx-3 opacity-40">|</span>}
                            </span>
                        ))} */}
                        {project?.propertyFeatures?.length > 0 && project.propertyFeatures.map((feature, i) => (
                            <span key={i} className="flex items-center opacity-90">
                                {feature}
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
                            style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                        >
                            {project.status}
                        </span>
                    </motion.div>

                    {/* Brochure CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                    >
                        <BrochureLink to={project.brochureUrl} light />
                    </motion.div>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ② INTRO TEXT
            ════════════════════════════════════════ */}
            {/* <div className="mt-20 xl:mt-40 mb-16 xl:mb-32 flex justify-center px-6">
                <FadeUpSection>
                    <div className="max-w-[760px] text-center">
                        <h2
                            className="text-bg-secondary font-medium"
                            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', lineHeight: 1.2 }}
                        >
                            {project.sections[0]?.fullDescription}
                        </h2>
                        {project.sections.slice(1, 3).map((s, i) => (
                            <p
                                key={i}
                                className="text-bg-secondary/70 mt-8"
                                style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.7 }}
                            >
                                {s.shortDescription}
                            </p>
                        ))}
                        <div className="mt-10 flex justify-center">
                            <BrochureLink to={project.brochureUrl} />
                        </div>
                    </div>
                </FadeUpSection>
            </div> */}

            {/* ════════════════════════════════════════
                ③ PHOTO GALLERY — BLOCK 1-3
            ════════════════════════════════════════ */}
            <div className="px-4 md:px-8 xl:px-14 space-y-3">
                {/* Ảnh 1 — full width */}
                <FadeImage
                    src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                    className="w-full"
                    style={{ height: 'clamp(200px, 40vw, 560px)' }}
                />

                {/* Ảnh 2 + 3 — 2 cột bằng nhau */}
                <div className="flex gap-3">
                    <FadeImage
                    src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                    className="flex-1"
                    style={{ height: 'clamp(140px, 26vw, 380px)' }}
                    delay={0}
                    />
                    <FadeImage
                    src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                    className="flex-1"
                    style={{ height: 'clamp(140px, 26vw, 380px)' }}
                    delay={0.1}
                    />
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
                            {[
                                { label: 'Location', value: project?.projectFeatures[0]},
                                { label: 'Price', value: project.price },
                                { label: 'Bedrooms', value: project.features.bedrooms },
                                { label: 'Bathrooms', value: project.features.bathrooms },
                                { label: 'Size', value: project.features.constructedArea + ' Constructed Area' },
                                { label: 'Plot', value: project.features.plotArea + ' Plot' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className="text-bg-secondary/40 text-sm uppercase tracking-widest mb-1"
                                        style={{ fontFamily: 'InstrumentSans' }}>
                                        {label}
                                    </p>
                                    <p className="text-bg-secondary font-medium"
                                        style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Property Highlights */}
                        <div className="mb-10">
                            <h3 className="text-bg-secondary font-medium mb-5"
                                style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
                                Property Highlights
                            </h3>
                            <ul className="space-y-2">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-bg-secondary/70"
                                        style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
                                        <Check size={16} className="mt-0.5 flex-shrink-0 text-bg-secondary" />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Specifications pills */}
                        <div>
                            <h3 className="text-bg-secondary font-medium mb-4"
                                style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
                                Specifications
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.specifications.map((spec, i) => (
                                    <SpecBadge key={i} text={spec} />
                                ))}
                            </div>
                        </div>
                    </FadeUpSection>
                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑤ GALLERY — BLOCK 4-5 + TEXT XEN
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-36 px-4 md:px-8 xl:px-14 space-y-3">

                {/* Block 4: full-width */}
                <FadeImage src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`}  className="w-full"
                    style={{ height: 'clamp(280px, 52vw, 740px)' }} />

                {/* Text xen giữa ảnh */}
                <div className="py-20 xl:py-32 flex justify-center px-6">
                    <FadeUpSection>
                        <div className="max-w-[600px] text-center">
                            <p className="text-bg-secondary"
                                style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.65 }}>
                                Living spaces unfold across a single level, where generous openings frame the mountains and establish a seamless relationship between indoors and out.
                            </p>
                            <p className="text-bg-secondary mt-6"
                                style={{ fontFamily: 'InstrumentSans', fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.65 }}>
                                Private, peaceful and immersed in nature, Miracalma offers a rare opportunity to live within one of Mallorca's most distinguished settings.
                            </p>
                        </div>
                    </FadeUpSection>
                </div>

                {/* Block 5: portrait (2/5) + landscape (3/5) */}
                <div className="px-4 md:px-8 xl:px-14 space-y-3">
                    {/* Ảnh 1 — full width */}
                    <FadeImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                        className="w-full"
                        style={{ height: 'clamp(200px, 40vw, 560px)' }}
                    />

                    {/* Ảnh 2 + 3 — 2 cột bằng nhau */}
                    <div className="flex gap-3">
                        <FadeImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                        className="flex-1"
                        style={{ height: 'clamp(140px, 26vw, 380px)' }}
                        delay={0}
                        />
                        <FadeImage
                        src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} 
                        className="flex-1"
                        style={{ height: 'clamp(140px, 26vw, 380px)' }}
                        delay={0.1}
                        />
                    </div>

                </div>
            </div>

            {/* ════════════════════════════════════════
                ⑥ CÁC PHẦN ĐẶC BIỆT — Accordion
            ════════════════════════════════════════ */}
            <div className="mt-20 xl:mt-36">
                {project.sections.map(section => (
                    <SectionAccordion key={section.id} section={section} />
                ))}
            </div>

            {/* ════════════════════════════════════════
                ⑦ GALLERY CUỐI + CTA
            ════════════════════════════════════════ */}
            {/* <div className="mt-20 xl:mt-36 px-4 md:px-8 xl:px-14 space-y-3">

                <div className="flex gap-3">
                    {[imgs[9], imgs[10], imgs[11]].map((img, i) => (
                        <FadeImage key={i} src={img?.src} className="flex-1"
                            style={{ height: 'clamp(160px, 26vw, 380px)' }} delay={i * 0.08} />
                    ))}
                </div>

                <FadeUpSection>
                    <div className="py-20 text-center">
                        <BrochureLink to={project.brochureUrl} />
                    </div>
                </FadeUpSection>
            </div> */}

            <ProjectCarousel />
            <JoinNewsletter />
            <FollowUs />
            <Footer withContact={false} />
        </div>
    )
}
export default ProjectDetail
