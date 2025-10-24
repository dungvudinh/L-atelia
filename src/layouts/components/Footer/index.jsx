import { useState } from "react";
import { Check } from "lucide-react";
import logo from '../../../assets/images/logo.png'
import logoTextNoBg from '../../../assets/images/logo-text-no-bg.png'
import { useTranslation } from "react-i18next";
function Footer({withContact}) {
    const [consent, setConsent] = useState(true);
    const {t} = useTranslation('footer');
    return ( 
        <div className="pt-[100px] bg-bg-primary pb-[30px] md:px-[50px] md:py-[50px] flex justify-center">
            <div className="xl:max-w-screen-xl lg:max-w-[900px]">
                {/* CONTACT */}
                {withContact && (
                    <div className="flex gap-10">
                        <div className="basis-full basis-1/3">
                            <h1 className="font-subtitle text-[40px] text-txt-secondary">
                                INSTAGRAM
                            </h1>
                            <p className="text-txt-primary text-[26px] mt-8">@L’atelia</p>
                        </div>
                        <div className="basis-full basis-1/3">
                            <h1 className="font-subtitle text-[40px] text-txt-secondary">
                                NEWSLETTER
                            </h1>
                            <p className="text-txt-primary text-[18px] mt-8 w-75">
                                {t('footer:newsletter.title')}
                            </p>
                        </div>
                        <div className="basis-full basis-1/3 flex flex-col">
                            <input type="text" placeholder="Full name" className="bg-[#D9D9D9] p-3 outline-none mb-4"/>
                            <input type="text" placeholder="Email" className="bg-[#D9D9D9] p-3 outline-none mb-4"/>
                            <button className="font-subtitle text-[20px] bg-bg-secondary text-bg-primary py-2 cursor-pointer uppercase">
                                {t('footer:button.title')}
                            </button>
                            <div className="flex flex-row items-start mt-2 text-txt-primary">
                                <div className="border  mt-1 mr-2 cursor-pointer w-[40px] h-[17px]" onClick={()=>setConsent(!consent)}>
                                    {consent && (
                                        <Check width={15} className="h-[17px]"/>
                                    )}
                                </div>
                                <p className="text-[15px]">
                                    {t('footer:policy')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {/* LOCATION */}
                <div className="flex flex-col items-center xl:mt-20 text-txt-primary md:mt-10">
                    <img src={logo} alt="" className="w-[108px] text-center"/>
                    <img src={logoTextNoBg} alt="" className="w-[211px] text-center mb-4"/>
                    <p className="text-[18px] mb-2">Crafting luxury property</p>
                    <p className="text-[18px] mb-2">Da Nang City</p>
                    <p className="text-[18px]">©2025 L’atelia </p>
                    <p className="text-[15px] text-center">We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;