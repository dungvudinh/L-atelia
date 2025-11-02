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
import { Swiper, SwiperSlide,useSwiper  } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowDown, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../../layouts/components/Footer'
import OptimizedImage from '../../components/OptimizedImage'
import {LocalizedLink} from '../../components/LocalizedLink';
const SLIDE_ITEMS = [
    {id:1, src:aboutUs7, name:'Rogier van den Brand', position:'Project Manager' },
    {id:2, src:aboutUs8,  name:'Rogier van den Brand', position:'Project Manager'}, 
    {id:3, src:aboutUs9,  name:'Rogier van den Brand', position:'Project Manager'},
    {id:4, src:aboutUs10,  name:'Rogier van den Brand', position:'Project Manager'},
    {id:5, src:aboutUs10,  name:'Rogier van den Brand', position:'Project Manager'},
]
function About()
{
    return (
        <div className="mt-20">
            <div className='w-full h-[840px]'>
                <OptimizedImage src={aboutUs} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex gap-10'>
                    <div className='flex-basis basis-1/2'>
                        <h4 className=' text-[26px] mb-5' >L'atelia</h4>
                        <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold mb-5'>
                            {/* About History */}
                            Về chúng tôi
                        </h1>
                        {/* <h4 className='text-[26px] mb-10'>
                            Berrow Projects was founded by brothers Archie and Monty Berrow who moved to Mallorca in 2018 with a shared vision of bringing a professional, innovative approach to Mallorcan property development.</h4> */}
                        <p className='text-[18px] mb-10 mt-10'>
                            L'atelia được thành lập tại thành phố biển xinh đẹp Đà Nẵng, với mục tiêu kiến tạo nên những ngôi nhà độc bản, được thiết kế tinh tế, mang phong cách hiện đại và tối giản.
                        </p>
                        <p className='text-[18px]'>
                            {/* They oversee all aspects of the day to day operations working alongside a dedicated team of local craftsmen, artisans, architects, and world-renowned brands who all share one common purpose– To help your family start the life you didn’t even know you were dreaming about. */}
                            Mỗi công trình của chúng tôi không chỉ là một bản thiết kế riêng biệt mà còn là một tuyên ngôn về phong cách sống mới cho gia chủ. Với tầm nhìn trở thành biểu tượng của sự sáng tạo và chuyên nghiệp trong lĩnh vực phát triển bất động sản tại Đà Nẵng, Latelia cam kết mang đến những dự án được chăm chút đến từng chi tiết.
                        </p>  
                        <p className='text-[18px] mt-10'>
                            {/* They oversee all aspects of the day to day operations working alongside a dedicated team of local craftsmen, artisans, architects, and world-renowned brands who all share one common purpose– To help your family start the life you didn’t even know you were dreaming about. */}
                            Chúng tôi giám sát toàn bộ quá trình – từ ý tưởng đến khi hoàn thiện – cùng với đội ngũ kiến trúc sư, nghệ nhân và thợ thủ công lành nghề, cũng như hợp tác với các thương hiệu danh tiếng quốc tế. Mục tiêu chung của chúng tôi rất rõ ràng: giúp bạn khởi đầu một cuộc sống mà có thể bạn chưa từng nghĩ mình đang mơ ước.
                        </p>  
                    </div>
                    <div className='flex-basis basis-1/2 h-[650px]'>
                        <OptimizedImage src={aboutUs2} alt="" className='w-full h-full object-cover'/>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='mt-20 bg-bg-primary flex'>
                <div className='ml-40 flex flex-col items-center'>
                    <div className='w-[1px] h-[400px] bg-txt-primary opacity-50'></div>
                    <div className='flex flex-col mt-10'>
                        <button className='rounded-full text-white p-2 bg-txt-secondary mb-10'><ArrowUp /></button>
                        <button className='rounded-full text-white p-2 bg-txt-secondary'><ArrowDown /></button>
                    </div>
                </div>
                <div className='ml-25 mt-30 mr-20'>
                    <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold w-70 mb-10 leading-tight'>
                        {/* Understand the market */}
                        Thấu hiểu thị trường
                    </h1>
                    <h4 className='text-[18px] w-150'>
                        {/* With our local team, we have the knowledge of local legislation, speak the local language and know what properties are currently on the market…or soon will be. */}
                        Chúng tôi am hiểu Đà Nẵng một cách tường tận – từ những con người thân thiện đến những địa điểm đáng nhớ – và chúng tôi luôn hướng tới việc mang giá trị gia đình vào từng ngôi nhà mình xây dựng.
                    </h4>
                </div>
                <div className='h-[600px] w-full'>
                    <OptimizedImage src={aboutUs3} alt="" className='object-cover h-full w-full' />
                </div>
            </div>
            {/*  */}
            <div className='flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex gap-10'>
                    <div className='flex-basis basis-1/2'>
                        <OptimizedImage src={aboutUs4} alt="" className='w-full h-[650px] object-cover'/>
                    </div>
                    <div className='flex-basis basis-1/2'>
                        <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold mb-5'>
                            {/* One team. One set of standards. */}
                            Một đội ngũ <br/>
                            Một tiêu chuẩn
                        </h1>
                        <h4 className='text-[26px] mb-10'>
                            {/* Berrow operates a “direct to buyer” model and manages everything from concept to completion. */}
                            L’atelia vận hành theo mô hình “trực tiếp đến người mua”, quản lý mọi công đoạn từ ý tưởng, thiết kế đến thi công và hoàn thiện.
                        </h4>
                        <p className='text-[18px]'>
                            {/* Our designers work closely with a team of local craftspeople to reach a standard that measures up to our vision. For the duration of a project, we’re on the ground every day signing off on decisions, no matter how small. It’s this hand-on commitment that gives our clients peace of mind when they’re the other side of the world.
                            The majority of our projects begin with no buyer in mind. We assume all the risk, giving us complete freedom to turn uncut gems into uncompromised masterpieces.The properties we sell are far more than a transaction to us –they’re homes we’ve put everything into creating. */}
                            Đội ngũ thiết kế của chúng tôi làm việc chặt chẽ với các nghệ nhân và thợ thủ công địa phương, nhằm đạt đến chuẩn mực chất lượng cao nhất theo đúng tầm nhìn của L’atelia.
                        </p>  
                        <p className='text-[18px] mt-10'>
                        Chúng tôi luôn có mặt tại công trường mỗi ngày, đích thân phê duyệt từng chi tiết, dù là nhỏ nhất – bởi chúng tôi hiểu rằng sự tỉ mỉ chính là điều mang lại niềm tin và sự an tâm cho khách hàng, dù họ ở xa.
                        </p>
                        <LocalizedLink to='/contact'>
                            <button className='mt-10 flex border border-txt-primary px-3 py-1 cursor-pointer group
                                    transition-all duration-300 uppercase text-[18px]'>
                                LIÊN HỆ <ArrowRight className='ml-4 transform
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-2'/>
                            </button>
                        </LocalizedLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='flex mt-20 bg-txt-secondary text-bg-primary'>
                <div className='flex-basis basis-1/2 h-[500px]'>
                    <OptimizedImage src={aboutUs5} alt="" className='w-full h-full object-cover'/>
                </div>
                <div className='flex-basis basis-1/2 px-12 mt-30'>
                    <h4 className='text-[25px] font-subtitle'>
                        “It’s not just about buying and selling properties; it’s about creating extraordinary experiences and lasting relationships. That’s what sets us apart from the rest, and that’s what drives us every day.”
                    </h4>
                    <div className='mt-2'>
                        <div className='w-10 h-10 rounded-full overflow-hidden '>
                            <OptimizedImage src={aboutUs6} alt="" className='object-cover w-full h-full rounded-full'/>
                        </div>
                        <p className='mt-2 text-[15px] font-subtitle'>Trần Duy Tùng</p>
                        <p className='mt-2 text-[15px]'>Founder</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='bg-bg-primary flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full mt-20 mb-20'>
                    <div className='flex justify-between'>
                        <h1 className='text-[60px] font-subtitle font-semibold text-txt-secondary'>Quy trình mua nhà cùng L’atelia</h1>
                        {/* <div>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer border-txt-secondary font-semibold'>Buying</button>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer bg-txt-secondary text-bg-primary font-semibold'>Selling</button>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer border-txt-secondary font-semibold'>Renting</button>
                        </div> */}
                    </div>
                    {/*  */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Tư vấn ban đầu</h4>
                                <p className='text-[18px]'>Chúng tôi lắng nghe để hiểu rõ mong muốn, phong cách sống và yêu cầu riêng của bạn</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={30} className='mr-2'/>
                                    Xác định sở thích, nhu cầu và định hướng thiết kế mong muốn.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={40} className='mr-2'/>
                                    Làm rõ các tiêu chí trọng yếu và những yếu tố độc đáo mà bạn tìm kiếm ở một ngôi nhà.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Đánh giá tài sản mong muốn</h4>
                                <p className='text-[18px]'>Chúng tôi tiến hành đánh giá kỹ lưỡng ngôi nhà hoặc dự án mà bạn quan tâm.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={30} className='mr-2'/>
                                    Phân tích, làm nổi bật các đặc điểm nổi trội của bất động sản.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={35} className='mr-2'/>
                                    Đề xuất những cải tiến tiềm năng giúp tối ưu giá trị sử dụng và thẩm mỹ.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={45} className='mr-2'/>
                                    Bạn có thể đề xuất hoặc thương lượng mức giá phù hợp với nhu cầu và ngân sách của mình.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Đánh giá thiết kế</h4>
                                <p className='text-[18px]'>Bạn sẽ được xem bản thiết kế chi tiết 2D và mô phỏng 3D của ngôi nhà.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={45} className='mr-2'/>
                                    Thảo luận trực tiếp với kiến trúc sư của Latelia để tinh chỉnh thiết kế theo sở thích cá nhân.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={40} className='mr-2'/>
                                    Đảm bảo ngôi nhà phản ánh đúng cá tính và phong cách sống riêng biệt của bạn.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Chốt thiết kế & xem vị trí đất</h4>
                                <p className='text-[18px]'>Chúng tôi lắng nghe để hiểu rõ mong muốn, phong cách sống và yêu cầu riêng của bạn</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={45} className='mr-2'/>
                                    Sau khi hoàn thiện bản thiết kế, bạn sẽ xem xét, xác nhận và ký duyệt phương án cuối cùng.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={60} className='mr-2'/>
                                    Tiếp đó, Latelia sẽ hướng dẫn bạn tham quan thực tế vị trí đất, giúp bạn cảm nhận rõ hơn về không gian và tiềm năng của dự án.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Hoàn tất bán hàng</h4>
                                <p className='text-[18px]'>Latelia đồng hành cùng bạn đến bước cuối cùng của hành trình.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={30} className='mr-2'/>
                                    Hỗ trợ trọn gói các thủ tục pháp lý và hành chính liên quan.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={35} className='mr-2'/>
                                    Hướng dẫn chi tiết quy trình ký kết, chuyển nhượng và nhận bàn giao.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={35} className='mr-2'/>
                                    Đảm bảo toàn bộ quá trình diễn ra minh bạch, suôn sẻ và thành công.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white flex flex-col justify-center items-center w-100'>
                            <h1 className='text-[40px] font-subtitle font-semibold text-txt-secondary text-center leading-tight'>
    Tìm kiếm ngôi nhà hoàn hảo của bạn
</h1>
                               <button className='bg-txt-secondary text-bg-primary flex px-4 py-2 text-[18px] uppercase cursor-pointer mt-4'>LIÊN HỆ NGAY<ArrowRight className='ml-8'/></button>
                            </div>
                    </div>
                    {/*  */}
                    
                </div>
            </div>
            {/*  */}
            <div className='mt-20 flex justify-center mb-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] relative'>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
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
                                        className="w-full h-[420px] object-cover object-top"
                                    />
                                    <div>
                                        <h4 className='text-[25px] font-semibold mt-4 font-subtitle text-txt-secondary'>{slideItem.name}</h4>
                                        <h4 className='text-[18px]'>Project Manager</h4>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button className="custom-prev-button absolute -left-15 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                        <ChevronLeft/>
                    </button>
                    <button className="custom-next-button absolute -right-15 top-1/2  -translate-y-1/2 z-10 cursor-pointer">
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    )
}

export default About;