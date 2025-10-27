import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../layouts/components/Footer";
import { Datepicker } from 'flowbite-react';
import { CalendarClock, ArrowDown,GroupSearch, Group,Face,Bed, Sort,AddLocation, Distance, FilterList, Payments, PaymentArrowDown, PageInfo, Apartment, ChairUmbrella, Villa, SourceEnvironment } from "../../assets/icons";
import PropertiesForRent1 from '../../assets/images/properties-for-rent-1.png';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide,useSwiper  } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const theme = {
    popup: {
      footer: {
        base: "hidden"
      }
    }
  };
const LOCATION_ITEMS = [
    {id:1, name:'Ho Chi Minh City', country:'Viet Nam'},
    {id:2, name:'Nha Trang', country:'Viet Nam'},
    {id:3, name:'Ha Noi', country:'Viet Nam'},
    {id:4, name:'Vung Tau', country:'Viet Nam'},
    {id:5, name:'Sapa', country:'Viet Nam'},
]
const SORTING_ITEMS = [
    {id:1, name:'Per room per night', desc:'Include taxes & fee', icon:<Payments className={'mr-2 mt-1'}/>},
    {id:2, name:'Per room per night', desc:'Exclude taxes & fees', icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
    {id:3, name:'Total price', desc:'Include taxes & fees',icon:<Payments className={'mr-2 mt-1'}/>},
    {id:4, name:'Total price', desc:'Exclude taxes & fees',icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
]
const PROPERTIES_ITEMS = [
    {id:1, name:'Hotel', icon:<Apartment className={'mr-2'}/>}, 
    {id:2, name:'Resort', icon:<ChairUmbrella className={'mr-2'} />}, 
    {id:3, name:'Villa', icon:<Villa className={'mr-2'}/>},
    {id:3, name:'Apartment', icon:<SourceEnvironment className={'mr-2'}/>},
]
function PropertiesForRent() {
    const [showCheckInDate, setShowCheckInDate] = useState(false);
    const [showCheckOutDate, setShowCheckOutDate] = useState(false);
    const [showSelectPerson, setShowSelectPerson] = useState(false);
    const [showSelectLocation, setShowSelectLocation] = useState(false);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [showPropertiesOptions, setShowPropertiesOptions] = useState(false);
    const params = useParams();
    console.log(params)
    return ( 
        <div className="mt-20">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                {/* GROUP FILTER */}
                <div className="pt-20 flex w-full mb-10">
                    {/* CHECK IN */}
                    <div className="relative mr-5 flex-1">
                        <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowCheckInDate(!showCheckInDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                Check in
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckInDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none">
                            <Datepicker
                                inline
                                onSelectedDateChanged={(date) => {
                                    console.log(date)
                                    setSelectCheckInDate(date);
                                    setShowCheckInDate(false);
                                }}
                                theme={theme}
                                className="w-full!"
                            />
                            </div>
                        )}
                    </div>
                    {/* CHECK OUT */}
                    <div className="relative mr-5 flex-1">
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowCheckOutDate(!showCheckOutDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                Check in
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckOutDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg   select-none">
                            <Datepicker
                                inline
                                onSelectedDateChanged={(date) => {
                                setSelectedDate(date);
                                setShowDatepicker(false);
                                }}
                                theme={theme}
                            />
                            </div>
                        )}
                    </div>
                    {/* SELECT PERSON */}
                    <div className="relative mr-5 flex-1">
                        <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowSelectPerson(!showSelectPerson)}>
                            <div className="flex items-center">
                                <GroupSearch className='mr-2'/>
                                Select adult and children
                            </div>
                            <ArrowDown />
                        </div>
                        {showSelectPerson && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none p-2 w-full">
                                <ul className="w-full">
                                    <li className="flex justify-between border-b border-b-txt-primary py-2">
                                        <div className="flex items-center">
                                            <Group  className="mr-4"/>
                                            <span className="text-[18px]">Adults</span>
                                        </div>
                                        <div>
                                            <span className="cursor-pointer text-[18px]">-</span>
                                            <span className="mx-4 text-[18px]">2</span>
                                            <span className="text-[18px]">+</span>
                                        </div>
                                    </li>
                                    <li className="flex justify-between border-b border-b-txt-primary py-2">
                                        <div className="flex items-center">
                                            <Face  className="mr-4"/>
                                            <span className="text-[18px]">Children</span>
                                        </div>
                                        <div>
                                            <span className="cursor-pointer text-[18px]">-</span>
                                            <span className="mx-4 text-[18px]">2</span>
                                            <span className="text-[18px]">+</span>
                                        </div>
                                    </li>
                                    <li className="flex justify-between  py-2">
                                        <div className="flex items-center">
                                            <Bed  className="mr-4"/>
                                            <span className="text-[18px]">Rooms</span>
                                        </div>
                                        <div>
                                            <span className="cursor-pointer text-[18px]">-</span>
                                            <span className="mx-4 text-[18px]">2</span>
                                            <span className="text-[18px]">+</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <button className="flex-1 bg-txt-secondary text-white cursor-pointer">Search</button>
                </div>
                {/*  */}
                <h1 className='uppercase text-[60px] font-subtitle text-txt-secondary font-semibold mb-10'>Properties for rent</h1>
                {/*  */}
                <div className="flex items-center justify-between w-full mb-20">
                    <div className="flex ">
                        <button className="flex items-center bg-txt-secondary px-20 py-2 text-bg-primary text-[18px] font-light mr-5">
                            <Sort className='mr-4'/>
                            More Filter
                        </button>
                        {/* LOCATION */}
                        <div className="relative mr-5 flex-1">
                            <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowSelectLocation(!showSelectLocation)}>
                                <div className="flex items-center mr-8">
                                    <AddLocation className='mr-2'/>
                                    Select your location
                                </div>
                                <ArrowDown />
                            </div>
                            {showSelectLocation && (
                                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none p-2 w-full">
                                    <ul className="w-full">
                                        {LOCATION_ITEMS.map(locationItem=>(
                                            <li className="flex justify-between border-b border-b-txt-primary py-2  cursor-pointer" key={locationItem.id}>
                                                <div className="flex items-start">
                                                    <Distance  className="mr-4"/>
                                                    <div>
                                                        <p className="text-[18px] font-semibold">{locationItem.name}</p>
                                                        <p>{locationItem.country}</p>
                                                    </div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* PROPERTIES */}
                        <div className="relative mr-5">
                            <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowPropertiesOptions(!showPropertiesOptions)}>
                                <div className="flex items-center mr-8">
                                    <PageInfo className='mr-2'/>
                                    Select your property
                                </div>
                                <ArrowDown />
                            </div>
                            {showPropertiesOptions && (
                                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none p-2 w-full">
                                    <ul className="w-full">
                                        {PROPERTIES_ITEMS.map(propertiesItem=>(
                                            <li className="flex justify-between border-b border-b-txt-primary py-2  cursor-pointer" key={propertiesItem.id}>
                                                <div className="flex items-start">
                                                    {propertiesItem.icon}
                                                    <div>
                                                        <p className="text-[18px] font-semibold">{propertiesItem.name}</p>
                                                    </div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        {/* SORTING */}
                        </div>
                    </div>
                    {/* SORTING */}
                    <div className="relative ml-5">
                        <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowSortingOptions(!showSortingOptions)}>
                            <div className="flex items-center mr-12">
                                <FilterList className='mr-2'/>
                                Default sorting
                            </div>
                            <ArrowDown />
                        </div>
                        {showSortingOptions && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none p-2 w-full">
                                <ul className="w-full">
                                    {SORTING_ITEMS.map(sortingItem=>(
                                        <li className="flex justify-between border-b border-b-txt-primary py-2 cursor-pointer" key={sortingItem.id}>
                                            <div className="flex items-start">
                                                {sortingItem.icon}
                                                <div>
                                                    <p className="text-[18px] font-semibold">{sortingItem.name}</p>
                                                    <p>{sortingItem.desc}</p>
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
                {/* LIST ITEM */}
                {!params.propertyId && (
                    <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                        <div className="grid grid-cols-4 md:grid-cols-3 gap-6 mt-10 mb-40">
                            <div className="cursor-pointer bg-bg-primary">
                                <div className="h-[283px]">
                                    <img src={PropertiesForRent1} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">Villa Shirla</h1>
                                    <p className="mt-4 text-[15px]">Spain, Ibiza, San Rafael</p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-[15px] font-semibold">From $500 per night</p> 
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bedrooms</p>
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bathrooms</p>
                                    </div>
                                    <button className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer">view more<ArrowRight className="ml-8"/></button>
                                </div>
                            </div>
                            {/*  */}
                            <div className="cursor-pointer bg-bg-primary">
                                <div className="h-[283px]">
                                    <img src={PropertiesForRent1} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">Villa Shirla</h1>
                                    <p className="mt-4 text-[15px]">Spain, Ibiza, San Rafael</p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-[15px] font-semibold">From $500 per night</p> 
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bedrooms</p>
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bathrooms</p>
                                    </div>
                                    <button className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer">view more<ArrowRight className="ml-8"/></button>
                                </div>
                            </div>
                            {/*  */}
                            <div className="cursor-pointer bg-bg-primary">
                                <div className="h-[283px]">
                                    <img src={PropertiesForRent1} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">Villa Shirla</h1>
                                    <p className="mt-4 text-[15px]">Spain, Ibiza, San Rafael</p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-[15px] font-semibold">From $500 per night</p> 
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bedrooms</p>
                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                        <p>1 Bathrooms</p>
                                    </div>
                                    <button className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer">view more<ArrowRight className="ml-8"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-40">
                    <div className="bg-bg-primary">
                        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                            <div className="flex gap-5">
                                <div className="flex-basis basis-2/3">
                                    <img src={PropertiesForRent1} alt="" className="w-full object-cover h-[586px]" />
                                </div>
                                <div className="flex-basis basis-1/3">
                                    <img src={PropertiesForRent1} alt="" className="w-full h-[283px] mb-5 object-cover"/>
                                    <img src={PropertiesForRent1} alt="" className="w-full h-[283px] object-cover"/>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Swiper
                                    modules={[Autoplay, Pagination, Navigation]}
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    
                                >
                                    <SwiperSlide  className=''>
                                        <img
                                            src={PropertiesForRent1}
                                            className="w-full h-[164px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide  className=''>
                                        <img
                                            src={PropertiesForRent1}
                                            className="w-full h-[164px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide  className=''>
                                        <img
                                            src={PropertiesForRent1}
                                            className="w-full h-[164px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide  className=''>
                                        <img
                                            src={PropertiesForRent1}
                                            className="w-full h-[164px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide  className=''>
                                        <img
                                            src={PropertiesForRent1}
                                            className="w-full h-[164px] object-cover"
                                        />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer withContact={false}/>
        </div>
     );
}

export default PropertiesForRent;