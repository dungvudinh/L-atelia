import { useState } from "react";
import { Check } from "lucide-react";
import logo from '../../../assets/images/logo.png'
import logoTextNoBg from '../../../assets/images/logo-text-no-bg.png'
import { useTranslation } from "react-i18next";

function Footer({withContact}) {
    const [consent, setConsent] = useState(true);
    const {t} = useTranslation('footer');
    
    return ( 
        <div className="bg-bg-primary pb-[30px] px-4 md:px-[50px] md:pb-[50px] flex justify-center">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10 md:mt-20 w-full">
                {/* CONTACT */}
                {withContact && (
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
                        {/* INSTAGRAM */}
                        <div className="basis-full lg:basis-1/3 text-center lg:text-left">
                            <h1 className="font-subtitle text-[28px] md:text-[36px] lg:text-[40px] text-txt-secondary leading-tight">
                                INSTAGRAM
                            </h1>
                            <p className="text-txt-primary text-[20px] md:text-[24px] lg:text-[26px] mt-4 md:mt-6 lg:mt-8">
                                @L'atelia
                            </p>
                        </div>
                        
                        {/* NEWSLETTER */}
                        <div className="basis-full lg:basis-1/3 text-center lg:text-left">
                            <h1 className="font-subtitle text-[28px] md:text-[36px] lg:text-[40px] text-txt-secondary leading-tight">
                                NEWSLETTER
                            </h1>
                            <p className="text-txt-primary text-[16px] md:text-[18px] mt-4 md:mt-6 lg:mt-8 lg:w-75 leading-relaxed">
                                {t('footer:newsletter.title')}
                            </p>
                        </div>
                        
                        {/* FORM */}
                        <div className="basis-full lg:basis-1/3 flex flex-col">
                            <input 
                                type="text" 
                                placeholder="Full name" 
                                className="bg-[#D9D9D9] p-3 outline-none focus:outline-none focus:ring-0 focus:border-none border-0 mb-3 md:mb-4 text-sm md:text-base"
                            />
                            <input 
                                type="text" 
                                placeholder="Email" 
                                className="bg-[#D9D9D9] p-3 outline-none focus:outline-none focus:ring-0 focus:border-none border-0 mb-3 md:mb-4 text-sm md:text-base"
                            />
                            <button className="font-subtitle text-[16px] md:text-[18px] lg:text-[20px] bg-bg-secondary text-bg-primary py-2 md:py-2 cursor-pointer uppercase">
                                {t('footer:button.title')}
                            </button>
                            
                            {/* CONSENT CHECKBOX */}
                            <div className="flex flex-row items-start mt-3 md:mt-2 text-txt-primary">
                                <div 
                                    className="border mt-1 mr-3 cursor-pointer w-[20px] h-[20px]  flex items-center justify-center flex-shrink-0"
                                    onClick={() => setConsent(!consent)}
                                >
                                    {consent && (
                                        <Check className="w-[14px] h-[14px] md:w-[15px] md:h-[17px]" />
                                    )}
                                </div>
                                <p className="text-[13px] md:text-[15px] leading-relaxed text-left">
                                    {t('footer:policy')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* LOCATION */}
                <div className={`flex flex-col items-center text-txt-primary ${withContact ? 'mt-10' :''}`}>
                    <img src={logo} alt="Logo" className="w-[80px] md:w-[108px] text-center" />
                    <img src={logoTextNoBg} alt="L'atelia" className="w-[160px] md:w-[211px] text-center mb-3 md:mb-4 mt-2" />
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