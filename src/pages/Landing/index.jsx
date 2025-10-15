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
                className=" overflow-hidden"
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
            <div className="px-[150px] flex justify-center flex-row items-center mt-8 mb-40">
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
            {/* FEARTURE PROPERTIES */}
            <FeatureProperties />
            {/* OUR PHILOSOPHY */}
            <div className="px-[250px] py-[100px] flex gap-10">
                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <h1 className="font-subtitle text-[60px] text-bg-secondary">The L’atelia way</h1>
                    <h4 className="text-[38px] text-txt-primary mt-8">
                        We’re enriching a beautiful city with high-quality real estate project
                    </h4>
                    <div className="text-[18px] text-txt-primary">
                        <p className="mb-10 mt-15">
                        Some of the most beautiful and promising homes in Sóller are barely inhabitable by modern standards.
                        </p>
                        <p className="mb-10">
                            A townhouse that’s architectural features have been left untouched for decades, maybe centuries. As long as the feeling inside is right and its character is intact (even if its floors and ceilings are not), we see a potential project.
                        </p>
                        <p className="mb-10">
                        We strip everything back to the bare foundations to reveal hidden character, focusing only on the fundamentals – the feeling of the space, the way light passes through the rooms, the orientation, where the sun rises and sets.
                        </p>
                        <p className="mb-10">
                        Each project presents a different challenge. Whether we’re renovating a run-down building or designing a new low-impact home, our philosophy is always the same. We use the finest natural materials from the island and partner with local contractors who understand the region’s history and can help us build a home that respects its surroundings.
                        </p>
                        <p>
                        At Berrow, we shape a bold new vision that transforms more than a century of stories into a modern home that will last for the next 100 years and beyond.
                        </p>
                    </div>
                   
                </div>
                <div className="w-[670px] h-[900px]">
                    <img src={img1} alt="" className="w-full h-full"/>
                </div>
            </div>
            <Footer withContact={true}/>
        </div>
     );
}

const FeatureProperties = ()=>
{
    return (
        <div className="bg-bg-secondary text-white px-[200px] py-[80px] flex items-end">
                {/* LEFT */}
                <div className="mr-30">
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
                    <button className="border p-4 mt-15 cursor-pointer">FOR RENT</button>
                </div>

                <div className="min-w-0 overflow-hidden">
                    <Swiper modules={[Autoplay, Pagination, Navigation]} spaceBetween={30} slidesPerView={3} loop 
                    pagination={{ clickable: true }}>
                        { 
                            SLIDE_ITEMS.map(slideItem=>(
                                <SwiperSlide key={slideItem.id}> 
                                    <img src={slideItem.src} className="w-[325px] h-[325px] object-cover object-center" />
                                </SwiperSlide> )) 
                        } 
                    </Swiper>
                    <p className="mt-20 text-[18px]">
                        Set atop Valldemossa, Vistavall combines contemporary elegance with Mallorcan charm, offering panoramic views and year-round sunshine.
                    </p>
                </div>
                    
            </div>
    )
}
export default Landing;