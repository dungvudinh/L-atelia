import { useState } from "react";
import { Check } from "lucide-react";
import logo from '../../../assets/images/logo.png'
import logoTextNoBg from '../../../assets/images/logo-text-no-bg.png'
function Footer({withContact}) {
    const [consent, setConsent] = useState(false);
    return ( 
        <div className="xl:px-[300px] xl:pt-[100px] bg-bg-primary pb-[30px] md:px-[50px] md:py-[50px]">
            {/* CONTACT */}
            <div className="flex gap-10 ">
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
                        Subscribe for our newsletter and be the first to know when our exclusive properties are released for sale
                    </p>
                </div>
                <div className="basis-full basis-1/3 flex flex-col">
                    <input type="text" placeholder="Full name" className="bg-[#D9D9D9] p-3 outline-none mb-4"/>
                    <input type="text" placeholder="Email" className="bg-[#D9D9D9] p-3 outline-none mb-4"/>
                    <button className="font-subtitle text-[20px] bg-bg-secondary text-bg-primary py-2 cursor-pointer">JOIN NOW</button>
                    <div className="flex flex-row items-start mt-2 text-txt-primary">
                        <div className="border  mt-1 mr-2 cursor-pointer w-[40px] h-[17px]" onClick={()=>setConsent(!consent)}>
                            {consent && (
                                <Check width={15} className="h-[17px]"/>
                            )}
                        </div>
                        <p className="text-[15px]">By ticking this box you agree to receive marketing and promotional emails from L’atelia. More information can be found in our privacy policy.</p>
                    </div>
                </div>
            </div>
            {/* LOCATION */}
            <div className="flex flex-col items-center xl:mt-20 text-txt-primary md:mt-10">
                <img src={logo} alt="" className="w-[108px] text-center"/>
                <img src={logoTextNoBg} alt="" className="w-[211px] text-center"/>
                <p className="text-[18px] mb-2">Crafting luxury property</p>
                <p className="text-[18px] mb-2">Da Nang City</p>
                <p className="text-[18px]">©2025 L’atelia </p>
                <p className="text-[15px] text-center">We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.</p>
            </div>
        </div>
    )
}

export default Footer;