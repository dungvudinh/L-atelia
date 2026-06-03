import { useState, useRef } from 'react';
import contact from '../../assets/images/contact.webp'
import { useTranslation } from 'react-i18next';
import { Check, Dot, ArrowRight, ChevronDown } from 'lucide-react';
import Footer from '../../layouts/components/Footer';
import OptimizedImage from '../../components/OptimizedImage';
import { useInView,motion } from "framer-motion";
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import {LocalizedLink} from '../../components/LocalizedLink';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation,FreeMode}from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const PRICE_RANGES = [
  "5 tỉ VND trở xuống",
  "5 tỉ VND - 10 tỉ VND",
  "10 tỉ VND - 15 tỉ VND",
  "15 tỉ VND - 20 tỉ VND",
  "Trên 20 tỉ VND",
  "Không muốn đề cập",
];
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
const INSTAGRAM_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  ]
function Contact() {
    const [consent, setConsent] = useState(true);
    const {t} = useTranslation('footer');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handlePriceRangeSelect = (range, index) => {
        setSelectedPriceRange(prev => prev === range ? null : range);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
            return;
        }

        if (!consent) {
            setSubmitStatus({ type: 'error', message: 'Please agree to the privacy policy.' });
            return;
        }

        setLoading(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://api.latelia.com/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    budget: selectedPriceRange,
                    consent: consent
                })
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setSelectedPriceRange(null);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="">
            <ContactForm />
            <LifestyleSection />
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
            <Footer withContact={false}/>
        </div>
    );
}
function ContactForm() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', service: '', description: ''
    })

    const fadeUp = (delay) => ({
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    })

    const inputStyle = {
        width: '100%',
        padding: '16px 20px',
        background: '#f0f2f1',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1a3a3a',
        outline: 'none',
        fontFamily: 'InstrumentSans',
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        console.log(formData)
        // gọi API submit ở đây
    }

    return (
        <section ref={ref} className="w-full py-20 xl:py-32 px-4">
            <div className="mx-auto" style={{ maxWidth: '560px' }}>

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div style={{ width: '40px', height: '1px', background: '#1a3a3a', opacity: 0.5 }} />
                        <span style={{ fontSize: '20px', letterSpacing: '2px', color: '#1a3a3a', opacity: 0.7 }}>
                            Contact
                        </span>
                        <div style={{ width: '40px', height: '1px', background: '#1a3a3a', opacity: 0.5 }} />
                    </div>
                    <h2 className="text-bg-secondary"style={{fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '16px' }}>
                        Hello. Hola.
                    </h2>
                    <p className="text-bg-secondary"style={{fontSize: '20px',lineHeight: 1.6 }}>
                        Get in touch to see how we can help you make Mallorca your home.
                    </p>
                </motion.div>

                {/* Form */}
                <div className="flex flex-col gap-3">

                    {/* Row 1: First + Last Name */}
                    <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </motion.div>

                    {/* Row 2: Email + Phone */}
                    <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-3">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
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
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                cursor: 'pointer',
                                color: formData.service ? '#1a3a3a' : '#9aaeae',
                            }}
                        >
                            <option value="" disabled hidden>Select a Service</option>
                            <option value="architecture">Architecture & Design</option>
                            <option value="development">Development</option>
                            <option value="sales">Sales & Marketing</option>
                            <option value="interior">Interior Design</option>
                        </select>
                        {/* Chevron icon */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={16} color="#1a3a3a" opacity={0.5} />
                        </div>
                    </motion.div>

                    {/* Row 4: Textarea */}
                    <motion.div {...fadeUp(0.4)}>
                        <textarea
                            name="description"
                            placeholder="Give us a brief description of your project"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            style={{
                                ...inputStyle,
                                resize: 'none',
                                lineHeight: 1.6,
                            }}
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.div {...fadeUp(0.5)} className="flex justify-center mt-2">
                        <button
                            onClick={handleSubmit}
                            style={{
                                background: '#1a3a3a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '16px 48px',
                                fontSize: '20px',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#2a4f4f'}
                            onMouseLeave={e => e.currentTarget.style.background = '#1a3a3a'}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Submit
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
function LifestyleSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="w-full py-16 xl:py-24 px-6 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    className="w-full overflow-hidden rounded-2xl mb-5"
                    style={{ height: '420px' }}
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
                className="mb-2"
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontWeight: 400,
                    color: '#1a3a3a',
                    lineHeight: 1.2,
                }}
            >
                {item.title}
            </h3>

            {/* Description */}
            <p
                className="mb-4"
                style={{
                    fontFamily: 'InstrumentSans',
                    fontSize: '14px',
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
export default Contact;