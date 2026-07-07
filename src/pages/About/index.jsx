import { useState, useRef, useEffect} from 'react'
import aboutUs from '../../assets/images/about-us/about-us-final.jpg'
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import aboutUs5 from '../../assets/images/about-us/about-us-5.webp'
import aboutUs6 from '../../assets/images/about-us/about-us-6.webp'
import logo from '../../assets/images/logo.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode}from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from '../../layouts/components/Footer'
import OptimizedImage from '../../components/OptimizedImage'
import {LocalizedLink} from '../../components/LocalizedLink';
import { motion } from 'framer-motion'
import { useInView } from "framer-motion";
import JoinNewsletter from '../../components/JoinNewsletter'
import FollowUs from '../../components/FollowUs'
import ProjectCarousel from '../../components/ProjectCarousel'
import { Check } from 'lucide-react'
import img11 from '../../assets/images/img11.webp'
import img12 from '../../assets/images/img12.webp'
import img13 from '../../assets/images/img13.webp'
import img14 from '../../assets/images/img14.webp'
import img15 from '../../assets/images/img15.webp'
const TIMELINE_ITEMS = [
    {
        id: 1,
        year: '2017',
        events: [
            { text: 'Archie and Monty Berrow purchase ', link: 'Patiki Townhouse', after: ' and work alongside the building team on the reformation' }
        ]
    },
    {
        id: 2,
        year: '2019',
        events: [
            { link: 'Patiki Townhouse', after: ' is completed and sold' },
            { text: "The Berrow's open ", link: 'Patiki Beach', after: ' and run it as a family' }
        ]
    },
    {
        id: 3,
        year: '2020',
        events: [
            { link: 'Canoneta Townhouse', after: ' is purchased' },
            { text: 'The Berrow brothers sign a lease for a small office in the centre of Sóller' },
            { text: 'The first client projects are signed, ', link: 'Casa Mares', after: ' and 1902' }
        ]
    },
    {
        id: 4,
        year: '2021',
        events: [
            { text: "The Berrow brothers secure their first concession and start its transformation" },
            { text: 'The team starts to grow, with new roles in marketing and administration' },
            { text: 'Two new client projects start' },
            { link: 'Canoneta Townhouse', after: ' is completed' },
            { link: 'Mon Cor', after: ' is purchased' }
        ]
    },
    {
        id: 5,
        year: '2022',
        events: [
            { text: 'Office expands to a larger space in Sóller' },
            { link: 'Mon Cor', after: ' renovation begins' },
            { text: 'Three new client projects signed' },
            { text: 'Design Studio officially launches' }
        ]
    },
]
const PROCESS_STEPS = [
    {
        id: 1,
        title: 'LỰA CHỌN QUỸ ĐẤT',
        desc: 'Latelia trực tiếp nghiên cứu và lựa chọn quỹ đất phù hợp tại thành phố Đà Nẵng, ưu tiên:\n\n• Vị trí thuận tiện\n• Khả năng khai thác tốt\n• Giá trị sử dụng và gia tăng lâu dài\n\nĐây là nền tảng quan trọng quyết định chất lượng và giá trị của toàn bộ dự án.'
    },
    {
        id: 2,
        title: 'LÊN Ý TƯỞNG THIẾT KẾ',
        desc: 'Dựa trên đặc điểm khu đất và nhu cầu sử dụng thực tế, Latelia xây dựng ý tưởng kiến trúc tổng thể cho công trình:\n\n• Phong cách hiện đại, tinh tế\n• Định hướng công năng rõ ràng\n• Tối ưu án sáng và không gian sống'
    },
    {
        id: 3,
        title: 'THIẾT KẾ LAYOUT CÔNG NĂNG',
        desc: 'Từ ý tưởng ban đầu, đội ngũ Latelia triển khai bản vẽ layout chi tiết, sắp xếp không gian hợp lý:\n\n• Phòng ốc khoa học\n• Lưu thông tiện lợi\n• Đảm bảo sự riêng tư và thoải mái cho gia chủ'
    },
    {
        id: 4,
        title: 'XIN GIẤY PHÉP XÂY DỰNG',
        desc: 'Latelia thực hiện đầy đủ các thủ tục pháp lý cần thiết:\n\n• Xin giấy phép xây dựng theo đúng quy định\n• Đảm bảo hồ sơ pháp lý rõ ràng, minh bạch\n• Giúp khách hàng an tâm trước khi triển khai dự án'
    },
    {
        id: 5,
        title: 'TRIỂN KHAI THIẾT KẾ 3D',
        desc: 'Sau khi hoàn tất pháp lý, Latelia xây dựng bản vẽ phối cảnh 3D chi tiết, thể hiện:\n\n• Hình dáng kiến trúc\n• Không gian nội – ngoại thất\n• Cảm xúc và trải nghiệm sống thực tế\n\nKhách hàng có thể hình dung chính xác ngôi nhà tương lai của mình.'
    },
    {
        id: 6,
        title: 'TRIỂN KHAI BÁN HÀNG & ĐIỀU CHỈNH THEO NHU CẦU KHÁCH',
        desc: 'Trong giai đoạn này:\n\n• Latelia giới thiệu sản phẩm đến khách hàng\n• Khách hàng được quyền điều chỉnh thiết kế nội thất theo nhu cầu và phong cách riêng\n• Hai bên thống nhất phương án tối ưu nhất'
    },
    {
        id: 7,
        title: 'CHỐT BẢN VẼ 3D CUỐI CÙNG',
        desc: 'Sau khi thống nhất:\n\n• Hai bên chốt bản vẽ 3D hoàn chỉnh\n• Đây là cơ sở kỹ thuật và pháp lý để triển khai thi công\n• Mọi hạng mục được xác định rõ ràng'
    },
    {
        id: 8,
        title: 'KÝ HỢP ĐỒNG & TRIỂN KHAI XÂY DỰNG',
        desc: 'Latelia và khách hàng tiến hành:\n\n• Ký kết hợp đồng thi công\n• Cam kết xây dựng đúng thiết kế đã chốt\n• Quản lý tiến độ, chất lượng và kỹ thuật trong suốt quá trình thi công'
    },
    {
        id: 9,
        title: 'HOÀN THIỆN & BÀN GIAO NHÀ',
        desc: 'Sau khi công trình hoàn tất:\n\n• Latelia nghiệm thu theo đúng bản vẽ đã cam kết\n• Bàn giao nhà cho khách hàng\n• Đảm bảo chất lượng, thẩm mỹ và công năng đúng như thiết kế ban đầu\n\nKhách hàng nhận nhà đúng cam kết – đúng chất lượng – đúng kỳ vọng.'
    }
];
const GALLERY_IMAGES = [img11,img12,img13, img14,img15]

function About()
{
    const [loaded, setLoaded] = useState(true);
    return (
        <div className="">
            {/* Hero Image */}
            <div className='w-full xl:h-screen h-[300px] md:h-[500px] relative'>
                <OptimizedImage src={aboutUs} alt="" 
                    className={`w-full h-full object-cover object-center transition-opacity duration-100
                                ${loaded ? 'slide-image-animate' : 'opacity-0'} // 👈 ẩn cho đến khi load`} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
                        className="text-white text-[18px] md:text-[18px] xl:text-[18px]  leading-tight tracking-widest flex items-center justify-center gap-3"
                    >
                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                        About Us
                        <div className="h-[1px] bg-white" style={{width:'3rem', opacity:1, transformOrigin:'100% 50% 0px'}}></div>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
                        className="text-white/75 text-[64px] md:text-[64px] xl:text-[64px] mt-4 max-w-xl"
                    >
                       Một đội ngũ. <br/> Một tiêu chuẩn.
                    </motion.p>
                    {/* <motion.div
                        initial={{ scaleX: 0 }}
                        animate={loaded ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="h-[1px] bg-white/60 w-16 mt-6"
                        style={{ originX: 0.5 }}
                    /> */}
                </div>
            </div>
            
            {/* Section 1: About History */}
            {/* SUBTITLE */}
            <div className="xl:mt-40 mb-10 xl:mb-40 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        LỰA CHỌN ĐẤT – NỀN TẢNG CỦA GIÁ TRỊ LÂU DÀI
                        </h1>
                        <p  className="text-[20px] text-bg-secondary mt-2">
                        Đằng sau mỗi ngôi nhà Art Latelia không chỉ là bản vẽ hay vật liệu, mà là một quá trình được tính toán kỹ lưỡng ngay từ viên gạch đầu tiên.
                        </p>
                        <p  className="text-[20px] text-bg-secondary mt-2">
                        Art Latelia không chọn đất theo số lượng. Chúng tôi chọn theo các tiêu chí cốt lõi: vị trí thuận tiện cho sinh hoạt, kết nối tốt. Pháp lý rõ ràng, phù hợp với phát triển lâu dài. Phù hợp để tạo nên không gian sống chất lượng, không chỉ để ở mà còn để giữ gìn giá trị tài sản. Đất tốt là điều kiện tiên quyết để một ngôi nhà trở nên đáng sống và đáng đầu tư.
                        </p>
                    </div>
                </FadeUpSection>
            </div>
            {/* <TimelineSection /> */}
            <div className='mt-10 lg:mt-20 bg-gray-50 py-10 lg:py-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto px-4'>
                    <div className='text-center mb-10 lg:mb-16'>
                        <h1 className='text-[25px] lg:text-[32px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold leading-tight mb-4'>
                            QUY TRÌNH TRIỂN KHAI DỰ ÁN TẠI LATELIA
                        </h1>
                        <p className='text-[16px] lg:text-[18px] text-gray-600'>
                            Minh bạch – Đồng hành – Cam kết đúng như thiết kế
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {PROCESS_STEPS.map((step, index) => (
                            <div key={step.id} className='p-6 xl:p-8 p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
                                <div className='flex xl:items-start justify-center items-center gap-4 xl:flex-row flex-col'>
                                    <div className='flex-shrink-0 w-10 h-10 bg-txt-secondary text-white rounded-full flex items-center justify-center font-semibold text-[18px]'>
                                        {index + 1}
                                    </div>
                                    <div className='flex-1'>
                                        <h4 className='text-[18px] lg:text-[20px] font-semibold font-subtitle text-txt-secondary mb-4 lg:mb-5 leading-tight' >
                                            {step.title}
                                        </h4>
                                        <div className='text-[15px] lg:text-[16px] text-gray-600 whitespace-pre-line space-y-2' style={{fontFamily:'Nunito Sans'}}>
                                            {step.desc.split('\n').map((line, idx) => (
                                                <p key={idx} className={`${line.startsWith('•') ? 'flex items-start' : ''} ${line.trim() === '' ? 'mt-3' : ''}`}>
                                                    {line.startsWith('•') ? (
                                                        <>
                                                            <span className='mr-2 mt-1 flex-shrink-0'>•</span>
                                                            <span>{line.substring(1).trim()}</span>
                                                        </>
                                                    ) : (
                                                        line
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-16 lg:mt-20 text-center'>
                        <div className='inline-block p-6 lg:p-8 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl'>
                            <h3 className='text-[20px] lg:text-[24px] font-semibold text-txt-secondary mb-6 font-subtitle'>
                                CAM KẾT CỦA LATELIA
                            </h3>
                            <div className='space-y-4 text-left mb-6' style={{fontFamily:'Nunito Sans'}}>
                                <p className='text-[16px] lg:text-[17px] flex items-start' >
                                    <Check className='text-green-500 mr-3 mt-1 flex-shrink-0' size={20}/>
                                    Quy trình rõ ràng, minh bạch từng giai đoạn
                                </p>
                                <p className='text-[16px] lg:text-[17px] flex items-start'>
                                    <Check className='text-green-500 mr-3 mt-1 flex-shrink-0' size={20}/>
                                    Khách hàng được đồng hành và tham gia vào quá trình thiết kế
                                </p>
                                <p className='text-[16px] lg:text-[17px] flex items-start'>
                                    <Check className='text-green-500 mr-3 mt-1 flex-shrink-0' size={20}/>
                                    Thi công đúng bản vẽ, đúng cam kết hai bên
                                </p>
                            </div>
                            <p className='text-[18px] lg:text-[20px] font-subtitle text-txt-secondary italic'>
                                "Latelia không chỉ xây nhà – chúng tôi xây dựng niềm tin dài hạn."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ImageStrip />
            <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                    <div className="mx-auto max-w-[772px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{transform:'none'}}>
                        <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{lineHeight:1.2}} >
                        Một đơn vị thiết kế và thi công, phát triển bất động sản và tập hợp thương hiệu phong cách sống, tất cả nằm trong Latelia
                        </h1>
                    </div>
                </FadeUpSection>
            </div>
            <VennDiagram />
            <div className="xl:mt-40 mb-10 xl:mb-20 lg:mb-20 mt-4 flex justify-center px-4">
                <FadeUpSection>
                <div className="mx-auto max-w-[1100px] sm:w-11/12 md:w-9/12 lg:w-10/12 text-center" style={{ transform: 'none' }}>
                    <h1 className="text-bg-secondary text-[48px] text-center font-medium" style={{ lineHeight: 1.2 }}>
                        Triết lý thiết kế của Art L'Atelia
                    </h1>

                    <p style={{ fontFamily: 'InstrumentSans' }} className="text-[20px] text-bg-secondary mt-4">
                        Chúng tôi tin rằng một ngôi nhà đẹp không nằm ở việc phô trương, mà ở cảm giác khi sống trong đó. Tại Latelia, thiết kế không bắt đầu từ bản vẽ, mà bắt đầu từ con người sẽ ở trong ngôi nhà ấy.
                    </p>
                    <p style={{ fontFamily: 'InstrumentSans' }} className="text-[20px] text-bg-secondary mt-2">
                        Mỗi công trình được hình thành dựa trên 3 giá trị cốt lõi:
                    </p>

                    {/* 3 giá trị cốt lõi */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-10 text-left">
                        <CoreValue
                            title="Cá nhân hoá"
                            desc="Mỗi ngôi nhà là một dấu ấn riêng. Latelia không sao chép thiết kế. Chúng tôi lắng nghe thói quen sống, gu thẩm mỹ và mong muốn dài hạn của chủ nhân để tạo nên không gian phù hợp – vừa vặn – có hồn."
                        />
                        <CoreValue
                            title="Kiến trúc hiện đại"
                            desc="Sống thoải mái theo thời gian. Thiết kế ưu tiên ánh sáng tự nhiên, thông gió và công năng tối ưu, bền vững theo năm tháng. Một ngôi nhà đẹp là ngôi nhà 10 năm sau vẫn thấy đúng."
                        />
                        <CoreValue
                            title="Nghệ thuật trong sự tinh giản"
                            desc="Art Latelia theo đuổi vẻ đẹp không rườm rà, không chạy theo xu hướng ngắn hạn, tinh tế trong từng chi tiết nhỏ. Để mỗi ngày trở về nhà là một trải nghiệm dễ chịu, thư thái và tự hào."
                        />
                    </div>

                    {/* Câu kết luận */}
                    <p className="text-bg-secondary text-[24px] font-medium mt-12" style={{ lineHeight: 1.4 }}>
                        Chúng tôi không xây thật nhanh.
                        <br />
                        Chúng tôi xây đúng ngay từ đầu.
                    </p>
                </div>
                </FadeUpSection>
            </div>
            <ProjectCarousel />
            <JoinNewsletter />
            <FollowUs />
            <Footer withContact={false}/>
        </div>
    )
}
function TimelineSection() {
    const sectionRef = useRef(null)
    const lineRef = useRef(null)
    const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

    useEffect(() => {
        if (isSectionInView && lineRef.current) {
            setTimeout(() => {
                lineRef.current.style.width = '100%'
            }, 400)
        }
    }, [isSectionInView])

    return (
        <section ref={sectionRef} className="px-6 xl:px-16 py-20 xl:py-32 overflow-hidden">
            {/* Line + Dots row */}
            <div className="relative mb-10">
                {/* Background line */}
                <div className="w-full h-[1px] bg-[#c5bba8] absolute top-[50%]" />
                {/* Animated progress line */}
                <div
                    ref={lineRef}
                    style={{
                        width: '0%',
                        transition: 'width 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        height: '1px',
                        background: '#1a2a2a',
                        position: 'absolute',
                        top: '50%',
                    }}
                />
                {/* Dots row — aligned with grid columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 relative">
                    {TIMELINE_ITEMS.map((item, index) => (
                        <DotOnly key={item.id} index={index} isSectionInView={isSectionInView} />
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
                {TIMELINE_ITEMS.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}
function CoreValue({ title, desc }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <h3 className="text-bg-secondary text-[22px] font-medium mb-3 tracking-wide">
                {title}
            </h3>
            <p
                className="text-[16px] text-[#4a5050] leading-relaxed"
                style={{ fontFamily: 'Nunito Sans' }}
            >
                {desc}
            </p>
        </motion.div>
    )
}
function DotOnly({ index, isSectionInView }) {
    return (
        <div className="flex items-center py-2">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: index * 0.12 + 0.5,
                }}
                className="w-2 h-2 rounded-full bg-[#1a2a2a]"
            />
        </div>
    )
}

function TimelineItem({ item, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
            }}
        >
            {/* Year */}
            <p className="text-bg-secondary text-[15px] font-semibold tracking-wide mb-4">
                {item.year}
            </p>

            {/* Events */}
            <ul className="space-y-2">
                {item.events.map((ev, i) => (
                    <li key={i} className="text-[13px] text-[#4a5050] leading-relaxed" style={{ fontFamily: 'InstrumentSans' }}>
                        {ev.text}
                        {ev.link && (
                            <LocalizedLink to="#" className="underline underline-offset-2 decoration-[#c5bba8] hover:decoration-[#1a2a2a] transition-colors text-bg-secondary">
                                {ev.link}
                            </LocalizedLink>
                        )}
                        {ev.after}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
function ImageStrip() {
    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 py-2">
            <Swiper
                modules={[FreeMode, Autoplay]}
                freeMode={{
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.6,
                }}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                loopAdditionalSlides={2}
                speed={5000}
                slidesPerView="auto"
                spaceBetween={20}
                grabCursor={true}
            >
                {GALLERY_IMAGES.map((img, i) => (
                    <SwiperSlide
                        key={i}
                        style={{ width: '1000px' }}
                        className="!h-auto"
                    >
                        <div
                            className={`
                                overflow-hidden
                                h-[82vh] 
                                rounded-2xl
                            `}
                            style={{ width: img.width }}
                        >
                            <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover object-center"
                                draggable={false}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
function VennDiagram() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const fadeScale = (delay) => ({
        initial: { opacity: 0, scale: 0.5 },
        animate: isInView ? { opacity: 1, scale: 1 } : {},
        transition: {
            duration: 0.6,
            delay,
            ease: [0.34, 1.56, 0.64, 1],
        },
    })

    return (
        <div ref={ref} className="flex items-center justify-center w-full py-16 xl:py-24">
            {/* Container cố định maxWidth để SVG và labels cùng tỉ lệ */}
            <div className="relative w-full" style={{ maxWidth: '790px' }}>
            <svg
                viewBox="0 0 700 650"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="circle-top">
                            <circle cx="350" cy="210" r="210" />
                        </clipPath>
                        <clipPath id="intersect-top-left">
                            <circle cx="230" cy="420" r="210" />
                        </clipPath>
                    </defs>

                    {/* 3 vòng tròn chính */}
                    <circle cx="350" cy="210" r="210" fill="#e8ecea" fillOpacity="0.75" />
                    <circle cx="230" cy="420" r="210" fill="#e8ecea" fillOpacity="0.75" />
                    <circle cx="470" cy="420" r="210" fill="#e8ecea" fillOpacity="0.75" />

                    {/* Vùng giao đôi */}
                    <circle cx="230" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#circle-top)" />
                    <circle cx="470" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#circle-top)" />
                    <circle cx="470" cy="420" r="210" fill="#C6D3D5" fillOpacity="0.45" clipPath="url(#intersect-top-left)" />

                    {/* Vùng giao cả 3 — màu #C6D3D5 solid */}
                    <g clipPath="url(#circle-top)">
                        <g clipPath="url(#intersect-top-left)">
                            <circle cx="470" cy="420" r="210" fill="#C6D3D5" />
                        </g>
                    </g>
                </svg>

                

                {/* Architecture & Design — tâm circle trên */}
                <motion.div
                    {...fadeScale(0.1)}
                    className="absolute text-center"
                    style={{
                        left: '39%',
                        top: '20%',          // cy=210 → 210/620 ≈ 34%, phần trên circle
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                    Thiết kế kiến trúc
                    </p>
                </motion.div>

                {/* Sales & Marketing — tâm circle trái dưới */}
                <motion.div
                    {...fadeScale(0.3)}
                    className="absolute text-center"
                    style={{
                        left: '14%',         // cx=185 → 185/600 ≈ 31%
                        top: '65%',          // cy=410 → 410/620 ≈ 66%, phần dưới circle
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                    Truyền thông <br/> & Bán hàng 
                    </p>
                </motion.div>

                {/* Development — tâm circle phải dưới */}
                <motion.div
                    {...fadeScale(0.5)}
                    className="absolute text-center"
                    style={{
                        left: '70%',         // cx=415 → 415/600 ≈ 69%
                        top: '65%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <p style={{ fontSize: 'clamp(20px, 1.5vw, 30px)', color: '#1a3a3a', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                    Phát triển
                    </p>
                </motion.div>

                {/* Logo — tâm giao nhau của 3 vòng */}
                <motion.img
                    {...fadeScale(0.7)}
                    src={logo}
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        width: 'clamp(80px, 14%, 160px)',
                        left: '43%',
                        top: '47%',          // điểm giao giữa 3 vòng
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>
        </div>
    )
}
const FadeUpSection = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    )
}
const InViewSlider = ({ images }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
  
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial={{ x: "30%" }}
          animate={isInView ? { x: 0 } : { x: "30%" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            scrollbar={{ draggable: true }}
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "200px" }}
                className="rounded-2xl overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <img
                    src={img}
                    alt={`instagram-${index}`}
                    className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    )
  }
export default About;