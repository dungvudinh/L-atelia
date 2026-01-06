import aboutUs from '../../assets/images/about-us/about-us.webp'
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import aboutUs5 from '../../assets/images/about-us/about-us-5.webp'
import aboutUs6 from '../../assets/images/about-us/about-us-6.webp'
import aboutUs7 from '../../assets/images/about-us/about-us-7.webp'
import aboutUs8 from '../../assets/images/about-us/about-us-8.webp'
import aboutUs9 from '../../assets/images/about-us/about-us-9.webp'
import aboutUs10 from '../../assets/images/about-us/about-us-10.webp'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Building2, Target, ShieldCheck, Heart, MapPin, Users, Minus } from 'lucide-react';
import Footer from '../../layouts/components/Footer'
import OptimizedImage from '../../components/OptimizedImage'
import {LocalizedLink} from '../../components/LocalizedLink';

const SLIDE_ITEMS = [
    {id:1, src:aboutUs7, name:'Trần Duy Tùng', position:'Founder & CEO' },
    {id:2, src:aboutUs8,  name:'Nguyễn Thị Minh', position:'Kiến trúc sư trưởng'}, 
    {id:3, src:aboutUs9,  name:'Lê Văn Hùng', position:'Trưởng phòng thi công'},
    {id:4, src:aboutUs10,  name:'Phạm Thị Lan', position:'Trưởng phòng CSKH'},
]

const PROCESS_STEPS = [
    {id:1, title:'Bước 1: Lựa chọn quỹ đất', desc:'Latelia trực tiếp nghiên cứu và lựa chọn quỹ đất phù hợp tại Đà Nẵng'},
    {id:2, title:'Bước 2: Lên ý tưởng thiết kế', desc:'Xây dựng ý tưởng kiến trúc tổng thể với phong cách hiện đại, tinh tế'},
    {id:3, title:'Bước 3: Thiết kế layout công năng', desc:'Triển khai bản vẽ layout chi tiết, sắp xếp không gian hợp lý'},
    {id:4, title:'Bước 4: Xin giấy phép xây dựng', desc:'Thực hiện đầy đủ thủ tục pháp lý, đảm bảo minh bạch'},
    {id:5, title:'Bước 5: Triển khai thiết kế 3D', desc:'Xây dựng bản vẽ phối cảnh 3D chi tiết cho khách hàng hình dung'},
    {id:6, title:'Bước 6: Triển khai bán hàng', desc:'Giới thiệu sản phẩm và điều chỉnh theo nhu cầu khách hàng'},
    {id:7, title:'Bước 7: Chốt bản vẽ 3D cuối cùng', desc:'Hai bên thống nhất bản vẽ hoàn chỉnh'},
    {id:8, title:'Bước 8: Ký hợp đồng & thi công', desc:'Ký kết hợp đồng và triển khai xây dựng đúng thiết kế'},
    {id:9, title:'Bước 9: Hoàn thiện & bàn giao', desc:'Nghiệm thu và bàn giao nhà đúng cam kết'},
]

const CORE_VALUES = [
    {id:1, title:'Tư duy đầu tư bài bản', desc:'Trực tiếp đầu tư và phát triển, không qua trung gian, đảm bảo tính minh bạch và giá trị thực', icon: Target},
    {id:2, title:'Thiết kế khác biệt', desc:'Mỗi ngôi nhà đều mang dấu ấn riêng, hiện đại, tinh tế và không rập khuôn đại trà', icon: Building2},
    {id:3, title:'Giá trị dài hạn', desc:'Không chỉ phù hợp để ở, sản phẩm Latelia còn có tiềm năng gia tăng giá trị bền vững theo thời gian', icon: ShieldCheck},
    {id:4, title:'Minh bạch & đồng hành', desc:'Đề cao sự rõ ràng, trách nhiệm và đồng hành cùng khách hàng trong suốt quá trình', icon: Users},
]

const DA_NANG_FEATURES = [
    {id:1, text:'Môi trường sống trong lành'},
    {id:2, text:'Hạ tầng phát triển đồng bộ'},
    {id:3, text:'Cộng đồng cư dân văn minh'},
    {id:4, text:'Tiềm năng đầu tư lâu dài'},
]

function About()
{
    return (
        <div className="mt-20">
            {/* Hero Image */}
            <div className='w-full h-[300px] lg:h-[840px]'>
                <OptimizedImage src={aboutUs} alt="" className='w-full h-full object-cover'/>
            </div>
            
            {/* Section 1: About History */}
            <div className='flex justify-center mt-10 lg:mt-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
                    <div className='lg:flex-basis lg:basis-1/2'>
                        <h4 className='text-[20px] lg:text-[26px] mb-4 lg:mb-5 text-txt-secondary' >Latelia</h4>
                        <h1 className='text-[32px] lg:text-[55px] font-subtitle text-txt-secondary font-semibold mb-4 lg:mb-5 leading-tight flex items-center'>
                            Về chúng tôi 
                            <span className='mx-2 mt-2'>
                                <Minus />
                            </span>
                             Latelia là ai ?
                        </h1>
                        <p className='text-[16px] lg:text-[18px] mb-6 lg:mb-6 mt-6 lg:mt-6'>
                            Latelia được thành lập với một khát vọng rõ ràng:
                            mang đến những sản phẩm bất động sản có giá trị thật – cả về trải nghiệm sống lẫn tiềm năng gia tăng trong tương lai.
                        </p>
                        
                        <div className='space-y-4 mb-6'>
                            <p className='text-[16px] lg:text-[18px] font-medium'>Chúng tôi trực tiếp:</p>
                            <p className='text-[16px] lg:text-[18px] flex items-start'>
                                <span className='text-txt-secondary font-semibold mr-2'>•</span>
                                Lựa chọn quỹ đất phù hợp
                            </p>
                            <p className='text-[16px] lg:text-[18px] flex items-start'>
                                <span className='text-txt-secondary font-semibold mr-2'>•</span>
                                Nghiên cứu nhu cầu sử dụng thực tế
                            </p>
                            <p className='text-[16px] lg:text-[18px] flex items-start'>
                                <span className='text-txt-secondary font-semibold mr-2'>•</span>
                                Thiết kế kiến trúc tối ưu công năng và cảm xúc
                            </p>
                            <p className='text-[16px] lg:text-[18px] flex items-start'>
                                <span className='text-txt-secondary font-semibold mr-2'>•</span>
                                Kiểm soát chất lượng xây dựng từ đầu đến cuối
                            </p>
                        </div>

                        <p className='text-[16px] lg:text-[18px] mt-6 lg:mt-8'>
                            Dù mới thành lập hơn một năm, Latelia lựa chọn con đường làm ít – làm kỹ – làm có chiều sâu, lấy uy tín và chất lượng làm nền tảng phát triển bền vững.
                        </p>  
                    </div>
                    <div className='lg:flex-basis lg:basis-1/2 h-[300px] lg:h-[650px] mt-6 lg:mt-0'>
                        <OptimizedImage src={aboutUs2} alt="" className='w-full h-full object-cover'/>
                    </div>
                </div>
            </div>

            {/* Section 2: Triết lý kiến trúc */}
            <div className='mt-10 lg:mt-20 bg-bg-primary flex flex-col lg:flex-row'>
                <div className='px-4 lg:px-0 lg:ml-25 mt-8 lg:mt-30 lg:mr-20 lg:w-auto w-full pb-4'>
                    <div className='flex items-center gap-3 mb-4'>
                        <Building2 className='text-txt-secondary' size={24}/>
                        <h4 className='text-[20px] lg:text-[26px] text-txt-secondary'>TRIẾT LÝ KIẾN TRÚC</h4>
                    </div>
                    <h1 className='text-[32px] lg:text-[48px] font-subtitle text-txt-secondary font-semibold lg:w-120 mb-6 lg:mb-6 leading-tight'>
                        Kiến trúc không chỉ để ở – mà để tận hưởng
                    </h1>
                    <p className='text-[16px] lg:text-[18px] lg:w-150 mb-6'>
                        Mỗi công trình Latelia đều được nghiên cứu kỹ lưỡng từ:
                    </p>
                    
                    <div className='space-y-3 mb-8'>
                        <p className='text-[16px] lg:text-[18px] flex items-start'>
                            <span className='text-txt-secondary font-semibold mr-2'>•</span>
                            Ánh sáng tự nhiên & thông gió
                        </p>
                        <p className='text-[16px] lg:text-[18px] flex items-start'>
                            <span className='text-txt-secondary font-semibold mr-2'>•</span>
                            Sự riêng tư và tiện nghi trong sinh hoạt
                        </p>
                        <p className='text-[16px] lg:text-[18px] flex items-start'>
                            <span className='text-txt-secondary font-semibold mr-2'>•</span>
                            Cảm xúc khi bước vào không gian sống
                        </p>
                        <p className='text-[16px] lg:text-[18px] flex items-start'>
                            <span className='text-txt-secondary font-semibold mr-2'>•</span>
                            Tính thẩm mỹ bền vững theo thời gian
                        </p>
                    </div>
                    
                    <div className='bg-txt-secondary/10 p-6 rounded-lg border-l-4 border-txt-secondary'>
                        <p className='text-[18px] lg:text-[22px] font-subtitle italic text-txt-secondary'>
                            "Một ngôi nhà đẹp không nằm ở sự cầu kỳ, mà ở cảm giác dễ chịu và cân bằng mỗi ngày khi trở về."
                        </p>
                    </div>
                </div>
                <div className='h-[300px] lg:h-[700px] w-full mt-6 lg:mt-0'>
                    <OptimizedImage src={aboutUs3} alt="" className='object-cover h-full w-full' />
                </div>
            </div>

            {/* Section 3: Giá trị cốt lõi */}
            <div className='mt-10 lg:mt-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto'>
                    <div className='text-center mb-10 lg:mb-16'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <Target className='text-txt-secondary' size={24}/>
                            <h4 className='text-[20px] lg:text-[26px] text-txt-secondary'>GIÁ TRỊ CỐT LÕI CỦA LATELIA</h4>
                        </div>
                        <h1 className='text-[32px] lg:text-[48px] font-subtitle text-txt-secondary font-semibold leading-tight'>
                            Những điều tạo nên sự khác biệt
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {CORE_VALUES.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div key={value.id} className='p-6 lg:p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='flex items-start gap-4'>
                                        <div className='p-3 bg-txt-secondary/10 rounded-lg'>
                                            <Icon className='text-txt-secondary' size={24}/>
                                        </div>
                                        <div>
                                            <h4 className='text-[20px] lg:text-[24px] font-semibold font-subtitle text-txt-secondary mb-2'>
                                                {value.title}
                                            </h4>
                                            <p className='text-[16px] lg:text-[18px] text-gray-600'>
                                                {value.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Section 4: Đà Nẵng */}
            <div className='mt-10 lg:mt-20 bg-txt-secondary text-bg-primary'>
    <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[560px]'>
        {/* Hình ảnh - sẽ tự động chiếm toàn bộ chiều cao */}
        <div className='relative'>
            <OptimizedImage 
                src={aboutUs5} 
                alt="" 
                className='absolute inset-0 w-full h-full object-cover'
            />
        </div>
        
        {/* Nội dung */}
        <div className='px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center'>
            <div className='flex items-center gap-3 mb-6'>
                <MapPin className='text-bg-primary' size={24}/>
                <h4 className='text-[20px] lg:text-[26px] font-subtitle'>ĐÀ NẴNG – NƠI LATELIA ĐẶT TRỌN NIỀM TIN</h4>
            </div>
            <p className='text-[16px] lg:text-[18px] mb-6'>
                Tất cả dự án của Latelia đều được phát triển tại Đà Nẵng, nơi hội tụ:
            </p>
            
            <div className='space-y-3 mb-8'>
                {DA_NANG_FEATURES.map((feature) => (
                    <p key={feature.id} className='text-[16px] lg:text-[18px] flex items-center'>
                        <span className='mr-3'>•</span>
                        {feature.text}
                    </p>
                ))}
            </div>
            
            <p className='text-[16px] lg:text-[18px] italic'>
                Latelia tin rằng, một không gian sống đẳng cấp cần được đặt đúng vị trí xứng đáng – và Đà Nẵng chính là nền tảng hoàn hảo cho những giá trị chúng tôi theo đuổi.
            </p>
        </div>
    </div>
</div>

            {/* Section 5: Cam kết */}
            <div className='mt-10 lg:mt-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto'>
                    <div className='text-center mb-10 lg:mb-16 flex flex-col items-center'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <ShieldCheck className='text-txt-secondary' size={24}/>
                            <h4 className='text-[20px] lg:text-[26px] text-txt-secondary'>CAM KẾT TỪ LATELIA</h4>
                        </div>
                        <h1 className='text-[32px] lg:text-[48px] font-subtitle text-txt-secondary font-semibold leading-tight lg:w-[740px]'>
                            Latelia không chỉ bán nhà – chúng tôi trao gửi một phong cách sống
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        <div className='p-6 bg-white border border-gray-100 rounded-lg'>
                            <Heart className='text-txt-secondary mb-4' size={32}/>
                            <h4 className='text-[20px] font-semibold mb-3'>Chỉ phát triển sản phẩm tin tưởng</h4>
                            <p className='text-gray-600'>Chúng tôi chỉ làm những sản phẩm mà chính mình thật sự tin tưởng</p>
                        </div>
                        
                        <div className='p-6 bg-white border border-gray-100 rounded-lg'>
                            <Target className='text-txt-secondary mb-4' size={32}/>
                            <h4 className='text-[20px] font-semibold mb-3'>Chất lượng trên số lượng</h4>
                            <p className='text-gray-600'>Không chạy theo số lượng, không làm hời hợt, mỗi sản phẩm đều là tâm huyết</p>
                        </div>
                        
                        <div className='p-6 bg-white border border-gray-100 rounded-lg'>
                            <Users className='text-txt-secondary mb-4' size={32}/>
                            <h4 className='text-[20px] font-semibold mb-3'>Khách hàng là trung tâm</h4>
                            <p className='text-gray-600'>Luôn đặt lợi ích và trải nghiệm của khách hàng lên hàng đầu</p>
                        </div>
                    </div>

                    <div className='mt-10 lg:mt-16 text-center'>
                        <p className='text-[18px] lg:text-[22px] font-subtitle text-txt-secondary mb-6'>
                            "Bởi vì một ngôi nhà xứng đáng được tạo ra bằng tư duy nghiêm túc và trách nhiệm dài hạn"
                        </p>
                        <p className='text-[16px] lg:text-[18px]'>
                            Giữa rất nhiều lựa chọn trên thị trường, Latelia không chọn đi nhanh – chúng tôi chọn đi đúng, đi kỹ và đi bền vững.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 6: Quy trình */}
            <div className='mt-10 lg:mt-20 bg-gray-50 py-10 lg:py-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto px-4'>
                    <div className='text-center mb-10 lg:mb-16'>
                        <h1 className='text-[32px] lg:text-[48px] font-subtitle text-txt-secondary font-semibold leading-tight mb-4'>
                            QUY TRÌNH TRIỂN KHAI DỰ ÁN TẠI LATELIA
                        </h1>
                        <p className='text-[16px] lg:text-[18px] text-gray-600'>
                            Minh bạch – Đồng hành – Cam kết đúng như thiết kế
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {PROCESS_STEPS.map((step, index) => (
                            <div key={step.id} className='p-6 lg:p-8 bg-white rounded-lg shadow-sm border border-gray-100'>
                                <div className='flex items-start gap-4'>
                                    <div className='flex-shrink-0 w-10 h-10 bg-txt-secondary text-white rounded-full flex items-center justify-center'>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className='text-[18px] lg:text-[20px] font-semibold font-subtitle text-txt-secondary mb-2'>
                                            {step.title}
                                        </h4>
                                        <p className='text-[15px] lg:text-[16px] text-gray-600'>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-10 lg:mt-16 text-center'>
                        <div className='inline-block p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl'>
                            <h3 className='text-[20px] lg:text-[24px] font-semibold text-txt-secondary mb-4'>
                                CAM KẾT CỦA LATELIA
                            </h3>
                            <div className='space-y-3 text-left'>
                                <p className='text-[16px] flex items-start'>
                                    <Check className='text-green-500 mr-2 mt-1 flex-shrink-0' size={20}/>
                                    Quy trình rõ ràng, minh bạch từng giai đoạn
                                </p>
                                <p className='text-[16px] flex items-start'>
                                    <Check className='text-green-500 mr-2 mt-1 flex-shrink-0' size={20}/>
                                    Khách hàng được đồng hành và tham gia vào quá trình thiết kế
                                </p>
                                <p className='text-[16px] flex items-start'>
                                    <Check className='text-green-500 mr-2 mt-1 flex-shrink-0' size={20}/>
                                    Thi công đúng bản vẽ, đúng cam kết hai bên
                                </p>
                            </div>
                            <p className='text-[18px] font-subtitle text-txt-secondary mt-6'>
                                Latelia không chỉ xây nhà – chúng tôi xây dựng niềm tin dài hạn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 7: Team Slider */}
            <div className='mt-10 lg:mt-20 flex justify-center mb-10 lg:mb-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full relative'>
                    <div className='text-center mb-10'>
                        <h1 className='text-[32px] lg:text-[48px] font-subtitle text-txt-secondary font-semibold leading-tight'>
                            Đội ngũ chuyên gia
                        </h1>
                        <p className='text-[16px] lg:text-[18px] text-gray-600 mt-4'>
                            Những người đồng hành cùng bạn trên hành trình kiến tạo không gian sống hoàn hảo
                        </p>
                    </div>
                    
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            0:{
                                slidesPerView:2
                            }, 
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        navigation={{
                            nextEl: '.custom-next-button',
                            prevEl: '.custom-prev-button',
                        }}
                    >
                        {
                            SLIDE_ITEMS.map(slideItem=>(
                                <SwiperSlide key={slideItem.id} className=''>
                                    <OptimizedImage
                                        src={slideItem.src}
                                        className="w-full h-[300px] lg:h-[420px] object-cover object-top rounded-lg"
                                    />
                                    <div className='mt-4'>
                                        <h4 className='text-[20px] lg:text-[22px] font-semibold font-subtitle text-txt-secondary'>{slideItem.name}</h4>
                                        <h4 className='text-[16px] lg:text-[18px] text-gray-600'>{slideItem.position}</h4>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button className="custom-prev-button hidden lg:flex absolute -left-15 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                        <ChevronLeft/>
                    </button>
                    <button className="custom-next-button hidden lg:flex absolute -right-15 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* CTA Section */}
            <div className='mt-10 lg:mt-20 bg-txt-secondary text-bg-primary py-16 lg:py-24 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-[32px] lg:text-[56px] font-subtitle font-semibold mb-6'>
                        Chọn Latelia – chọn sự an tâm, giá trị và niềm tự hào dài lâu
                    </h2>
                    <p className='text-[18px] lg:text-[22px] mb-10 max-w-2xl mx-auto'>
                        Một không gian sống tốt sẽ nâng tầm chất lượng cuộc sống của chủ nhân. 
                        Và đó là lý do chúng tôi làm mọi thứ chỉn chu hơn một chút, kỹ hơn một chút và có trách nhiệm hơn mỗi ngày.
                    </p>
                    <LocalizedLink to='/contact'>
                        <button
                            className="
                                mt-6 lg:mt-8 flex items-center mx-auto
                                text-txt-secondary font-medium
                                bg-bg-primary
                                px-8 py-4
                                cursor-pointer
                                uppercase
                                group
                                hover:bg-bg-primary/90
                                text-[16px] lg:text-[18px]
                                rounded-lg
                            "
                        >
                            Liên hệ tư vấn ngay
                            <ArrowRight
                                className="
                                    ml-4
                                    group-hover:translate-x-2
                                    transition-transform
                                "
                            />
                        </button>
                    </LocalizedLink>
                </div>
            </div>

            <Footer withContact={false}/>
        </div>
    )
}

export default About;