import { useState } from "react";
import { useTranslation } from "react-i18next";
import { newsletterService } from "../../services/newsletterService";
function JoinNewsletter()
{
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
        // if (!consent) {
        //     errors.consent = 'You must agree to the privacy policy';
        // }
        
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
        <section className="pb-24 px-4 text-center mt-20 flex items-center justify-center flex-col">
        {/* Tiêu đề */}
        <h2
            className="text-bg-secondary leading-[34px] text-[28px] lg:leading-[54px] md:text-[38px] lg:text-[48px] leading-[1.15]  max-w-[772px] mx-auto mb-10"
        >
            Join our world of Mediterranean design and quiet luxury.
        </h2>

        {/* Form */}
        {/* Success Message - HIỂN THỊ TRONG FORM AREA */}
        {submitSuccess ? (
            <div className="mt-4 p-3 rounded text-sm max-w-[460px]" style={{backgroundColor:'#e6f4e', color:'1a3a3a'}}>
                <p className="text text-[20px] leading-[24px] xs:text-[24px] xs:leading-[28px] md:text-[28px] md:leading-[34px] lg:text-[32px] lg:leading-[38px]">Successfully Subscribed! Thank you for joining our newsletter.</p>
            </div>
        )
        :

        <form className="flex flex-col items-center gap-3 w-full max-w-[360px] mx-auto" onSubmit={handleSubmit}>
            
            <div className="w-full flex flex-col items-start">
                <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full name" 
                    className="w-full px-5 py-3 rounded-md bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
                    style={{ fontFamily: 'InstrumentSans' }}
                    disabled={submitting}
                />
                {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1"  style={{ fontFamily: 'InstrumentSans' }}>{formErrors.fullName}</p>
                )}
            </div>
            <div className="w-full flex flex-col items-start">
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address" 
                    className="w-full px-5 py-3 rounded-md bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
                    style={{ fontFamily: 'InstrumentSans' }}
                    disabled={submitting}
                />
                {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1"  style={{ fontFamily: 'InstrumentSans' }}>{formErrors.email}</p>
                )}
            </div>
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
        </form>
        }
    </section>
    )
}
export default JoinNewsletter;