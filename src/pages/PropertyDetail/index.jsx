import { useParams } from "react-router-dom";
import propertyDetailBanner from '../../assets/images/property-detail-banner.png';
import { ArrowRight, ChevronRight } from "lucide-react";
import patikiTownhouse from '../../assets/images/patiki-townhouse.png';
import propertyFeatures from '../../assets/images/property-features.png';
import architecture1 from '../../assets/images/architecture1.png'
import architecture2 from '../../assets/images/architecture2.png'
import history from '../../assets/images/history.png'
import Footer from "../../layouts/components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import CustomAccordion from "../../components/Accordion";
import { LocalizedLink } from "../../components/LocalizedLink";

function PropertyDetail()
{
    return (
        <div className="mt-20">
            {/* BANNER */}
            <div className="w-full h-[840px] relative">
                <OptimizedImage 
                    src={propertyDetailBanner} 
                    alt="" 
                    className="object-cover w-full h-full object-[25%_75%] filter brightness-75"
                />
                <div className="absolute left-1/2 -translate-x-1/2  top-[50%] text-bg-primary">
                    <h1 className="font-subtitle text-[60px]">FOR SALE</h1>
                    <button className="border  border-bg-primary px-4 py-2 w-full flex justify-between 
                        text-[18px] uppercase transition-all duration-300 cursor-pointer hover:bg-txt-secondary hover:text-bg-primary hover:border-txt-secondary">
                        VIEW BROCHURE
                        <ArrowRight className="
                                " />
                    </button>
                </div>
            </div>
            {/* PatikiTownhouse */}
            <div className="flex justify-center mt-20">
                <div className="flex xl:max-w-screen-xl lg:max-w-[900px] gap-20">
                    {/* LEFT */}
                    <div className="flex-basis basis-1/2 mt-7">
                        <h1 className="text-[60px] text-txt-secondary font-subtitle">
                            Patiki Townhouse
                        </h1>
                        <h4 className="font-medium text-[26px] mt-10">
                            Mediterranean Townhouse
                        </h4>
                        <p className="mt-10 text-[22px]">
                            An architectural gem immaculately restored and modernized from its 1896 creation with no compromise on luxury. The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.
                        </p>
                    </div>
                    {/* RIGHT */}
                    <div className="flex-basis basis-1/2">
                        <OptimizedImage src={patikiTownhouse} alt="" />
                    </div>
                </div>

            </div>
            {/* PROPERTY FEATURES */}
            <div className="bg-bg-primary mt-20 flex justify-center">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-20  w-full ">
                    <ul className="flex justify-start">
                        <li className="mr-30">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary">PROPERTY FEATURES</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                <span>5 Bedrooms | 6 Bathrooms</span>
                                <span>510m2 Living Space</span>
                                <span>pectacular Architecture</span>
                            </p>
                        </li>
                        <li className="mr-30">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary">SPECIFICATION</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                <span>Heated Pool</span>
                                <span>Immaculate Reformation</span>
                                <span>Roof terrace</span>
                            </p>
                        </li>
                        <li>
                            <h4 className="text-[25px] font-subtitle text-txt-secondary">SPECIFICATION</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                <span>UNESCO world heritage mountain range</span>
                                <span>Port de Sóller Beach 3km</span>
                                <span> In Sóller old town</span>
                            </p>
                        </li>
                    </ul>
                    <div className="mt-20 flex gap-20">
                        {/* LEFT */}
                        <div className="flex-basis basis-1/2">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary">EXPANSIVE OUTDOORS</h4>
                            <p className="mt-10 text-txt-gray text-[26px]">
                                The imposing building presides over an oasis like garden with a state-of-the-art swimming pool, private dining area, and plentiful sunbathing spaces. The vast roof terrace on the upper level adds a whole new dimension to this one-of-a kind urban home.
                            </p>
                            <CustomAccordion  />
                            
                        </div>
                        {/* RIGHT */}
                        <div className="flex-basis basis-1/2 h-150">
                            <OptimizedImage src={propertyFeatures} alt="" className="h-full w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="relative">
                <OptimizedImage src={architecture1} alt="" className="w-full h-300"/>
                <OptimizedImage src={architecture2} alt="" className="w-full h-300"/>
                <div className="absolute top-1/2 left-50 bg-white p-8 w-150 -translate-y-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary">
                        SPECTACULAR ARCHITECTURE
                    </h4>
                    <p className="mt-4 text-[18px] text-txt-gray">Designed by Parisian architects in the late 19th century this property exudes french charm with an air of grandeur and opulence rarely seen anywhere else on the island.</p>
                </div>
            </div>
            {/* HISTORY */}
            <div className="flex">
                <div className="flex-basis basis-1/2">
                    <OptimizedImage src={history} alt="" />
                </div>
                <div className="p-20 flex-basis basis-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">THE HISTORY</h4>
                    <p className="mt-4 w-110 text-[26px] text-txt-gray">When scientists discovered the health benefits of vitamin C in the late 18th century Sóller’s citrus trade boomed and the town saw a massive influx of wealth.</p>
                    <CustomAccordion data={[{title:'READ MORE', content:'It was during this time of opulence in 1896 that this townhouse was built. Parisian architects were hired and materials such as stained glass and wood were shipped in from all over the world.'}]} />
                </div>
            </div>
            {/*  */}
            
            {/* HISTORY */}
            <div className="relative">
                <OptimizedImage src={architecture1} alt="" className="w-full h-300"/>
                <OptimizedImage src={architecture2} alt="" className="w-full h-300"/>
                <div className="absolute top-1/2 right-50 bg-white p-8 w-150 -translate-y-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary">
                        IMMATECULATE DETAILS
                    </h4>
                    <p className="mt-4 text-[18px] text-txt-gray">The extensive reformation saw all the historic sections painstakingly restored to their original glory while adding modern comforts and luxuries throughout.</p>
                </div>
            </div>
            {/* CONTACT US */}
            <div className="flex justify-center mt-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] flex w-full gap-30">
                    {/* LEFT */}
                    <div className="flex-basis basis-1/2">
                        <h1 className="text-[60px] font-subtitle text-txt-secondary">Tracking Your Project</h1>
                        <ul>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold">Brochure</p>
                                <LocalizedLink to="/projects/brochure/view-brochure?filter=0">
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">READ MORE</button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold"> Current State Photos</p>
                                <LocalizedLink to="/projects/current-state-photos/view-brochure?filter=1">
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">READ MORE</button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold">Renders Showing Potential</p>
                                <LocalizedLink to="/projects/renders-showing-potential/view-brochure?filter=2">
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">READ MORE</button>
                                </LocalizedLink>
                            </li>
                        </ul>
                    </div>
                    {/* RIGHT */}
                    <div className="flex-basis basis-1/2 mb-40">
                        <h1 className="text-[60px] font-subtitle text-txt-secondary">Contact Us</h1>
                        <div className="mt-10 text-[18px]">
                            <div className="flex flex-col">
                                <label htmlFor="" className="mb-2">First Name *</label>
                                <input type="text" placeholder="First Name" className="border p-4 border-txt-gray outline-none rounded-md"/>
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="" className="mb-2">Last Name *</label>
                                <input type="text" placeholder="Last Name" className="border p-4 border-txt-gray outline-none rounded-md"/>
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="" className="mb-2">Email *</label>
                                <input type="text" placeholder="Email" className="border p-4 border-txt-gray outline-none rounded-md"/>
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="" className="mb-2">Phone *</label>
                                <input type="text" placeholder="Phone" className="border p-4 border-txt-gray outline-none rounded-md"/>
                            </div>
                            <button className="mt-10 rounded-md bg-txt-secondary text-white w-full py-4">SUBMIT MESSAGE</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    )
}
export default PropertyDetail;