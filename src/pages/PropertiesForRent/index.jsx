import { useEffect,useState, useRef } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Footer from "../../layouts/components/Footer";
import { Datepicker } from 'flowbite-react';
import { CalendarClock, ArrowDown,GroupSearch, Group,Face,Bed, Sort,AddLocation, Distance, 
    FilterList, Payments, PaymentArrowDown, PageInfo, Apartment, ChairUmbrella, Villa, SourceEnvironment, Star, 
    OutdoorGrill,
    AddGroupOff,
    Balcony,
    ACUnit,
    CarLock,
    Exercise,
    DishWasher,
    FamilyRestRoom,
    VapeFree,
    BeachAccess} from "../../assets/icons";
import PropertiesForRent1 from '../../assets/images/properties-for-rent-1.png';
import { ArrowRight, Wifi } from "lucide-react";
import { Swiper, SwiperSlide  } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../../components/OptimizedImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const theme = {
    popup: {
      footer: {
        base: "hidden"
      }
    }, 
    views:{
        days: {
          items: {
            item: {
              selected: "bg-txt-secondary text-white hover:bg-txt-secondary", // Thay đổi màu ở đây
            },
          },
        },
      },
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
// Tạo file data/propertiesData.js hoặc thêm trực tiếp vào component
const PROPERTIES_DATA = [
  {
    id: 1,
    name: "Villa Shirla",
    location: "Spain, Ibiza, San Rafael",
    price: 500,
    priceUnit: "per night",
    bedrooms: 1,
    bathrooms: 1,
    image: PropertiesForRent1, // import your image
    type: "Villa",
    rating: 4.8,
    amenities: ["Wifi", "Pool", "Air Conditioning", "Beach Access"],
    description: "Can Banco is a breathtaking gated villa located near Jesús, just five minutes from Ibiza Town and Marina Ibiza. Offering a perfect blend of privacy, comfort, and elegance...",
    features: [
      {
        icon: <OutdoorGrill />,
        title: "Outdoor entertainment",
        description: "The alfresco dining and outdoor seating area great for summer trips."
      },
      {
        icon: <Bed />,
        title: "Room in a rental unit",
        description: "Your own room in a home, plus access to shared spaces."
      },
      {
        icon: <AddGroupOff />,
        title: "Free cancellation for 24 hours",
        description: "Get a full refund if you change your mind."
      }
    ]
  },
  {
    id: 2,
    name: "Villa Marina",
    location: "Spain, Barcelona, Beachfront",
    price: 650,
    priceUnit: "per night",
    bedrooms: 2,
    bathrooms: 2,
    image: PropertiesForRent1,
    type: "Villa",
    rating: 4.9,
    amenities: ["Wifi", "Pool", "Ocean View", "Parking"],
    description: "Luxury beachfront villa with stunning ocean views...",
    features: [
      {
        icon: <BeachAccess />,
        title: "Beachfront",
        description: "Direct access to private beach area."
      },
      {
        icon: <Balcony />,
        title: "Private Balcony",
        description: "Enjoy beautiful sunsets from your private balcony."
      }
    ]
  },
  {
    id: 3,
    name: "Mountain Retreat",
    location: "Switzerland, Alps, Zermatt",
    price: 450,
    priceUnit: "per night",
    bedrooms: 3,
    bathrooms: 2,
    image: PropertiesForRent1,
    type: "Cabin",
    rating: 4.7,
    amenities: ["Fireplace", "Mountain View", "Ski-in/Ski-out", "Hot Tub"],
    description: "Cozy mountain cabin with breathtaking alpine views...",
    features: [
      {
        icon: <Exercise />,
        title: "Fitness Center",
        description: "Full gym facilities available."
      },
      {
        icon: <CarLock />,
        title: "Secure Parking",
        description: "Indoor parking with security system."
      }
    ]
  }
];


function PropertiesForRent() {
    const [showCheckInDate, setShowCheckInDate] = useState(false);
    const [showCheckOutDate, setShowCheckOutDate] = useState(false);
    const [showSelectPerson, setShowSelectPerson] = useState(false);
    const [showSelectLocation, setShowSelectLocation] = useState(false);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [showPropertiesOptions, setShowPropertiesOptions] = useState(false);
    const [consent, setConsent] = useState(true);
    const {t} = useTranslation('footer');
    const params = useParams();
    const navigate = useNavigate();
    // Refs for all dropdowns
    const locationRef = useRef(null);
    const sortingRef = useRef(null);
    const propertiesRef = useRef(null);
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);
    const selectPersonRef = useRef(null);
    const [selectedCheckInDate, setSelectedCheckInDate] = useState();
    const [selectedCheckOutDate, setSelectedCheckOutDate] = useState();
    // Hook xử lý click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra click outside checkin dropdown
            if (checkInRef.current && !checkInRef.current.contains(event.target)) {
                setShowCheckInDate(false);
            }
            
            // Kiểm tra click outside checkout dropdown
            if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
                setShowCheckOutDate(false);
            }
            
            // Kiểm tra click outside select person dropdown
            if (selectPersonRef.current && !selectPersonRef.current.contains(event.target)) {
                setShowSelectPerson(false);
            }
            
            // Kiểm tra click outside location dropdown
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setShowSelectLocation(false);
            }
            
            // Kiểm tra click outside sorting dropdown
            if (sortingRef.current && !sortingRef.current.contains(event.target)) {
                setShowSortingOptions(false);
            }
            
            // Kiểm tra click outside properties dropdown
            if (propertiesRef.current && !propertiesRef.current.contains(event.target)) {
                setShowPropertiesOptions(false);
            }
        };

        // Thêm event listener khi component mount
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup event listener khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Hàm xử lý khi click vào location item
    const handleLocationSelect = (locationItem) => {
        console.log('Selected location:', locationItem);
        setShowSelectLocation(false);
        // Thêm logic xử lý khi chọn location ở đây
    };

    // Hàm xử lý khi click vào properties item
    const handlePropertiesSelect = (propertiesItem) => {
        setShowPropertiesOptions(false);
        // Thêm logic xử lý khi chọn property ở đây
    };

    // Hàm xử lý khi click vào sorting item
    const handleSortingSelect = (sortingItem) => {
        console.log('Selected sorting:', sortingItem);
        setShowSortingOptions(false);
        // Thêm logic xử lý khi chọn sorting ở đây
    };

    const handleCheckInSelect = (date)=>
    {
        setSelectedCheckInDate(date);
        setShowCheckInDate(false); 
    }
    const handleCheckOutSelect = (date)=>
    {
        setSelectedCheckOutDate(date);
        setShowCheckOutDate(false); 
    }
    const formatDisplayDate = (date) => {
        console.log(date)
        if (!date) return "Check in"; // Hiển thị mặc định khi chưa chọn
        
        return date.toLocaleDateString("vi-VI", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
        
        // Hoặc các format khác:
        // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        // return date.toLocaleDateString("en-US"); // MM/DD/YYYY
      };
    return ( 
        <div className="mt-20">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                {/* GROUP FILTER */}
                <div className="pt-20 flex w-full mb-10">
                    {/* CHECK IN */}
                    <div className="relative mr-5 flex-1" ref={checkInRef}>
                        <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowCheckInDate(!showCheckInDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                <span className={'text-[18px]'}>
                                    {formatDisplayDate(selectedCheckInDate)}
                                </span>
                                {/* Check in */}
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckInDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg  select-none">
                            <DatePicker
                                selected={selectedCheckInDate}
                                onChange={handleCheckInSelect}
                                inline
                                className="w-full"
                                />
                            </div>
                        )}
                    </div>
                    {/* CHECK OUT */}
                    <div className="relative mr-5 flex-1" ref={checkOutRef}>
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowCheckOutDate(!showCheckOutDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                <span className={'text-[18px]'}>
                                    {formatDisplayDate(selectedCheckOutDate)}
                                </span>
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckOutDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg   select-none">
                            <DatePicker
                                selected={selectedCheckOutDate}
                                onChange={handleCheckOutSelect}
                                inline
                                className="w-full"
                                />
                            </div>
                        )}
                    </div>
                    {/* SELECT PERSON */}
                    <div className="relative mr-5 flex-1" ref={selectPersonRef}>
                        <div className="flex items-center  justify-between border border-txt-primary p-2 cursor-pointer select-none"  onClick={() => setShowSelectPerson(!showSelectPerson)}>
                            <div className="flex items-center text-[18px]">
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
                        <div className="relative mr-5 flex-1" ref={locationRef}>
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
                                            <li className="flex justify-between border-b border-b-txt-primary py-2  cursor-pointer" key={locationItem.id}
                                             onClick={() => handleLocationSelect(locationItem)}>
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
                        <div className="relative mr-5" ref={propertiesRef}>
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
                                            <li className="flex justify-between border-b border-b-txt-primary py-2  cursor-pointer" key={propertiesItem.id}
                                             onClick={() => handlePropertiesSelect(propertiesItem)}>
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
                    <div className="relative ml-5" ref={sortingRef} >
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
                                        <li className="flex justify-between border-b border-b-txt-primary py-2 cursor-pointer" key={sortingItem.id}
                                         onClick={() => handleSortingSelect(sortingItem)}>
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
            
            {/* ... rest of your component code remains the same ... */}
            {/* LIST ITEM */}
                {!params.propertyId ? (
                    <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                        <div className="grid grid-cols-4 md:grid-cols-3 gap-6 mt-10 mb-40">
                            {
                                PROPERTIES_DATA.map(property => (
                                    <div className="cursor-pointer bg-bg-primary" key={property.id} >
                                        <div className="h-[283px]">
                                            <OptimizedImage src={property.image} alt={property.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">{property.name}</h1>
                                            <p className="mt-4 text-[15px]">{property.location}</p>
                                            <div className="flex items-center mt-2">
                                                <p className="text-[15px] font-semibold">From ${property.price} per night</p>
                                                <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                <p>{property.bedrooms} Bedrooms</p>
                                                <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                <p>{property.bathrooms} Bathrooms</p>
                                            </div>
                                            <button className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer" onClick={()=>navigate(`/en/properties-for-rent/${property.id}`)}>view more<ArrowRight className="ml-8"/></button>
                                        </div>
                                    </div>
                                ))
                            }

                            
                            
                        </div>
                    </div>
                )
                :(

                    <div className="mb-40">
                        <div className="bg-bg-primary pb-20">
                            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                                <div className="flex gap-5">
                                    <div className="flex-basis basis-2/3">
                                        <OptimizedImage src={PropertiesForRent1} alt="" className="w-full object-cover h-[586px]" />
                                    </div>
                                    <div className="flex-basis basis-1/3">
                                        <OptimizedImage src={PropertiesForRent1} alt="" className="w-full h-[283px] mb-5 object-cover"/>
                                        <OptimizedImage src={PropertiesForRent1} alt="" className="w-full h-[283px] object-cover"/>
                                    </div>
                                </div>
                                <div className="mt-5 relative select-none">
                                    <Swiper
                                        modules={[Autoplay, Pagination, Navigation]}
                                        spaceBetween={20}
                                        slidesPerView={5}
                                        pagination={{ clickable: true }}
                                        navigation={{
                                            nextEl: '.custom-next-button',
                                            prevEl: '.custom-prev-button',
                                        }}
                                        
                                    >
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide  className=''>
                                            <OptimizedImage
                                                src={PropertiesForRent1}
                                                className="w-full h-[164px] object-cover"
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                    <button className="custom-prev-button absolute -left-15 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                                        <ChevronLeft/>
                                    </button>
                                    <button className="custom-next-button absolute -right-15 top-1/2  -translate-y-1/2 z-10 cursor-pointer ">
                                    <ChevronRight/>
                                    </button>
                                </div>
                                {/*  */}
                                <div className="mt-10 grid grid-cols-5 gap-10">
                                    <div className="col-span-3">
                                        <h1 className="text-[60px] font-subtitle text-txt-secondary font-semibold">Villa Shirla</h1>
                                        <div className="flex items-center">
                                            <div className="bg-txt-secondary  px-15 py-2 text-bg-primary rounded-4xl text-[18px]">Hotel</div>
                                            <div className="flex ml-4">
                                                <Star className={'mr-2'}/>
                                                <Star />
                                            </div>
                                        </div>
                                        {/*  */}
                                        <div className="flex items-center mt-8">
                                            <p className="text-[18px]">2 Beds</p>
                                            <div className="bg-dot w-[8px] h-[8px] rounded-full mx-8 "></div>
                                            <p className="text-[18px]">2 Bathrooms</p>
                                        </div>
                                        <div className="mt-8 flex items-center">
                                            <h1 className="text-[38px] text-txt-secondary">$150</h1>
                                            <h1 className="text-[26px] text-txt-secondary ml-2">for 2 nights</h1>
                                        </div>
                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        <p className="text-[26px]">Can Banco is a breathtaking gated villa located near Jesús, just five minutes from Ibiza Town and Marina Ibiza. Offering a perfect blend of privacy, comfort, and elegance, making it an excellent choice for those seeking a luxurious retreat on the island. Designed to provide a serene yet stylish living environment, Can Banco combines modern convenience with the natural beauty of Ibiza, offering its guests an unparalleled experience.</p>
                                        <p className="underline font-semibold text-[18px] mt-8">Show more</p>
                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        <ul>
                                            <li className="flex items-start mb-10">
                                                <OutdoorGrill />
                                                <div className="ml-4 text-[18px]">
                                                    <h4 className="font-semibold">Ourdoor entertainment</h4>
                                                    <p>The alfresco dining and outdoor seating eare greate for summer trips.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start mb-10">
                                                <Bed />
                                                <div className="ml-4 text-[18px]">
                                                    <h4 className="font-semibold">Room in a rental unit</h4>
                                                    <p>Your own room in a home, plus access to shared spaces.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start"> 
                                                <AddGroupOff />
                                                <div className="ml-4 text-[18px]">
                                                    <h4 className="font-semibold">Free cancellation for 24 hours</h4>
                                                    <p>Get a full refund if you change your mind.</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        <h1 className="text-[40px] font-subtitle font-semibold text-txt-secondary">Great for your stay</h1>
                                        <ul className="flex flex-wrap mt-8 gap-x-10 gap-y-4">
                                            <li className="flex items-center">
                                                <Balcony className={'mr-4'}/>
                                                Balcony
                                            </li>
                                            <li className="flex items-center">
                                                <ACUnit className={'mr-4'}/>
                                                Air conditioning
                                            </li>
                                            <li className="flex items-center">
                                                <CarLock className={'mr-4'}/>
                                                Parking
                                            </li>
                                            <li className="flex items-center">
                                               <Exercise className={'mr-4'}/> 
                                                Fitness center
                                            </li>
                                            <li className="flex items-center">
                                                <DishWasher className={'mr-4'}/>
                                                Kitchen
                                            </li>
                                            <li className="flex items-center">
                                                <FamilyRestRoom className={'mr-4'}/>
                                                Family rooms
                                            </li>
                                            <li className="flex items-center">
                                                <VapeFree className={'mr-4'}/>
                                                Non-smoking rooms
                                            </li>
                                            <li className="flex items-center">
                                                <Wifi />
                                                Wifi in all areas
                                            </li>
                                            <li className="flex items-center">
                                                <BeachAccess className={'mr-4'}/>
                                                Beachfront
                                            </li>
                                        </ul>
                                    </div>
                                    {/*  */}
                                    <div className="col-span-2">
                                        <div className="bg-white border p-4 rounded-sm text-center">
                                            <h1 className="text-[60px] text-txt-secondary font-subtitle font-semibold mb-8">Get in touch</h1>
                                            <input type="text" placeholder="First Name" className="w-full rounded-sm mb-8"/>
                                            <input type="text" placeholder="Last Name" className="w-full rounded-sm mb-8"/>
                                            <input type="text" placeholder="Email Address" className="w-full rounded-sm mb-8"/>
                                            <input type="text" placeholder="Mobile phone number" className="w-full rounded-sm mb-8"/>
                                            <textarea name="" id="" placeholder="Write your message here ..."  className="w-full rounded-sm mb-8"></textarea>
                                            <div className="flex flex-row items-start mt-2 text-txt-primary">
                                                <div className="border  mt-1 mr-2 cursor-pointer w-[34px] h-[17px]" onClick={()=>setConsent(!consent)}>
                                                    {consent && (
                                                        <Check width={15} className="h-[17px]"/>
                                                    )}
                                                </div>
                                                <p className="text-[15px] text-left">
                                                    {t('footer:policy')}
                                                </p>
                                            </div>
                                            <button className="cursor-pointer text-[18px] uppercase w-full py-4 bg-txt-secondary  text-bg-primary mt-8 rounded-sm">submit message</button>
                                        </div>
                                        {/*  */}
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.7484136613452!2d105.74611147590936!3d20.96261619004587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2sPhenikaa%20University!5e0!3m2!1sen!2s!4v1761578035476!5m2!1sen!2s" width="490" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="mt-20"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                                <h1 className="text-[40px] font-subtitle font-semibold text-txt-secondary">You might also like this</h1>
                                <div className="grid grid-cols-4 md:grid-cols-3 gap-6 mt-10 mb-40">
                                    {
                                        PROPERTIES_DATA.map(property => (
                                            <div className="cursor-pointer bg-bg-primary" key={property.id} >
                                                <div className="h-[283px]">
                                                    <OptimizedImage src={property.image} alt={property.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-4">
                                                    <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">{property.name}</h1>
                                                    <p className="mt-4 text-[15px]">{property.location}</p>
                                                    <div className="flex items-center mt-2">
                                                        <p className="text-[15px] font-semibold">From ${property.price} per night</p>
                                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                        <p>{property.bedrooms} Bedrooms</p>
                                                        <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                        <p>{property.bathrooms} Bathrooms</p>
                                                    </div>
                                                    <button className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer" onClick={()=>navigate(`/en/properties-for-rent/${property.id}`)}>view more<ArrowRight className="ml-8"/></button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            <Footer withContact={false}/>
        </div>
     );
}

export default PropertiesForRent;