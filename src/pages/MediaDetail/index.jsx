import { Dot } from 'lucide-react';
import mediaDetail from '../../assets/images/media-detail.png'
import mediaDetail2 from '../../assets/images/media-detail-2.png'
import mediaDetail3 from '../../assets/images/media-detail-3.png'
import mediaDetail4 from '../../assets/images/media-detail-4.png'
import mediaDetail5 from '../../assets/images/media-detail-5.png'
import mediaDetail6 from '../../assets/images/media-detail-6.png'

function MediaDetail() {
    return ( 
        <div className="mt-20">
            <div className='w-full h-210'>
                <img src={mediaDetail} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col items-center mt-30'>
                <div className='xl:max-w-screen-lg text-center mb-40'>

                    <div className='flex text-txt-gray opacity-50 justify-center text-[18px] '>
                        <h4 className='mr-10'>PROJECT FEATURE</h4>
                        <h4>ARCHITECTURE & INTERIOR DESIGN FEATURES</h4>
                    </div>

                    <h1 className='mt-10 text-[60px] font-subtitle text-txt-secondary font-semibold px-20'>
                        A Mallorcan townhouse with a Parisian twist is for sale in Sóller
                    </h1>

                    <h4 className='mt-10 text-[26px] text-txt-gray'>
                        In the shadow of the Tramuntana mountain range
                    </h4>

                    <div className='flex justify-center mt-10 text-txt-gray opacity-50 text-[18px] items-center'>
                        <p>
                            Words by Sara Jacob
                        </p>
                        <span className='w-2 h-2 bg-txt-gray rounded-full opacity-50 mx-10'></span>
                        <p>Photography by <span>Tari Peterson</span></p>
                    </div>
                    
                </div>
                {/*  */}
                <div className='h-[640px] w-[1000px] mb-40'>
                    <img src={mediaDetail2} alt="" className='h-full w-full object-cover'/>
                </div>
                {/*  */}
                <div className='xl:max-w-screen-lg px-10 text-txt-primary mb-30'>
                    <h4 className='text-[26px]  text-center mb-10'>
                    Inspired by both Californian and Japanese design, Carlyle Residence celebrates natural materials in adaptable spaces. Designed by Mosh Home, the interiors foster a seamless flow between indoors and out.
                    </h4>
                    <p className='text-[18px]'>
                    Located on a leafy stretch in Currumbin, Queensland, beside a nature reserve, Carlyle Residence immerses itself in its setting. As well as a strong connection to the surrounds, the brief called for visual restraint, spatial flexibility and generous outdoor living. Oriented north and north-east, the dwelling welcomes natural light and centres on an alfresco dining area – the doors of which can open to the outside for most of the year without compromising comfort. Prioritising shared living over additional bedrooms, the plan dedicates much of its footprint to communal spaces adjacent to the garden. These areas can be partitioned when privacy or temperature control is needed, yet even when separated, the compact layout nurtures a sense of family togetherness.
                    </p>
                </div>
                {/*  */}
                <div className='xl:max-w-screen-xl lg:max-w-[900px] flex gap-30 w-full mb-30'>
                    <div className='flex-basis basis-1/2  h-200'>
                        <img src={mediaDetail3} alt="" className=' w-full h-full'/>
                    </div>
                    <div className='flex-basis basis-1/2  h-200'>
                        <img src={mediaDetail4} alt="" className='flex-basis basis-1/2 w-full h-full'/>
                    </div>
                </div>
                {/*  */}
                <div className='xl:max-w-screen-lg px-10 text-txt-primary mb-30'>
                    <h4 className='text-txt-gray text-[26px] text-center'>
                    As well as a strong connection to the surrounds, the brief called for visual restraint, spatial flexibility and generous outdoor living.
                    </h4>
                </div>
                {/*  */}
                <div className='relative w-full h-100 mb-40'>
                    <img src={mediaDetail5} alt="" className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-black/30'></div>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-subtitle'>
                        <h4 className='text-lg font-medium text-[60px] '>Made in Australia</h4>
                        <h1 className='text-[150px] font-bold'>RUGGABLE</h1>
                    </div>
                </div>
                {/*  */}
                <div className='xl:max-w-screen-lg mb-40 h-180 w-full'>
                    <img src={mediaDetail6} alt="" className='w-full h-full'/>
                </div>
                {/*  */}
                <div className="xl:max-w-screen-lg px-20">
                    <h4 className='text-[18px]'>
                        Externally, Carlyle Residence is clad in blackbutt timber, a quintessential feature of an Australian coastal home. The material complements the rectilinear form, and generous openings to the front and rear signal an embrace of nature. Entering through an off-centre front door, residents are greeted with a direct sightline to the backyard, while the doors to the primary suite, bedrooms and bathroom blend into the timber-lined walls. A mud room, tailored to the storage needs of each family member, adds practicality to the design. Beyond the entryway, terracotta tile flooring flows throughout, its warmth contrasted by low-profile spotted gum furniture.
                        An external breezeway links the entry to the living and kitchen areas, where a large island with four custom stools anchors the culinary space. Beyond it, a stainless-steel work surface extends the kitchen’s functionality. Sliding glass doors frame views of the backyard, while to the front, a secondary living area, laundry, children’s bedrooms, bathroom and office provide varied outlooks. Abundant built-in storage by Mosh Joinery unites the home’s front and rear with practical continuity. And outside, a poolside powder room adds convenience, complemented by the indulgence of a traditional sauna.
                    </h4>
                </div>
                
            </div>
        </div>
     );
}

export default MediaDetail;