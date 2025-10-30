import { useState } from 'react';
import contact from '../../assets/images/contact.png'
import { useTranslation } from 'react-i18next';
import { Check, Dot } from 'lucide-react';
import Footer from '../../layouts/components/Footer';
import OptimizedImage from '../../components/OptimizedImage';

const PRICE_RANGES = [
  "$0 - $200k",
  "$200k - $400k",
  "$400k - $600k",
  "$600k - $800k",
  "$800k and above",
  "Prefer not to say",
];

function Contact() {
    const [consent, setConsent] = useState(true);
    const {t} = useTranslation('footer');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const handlePriceRangeSelect = (range, index) => {
        // Nếu click vào item đang được chọn thì unselect, ngược lại select item mới
        setSelectedPriceRange(prev => prev === range ? null : range);
    };

    return ( 
        <div className="mt-20">
            <div className="h-[840px] relative">
                <OptimizedImage src={contact} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div> {/* ảnh tối 40% */}
                <div className='absolute z-40 top-2/5 left-1/2  text-bg-primary text-[60px] font-subtitle transform translate-x-[-50%] xl:max-w-screen-xl w-full lg:max-w-[900px]'>
                    <div className='w-full'>
                        <h1>Start the conversation</h1>
                        <h1>Make things happen</h1>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='flex justify-center absolute xl:max-w-screen-xl lg:max-w-[900px] w-full left-1/2 transform translate-x-[-50%]  z-50 top-170'>
                <div className='w-full flex gap-5'>
                    {/* Các phần office info giữ nguyên */}
                    <div className='flex-1 bg-txt-primary text-bg-primary px-8 py-4'>
                        <h1 className='text-[40px] font-subtitle'>Opening hours</h1>
                        <p className='mt-4 text-[15px]  font-light'>
                            <span>Mon</span>
                            <span> - </span>
                            <span>Fri</span>
                        </p>
                        <p className='mt-2 font-light text-[15px]'>
                            <span>10.00h</span>
                            <span> - </span>
                            <span>14.00h</span>
                        </p>
                        <p className='mt-2 font-light text-[15px]'>
                            <span>16.00h</span>
                            <span> - </span>
                            <span>20.00h</span>
                        </p>
                        <p className='mt-12 font-light text-[15px]'>
                            <span>Sat</span>
                            <span> - </span>
                            <span>Sun</span>
                        </p>
                        <p className='mt-2 text-[15px]'>Appointments only</p>
                    </div>
                    <div className='flex-1 bg-txt-primary text-bg-primary px-8 py-5'>
                        <h1 className='text-[40px] font-subtitle'>Ibiza office</h1>
                        <p className='mt-4 text-[15px]  font-light'>
                            Sales
                        </p>
                        <p className='text-[18px] font-light mt-2'>
                            + 34 661 752 198
                        </p>
                        <p className='mt-4 text-[15px]  font-light'>
                            Rent
                        </p>
                        <p className='text-[18px] font-light mt-2'>
                            + 34 648 67 48 27
                        </p>
                        <p className='mt-4 font-light'>
                            Contact
                        </p>
                        <p className='flex flex-col font-light text-[18px]'>
                            <span className='mt-2'>Ibiza, Spain</span>
                            <span className='mt-2'>Carrer des Cap Martinet, 14</span>
                            <span className='mt-2'>07819 Nuestra Señora de Jesús</span>
                            <span className='mt-2'>sales@royalestates.com</span>
                        </p>
                    </div>
                    <div className='flex-1 bg-txt-primary text-bg-primary px-8 py-4'>
                        <h1 className='text-[40px] font-subtitle'>Portugal office</h1>
                        <p className='mt-4 text-[15px]  font-light'>
                            Sales
                        </p>
                        <p className='text-[18px] font-light mt-2'>
                            + 34 661 752 198
                        </p>
                        <p className='mt-4 text-[15px]  font-light'>
                            Rent
                        </p>
                        <p className='text-[18px] font-light mt-2'>
                            + 34 648 67 48 27
                        </p>
                        <p className='mt-4 font-light'>
                            Contact
                        </p>
                        <p className='flex flex-col font-light text-[18px]'>
                            <span className='mt-2'>Lisboa – Algarve</span>
                            <span className='mt-2'>sales@royalestates.com</span>
                        </p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='w-full bg-bg-primary text-center pt-100 flex justify-center'>
                <div className='flex flex-col xl:max-w-[440px] justify-start w-full text-[18px]'>
                    <h1 className='text-[60px] font-subtitle font-semibold text-txt-secondary mb-10'>Contact Us</h1>
                    <div className='flex flex-col items-start mb-10'>
                        <label htmlFor="">First Name *</label>
                        <input type="text" placeholder='First Name' className='w-full rounded-sm mt-2 text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray'/>
                    </div>
                    <div className='flex flex-col items-start mb-10'>
                        <label htmlFor="">Last Name *</label>
                        <input type="text" placeholder='Last Name' className='w-full rounded-sm mt-2 text-[18px] w-full rounded-sm mt-2 text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray'/>
                    </div>
                    <div className='flex flex-col items-start mb-10'>
                        <label htmlFor="">Email *</label>
                        <input type="text" placeholder='Email Address' className='w-full rounded-sm mt-2 text-[18px] w-full rounded-sm mt-2 text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray'/>
                    </div>
                    <div className='flex flex-col items-start mb-10'>
                        <label htmlFor="">Phone</label>
                        <input type="text" placeholder='Mobile phone number' className='w-full rounded-sm mt-2 text-[18px] w-full rounded-sm mt-2 text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray'/>
                    </div>
                    <div className='flex flex-col items-start mb-10'>
                        <label htmlFor="">Select your Budget *</label>
                        <ul className='flex flex-col mt-4 text-[18px] w-full'>
                            {PRICE_RANGES.map((range, index) => (
                                <li 
                                    key={index} 
                                    className='flex items-center mb-2 cursor-pointer  p-2 rounded transition-colors'
                                    onClick={() => handlePriceRangeSelect(range, index)}
                                >
                                    <div className={`w-[20px] h-[20px] border-2 rounded-full border-txt-primary relative mr-2 flex items-center justify-center `}>
                                        {/* KHÔNG hiển thị dot nào cả - đã xóa điều kiện hiển thị dot */}
                                        <Dot className={`absolute text-txt-primary ${selectedPriceRange === range ? '' : 'hidden'}`}  size={40}/>
                                    </div>
                                    <p className={'text-[18px]'}>
                                        {range}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col items-start'>
                        <label htmlFor="" className='mb-2'>Message *</label>
                        <textarea name="" id="" placeholder='Write your message here ...' className='w-full rounded-sm text-[18px] w-full rounded-sm mt-2 text-[18px] focus:outline-none focus:ring-0 focus:border-txt-gray'></textarea>
                    </div>
                    <div className="flex flex-row items-start mt-2 text-txt-primary mt-4">
                        <div className="border mt-1 mr-2 cursor-pointer w-[34px] h-[17px]" onClick={()=>setConsent(!consent)}>
                            {consent && (
                                <Check width={15} className="h-[17px]"/>
                            )}
                        </div>
                        <p className="text-[15px] text-left">
                            {t('footer:policy')}
                        </p>
                    </div>
                    <button className='mt-4 w-full rounded-sm bg-txt-secondary uppercase text-[18px] text-bg-primary py-4 cursor-pointer'>submit message</button>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    );
}

export default Contact;