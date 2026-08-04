import { useState } from "react";
import { useTranslation } from "react-i18next";
import { newsletterService } from "../../services/newsletterService";

function JoinNewsletter() {
    const [consent, setConsent] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { t } = useTranslation('footer');
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
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
                setFormData({
                    fullName: '',
                    email: ''
                });
                
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
        <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 text-center mt-10 sm:mt-14 md:mt-16 lg:mt-20 flex items-center justify-center flex-col w-full">
            
            {/* Tiêu đề */}
            <h2 className="text-bg-secondary text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] xl:text-[45px]
                leading-[1.15] w-full xl:max-w-[1000px] lg:max-w-[800px] mx-auto mb-6 sm:mb-8 md:mb-10 
                px-2 sm:px-0"
            >
                Kết nối cùng Art L'atelia để bắt đầu hành trình kiến tạo không gian sống của riêng bạn
            </h2>

            {/* Form */}
            {submitSuccess ? (
                <div className="mt-4 p-4 sm:p-5 md:p-6 rounded-lg text-center max-w-[460px] w-full mx-auto" 
                     style={{ backgroundColor: '#e6f4e6', color: '#1a3a3a' }}>
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[1.4]">
                        Successfully Subscribed! Thank you for joining our newsletter.
                    </p>
                </div>
            ) : (
                <form className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-[360px] mx-auto" 
                      onSubmit={handleSubmit}>
                    
                    {/* Full Name Input */}
                    <div className="w-full flex flex-col items-start">
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full name" 
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-[#f0f4f0] text-bg-secondary 
                                placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition
                                text-[14px] sm:text-[15px] md:text-[16px]"
                            style={{ fontFamily: 'Nunito Sans' }}
                            disabled={submitting}
                        />
                        {formErrors.fullName && (
                            <p className="text-red-500 text-[11px] sm:text-xs mt-1 text-left" 
                               style={{ fontFamily: 'Nunito Sans' }}>
                                {formErrors.fullName}
                            </p>
                        )}
                    </div>
                    
                    {/* Email Input */}
                    <div className="w-full flex flex-col items-start">
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address" 
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-[#f0f4f0] text-bg-secondary 
                                placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition
                                text-[14px] sm:text-[15px] md:text-[16px]"
                            style={{ fontFamily: 'Nunito Sans' }}
                            disabled={submitting}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-[11px] sm:text-xs mt-1 text-left" 
                               style={{ fontFamily: 'Nunito Sans' }}>
                                {formErrors.email}
                            </p>
                        )}
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-2 sm:mt-3 py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg bg-bg-secondary text-white 
                            text-[16px] sm:text-[18px] md:text-[20px] cursor-pointer
                            relative overflow-hidden group sm:w-auto
                            hover:opacity-90 transition-opacity duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className={`block transition-all duration-300 ease-in-out
                            ${submitting ? 'opacity-50' : 'group-hover:-translate-y-full group-hover:opacity-0'}`}>
                            {submitting ? 'Submitting...' : 'Join Now'}
                        </span>

                        {!submitting && (
                            <span className={`absolute inset-0 flex items-center justify-center
                                transition-all duration-300 ease-in-out px-6
                                translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}>
                                Join Now
                            </span>
                        )}
                    </button>
                    
                    {/* Submit Error */}
                    {formErrors.submit && (
                        <p className="text-red-500 text-[11px] sm:text-xs mt-2 text-center" 
                           style={{ fontFamily: 'Nunito Sans' }}>
                            {formErrors.submit}
                        </p>
                    )}
                </form>
            )}
        </section>
    );
}

export default JoinNewsletter;