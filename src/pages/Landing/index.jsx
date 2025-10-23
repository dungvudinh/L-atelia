import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from '../../assets/images/slides/slide1.png';
import logoText from '../../assets/images/logo-text.png';
import { ArrowRight } from "lucide-react";
import img1 from '../../assets/images/img1.png';
import Footer from "../../layouts/components/Footer";
const SLIDE_ITEMS = [
    {id:1, src:slide1 },
    {id:2, src:slide1}, 
    {id:3, src:slide1},
    {id:4, src:slide1},
    {id:5, src:slide1},
    {id:6, src:slide1},
    
]
function Landing() {
    const {t} = useTranslation(["landing", "common"]);
    return ( 
        <div className="mt-20">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                // autoplay={{
                //   delay: 4000,
                //   disableOnInteraction: false,
                // }}
                pagination={{ clickable: true }}
                // navigation
                className="overflow-hidden"
                >
                {
                    SLIDE_ITEMS.map(slideItem=>(
                        <SwiperSlide key={slideItem.id}>
                            <div className="w-full h-[840px] relative">
                                <img
                                src={slideItem.src}
                                className="w-full h-full object-cover object-center"
                                />
                                {/* Nếu muốn overlay chữ, thêm nội dung ở đây */}
                            </div>
                      </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* SUBTITLE */}
            <div className=" mt-8 mb-40 lg:mb-20 flex justify-center">
                <div className="flex justify-center flex-row items-center xl:max-w-screen-xl lg:max-w-[900px]">
                    <div>
                        <img src={logoText} alt="" className="w-[800px]"/>
                    </div>
                    <div className="pl-20 mt-20">
                        <p className="text-[30px] text-txt-primary">
                            {t('landing:hero.subtitle')}
                        </p>
                        <button
                            className="
                                mt-8 flex items-center
                                text-txt-primary font-medium
                                border border-txt-primary
                                px-6 py-3
                                cursor-pointer
                                group
                                transition-all duration-300
                                uppercase
                            "
                            >
                            {t('landing:button.view_our_properties')}
                            <ArrowRight
                                className="
                                text-txt-primary
                                ml-4
                                transform
                                transition-transform
                                duration-300
                                group-hover:translate-x-2
                                "
                            />
                        </button>

                    </div>
                </div>
            </div>
            {/* FEARTURE PROPERTIES */}
            <FeatureProperties />
            {/* OUR PHILOSOPHY */}
            <div className="py-[100px] flex justify-center">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] flex gap-10">
                    {/* LEFT CONTENT */}
                    <div className="flex-basis basis-1/2">
                        <h1 className="font-subtitle text-[60px] text-bg-secondary">{t('landing:our_philosophy.title')}</h1>
                        <h4 className="text-[38px] text-txt-primary mt-8">
                            {t('landing:our_philosophy.summary')}
                        </h4>
                        <div className="text-[18px] text-txt-primary">
                            <p className="mb-10 mt-15 lg:mb-5 lg:mt-10">
                                {t('landing:our_philosophy.desc_1')}
                            </p>
                            <p className="mb-10 lg:mb-5">
                            {t('landing:our_philosophy.desc_2')}
                            </p>
                            <p className="mb-10 lg:mb-5">
                            {t('landing:our_philosophy.desc_3')}
                            </p>
                            <p className="mb-10 lg:mb-5">
                            {t('landing:our_philosophy.desc_4')}
                            </p>
                            <p>
                            {t('landing:our_philosophy.desc_5')}
                            </p>
                        </div>
                    
                    </div>
                    {/* RIGHT */}
                    <div className="flex-basis basis-1/2">
                        <img src={img1} alt="" className="w-full h-full"/>
                    </div>
                </div>
            </div>
            <Footer withContact={true}/>
        </div>
     );
}

const FeatureProperties = ()=>
{
    return (
        <div className="bg-bg-secondary text-white py-[80px] flex justify-center">
            <div className="xl:max-w-screen-xl flex items-end lg:max-w-[900px]">
                {/* LEFT */}
                <div className="xl:mr-30 lg:mr-10">
                    {/* LIST */}
                    <div>
                        <ul className="text-[40px] font-subtitle">
                            <li className="mb-4">
                                Cantonada
                            </li>
                            <li className="mb-4">
                                Son Alba
                            </li >
                            <li>
                                Vistavall
                            </li>
                        </ul>
                    </div>
                    {/*  BUTTON*/}
                    <button className="border p-4 xl:mt-15 lg:mt-5 cursor-pointer">FOR RENT</button>
                </div>
                <div className="min-w-0 overflow-hidden">
                    <Swiper modules={[Autoplay, Pagination, Navigation]} spaceBetween={30} slidesPerView={3} loop 
                    pagination={{ clickable: true }}>
                        { 
                            SLIDE_ITEMS.map(slideItem=>(
                                <SwiperSlide key={slideItem.id}> 
                                    <img src={slideItem.src} className="object-cover object-center" />
                                </SwiperSlide> )) 
                        } 
                    </Swiper>
                    <p className="xl:mt-15 lg:mt-5 text-[18px]">
                        Set atop Valldemossa, Vistavall combines contemporary elegance with Mallorcan charm, offering panoramic views and year-round sunshine.
                    </p>
                </div>
            </div>  
        </div>
    )
}
export default Landing;