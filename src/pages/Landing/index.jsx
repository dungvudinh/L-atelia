import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide2 from '../../assets/images/slides/slide2.jpg';
import slide3 from '../../assets/images/slides/slide3.jpg';
import slide4 from '../../assets/images/slides/slide4.jpg';
import slide5 from '../../assets/images/slides/slide5.jpg';
import slide6 from '../../assets/images/slides/slide6.jpg';
import slide7 from '../../assets/images/slides/slide7.jpg';
import slide8 from '../../assets/images/slides/slide8.jpg';
import slide9 from '../../assets/images/slides/slide9.jpg';
import logoText from '../../assets/images/logo-text.png';
import { ArrowRight } from "lucide-react";
import img2 from '../../assets/images/img2.jpg';
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import OptimizedImage from "../../components/OptimizedImage";

const SLIDE_ITEMS = [
    {id:1, src:slide2 },
    {id:2, src:slide3 },
    {id:3, src:slide4 },
    {id:4, src:slide6 },
    {id:4, src:slide7 },
    {id:4, src:slide8 },
    {id:4, src:slide9 },
]
const SLIDE_ITEMS_2 = [
    {id:1, src:slide3 },
    {id:2, src:slide4 },
    {id:3, src:slide5 },
]

function Landing() {
    const {t} = useTranslation(["landing", "common"]);
    
    return ( 
        <div className="mt-20">
            {/* MAIN SLIDER */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                // autoplay={{
                //   delay: 4000,
                //   disableOnInteraction: false,
                // }}
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                }}
                // navigation
                className="overflow-hidden"
            >
                {
                    SLIDE_ITEMS.map(slideItem=>(
                        <SwiperSlide key={slideItem.id}>
                            <div className="w-full h-[300px] md:h-[500px] lg:h-[840px] relative">
                                <OptimizedImage
                                    src={slideItem.src}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* SUBTITLE */}
            <div className="mt-8 mb-20 lg:mb-40 flex justify-center px-4">
                <div className="flex flex-col lg:flex-row items-center justify-center xl:max-w-screen-xl lg:max-w-[900px] w-full">
                    <div className="w-full lg:w-auto flex justify-center mb-6 lg:mb-0">
                    <OptimizedImage 
    src={logoText} 
    alt="" 
    className="w-[200px] md:max-w-[500px] lg:max-w-[315px] xl:w-[800px]"
/>
                    </div>
                    <div className="pl-0 lg:pl-20 mt-8 lg:mt-20 text-center lg:text-left w-full lg:w-auto">
                        <p className="text-[20px] md:text-[24px] lg:text-[30px] text-txt-primary leading-tight">
                            {t('landing:hero.subtitle')}
                        </p>
                        <LocalizedLink to={'/projects'} className="inline-block">
                            <button
                                className="
                                    mt-6 lg:mt-8 flex items-center justify-center lg:justify-start
                                    text-txt-primary font-medium
                                    border border-txt-primary
                                    px-6 py-3
                                    cursor-pointer
                                    uppercase
                                    group
                                    hover:bg-txt-secondary
                                    hover:text-bg-primary
                                    w-full lg:w-auto
                                "
                            >
                                {t('landing:button.view_our_properties')}
                                <ArrowRight
                                    className="
                                        group-hover:text-bg-primary
                                        text-txt-primary
                                        ml-4
                                    "
                                />
                            </button>
                        </LocalizedLink>
                    </div>
                </div>
            </div>

            {/* FEATURE PROPERTIES */}
            <FeatureProperties />
            
            {/* OUR PHILOSOPHY */}
            <div className="py-[60px] lg:py-[100px] flex justify-center px-4">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* LEFT CONTENT */}
                    <div className="flex-basis lg:basis-1/2 order-2 lg:order-1">
                        <h1 className="font-subtitle text-[36px] md:text-[48px] lg:text-[60px] text-bg-secondary font-semibold leading-tight">
                            {t('landing:our_philosophy.title')}
                        </h1>
                        <h4 className="text-[24px] md:text-[30px] lg:text-[38px] text-txt-primary mt-6 lg:mt-8 leading-tight">
                            {t('landing:our_philosophy.summary')}
                        </h4>
                        <div className="text-[16px] lg:text-[18px] text-txt-primary mt-6 lg:mt-8">
                            <p className="mb-6 lg:mb-10">
                                {t('landing:our_philosophy.desc_1')}
                            </p>
                            <p className="mb-6 lg:mb-10">
                                {t('landing:our_philosophy.desc_2')}
                            </p>
                            <p className="mb-6 lg:mb-10">
                                {t('landing:our_philosophy.desc_3')}
                            </p>
                            <p className="mb-6 lg:mb-10">
                                {t('landing:our_philosophy.desc_4')}
                            </p>
                            <p>
                                {t('landing:our_philosophy.desc_5')}
                            </p>
                        </div>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="flex-basis lg:basis-1/2 order-1 lg:order-2">
                        <OptimizedImage 
                            src={img2} 
                            alt="" 
                            className="w-full h-auto lg:h-full object-cover"
                        />
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
        <div className="bg-bg-secondary text-white py-[40px] lg:py-[80px] flex justify-center px-4">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] flex flex-col lg:flex-row lg:items-end w-full">
                {/* LEFT */}
                <div className="lg:mr-10 xl:mr-30 mb-8 lg:mb-0">
                    {/* LIST */}
                    <div className="mb-6">
                    <ul className="text-[24px] md:text-[32px] lg:text-[40px] font-subtitle flex flex-row justify-around md:block space-y-0 md:space-y-2 lg:space-y-4">
                    <li className="cursor-pointer border-b-2 border-transparent hover:border-current transition-all duration-300 pb-1">
                        <LocalizedLink to={`/properties-for-sale/cantonada`}>
                            Cantonada
                        </LocalizedLink>
                    </li>
                    <li className="cursor-pointer border-b-2 border-transparent hover:border-current transition-all duration-300 pb-1">
                        <LocalizedLink to={`/properties-for-sale/son-alba`}>
                            Son Alba
                        </LocalizedLink>
                    </li>
                    <li className="cursor-pointer border-b-2 border-transparent hover:border-current transition-all duration-300 pb-1">
                        <LocalizedLink to={`/properties-for-sale/vistavall`}>
                            Vistavall
                        </LocalizedLink>
                    </li>
                    </ul>
                    </div>
                    {/* BUTTON */}
                    <button className="border p-3 lg:p-4 mt-4 lg:mt-15 cursor-pointer text-sm lg:text-base w-full lg:w-auto">
                        FOR RENT
                    </button>
                </div>
                
                {/* RIGHT - SLIDER */}
                <div className="min-w-0 overflow-hidden w-full">
    <Swiper 
        modules={[Autoplay, Pagination, Navigation]} 
        spaceBetween={0} // Thay đổi từ 16 thành 0 để không có khoảng cách
        slidesPerView={1} // Thay đổi từ 1.2 thành 1 để full width
        breakpoints={{
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }}
        loop 
        pagination={{ 
            clickable: true,
            renderBullet: function (index, className) {
                return `
                    <span class="${className} custom-bullet">
                    </span>
                `;
            },
            el: '.custom-pagination-wrapper'
        }}
    >
        { 
            SLIDE_ITEMS_2.map(slideItem=>(
                <SwiperSlide key={slideItem.id}> 
                    <div className="h-[200px] md:h-[300px] lg:h-auto">
                        <OptimizedImage 
                            src={slideItem.src} 
                            className="object-cover object-center w-full h-70"
                        />
                    </div>
                </SwiperSlide> 
            )) 
        } 
    </Swiper>

    {/* Pagination */}
    <div className="custom-pagination-wrapper mt-6 lg:mt-8 px-4"></div>
    
    {/* Description */}
    <p className="mt-4 lg:mt-5 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed px-4">
        Set atop Valldemossa, Vistavall combines contemporary elegance with Mallorcan charm, offering panoramic views and year-round sunshine.
    </p>
</div>
            </div>  
        </div>
    )
}

export default Landing;