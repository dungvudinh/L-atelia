import { useState } from 'react';
import contact from '../../assets/images/contact.webp'
import { useTranslation } from 'react-i18next';
import { Check, Dot } from 'lucide-react';
import Footer from '../../layouts/components/Footer';
import OptimizedImage from '../../components/OptimizedImage';

const PRICE_RANGES = [
  "5 tỉ VND trở xuống",
  "5 tỉ VND - 10 tỉ VND",
  "10 tỉ VND - 15 tỉ VND",
  "15 tỉ VND - 20 tỉ VND",
  "Trên 20 tỉ VND",
  "Không muốn đề cập",
];

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
            const response = await fetch('https://l-atelia-api-yct5.onrender.com/v1/contact', {
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
        <div className="mt-20">
            <div className="h-[300px] md:h-[500px] lg:h-[840px] relative">
                <OptimizedImage src={contact} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className='absolute z-40 top-1/3 md:top-2/5 left-1/2 text-bg-primary text-[32px] md:text-[45px] lg:text-[45px] font-subtitle transform translate-x-[-50%] xl:max-w-screen-xl w-full lg:max-w-[900px] !px-4 md:px-0'>
                    <div className='w-full'>
                        <h1>Bắt đầu câu chuyện</h1>
                        <h1>Tạo nên điều kỳ diệu</h1>
                    </div>
                </div>
            </div>

            <div className='flex justify-center absolute xl:max-w-screen-xl lg:max-w-[900px] w-full left-1/2 transform translate-x-[-50%] z-50 -mt-20 md:-mt-32 lg:top-230 px-4 md:px-0'>
                <div className='w-full flex justify-center'>
                    <div className='bg-txt-primary text-bg-primary px-6 md:px-8 py-6 md:py-4 w-full md:w-auto'>
                        <h1 className='text-[28px] md:text-[36px] lg:text-[40px] font-subtitle'>Giờ làm việc</h1>
                        <p className='mt-4 text-[14px] md:text-[15px] font-light'>
                            <span>Thứ 2</span>
                            <span> - </span>
                            <span>Thứ 6</span>
                        </p>
                        <p className='mt-2 font-light text-[14px] md:text-[15px]'>
                            <span>10.00h</span>
                            <span> - </span>
                            <span>14.00h</span>
                        </p>
                        <p className='mt-2 font-light text-[14px] md:text-[15px]'>
                            <span>16.00h</span>
                            <span> - </span>
                            <span>20.00h</span>
                        </p>
                        <p className='mt-8 md:mt-12 font-light text-[14px] md:text-[15px]'>
                            <span>Thứ 7</span>
                            <span> - </span>
                            <span>Chủ nhật</span>
                        </p>
                        <p className='mt-2 text-[14px] md:text-[15px]'>Chỉ dành cho hẹn trước</p>
                    </div>
                </div>
            </div>

            <div className='w-full bg-bg-primary text-center  md:pt-60 lg:pt-100 flex justify-center px-4 md:px-0'>
                <form onSubmit={handleSubmit} className='flex flex-col xl:max-w-[440px] justify-start w-full text-[16px] md:text-[18px] px-4'>
                    <h1 className='text-[32px] md:text-[45px] lg:text-[45px] font-subtitle font-semibold text-txt-secondary mb-6 md:mb-8 lg:mb-10'>Liên hệ với chúng tôi</h1>
                    
                    {/* Status Message */}
                    {submitStatus && (
                        <div className={`p-3 md:p-4 mb-4 md:mb-6 rounded text-[14px] md:text-[16px] ${
                            submitStatus.type === 'success' 
                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="firstName" className='text-[14px] md:text-[16px] lg:text-[18px]'>First Name *</label>
                        <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder='First Name' 
                            className='w-full p-2 md:p-3 mt-2 text-[14px] md:text-[16px] lg:text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray bg-white border border-gray-300'
                            required
                        />
                    </div>
                    
                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="lastName" className='text-[14px] md:text-[16px] lg:text-[18px]'>Last Name *</label>
                        <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder='Last Name' 
                            className='w-full p-2 md:p-3 mt-2 text-[14px] md:text-[16px] lg:text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray bg-white border border-gray-300'
                            required
                        />
                    </div>
                    
                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="email" className='text-[14px] md:text-[16px] lg:text-[18px]'>Email *</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Email Address' 
                            className='w-full p-2 md:p-3 mt-2 text-[14px] md:text-[16px] lg:text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray bg-white border border-gray-300'
                            required
                        />
                    </div>
                    
                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="phone" className='text-[14px] md:text-[16px] lg:text-[18px]'>Phone</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder='Mobile phone number' 
                            className='w-full p-2 md:p-3 mt-2 text-[14px] md:text-[16px] lg:text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray bg-white border border-gray-300'
                        />
                    </div>
                    
                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="budget" className='text-[14px] md:text-[16px] lg:text-[18px]'>Dự kiến Budget đầu tư *</label>
                        <ul className='flex flex-col mt-3 md:mt-4 text-[14px] md:text-[16px] lg:text-[18px] w-full'>
                            {PRICE_RANGES.map((range, index) => (
                                <li 
                                    key={index} 
                                    className='flex items-center mb-2 cursor-pointer p-2 rounded transition-colors hover:bg-gray-50'
                                    onClick={() => handlePriceRangeSelect(range, index)}
                                >
                                    <div className={`w-[18px] h-[18px] md:w-[20px] md:h-[20px] border-2 rounded-full border-txt-primary relative mr-2 md:mr-3 flex items-center justify-center `}>
                                        <Dot className={`absolute text-txt-primary ${selectedPriceRange === range ? '' : 'hidden'}`} size={40} />
                                    </div>
                                    <p className='text-[14px] md:text-[16px] lg:text-[18px]'>
                                        {range}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className='flex flex-col items-start mb-6 md:mb-8 lg:mb-10'>
                        <label htmlFor="message" className='text-[14px] md:text-[16px] lg:text-[18px]'>Message *</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder='Write your message here ...' 
                            className='w-full p-2 md:p-3 mt-2 text-[14px] md:text-[16px] lg:text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray bg-white border border-gray-300 h-24 md:h-32'
                            required
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-row items-start mt-2 text-txt-primary mt-4 md:mt-6">
                        <div 
                            className="border mt-1 mr-2 md:mr-3 cursor-pointer w-[30px] h-[15px] md:w-[34px] md:h-[17px] flex items-center justify-center border-gray-400"
                            onClick={() => setConsent(!consent)}
                        >
                            {consent && (
                                <Check width={13} className="h-[15px] md:w-[15px] md:h-[17px] text-txt-primary"/>
                            )}
                        </div>
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] text-left">
                            {t('footer:policy')}
                        </p>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading && !consent}
                        className={`mt-4 md:mt-6 w-full rounded-sm bg-txt-secondary uppercase text-[14px] md:text-[16px] lg:text-[18px] text-bg-primary py-3 md:py-4 cursor-pointer transition-colors`}
                    >
                        {loading ? 'Sending...' : 'Submit Message'}
                    </button>
                </form>
            </div>
            <Footer withContact={false}/>
        </div>
    );
}

export default Contact;