import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Footer from "../../layouts/components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import CustomAccordion from "../../components/Accordion";
import { LocalizedLink } from "../../components/LocalizedLink";
import { projectsService } from "../../services/projectsService";
import { motion } from 'framer-motion'
import aboutUs from '../../assets/images/about-us/about-us-final.jpg'
const BASE_CDN_URL = 'https://cdn.latelia.com/latelia/'
function ProjectDetail() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
    return (
        <div className="">
            {/* BANNER */}
            <div className="w-full h-[300px] md:h-[500px] xl:h-screen relative overflow-hidden">
    
                {/* Background Image */}
                <OptimizedImage
                    src={aboutUs}
                    alt=""
                    className="object-cover w-full h-full object-center"
                    style={{ filter: 'brightness(0.72)' }}
                />

                {/* Overlay gradient bottom */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
                    }}
                />
                    {/* Content — căn giữa */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            style={{
                                fontSize: 'clamp(40px, 7vw, 70px)',
                                fontWeight: 400,
                                lineHeight: 1.1,
                                marginBottom: '20px',
                                textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                            }}
                        >
                            Mira Calma
                        </motion.h1>

                        {/* Specs row */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-0 mb-6 font-medium"
                            style={{  fontSize: 'clamp(20px, 1.2vw, 14px)', letterSpacing: '0.3px' }}
                        >
                            {[
                                '4 Bedrooms + Independent Studio',
                                '4 Bathrooms',
                                '345 m2 Contrcted Area',
                                'Valldemossa',
                            ].filter(Boolean).map((spec, i, arr) => (
                                <span key={i} className="flex items-center">
                                    <span className="opacity-90">{spec}</span>
                                    {i < arr.length - 1 && (
                                        <span className="mx-3 opacity-40">|</span>
                                    )}
                                </span>
                            ))}
                        </motion.div>

                        {/* Badge Available */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
                            className="mb-4"
                        >
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    borderRadius: '999px',
                                    padding: '6px 20px',
                                    fontSize: 'clamp(11px, 1.1vw, 13px)',
                                    fontFamily: 'InstrumentSans',
                                    letterSpacing: '0.5px',
                                    color: '#fff',
                                }}
                            >
                                {project?.availability || 'Available'}
                            </span>
                        </motion.div>

                        {/* View Brochure link */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                        >
                            <LocalizedLink
                                to={`/view-brochure/1?filter=0`}
                                className="inline-flex items-center gap-2 group"
                                style={{
                                    fontFamily: 'InstrumentSans',
                                    fontSize: 'clamp(12px, 1.2vw, 14px)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    letterSpacing: '0.3px',
                                }}
                            >
                                View Brochure
                                <ArrowRight
                                    size={14}
                                    style={{
                                        transition: 'transform 0.3s ease',
                                    }}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </LocalizedLink>
                        </motion.div>
                    </div>
                </div>
            
            <Footer withContact={false}/>
        </div>
    );
}

export default ProjectDetail;