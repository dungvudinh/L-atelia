import { useEffect,useState, useRef, useMemo } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Footer from "../../layouts/components/Footer";
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
import PropertiesForRent1 from '../../assets/images/properties-for-rent-1.webp';
import { ArrowRight, Wifi } from "lucide-react";
import { Swiper, SwiperSlide  } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../../components/OptimizedImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import rentService from "../../services/rentService";
import bookingService from "../../services/bookingService";

const LOCATION_ITEMS = [
    {id:1, name:'Ho Chi Minh City', country:'Viet Nam'},
    {id:2, name:'Nha Trang', country:'Viet Nam'},
    {id:3, name:'Ha Noi', country:'Viet Nam'},
    {id:4, name:'Vung Tau', country:'Viet Nam'},
    {id:5, name:'Sapa', country:'Viet Nam'},
]
const SORTING_ITEMS = [
    {id:1, name:'Price: Low to High', value: 'price_asc', desc:'Sort by price from low to high', icon:<Payments className={'mr-2 mt-1'}/>},
    {id:2, name:'Price: High to Low', value: 'price_desc', desc:'Sort by price from high to low', icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
    {id:3, name:'Newest First', value: 'newest', desc:'Show newest properties first',icon:<Payments className={'mr-2 mt-1'}/>},
    {id:4, name:'Most Popular', value: 'popular', desc:'Show most popular properties first',icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
]

function PropertiesForRent() {
    const [showCheckInDate, setShowCheckInDate] = useState(false);
    const [showCheckOutDate, setShowCheckOutDate] = useState(false);
    const [showSelectPerson, setShowSelectPerson] = useState(false);
    const [showSelectLocation, setShowSelectLocation] = useState(false);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [consent, setConsent] = useState(true);
    const [rentProperties, setRentProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSorting, setSelectedSorting] = useState(SORTING_ITEMS[0]);
    const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
    const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);
    const [guestCounts, setGuestCounts] = useState({
        adults: 2,
        children: 0,
        rooms: 1
    });
    const {t} = useTranslation('footer');
    const params = useParams();
    const navigate = useNavigate();
    
    // Refs for all dropdowns
    const locationRef = useRef(null);
    const sortingRef = useRef(null);
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);
    const selectPersonRef = useRef(null);

    // Fetch rent properties và bookings từ API
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch properties và bookings song song
            const [propertiesResponse, bookingsResponse] = await Promise.all([
                rentService.getAllRentProperties(),
                bookingService.getAllBookings()
            ]);
            
            
            const properties = propertiesResponse.data || propertiesResponse;
            const bookingsData = bookingsResponse.data || bookingsResponse;
            
            setAllProperties(Array.isArray(properties) ? properties : []);
            setBookings(Array.isArray(bookingsData) ? bookingsData : []);
            
        } catch (err) {
            console.error('❌ Failed to fetch data:', err);
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    // Fetch property detail khi có propertyId
    const fetchPropertyDetail = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await rentService.getRentPropertyById(id);
            
            const property = response.data || response;
            setCurrentProperty(property);
            
        } catch (err) {
            console.error(`❌ Failed to fetch property ${id}:`, err);
            setError(err.message || 'Failed to load property details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.propertyId) {
            fetchPropertyDetail(params.propertyId);
        } else {
            fetchData();
        }
    }, [params.propertyId]);

    // Hook xử lý click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (checkInRef.current && !checkInRef.current.contains(event.target)) {
                setShowCheckInDate(false);
            }
            if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
                setShowCheckOutDate(false);
            }
            if (selectPersonRef.current && !selectPersonRef.current.contains(event.target)) {
                setShowSelectPerson(false);
            }
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setShowSelectLocation(false);
            }
            if (sortingRef.current && !sortingRef.current.contains(event.target)) {
                setShowSortingOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Kiểm tra property có available không dựa trên bookings
    const isPropertyAvailable = (propertyId, checkIn, checkOut, guests) => {
        if (!checkIn || !checkOut) return true;
        
        const propertyBookings = bookings.filter(booking => 
            booking.propertyId === propertyId && 
            booking.status !== 'cancelled'
        );

        // Kiểm tra xem có booking nào trùng ngày không
        const hasOverlappingBooking = propertyBookings.some(booking => {
            const bookingCheckIn = new Date(booking.checkIn);
            const bookingCheckOut = new Date(booking.checkOut);
            const searchCheckIn = new Date(checkIn);
            const searchCheckOut = new Date(checkOut);

            return (
                (searchCheckIn < bookingCheckOut && searchCheckOut > bookingCheckIn) ||
                (searchCheckIn >= bookingCheckIn && searchCheckIn < bookingCheckOut) ||
                (searchCheckOut > bookingCheckIn && searchCheckOut <= bookingCheckOut)
            );
        });

        return !hasOverlappingBooking;
    };

    // Logic filter theo location
    const filterByLocation = (properties, location) => {
        if (!location) return properties;
        
        return properties.filter(property => 
            property.location?.toLowerCase().includes(location.name.toLowerCase())
        );
    };

    // Logic filter theo date availability
    const filterByDateAvailability = (properties, checkIn, checkOut, guests) => {
        if (!checkIn || !checkOut) return properties;
        
        return properties.filter(property => 
            isPropertyAvailable(property._id, checkIn, checkOut, guests)
        );
    };

    // Logic sorting
    const sortProperties = (properties, sortOption) => {
        if (!sortOption) return properties;
        
        const sortedProperties = [...properties];
        
        switch (sortOption.value) {
            case 'price_asc':
                return sortedProperties.sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'price_desc':
                return sortedProperties.sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'newest':
                return sortedProperties.sort((a, b) => 
                    new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
                );
            case 'popular':
                return sortedProperties.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            default:
                return sortedProperties;
        }
    };

    // Hàm xử lý khi click vào location item
    const handleLocationSelect = (locationItem) => {
        setSelectedLocation(locationItem);
        setShowSelectLocation(false);
    };

    // Hàm xử lý khi click vào sorting item
    const handleSortingSelect = (sortingItem) => {
        setSelectedSorting(sortingItem);
        setShowSortingOptions(false);
    };

    // Xử lý check-in date
    const handleCheckInSelect = (date) => {
        setSelectedCheckInDate(date);
        setShowCheckInDate(false);
        
        // Nếu check-out date đã chọn và nhỏ hơn check-in date, reset check-out date
        if (selectedCheckOutDate && date >= selectedCheckOutDate) {
            setSelectedCheckOutDate(null);
        }
    };

    // Xử lý check-out date
    const handleCheckOutSelect = (date) => {
        if (selectedCheckInDate && date <= selectedCheckInDate) {
            alert('Check-out date must be after check-in date');
            return;
        }
        setSelectedCheckOutDate(date);
        setShowCheckOutDate(false);
    };

    // Xử lý thay đổi số lượng guests
    const handleGuestCountChange = (type, operation) => {
        setGuestCounts(prev => {
            const newCounts = { ...prev };
            
            if (operation === 'increment') {
                if (type === 'adults') {
                    newCounts.adults = Math.min(newCounts.adults + 1, 10);
                } else if (type === 'children') {
                    newCounts.children = Math.min(newCounts.children + 1, 10);
                } else if (type === 'rooms') {
                    newCounts.rooms = Math.min(newCounts.rooms + 1, 10);
                }
            } else if (operation === 'decrement') {
                if (type === 'adults') {
                    newCounts.adults = Math.max(newCounts.adults - 1, 1);
                } else if (type === 'children') {
                    newCounts.children = Math.max(newCounts.children - 1, 0);
                } else if (type === 'rooms') {
                    newCounts.rooms = Math.max(newCounts.rooms - 1, 1);
                }
            }
            
            return newCounts;
        });
    };

    // Xóa location filter
    const clearLocationFilter = () => {
        setSelectedLocation(null);
    };

    // Xóa date filters
    const clearDateFilters = () => {
        setSelectedCheckInDate(null);
        setSelectedCheckOutDate(null);
        setGuestCounts({
            adults: 2,
            children: 0,
            rooms: 1
        });
    };

    // Xóa sorting filter
    const clearSortingFilter = () => {
        setSelectedSorting(SORTING_ITEMS[0]);
    };

    // Xóa tất cả filters
    const clearAllFilters = () => {
        clearLocationFilter();
        clearDateFilters();
        clearSortingFilter();
    };

    // Format display cho guest counts
    const formatGuestDisplay = () => {
        const { adults, children, rooms } = guestCounts;
        const totalGuests = adults + children;
        
        let display = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;
        if (rooms > 1) {
            display += `, ${rooms} rooms`;
        }
        
        return display;
    };

    // Memoized filtered và sorted properties
    const filteredAndSortedProperties = useMemo(() => {
        let result = [...allProperties];
        
        // Filter by location
        if (selectedLocation) {
            result = filterByLocation(result, selectedLocation);
        }
        
        // Filter by date availability
        if (selectedCheckInDate && selectedCheckOutDate) {
            result = filterByDateAvailability(result, selectedCheckInDate, selectedCheckOutDate, guestCounts.adults + guestCounts.children);
        }
        
        // Sort properties
        if (selectedSorting) {
            result = sortProperties(result, selectedSorting);
        }
        
        return result;
    }, [allProperties, selectedLocation, selectedCheckInDate, selectedCheckOutDate, guestCounts, selectedSorting, bookings]);

    // Update rentProperties khi filteredAndSortedProperties thay đổi
    useEffect(() => {
        setRentProperties(filteredAndSortedProperties);
    }, [filteredAndSortedProperties]);

    const formatDisplayDate = (date) => {
        if (!date) return "Check in";
        return date.toLocaleDateString("vi-VI", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
    };

    // Format price với unit
    const formatPrice = (price, priceUnit) => {
        return `$${price} ${priceUnit || 'per night'}`;
    };

    // Lấy featured image hoặc image đầu tiên từ gallery
    const getPropertyImage = (property) => {
        if (property.featuredImage) return property.featuredImage;
        if (property.gallery && property.gallery.length > 0) return property.gallery[0].url;
        return PropertiesForRent1;
    };

    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-txt-gray text-lg">Loading properties...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h2 className="text-xl font-semibold">Error</h2>
                        <p>{error}</p>
                        <button 
                            onClick={params.propertyId ? () => fetchPropertyDetail(params.propertyId) : fetchData}
                            className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <div className="mt-20">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                {/* GROUP FILTER */}
                <div className="pt-20 flex w-full mb-10">
                    {/* CHECK IN */}
                    <div className="relative mr-5 flex-1" ref={checkInRef}>
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                             onClick={() => setShowCheckInDate(!showCheckInDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                <span className={'text-[18px]'}>
                                    {formatDisplayDate(selectedCheckInDate)}
                                </span>
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckInDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none">
                                <DatePicker
                                    selected={selectedCheckInDate}
                                    onChange={handleCheckInSelect}
                                    minDate={new Date()}
                                    inline
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* CHECK OUT */}
                    <div className="relative mr-5 flex-1" ref={checkOutRef}>
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                             onClick={() => setShowCheckOutDate(!showCheckOutDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                <span className={'text-[18px]'}>
                                    {formatDisplayDate(selectedCheckOutDate)}
                                </span>
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckOutDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none">
                                <DatePicker
                                    selected={selectedCheckOutDate}
                                    onChange={handleCheckOutSelect}
                                    minDate={selectedCheckInDate ? new Date(selectedCheckInDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                                    inline
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* SELECT PERSON */}
                    <div className="relative mr-5 flex-1" ref={selectPersonRef}>
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                             onClick={() => setShowSelectPerson(!showSelectPerson)}>
                            <div className="flex items-center text-[18px]">
                                <GroupSearch className='mr-2'/>
                                {formatGuestDisplay()}
                            </div>
                            <ArrowDown />
                        </div>
                        {showSelectPerson && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full">
                                <ul className="w-full">
                                    <li className="flex justify-between border-b border-b-txt-primary p-2 hover:bg-stone-200">
                                        <div className="flex items-center">
                                            <Group className="mr-4"/>
                                            <span className="text-[18px]">Adults</span>
                                        </div>
                                        <div className="flex items-center">
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('adults', 'decrement')}
                                                disabled={guestCounts.adults <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="mx-4 text-[18px] min-w-[20px] text-center">
                                                {guestCounts.adults}
                                            </span>
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('adults', 'increment')}
                                                disabled={guestCounts.adults >= 10}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                    <li className="flex justify-between border-b border-b-txt-primary p-2 hover:bg-stone-200">
                                        <div className="flex items-center">
                                            <Face className="mr-4"/>
                                            <span className="text-[18px]">Children</span>
                                        </div>
                                        <div className="flex items-center">
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('children', 'decrement')}
                                                disabled={guestCounts.children <= 0}
                                            >
                                                -
                                            </button>
                                            <span className="mx-4 text-[18px] min-w-[20px] text-center">
                                                {guestCounts.children}
                                            </span>
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('children', 'increment')}
                                                disabled={guestCounts.children >= 10}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                    <li className="flex justify-between p-2 hover:bg-stone-200">
                                        <div className="flex items-center">
                                            <Bed className="mr-4"/>
                                            <span className="text-[18px]">Rooms</span>
                                        </div>
                                        <div className="flex items-center">
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('rooms', 'decrement')}
                                                disabled={guestCounts.rooms <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="mx-4 text-[18px] min-w-[20px] text-center">
                                                {guestCounts.rooms}
                                            </span>
                                            <button 
                                                className="w-8 h-8 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50"
                                                onClick={() => handleGuestCountChange('rooms', 'increment')}
                                                disabled={guestCounts.rooms >= 10}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <button className="flex-1 bg-txt-secondary text-white cursor-pointer hover:bg-blue-700">
                        Search
                    </button>
                </div>

                <h1 className='uppercase text-[60px] font-subtitle text-txt-secondary font-semibold mb-10'>CÁC DỰ ÁN CHO THUÊ</h1>
                
                {/* Active Filters Display */}
                {(selectedLocation || selectedCheckInDate || selectedSorting.value !== 'price_asc') && (
                    <div className="flex items-center mb-6 gap-4 flex-wrap">
                        <span className="text-[18px] font-semibold">Active Filters:</span>
                        {selectedLocation && (
                            <div className="flex items-center bg-txt-secondary text-white px-3 py-1 rounded-full">
                                <span className="text-[14px] mr-2">Location: {selectedLocation.name}</span>
                                <button 
                                    onClick={clearLocationFilter}
                                    className="text-white hover:text-gray-200 text-[14px]"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        {selectedCheckInDate && selectedCheckOutDate && (
                            <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-full">
                                <span className="text-[14px] mr-2">
                                    {formatDisplayDate(selectedCheckInDate)} - {formatDisplayDate(selectedCheckOutDate)}
                                </span>
                                <button 
                                    onClick={clearDateFilters}
                                    className="text-white hover:text-gray-200 text-[14px]"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        {selectedSorting && selectedSorting.value !== 'price_asc' && (
                            <div className="flex items-center bg-txt-primary text-white px-3 py-1 rounded-full">
                                <span className="text-[14px] mr-2">Sort: {selectedSorting.name}</span>
                                <button 
                                    onClick={clearSortingFilter}
                                    className="text-white hover:text-gray-200 text-[14px]"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <button 
                            onClick={clearAllFilters}
                            className="text-txt-secondary hover:text-blue-700 text-[14px] font-semibold"
                        >
                            Clear All
                        </button>
                    </div>
                )}
                
                <div className="flex items-center justify-between w-full mb-20">
                    <div className="flex">
                        <button className="flex items-center bg-txt-secondary px-20 py-2 text-bg-primary text-[18px] font-light mr-5 cursor-pointer">
                            <Sort className='mr-4'/>
                            More Filter
                        </button>
                        
                        {/* LOCATION */}
                        <div className="relative mr-5" ref={locationRef}>
                            <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none min-w-[200px]"  
                                 onClick={() => setShowSelectLocation(!showSelectLocation)}>
                                <div className="flex items-center text-[18px]">
                                    <AddLocation className='mr-2'/>
                                    <span className="truncate max-w-[150px]">
                                        {selectedLocation ? selectedLocation.name : 'Select your location'}
                                    </span>
                                </div>
                                <ArrowDown />
                            </div>
                            {showSelectLocation && (
                                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full">
                                    <ul className="w-full">
                                        {LOCATION_ITEMS.map(locationItem=>(
                                            <li className="flex justify-between border-b border-b-txt-primary p-2 cursor-pointer hover:bg-gray-200" 
                                                key={locationItem.id}
                                                onClick={() => handleLocationSelect(locationItem)}>
                                                <div className="flex items-start">
                                                    <Distance className="mr-4"/>
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
                    </div>
                    
                    {/* SORTING */}
                    <div className="relative" ref={sortingRef}>
                        <div className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none min-w-[200px]"  
                             onClick={() => setShowSortingOptions(!showSortingOptions)}>
                            <div className="flex items-center text-[18px]">
                                <FilterList className='mr-2'/>
                                <span className="truncate max-w-[150px]">
                                    {selectedSorting ? selectedSorting.name : 'Default sorting'}
                                </span>
                            </div>
                            <ArrowDown />
                        </div>
                        {showSortingOptions && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full right-0">
                                <ul className="w-full">
                                    {SORTING_ITEMS.map(sortingItem=>(
                                        <li className="flex justify-between border-b border-b-txt-primary p-2 cursor-pointer hover:bg-gray-200" 
                                            key={sortingItem.id}
                                            onClick={() => handleSortingSelect(sortingItem)}>
                                            <div className="flex items-start">
                                                {sortingItem.icon}
                                                <div>
                                                    <p className="text-[18px] font-semibold">{sortingItem.name}</p>
                                                    <p className="text-[14px] text-gray-600">{sortingItem.desc}</p>
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
            {!params.propertyId ? (
                <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-[18px] text-txt-gray">
                            Found {rentProperties.length} propert{rentProperties.length !== 1 ? 'ies' : 'y'}
                            {selectedLocation && ` in ${selectedLocation.name}`}
                            {selectedCheckInDate && selectedCheckOutDate && ` for selected dates`}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-4 md:grid-cols-3 gap-6 mt-10 mb-40">
                        {rentProperties.length > 0 ? (
                            rentProperties.map(property => (
                                <div className="cursor-pointer bg-bg-primary" key={property._id} >
                                    <div className="h-[283px]">
                                        <OptimizedImage 
                                            src={getPropertyImage(property)} 
                                            alt={property.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">{property.title}</h1>
                                        <p className="mt-4 text-[15px]">{property.location}</p>
                                        <div className="flex items-center mt-2">
                                            <p className="text-[15px] font-semibold">
                                                {formatPrice(property.price, property.priceUnit)}
                                            </p>
                                            <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                            <p>{property.bedrooms || property.beds} Bedrooms</p>
                                            <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                            <p>{property.bathrooms} Bathrooms</p>
                                        </div>
                                        {selectedCheckInDate && selectedCheckOutDate && (
                                            <div className="mt-2 text-green-600 text-[14px] font-semibold">
                                                ✓ Available for selected dates
                                            </div>
                                        )}
                                        <button 
                                            className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer" 
                                            onClick={() => navigate(`/en/properties-for-rent/${property._id}`)}
                                        >
                                            view more
                                            <ArrowRight className="ml-8"/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-12">
                                <p className="text-txt-gray text-lg">
                                    {selectedLocation || selectedCheckInDate 
                                        ? 'No properties found matching your criteria. Try adjusting your filters.'
                                        : 'No properties available.'
                                    }
                                </p>
                                {(selectedLocation || selectedCheckInDate) && (
                                    <button 
                                        onClick={clearAllFilters}
                                        className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // ... (property detail page code remains the same)
                <div className="mb-40">
                    {currentProperty && (
                        <div className="bg-bg-primary pb-20">
                            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                                {/* Property Detail Content */}
                                <div className="flex gap-5">
                                    <div className="flex-basis basis-2/3">
                                        <OptimizedImage 
                                            src={getPropertyImage(currentProperty)} 
                                            alt={currentProperty.title} 
                                            className="w-full object-cover h-[586px]" 
                                        />
                                    </div>
                                    <div className="flex-basis basis-1/3">
                                        {currentProperty.gallery && currentProperty.gallery.slice(0, 2).map((image, index) => (
                                            <OptimizedImage 
                                                key={image._id || index}
                                                src={image.url} 
                                                alt={currentProperty.title} 
                                                className="w-full h-[283px] mb-5 object-cover"
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Gallery Slider */}
                                {currentProperty.gallery && currentProperty.gallery.length > 0 && (
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
                                            {currentProperty.gallery.map((image) => (
                                                <SwiperSlide key={image._id}>
                                                    <OptimizedImage
                                                        src={image.url}
                                                        alt={currentProperty.title}
                                                        className="w-full h-[164px] object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <button className="custom-prev-button absolute -left-15 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                                            <ChevronLeft/>
                                        </button>
                                        <button className="custom-next-button absolute -right-15 top-1/2  -translate-y-1/2 z-10 cursor-pointer ">
                                        <ChevronRight/>
                                        </button>
                                    </div>
                                )}

                                {/* Property Details */}
                                <div className="mt-10 grid grid-cols-5 gap-10">
                                    <div className="col-span-3">
                                        <h1 className="text-[60px] font-subtitle text-txt-secondary font-semibold">{currentProperty.title}</h1>
                                        <div className="flex items-center">
                                            <div className="bg-txt-secondary  px-15 py-2 text-bg-primary rounded-4xl text-[18px]">
                                                {currentProperty.type || 'Property'}
                                            </div>
                                            <div className="flex ml-4">
                                                <Star className={'mr-2'}/>
                                                <Star />
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center mt-8">
                                            <p className="text-[18px]">{currentProperty.beds || currentProperty.bedrooms} Beds</p>
                                            <div className="bg-dot w-[8px] h-[8px] rounded-full mx-8 "></div>
                                            <p className="text-[18px]">{currentProperty.bathrooms} Bathrooms</p>
                                        </div>
                                        <div className="mt-8 flex items-center">
                                            <h1 className="text-[38px] text-txt-secondary">
                                                ${currentProperty.price}
                                            </h1>
                                            <h1 className="text-[26px] text-txt-secondary ml-2">
                                                {currentProperty.priceUnit || 'per night'}
                                            </h1>
                                        </div>
                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        <p className="text-[26px]">{currentProperty.description}</p>
                                        <p className="underline font-semibold text-[18px] mt-8">Show more</p>
                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        
                                        {/* Highlights */}
                                        {currentProperty.highlights && currentProperty.highlights.length > 0 && (
                                            <ul>
                                                {currentProperty.highlights.map((highlight, index) => (
                                                    <li className="flex items-start mb-10" key={highlight._id || index}>
                                                        {/* You can map icons based on highlight.icon */}
                                                        <OutdoorGrill />
                                                        <div className="ml-4 text-[18px]">
                                                            <h4 className="font-semibold">{highlight.title}</h4>
                                                            <p>{highlight.description}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="w-full h-[1px] bg-txt-primary my-10"></div>
                                        <h1 className="text-[40px] font-subtitle font-semibold text-txt-secondary">Great for your stay</h1>
                                        
                                        {/* Amenities */}
                                        {currentProperty.amenities && currentProperty.amenities.length > 0 && (
                                            <ul className="flex flex-wrap mt-8 gap-x-10 gap-y-4">
                                                {currentProperty.amenities.map((amenity, index) => (
                                                    <li className="flex items-center" key={index}>
                                                        {/* You can map icons based on amenity type */}
                                                        <Balcony className={'mr-4'}/>
                                                        {amenity}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    
                                    {/* Contact Form */}
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
                                        
                                        {/* Map */}
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.7484136613452!2d105.74611147590936!3d20.96261619004587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2sPhenikaa%20University!5e0!3m2!1sen!2s!4v1761578035476!5m2!1sen!2s" 
                                            width="490" 
                                            height="450" 
                                            style={{border:0}} 
                                            allowFullScreen="" 
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade" 
                                            className="mt-20"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Related Properties */}
                    <div>
                        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 ">
                            <h1 className="text-[40px] font-subtitle font-semibold text-txt-secondary">You might also like this</h1>
                            <div className="grid grid-cols-4 md:grid-cols-3 gap-6 mt-10 mb-40">
                                {rentProperties.slice(0, 4).map(property => (
                                    <div className="cursor-pointer bg-bg-primary" key={property._id} >
                                        <div className="h-[283px]">
                                            <OptimizedImage 
                                                src={getPropertyImage(property)} 
                                                alt={property.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h1 className="mt-4 text-[40px] font-subtitle font-semibold text-txt-secondary">{property.title}</h1>
                                            <p className="mt-4 text-[15px]">{property.location}</p>
                                            <div className="flex items-center mt-2">
                                                <p className="text-[15px] font-semibold">
                                                    {formatPrice(property.price, property.priceUnit)}
                                                </p>
                                                <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                <p>{property.bedrooms || property.beds} Bedrooms</p>
                                                <div className="w-[8px] h-[8px] rounded-full bg-dot mx-2"></div>
                                                <p>{property.bathrooms} Bathrooms</p>
                                            </div>
                                            <button 
                                                className="text-[18px] uppercase border border-txt-primary flex p-2 mt-4 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer" 
                                                onClick={() => navigate(`/en/properties-for-rent/${property._id}`)}
                                            >
                                                view more
                                                <ArrowRight className="ml-8"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer withContact={false}/>
        </div>
     );
}

export default PropertiesForRent;