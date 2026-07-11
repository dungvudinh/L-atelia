import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Footer from '../../layouts/components/Footer';
import { useInView, motion } from "framer-motion";
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import { LocalizedLink } from '../../components/LocalizedLink';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import JoinNewsletter from '../../components/JoinNewsletter';
import FollowUs from '../../components/FollowUs';

const LIFESTYLE_ITEMS = [
    {
        id: 1,
        src: aboutUs2,
        title: 'Sóller Tennis Club',
        desc: 'A wellness and lifestyle community for local neighbours, international friends and touring pros.',
        linkText: 'Visit Sóller Tennis Club',
        link: '/soller-tennis-club',
    },
    {
        id: 2,
        src: aboutUs3,
        title: 'Patiki Beach',
        desc: 'An extension of home, a beach shack for us all. You are invited to eat, drink and just be.',
        linkText: 'Visit Patiki Beach',
        link: '/patiki-beach',
    },
    {
        id: 3,
        src: aboutUs4,
        title: 'Pueblo',
        desc: 'A modern bistro for the heart of Sóller, serving fresh, seasonal produce sustainably sourced.',
        linkText: 'Visit Pueblo',
        link: '/pueblo',
    },
]

function Contact() {
    return ( 
        <div className="w-full overflow-x-hidden">
            <ContactForm />
            <FollowUs />
            <Footer withContact={false}/>
        </div>
    );
}

function ContactForm() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', bugdet: '', description: ''
    })
    const [loading, setLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const fadeUp = (delay) => ({
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    })

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        background: '#f0f2f1',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1a3a3a',
        outline: 'none',
        fontFamily: 'Nunito Sans',
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.description) {
            setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' })
            return
        }

        setLoading(true)
        setSubmitStatus(null)

        try {
            const response = await fetch('https://api.latelia.com/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    bugdet: formData.bugdet,
                    message: formData.description,
                })
            })

            const result = await response.json()

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
                setFormData({
                    firstName: '', lastName: '', email: '', phone: '', bugdet: '', description: ''
                })
            } else {
                throw new Error(result.message || 'Failed to send message')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section ref={ref} className="w-full pb-20 pt-40 sm:py-16 md:pt-50 xl:py-32 px-4">
            <div className="mx-auto w-full max-w-[560px]">

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-8 sm:mb-10">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div style={{ width: '30px', height: '1px', background: '#1a3a3a', opacity: 0.5 }} />
                        <span style={{ fontSize: '16px', letterSpacing: '2px', color: '#1a3a3a', opacity: 0.7 }}>
                            Contact
                        </span>
                        <div style={{ width: '30px', height: '1px', background: '#1a3a3a', opacity: 0.5 }} />
                    </div>
                    <h2 className="text-bg-secondary text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-light" 
                        style={{ lineHeight: 1.1, marginBottom: '12px' }}>
                        Liên hệ với chúng tôi
                    </h2>
                </motion.div>

                {/* Status Message */}
                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-lg text-[13px] sm:text-[14px] text-center"
                        style={{
                            background: submitStatus.type === 'success' ? '#e6f4ef' : '#fdecea',
                            color: submitStatus.type === 'success' ? '#1a3a3a' : '#a3342c',
                            fontFamily: 'Nunito Sans',
                        }}
                    >
                        {submitStatus.message}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    {/* Row 1: First + Last Name */}
                    <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </motion.div>

                    {/* Row 2: Email + Phone */}
                    <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </motion.div>

                    {/* Row 3: Select Service */}
                    <motion.div {...fadeUp(0.3)} className="relative">
                        <select
                            name="bugdet"
                            value={formData.bugdet}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                cursor: 'pointer',
                                color: formData.bugdet ? '#1a3a3a' : '#9aaeae',
                            }}
                        >
                            <option value="" disabled hidden>Dự kiến Budget đầu tư</option>
                            <option value="5 tỉ VND trở xuống">5 tỉ VND trở xuống</option>
                            <option value="5 tỉ VND - 10 tỉ VND">5 tỉ VND - 10 tỉ VND</option>
                            <option value="10 tỉ VND - 15 tỉ VND">10 tỉ VND - 15 tỉ VND</option>
                            <option value="15 tỉ VND - 20 tỉ VND">15 tỉ VND - 20 tỉ VND</option>
                            <option value="Trên 20 tỉ VND">Trên 20 tỉ VND</option>
                            <option value="Không muốn đề cập">Không muốn đề cập</option>
                        </select>
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={16} color="#1a3a3a" opacity={0.5} />
                        </div>
                    </motion.div>

                    {/* Row 4: Textarea */}
                    <motion.div {...fadeUp(0.4)}>
                        <textarea
                            name="description"
                            placeholder="Message"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            style={{
                                ...inputStyle,
                                resize: 'none',
                                lineHeight: 1.6,
                            }}
                            required
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.div {...fadeUp(0.5)} className="flex justify-center mt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                background: loading ? '#4a5f5f' : '#1a3a3a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '14px 32px',
                                fontSize: '16px',
                                letterSpacing: '0.5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.3s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#2a4f4f')}
                            onMouseLeave={e => !loading && (e.currentTarget.style.background = '#1a3a3a')}
                            onMouseDown={e => !loading && (e.currentTarget.style.transform = 'scale(0.97)')}
                            onMouseUp={e => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </motion.div>
                </form>
            </div>
        </section>
    )
}

function LifestyleSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="w-full py-12 sm:py-16 md:py-20 xl:py-24 px-4 sm:px-6 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                {LIFESTYLE_ITEMS.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <LifestyleCard item={item} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

function LifestyleCard({ item }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div>
            {/* Image */}
            <LocalizedLink to={item.link}>
                <div
                    className="w-full overflow-hidden rounded-2xl mb-4 sm:mb-5"
                    style={{ height: '280px' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img
                        src={item.src}
                        alt={item.title}
                        draggable={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: hovered ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    />
                </div>
            </LocalizedLink>

            {/* Title */}
            <h3
                className="mb-2 text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px]"
                style={{
                    fontFamily: 'Georgia, serif',
                    fontWeight: 400,
                    color: '#1a3a3a',
                    lineHeight: 1.2,
                }}
            >
                {item.title}
            </h3>

            {/* Description */}
            <p
                className="mb-4 text-[13px] sm:text-[14px]"
                style={{
                    fontFamily: 'InstrumentSans',
                    color: '#4a5050',
                    lineHeight: 1.7,
                }}
            >
                {item.desc}
            </p>

            {/* Link */}
            <LocalizedLink
                to={item.link}
                className="inline-flex items-center gap-1 group"
                style={{
                    fontFamily: 'InstrumentSans',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1a3a3a',
                    textDecoration: 'none',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {item.linkText}
                <span
                    style={{
                        display: 'inline-block',
                        transform: hovered ? 'translateX(5px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease',
                        marginLeft: '4px',
                    }}
                >
                    <ArrowRight size={14} />
                </span>
            </LocalizedLink>
        </div>
    )
}

export default Contact;