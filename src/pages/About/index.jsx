import aboutUs from '../../assets/images/about-us/about-us-final.jpg'
import aboutUs2 from '../../assets/images/about-us/about-us-2.webp'
import aboutUs3 from '../../assets/images/about-us/about-us-3.webp'
import aboutUs4 from '../../assets/images/about-us/about-us-4.webp'
import aboutUs5 from '../../assets/images/about-us/about-us-5.webp'
import aboutUs6 from '../../assets/images/about-us/about-us-6.webp'
import aboutUs7 from '../../assets/images/about-us/about-us-7.webp'
import aboutUs8 from '../../assets/images/about-us/about-us-8.webp'
import aboutUs9 from '../../assets/images/about-us/about-us-9.webp'
import aboutUs10 from '../../assets/images/about-us/about-us-10.webp'
import CEO from '../../assets/images/CEO.png'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
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
        <div className="mt-16 lg:mt-20">
            {/* Hero Image */}
            <div className='w-full h-screen '>
                <OptimizedImage src={aboutUs} alt="" className='w-full h-full object-cover'/>
            </div>
            
            {/* Section 1: About History */}
            <div className='flex justify-center mt-10 lg:mt-20 lg:px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 xl:px-0'>
                    {/* Ảnh - Hiển thị trên mobile, bên phải trên desktop */}
                    <div className='w-full lg:w-auto lg:flex-basis xl:basis-1/3 lg:basis-2/5 h-[400px] sm:h-[500px] lg:h-[650px] order-1 lg:order-2'>
                        <OptimizedImage src={CEO} alt="" className='object-cover h-full object-center w-full'/>
                    </div>
                    
                    {/* Text - Hiển thị dưới mobile, bên trái trên desktop */}
                    <div className='w-full lg:w-auto lg:flex-basis xl:basis-2/3 lg:basis-3/5 px-4 order-2 lg:order-1'>
                        <h1 className='text-[30px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold mb-4 lg:mb-5 leading-tight flex items-center'>
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
                        <p className='text-[25px] mt-6 lg:mt-8 font-subtitle font-semibold text-txt-secondary'>
                            Trần Duy Tùng
                            Founder & CEO
                        </p>  
                    </div>
                </div>
            </div>

            {/* Section 2: Triết lý kiến trúc */}
            <div className='mt-10 lg:mt-20 bg-bg-primary flex justify-center'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10'>
                        {/* Phần text - chiếm 1/2 chiều rộng */}
                        <div className='mt-8 lg:mt-30 lg:mr-7 lg:w-auto w-full pb-4  px-4'>
                            <div className='flex items-center gap-3 mb-4'>
                                <Building2 className='text-txt-secondary' size={24}/>
                                <h4 className='text-[20px] lg:text-[26px] text-txt-secondary font-subtitle font-semibold'>TRIẾT LÝ KIẾN TRÚC</h4>
                            </div>
                            <h1 className='text-[30px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold mb-6 lg:mb-6 leading-tight'>
                                Kiến trúc không chỉ để ở – mà để tận hưởng
                            </h1>
                            <p className='text-[16px] lg:text-[18px] mb-6'>
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
                        
                        {/* Phần hình ảnh - chiếm 1/2 chiều rộng */}
                        <div className=' w-full order-1 lg:order-2'>
                            <OptimizedImage src={img3} alt="Triết lý kiến trúc Latelia" className='object-cover h-full w-full ' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Giá trị cốt lõi */}
            <div className='mt-10 lg:mt-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto'>
                    <div className='text-center mb-10 lg:mb-16'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <Target className='text-txt-secondary' size={24}/>
                            <h4 className='text-[20px] xl:text-[26px] text-txt-secondary font-subtitle font-semibold'>GIÁ TRỊ CỐT LÕI CỦA LATELIA</h4>
                        </div>
                        <h1 className='text-[32px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold leading-tight'>
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
    <div className='relative'>
        <div className='flex justify-center'>
            <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12'>
                    {/* Content - luôn ở bên phải */}
                    <div className='lg:col-span-7 lg:col-start-6 px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center order-2 lg:order-none'>
                        <div className='flex items-center gap-3 mb-6'>
                            <MapPin className='text-bg-primary' size={24}/>
                            <h4 className='text-[20px] xl:text-[26px] font-subtitle'>ĐÀ NẴNG – NƠI LATELIA ĐẶT TRỌN NIỀM TIN</h4>
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
        </div>
        
        {/* Hình ảnh - absolute tràn về bên trái trên desktop */}
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-[calc(50%+2rem)] lg:-left-12 xl:-left-20'>
            {/* Container cho hình ảnh với max-width để tạo khoảng cách */}
            <div className='h-full lg:pr-12 xl:pr-20'>
                <OptimizedImage 
                    src={img4} 
                    alt="Đà Nẵng - Nơi Latelia đặt trọn niềm tin" 
                    className='w-full h-[300px] lg:h-full object-cover'
                />
            </div>
        </div>
    </div>
</div>

            {/* Section 5: Cam kết */}
            <div className='mt-10 lg:mt-20 px-4'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto'>
                    <div className='text-center mb-10 lg:mb-16 flex flex-col items-center'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <ShieldCheck className='text-txt-secondary' size={24}/>
                            <h4 className='text-[20px] xl:text-[26px] text-txt-secondary font-subtitle font-semibold'>CAM KẾT TỪ LATELIA</h4>
                        </div>
                        <h1 className='text-[32px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold leading-tight lg:w-[740px]'>
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
            {/* Section 6: Quy trình */}
{/* Section 6: Quy trình */}
<div className='mt-10 lg:mt-20 bg-gray-50 py-10 lg:py-20'>
    <div className='xl:max-w-screen-xl lg:max-w-[900px] mx-auto px-4'>
        <div className='text-center mb-10 lg:mb-16'>
            <h1 className='text-[32px] xl:text-[45px] font-subtitle text-txt-secondary font-semibold leading-tight mb-4'>
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
                            <h4 className='text-[18px] lg:text-[20px] font-semibold font-subtitle text-txt-secondary mb-4 lg:mb-5 leading-tight'>
                                {step.title}
                            </h4>
                            <div className='text-[15px] lg:text-[16px] text-gray-600 whitespace-pre-line space-y-2'>
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
                <div className='space-y-4 text-left mb-6'>
                    <p className='text-[16px] lg:text-[17px] flex items-start'>
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

            

            {/* CTA Section */}
            <div className='mt-10 lg:mt-20 bg-txt-secondary text-bg-primary py-16 lg:py-24 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-[32px] xl:text-[56px] font-subtitle font-semibold mb-6'>
                        Chọn Latelia – chọn sự an tâm, giá trị và niềm tự hào dài lâu
                    </h2>
                    <p className='text-[18px] xl:text-[22px] mb-10 max-w-2xl mx-auto'>
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