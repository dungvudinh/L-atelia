import aboutUs from '../../assets/images/about-us.png'
import aboutUs2 from '../../assets/images/about-us-2.png'
import aboutUs3 from '../../assets/images/about-us-3.png'
import aboutUs4 from '../../assets/images/about-us-4.png'
import aboutUs5 from '../../assets/images/about-us-5.png'
import aboutUs6 from '../../assets/images/about-us-6.png'
import aboutUs7 from '../../assets/images/about-us-7.png'
import aboutUs8 from '../../assets/images/about-us-8.png'
import aboutUs9 from '../../assets/images/about-us-9.png'
import aboutUs10 from '../../assets/images/about-us-10.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowDown, ArrowRight, ArrowUp, Check } from 'lucide-react';
import Footer from '../../layouts/components/Footer'
const SLIDE_ITEMS = [
    {id:1, src:aboutUs7, name:'Rogier van den Brand', position:'Project Manager' },
    {id:2, src:aboutUs8,  name:'Rogier van den Brand', position:'Project Manager'}, 
    {id:3, src:aboutUs9,  name:'Rogier van den Brand', position:'Project Manager'},
    {id:4, src:aboutUs10,  name:'Rogier van den Brand', position:'Project Manager'},
]
function About()
{
    return (
        <div className="mt-20">
            <div className='w-full h-[840px]'>
                <img src={aboutUs} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex gap-10'>
                    <div className='flex-basis basis-1/2'>
                        <h4 className='uppercase text-[26px] mb-5' >about us</h4>
                        <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold mb-5'>About History</h1>
                        <h4 className='text-[26px] mb-10'>Berrow Projects was founded by brothers Archie and Monty Berrow who moved to Mallorca in 2018 with a shared vision of bringing a professional, innovative approach to Mallorcan property development.</h4>
                        <p className='text-[18px]'>
                            They oversee all aspects of the day to day operations working alongside a dedicated team of local craftsmen, artisans, architects, and world-renowned brands who all share one common purpose– To help your family start the life you didn’t even know you were dreaming about.
                        </p>  
                    </div>
                    <div className='flex-basis basis-1/2 h-[650px]'>
                        <img src={aboutUs2} alt="" className='w-full h-full object-cover'/>
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
                <div className='ml-25 mt-30'>
                    <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold w-80 mb-10'>Understand the market</h1>
                    <h4 className='text-[18px] w-150'>With our local team, we have the knowledge of local legislation, speak the local language and know what properties are currently on the market…or soon will be.</h4>
                </div>
                <div className='h-[600px] w-full'>
                    <img src={aboutUs3} alt="" className='object-cover h-full w-full' />
                </div>
            </div>
            {/*  */}
            <div className='flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full flex gap-10'>
                    <div className='flex-basis basis-1/2'>
                        <img src={aboutUs4} alt="" className='w-full h-[650px] object-cover'/>
                    </div>
                    <div className='flex-basis basis-1/2'>
                        <h1 className='text-[60px] font-subtitle text-txt-secondary font-semibold mb-5'>One team. One set of standards.</h1>
                        <h4 className='text-[26px] mb-10'>Berrow operates a “direct to buyer” model and manages everything from concept to completion.</h4>
                        <p className='text-[18px]'>
                            Our designers work closely with a team of local craftspeople to reach a standard that measures up to our vision. For the duration of a project, we’re on the ground every day signing off on decisions, no matter how small. It’s this hand-on commitment that gives our clients peace of mind when they’re the other side of the world.
                            The majority of our projects begin with no buyer in mind. We assume all the risk, giving us complete freedom to turn uncut gems into uncompromised masterpieces.The properties we sell are far more than a transaction to us –they’re homes we’ve put everything into creating.
                        </p>  
                        <button className='mt-10 flex border border-txt-primary px-3 py-1 cursor-pointer group
                                transition-all duration-300 uppercase text-[18px]'>
                            CONTACT US <ArrowRight className='ml-4 transform
                                transition-transform
                                duration-300
                                group-hover:translate-x-2'/>
                        </button>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='flex mt-20 bg-txt-secondary text-bg-primary'>
                <div className='flex-basis basis-1/2 h-[500px]'>
                    <img src={aboutUs5} alt="" className='w-full h-full object-cover'/>
                </div>
                <div className='flex-basis basis-1/2 px-12 mt-30'>
                    <h4 className='text-[25px] font-subtitle'>
                        “It’s not just about buying and selling properties; it’s about creating extraordinary experiences and lasting relationships. That’s what sets us apart from the rest, and that’s what drives us every day.”
                    </h4>
                    <div className='mt-2'>
                        <div className='w-10 h-10 rounded-full overflow-hidden '>
                            <img src={aboutUs6} alt="" className='object-cover w-full h-full rounded-full'/>
                        </div>
                        <p className='mt-2 text-[15px] font-subtitle'>Rogier van den Brand</p>
                        <p className='mt-2 text-[15px]'>Founder</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='bg-bg-primary flex justify-center mt-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px] w-full mt-20 mb-20'>
                    <div className='flex justify-between'>
                        <h1 className='text-[60px] font-subtitle font-semibold text-txt-secondary'>Our appoarch</h1>
                        <div>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer border-txt-secondary font-semibold'>Buying</button>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer bg-txt-secondary text-bg-primary font-semibold'>Selling</button>
                            <button className='border rounded-2xl px-10 py-1 cursor-pointer border-txt-secondary font-semibold'>Renting</button>
                        </div>
                    </div>
                    {/*  */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Initial consultation</h4>
                                <p className='text-[18px]'>Discuss your home-buying goals and preferences with a Royal Estates.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={22} className='mr-2'/>
                                    Understand client’s budget and preferences.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={20} className='mr-2'/>
                                    Identify key criteria for property search.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Property search</h4>
                                <p className='text-[18px]'>Conduct a comprehensive search for properties that meet your criteria.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={25} className='mr-2'/>
                                    Search through our extensive database of properties.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={27} className='mr-2'/>
                                    Narrow down options based on location, size, and amenities.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Viewings</h4>
                                <p className='text-[18px]'>Schedule viewings of selected properties accompanied by a Royal Estates agent.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={20} className='mr-2'/>
                                    Arrange property viewings at convenient times.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={25} className='mr-2'/>
                                    Provide insights and answer questions during viewings.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Negotiation and offer</h4>
                                <p className='text-[18px]'>Assist in negotiating the best price and terms for your chosen property.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={28} className='mr-2'/>
                                    Negotiate on behalf of the client to secure favorable terms.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={20} className='mr-2'/>
                                    Present offers and counteroffers to the seller.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white'>
                                <h4 className='text-[25px] font-semibold font-subtitle text-txt-secondary'>Contract and closing</h4>
                                <p className='text-[18px]'>Guide you through the contract process and finalize the sale.</p>
                                <div className='w-full h-[1px] bg-txt-primary my-4'></div>
                                <p className='flex items-start text-[18px]'>
                                    <Check size={20} className='mr-2'/>
                                   Review and explain contract terms.
                                </p>
                                <p className='flex items-start text-[18px] mt-2'>
                                    <Check size={40} className='mr-2'/>
                                    Coordinate with legal and financial professionals for a smooth closing process.
                                </p>
                            </div>
                            {/*  */}
                            <div className='p-8 bg-white flex flex-col justify-center items-center w-100'>
                               <h1 className='text-[40px] font-subtitle font-semibold text-txt-secondary text-center'>Start your home search</h1>
                               <button className='bg-txt-secondary text-bg-primary flex px-4 py-2 text-[18px] uppercase cursor-pointer'>Contact Us <ArrowRight className='ml-8'/></button>
                            </div>
                    </div>
                    {/*  */}
                    
                </div>
            </div>
            {/*  */}
            <div className='mt-20 flex justify-center mb-20'>
                <div className='xl:max-w-screen-xl lg:max-w-[900px]'>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        loop
                        // autoplay={{
                        //   delay: 4000,
                        //   disableOnInteraction: false,
                        // }}
                        pagination={{ clickable: true }}
                        navigation
                        >
                        {
                            SLIDE_ITEMS.map(slideItem=>(
                                <SwiperSlide key={slideItem.id}>
    <div className="w-full h-[400px] relative">
        <img
            src={slideItem.src}
            className="w-full h-full object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
            <h4 className='text-white'>{slideItem.name}</h4>
            <p className='text-gray-300'>{slideItem.position}</p>
        </div>
    </div>
</SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    )
}
export default About;