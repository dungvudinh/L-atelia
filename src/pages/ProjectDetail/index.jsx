// ─── COMPONENTS ─────────────────────────────────────────────────────────────

import { useState, useRef } from "react"
import { ChevronRight, ChevronDown, Check, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useParams } from "react-router-dom"
import { LocalizedLink } from "../../components/LocalizedLink"
import OptimizedImage from "../../components/OptimizedImage"
import Footer from "../../layouts/components/Footer"
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation,FreeMode}from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ─── DATA MODEL ────────────────────────────────────────────────────────────
// Ví dụ cấu trúc project object từ API
const INSTAGRAM_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  ]
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
        src: aboutUs2,
        title: 'Vistavall',
        desc: 'Set atop Valldemossa, offering panoramic views and year-round sunshine.',
        link: '/projects/vistavall',
    },
    {
        id: 3,
        src: aboutUs2,
        title: 'Mon Cor',
        desc: 'Built in 1903 during the most prosperous time in Mallorca\'s modern history, Mon Cor was an architectural marvel that set the benchmark...',
        link: '/projects/mon-cor',
    },
    {
        id: 4,
        src: aboutUs2,
        title: 'Sa M...',
        desc: 'Where the story of Berrow began...',
        link: '/projects/sa-m',
    },
]
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
            className={`overflow-hidden ${className}`}
            style={style}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
        >
            <motion.div
                className="w-full h-full"
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
    const { projectId } = useParams()

    // TODO: thay bằng fetch thực tế
    const project = MOCK_PROJECT
    const imgs = project.images  // alias ngắn

    return (
        <div>
            {/* ════════════════════════════════════════
                ① HERO BANNER
            ════════════════════════════════════════ */}
            <div className="w-full h-[300px] md:h-[500px] xl:h-screen relative overflow-hidden">
                <OptimizedImage
                    src={imgs[0]?.src}
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
                        {[
                            `${project.features.bedrooms} Bedrooms${project.features.studio ? ' + Independent Studio' : ''}`,
                            `${project.features.bathrooms} Bathrooms`,
                            `${project.features.constructedArea} Constructed Area`,
                            project.location,
                        ].map((spec, i, arr) => (
                            <span key={i} className="flex items-center opacity-90">
                                {spec}
                                {i < arr.length - 1 && <span className="mx-3 opacity-40">|</span>}
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
            <div className="mt-20 xl:mt-40 mb-16 xl:mb-32 flex justify-center px-6">
                <FadeUpSection>
                    <div className="max-w-[760px] text-center">
                        {/* Headline lấy từ section đầu tiên */}
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
            </div>

            {/* ════════════════════════════════════════
                ③ PHOTO GALLERY — BLOCK 1-3
            ════════════════════════════════════════ */}
            <div className="px-4 md:px-8 xl:px-14 space-y-3">

                {/* Block 1: full-width */}
                <FadeImage src={imgs[1]?.src} className="w-full"
                    style={{ height: 'clamp(280px, 52vw, 740px)' }} />

                {/* Block 2: landscape (3/5) + portrait (2/5) */}
                <div className="flex gap-3">
                    <FadeImage src={imgs[2]?.src} className="flex-[3]"
                        style={{ height: 'clamp(220px, 36vw, 520px)' }} delay={0} />
                    <FadeImage src={imgs[3]?.src} className="flex-[2]"
                        style={{ height: 'clamp(220px, 36vw, 520px)' }} delay={0.1} />
                </div>

                {/* Block 3: portrait tall (2/5) + 2 stacked (3/5) */}
                {/* <div className="flex gap-3">
                    <FadeImage src={imgs[4]?.src} className="flex-[2]"
                        style={{ height: 'clamp(280px, 46vw, 660px)' }} delay={0} />
                    <div className="flex-[3] flex flex-col gap-3">
                        <FadeImage src={imgs[5]?.src} className="flex-1"
                            style={{ minHeight: 0 }} delay={0.1} />
                        <FadeImage src={imgs[6]?.src} className="flex-1"
                            style={{ minHeight: 0 }} delay={0.18} />
                    </div>
                </div> */}
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
                                { label: 'Location', value: project.location },
                                { label: 'Price', value: project.price },
                                { label: 'Bedrooms', value: project.features.bedrooms },
                                { label: 'Bathrooms', value: project.features.bathrooms },
                                { label: 'Size', value: project.features.constructedArea + ' Constructed Area' },
                                { label: 'Plot', value: project.features.plotArea + ' Plot' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className="text-bg-secondary/40 text-xs uppercase tracking-widest mb-1"
                                        style={{ fontFamily: 'InstrumentSans' }}>
                                        {label}
                                    </p>
                                    <p className="text-bg-secondary font-medium"
                                        style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
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
                <FadeImage src={imgs[7]?.src} className="w-full"
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
                <div className="flex gap-3">
                    <FadeImage src={imgs[8]?.src} className="flex-[2]"
                        style={{ height: 'clamp(240px, 42vw, 600px)' }} delay={0} />
                    <FadeImage src={imgs[9]?.src} className="flex-[3]"
                        style={{ height: 'clamp(240px, 42vw, 600px)' }} delay={0.1} />
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
            <div className="mt-20 xl:mt-36 px-4 md:px-8 xl:px-14 space-y-3">

                {/* 3 ảnh equal */}
                <div className="flex gap-3">
                    {[imgs[9], imgs[10], imgs[11]].map((img, i) => (
                        <FadeImage key={i} src={img?.src} className="flex-1"
                            style={{ height: 'clamp(160px, 26vw, 380px)' }} delay={i * 0.08} />
                    ))}
                </div>

                {/* CTA Brochure trung tâm */}
                <FadeUpSection>
                    <div className="py-20 text-center">
                        <BrochureLink to={project.brochureUrl} />
                    </div>
                </FadeUpSection>
            </div>

            <ProjectCarousel />
            <section className="pb-24 px-4 text-center mt-20">
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
            <Footer withContact={false} />
        </div>
    )
}
function ProjectCarousel() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

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
                {PROJECTS.map((project, i) => (
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
                            <LocalizedLink to={project.link}>
                                <div className="w-full h-[320px] rounded-2xl overflow-hidden mb-5">
                                    <img
                                        src={project.src}
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
                                {project.desc}
                            </p>

                            {/* View Project link */}
                            <LocalizedLink
                                to={project.link}
                                className="inline-flex items-center gap-2 text-bg-secondary text-[14px] group"
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
export default ProjectDetail
