import { useState } from "react";
import { Check } from "lucide-react";
import logo from '../../../assets/images/logo.png'
import logoTextNoBg from '../../../assets/images/logo-text-no-bg.png'
import { useTranslation } from "react-i18next";
import { newsletterService } from "../../../services/newsletterService";
function Footer({withContact}) {
    const [consent, setConsent] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const {t} = useTranslation('footer');
     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const validateForm = () => {
        const errors = {};
        
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!consent) {
            errors.consent = 'You must agree to the privacy policy';
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
            
            const response = await newsletterService.subscribe({
                fullName: formData.fullName,
                email: formData.email,
                consent: consent,
                source: 'website_footer'
            });
            
            if (response.success) {
                setSubmitSuccess(true);
                // Reset form
                setFormData({
                    fullName: '',
                    email: ''
                });
                
                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
            setFormErrors({
                submit: error.response?.data?.message || 'Failed to subscribe. Please try again.'
            });
        } finally {
            setSubmitting(false);
        }
    };
    return ( 
        <div className="bg-bg-primary pb-[30px] px-4 md:px-[50px] md:pb-[50px] flex justify-center">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10 md:mt-20 w-full">
                {/* CONTACT */}
                {withContact && (
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
                        {/* INSTAGRAM */}
                        <div className="basis-full lg:basis-1/3 text-center lg:text-left">
                            <h1 className="font-subtitle text-[28px] md:text-[36px] lg:text-[30px] text-txt-secondary leading-tight">
                                INSTAGRAM
                            </h1>
                            <p className="text-txt-primary text-[20px] md:text-[24px] lg:text-[22px] mt-4 md:mt-6 lg:mt-8">
                                @L'atelia
                            </p>
                        </div>
                        
                        {/* NEWSLETTER */}
                        <div className="basis-full lg:basis-1/3 text-center lg:text-left">
                            <h1 className="font-subtitle text-[28px] md:text-[36px] lg:text-[30px] text-txt-secondary leading-tight">
                                NEWSLETTER
                            </h1>
                            <p className="text-txt-primary text-[16px] md:text-[18px] mt-4 md:mt-6 lg:mt-8 lg:w-75 leading-relaxed">
                                {t('footer:newsletter.title')}
                            </p>
                        </div>
                        
                        {/* FORM */}
                        <div className="basis-full lg:basis-1/3 flex flex-col">
                            <form onSubmit={handleSubmit}>
                                {/* Full Name Input - GIỮ NGUYÊN STYLE */}
                                <div className="mb-3 md:mb-4">
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full name" 
                                        className={`bg-[#D9D9D9] p-3 outline-none focus:outline-none focus:ring-0 focus:border-none border-0 w-full text-sm md:text-base ${formErrors.fullName ? 'border border-red-500' : ''}`}
                                        disabled={submitting}
                                    />
                                    {formErrors.fullName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                                    )}
                                </div>
                                
                                {/* Email Input - GIỮ NGUYÊN STYLE */}
                                <div className="mb-3 md:mb-4">
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email" 
                                        className={`bg-[#D9D9D9] p-3 outline-none focus:outline-none focus:ring-0 focus:border-none border-0 w-full text-sm md:text-base ${formErrors.email ? 'border border-red-500' : ''}`}
                                        disabled={submitting}
                                    />
                                    {formErrors.email && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                                    )}
                                </div>
                                
                                {/* Submit Button - GIỮ NGUYÊN STYLE */}
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className={`font-subtitle text-[16px] md:text-[18px] lg:text-[20px] bg-bg-secondary text-bg-primary py-2 md:py-2 cursor-pointer uppercase w-full ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                                >
                                    {submitting ? 'SUBSCRIBING...' : t('footer:button.title')}
                                </button>
                                
                                {/* CONSENT CHECKBOX - GIỮ NGUYÊN STYLE */}
                                <div className="flex flex-row items-start mt-3 md:mt-2 text-txt-primary">
                                    <div 
                                        className={`border mt-1 mr-3 cursor-pointer w-[20px] h-[20px] flex items-center justify-center flex-shrink-0 ${!consent ? 'bg-white' : 'bg-bg-secondary'}`}
                                        onClick={() => setConsent(!consent)}
                                    >
                                        {consent && (
                                            <Check className="w-[14px] h-[14px] md:w-[15px] md:h-[17px] text-white" />
                                        )}
                                    </div>
                                    <p className="text-[13px] md:text-[15px] leading-relaxed text-left">
                                        {t('footer:policy')}
                                    </p>
                                </div>
                                {formErrors.consent && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.consent}</p>
                                )}
                            </form>
                            
                            {/* Success Message - HIỂN THỊ TRONG FORM AREA */}
                            {submitSuccess && (
                                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                                    <p className="font-semibold">✓ Thank you for subscribing!</p>
                                    <p>You'll receive our newsletter soon.</p>
                                </div>
                            )}
                            
                            {/* Error Message - HIỂN THỊ TRONG FORM AREA */}
                            {formErrors.submit && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                    <p className="font-semibold">Error:</p>
                                    <p>{formErrors.submit}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* LOCATION */}
                <div className={`flex flex-col items-center text-txt-primary ${withContact ? 'mt-10' :''}`}>
                    <img src={logo} alt="Logo" className="w-[80px] md:w-[108px] text-center" />
                    <img src={logoTextNoBg} alt="L'atelia" className="w-[160px] md:w-[190px] text-center mb-3 md:mb-4 mt-2" />
                    <p className="text-[16px] md:text-[18px] mb-2 text-center">Crafting luxury property</p>
                    <p className="text-[16px] md:text-[18px] mb-2 text-center">Da Nang City</p>
                    <p className="text-[16px] md:text-[18px] mb-4 md:mb-6 text-center">©2025 L'atelia</p>
                    <p className="text-[12px] md:text-[15px] text-center leading-relaxed ">
                        We use cookies to ensure that we give you the best experience on our website. 
                        If you continue to use this site we will assume that you are happy with it.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;