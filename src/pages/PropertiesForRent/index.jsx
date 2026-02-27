// components/PropertiesForRent.jsx
import { useEffect,useState, useRef, useMemo } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Footer from "../../layouts/components/Footer";
import { CalendarClock, ArrowDown, GroupSearch, Group, Face, Sort, AddLocation, Distance, FilterList, Payments, PaymentArrowDown,Star, OutdoorGrill, Bed, AddGroupOff, Balcony, ACUnit, CarLock, Exercise, DishWasher, FamilyRestRoom, VapeFree, Wifi, BeachAccess } from "../../assets/icons";
import PropertiesForRent1 from '../../assets/images/properties-for-rent-1.webp';
import { ArrowRight, ChevronLeft, ChevronRight, Check, Highlighter } from "lucide-react";
import { Swiper, SwiperSlide  } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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

// THAY ĐỔI: Chỉ 2 option sort mới
const SORTING_ITEMS = [
  {id:1, name:'Per Room Per Night', value: 'per_room_per_night', icon:<Payments />},
  {id:2, name:'Total Price', value: 'total_price', icon:<Payments />},
]

// Hàm tính giá theo từng loại
const calculatePrice = (price, priceUnit, calculationType = 'per_room_per_night') => {
  if (!price) return 0;
  
  // Tính giá gốc theo đơn vị
  let basePrice = price;
  switch (priceUnit) {
    case 'per night':
      basePrice = price;
      break;
    case 'for 2 nights':
      basePrice = price / 2; // Chia đôi để có giá mỗi đêm
      break;
    case 'per week':
      basePrice = price / 7; // Chia cho 7 ngày
      break;
    case 'per month':
      basePrice = price / 30; // Chia cho 30 ngày
      break;
    default:
      basePrice = price;
  }
  
  // Nếu là total price, trả về giá gốc (không chia)
  if (calculationType === 'total_price') {
    return price;
  }
  
  // Nếu là per room per night, trả về giá đã chuẩn hóa
  return basePrice;
};

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
  // THÊM: State cho show more description
  const [showFullDescription, setShowFullDescription] = useState(false);
  // THAY ĐỔI: Tách state cho filter và search
  const [searchFilters, setSearchFilters] = useState({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0
  });
  
  const [tempFilters, setTempFilters] = useState({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0
  });
  
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const {t} = useTranslation('footer');
  const params = useParams();
  const navigate = useNavigate();
  
  const locationRef = useRef(null);
  const sortingRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const selectPersonRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesResponse, bookingsResponse] = await Promise.all([
        rentService.getAllRentProperties(),
        bookingService.getAllBookings()
      ]);
      
      const properties = propertiesResponse.data || propertiesResponse;
      const bookingsData = bookingsResponse.data || bookingsResponse;
      
      setAllProperties(Array.isArray(properties) ? properties : []);
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyDetail = async (id) => {
    try {
      setLoading(true);
      const response = await rentService.getRentPropertyById(id);
      const property = response.data || response;
      setCurrentProperty(property);
    } catch (err) {
      console.error(`Failed to fetch property ${id}:`, err);
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

  const formatDisplayDate = (date, type = 'checkin') => {
    if (!date) return type === 'checkin' ? "Check in" : "Check out";
    return date.toLocaleDateString("vi-VI", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!consent) {
      setFormError('Please agree to the privacy policy');
      return;
    }

    if (!currentProperty) {
      setFormError('No property selected');
      return;
    }

    try {
      setFormLoading(true);
      setFormError('');

      const bookingData = {
        propertyId: currentProperty._id,
        customer: {
          name: `${contactForm.firstName} ${contactForm.lastName}`.trim(),
          email: contactForm.email,
          phone: contactForm.phone
        },
        checkIn: searchFilters.checkIn || new Date(Date.now() + 24 * 60 * 60 * 1000),
        checkOut: searchFilters.checkOut || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        adults: searchFilters.adults,
        children: searchFilters.children,
        totalAmount: 0,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: contactForm.message
      };

      const response = await bookingService.createBooking(bookingData);
      
      if (response.success) {
        setFormSuccess(true);
        setContactForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setConsent(false);
        
        setTimeout(() => {
          setFormSuccess(false);
        }, 3000);
      } else {
        setFormError(response.message || 'Failed to submit booking request');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormError(error.message || 'Failed to submit booking request. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const isPropertyAvailable = (propertyId, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return true;
    
    const propertyBookings = bookings.filter(booking => 
      booking.propertyId === propertyId && 
      booking.status !== 'cancelled'
    );

    const hasOverlappingBooking = propertyBookings.some(booking => {
      const bookingCheckIn = new Date(booking.checkIn);
      const bookingCheckOut = new Date(booking.checkOut);
      const searchCheckIn = new Date(checkIn);
      const searchCheckOut = new Date(checkOut);

      return (
        (searchCheckIn < bookingCheckOut && searchCheckOut > bookingCheckIn)
      );
    });

    return !hasOverlappingBooking;
  };

  const filterByLocation = (properties, location) => {
    if (!location) return properties;
    return properties.filter(property => 
      property.location?.toLowerCase().includes(location.name.toLowerCase())
    );
  };

  const filterByDateAvailability = (properties, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return properties;
    return properties.filter(property => 
      isPropertyAvailable(property._id, checkIn, checkOut)
    );
  };

  // THAY ĐỔI: Hàm sort mới với 2 option
  const sortProperties = (properties, sortOption) => {
    if (!sortOption) return properties;
    
    const sortedProperties = [...properties];
    
    switch (sortOption.value) {
      case 'per_room_per_night':
        return sortedProperties.sort((a, b) => {
          const priceA = calculatePrice(a.price, a.priceUnit, 'per_room_per_night');
          const priceB = calculatePrice(b.price, b.priceUnit, 'per_room_per_night');
          return priceA - priceB;
        });
      case 'total_price':
        return sortedProperties.sort((a, b) => {
          const priceA = calculatePrice(a.price, a.priceUnit, 'total_price');
          const priceB = calculatePrice(b.price, b.priceUnit, 'total_price');
          return priceA - priceB;
        });
      default:
        return sortedProperties;
    }
  };

  // THAY ĐỔI: Tất cả các hàm handle đều navigate về list nếu đang ở detail
  const handleLocationSelect = (locationItem) => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSelectedLocation(locationItem);
    setShowSelectLocation(false);
  };

  const handleSortingSelect = (sortingItem) => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSelectedSorting(sortingItem);
    setShowSortingOptions(false);
  };

  // THAY ĐỔI: Các hàm handle chỉ cập nhật tempFilters
  const handleCheckInSelect = (date) => {
    setTempFilters(prev => ({ ...prev, checkIn: date }));
    setShowCheckInDate(false);
    
    if (tempFilters.checkOut && date >= tempFilters.checkOut) {
      setTempFilters(prev => ({ ...prev, checkOut: null }));
    }
  };

  const handleCheckOutSelect = (date) => {
    if (tempFilters.checkIn && date <= tempFilters.checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }
    setTempFilters(prev => ({ ...prev, checkOut: date }));
    setShowCheckOutDate(false);
  };

  const handleGuestCountChange = (type, operation) => {
    setTempFilters(prev => {
      const newFilters = { ...prev };
      
      if (operation === 'increment') {
        if (type === 'adults') {
          newFilters.adults = Math.min(newFilters.adults + 1, 10);
        } else if (type === 'children') {
          newFilters.children = Math.min(newFilters.children + 1, 5);
        }
      } else if (operation === 'decrement') {
        if (type === 'adults') {
          newFilters.adults = Math.max(newFilters.adults - 1, 1);
        } else if (type === 'children') {
          newFilters.children = Math.max(newFilters.children - 1, 0);
        }
      }
      
      return newFilters;
    });
  };

  // THAY ĐỔI: Hàm xử lý search
  const handleSearch = () => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    
    // Validate dates
    if (tempFilters.checkIn && tempFilters.checkOut && tempFilters.checkIn >= tempFilters.checkOut) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Apply filters
    setSearchFilters(tempFilters);
  };

  const clearLocationFilter = () => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSelectedLocation(null);
  };

  const clearDateFilters = () => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSearchFilters(prev => ({
      ...prev,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0
    }));
    setTempFilters(prev => ({
      ...prev,
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0
    }));
  };

  const clearSortingFilter = () => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSelectedSorting(SORTING_ITEMS[0]);
  };

  const clearAllFilters = () => {
    // Nếu đang ở detail page, navigate về list trước
    if (params.propertyId) {
      navigate('/en/properties-for-rent');
    }
    setSelectedLocation(null);
    clearDateFilters();
    clearSortingFilter();
  };

  const formatGuestDisplay = () => {
    const { adults, children } = tempFilters;
    let display = `${adults} adult${adults !== 1 ? 's' : ''}`;
    
    if (children > 0) {
      display += `, ${children} child${children !== 1 ? 'ren' : ''}`;
    }
    
    return display;
  };

  const filteredAndSortedProperties = useMemo(() => {
    let result = [...allProperties];
    
    if (selectedLocation) {
      result = filterByLocation(result, selectedLocation);
    }
    
    // THAY ĐỔI: Chỉ lọc theo date khi có searchFilters
    if (searchFilters.checkIn && searchFilters.checkOut) {
      result = filterByDateAvailability(result, searchFilters.checkIn, searchFilters.checkOut);
    }
    
    if (selectedSorting) {
      result = sortProperties(result, selectedSorting);
    }
    
    return result;
  }, [allProperties, selectedLocation, searchFilters, selectedSorting, bookings]);

  useEffect(() => {
    setRentProperties(filteredAndSortedProperties);
  }, [filteredAndSortedProperties]);

  const formatPrice = (price, priceUnit) => {
    return `$${price} ${priceUnit || 'per night'}`;
  };

  // Hàm hiển thị giá đã tính toán (cho debug)
  const getCalculatedPriceDisplay = (property, calculationType) => {
    const calculated = calculatePrice(property.price, property.priceUnit, calculationType);
    const typeLabel = calculationType === 'per_room_per_night' ? 'per room/night' : 'total';
    return `$${calculated.toFixed(2)} (${typeLabel})`;
  };

  const getPropertyImage = (property) => {
    if (property.featuredImage) return 'https://cdn.latelia.com/latelia/' + property.featuredImage.thumbnailKey || property.featuredImage.key;
    if (property.gallery && property.gallery.length > 0) return property.gallery[0].url;
    return PropertiesForRent1;
  };

  // THÊM: Hàm xử lý click show more
  const handleShowMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  // THÊM: Hàm lọc related properties (loại bỏ current property)
  const getRelatedProperties = () => {
    if (!currentProperty) return [];
    
    // Lọc ra các property khác với currentProperty
    const otherProperties = rentProperties.filter(property => 
      property._id !== currentProperty._id
    );
    
    // Lấy 4 property đầu tiên
    return otherProperties.slice(0, 4);
  };

  const renderAmenities = (title)=>
  {
    switch(title)
    {
      case 'Balcony': 
        return <Balcony />
      case 'Air conditioning': 
        return <ACUnit />
      case 'Parking':
        return <CarLock />
      case 'Fitness center':
        return <Exercise />
      case 'Kitchen': 
        return <DishWasher />
      case 'Family rooms':
        return <FamilyRestRoom />
      case 'Non-smoking rooms':
        return <VapeFree />
      case 'Wifi in all areas': 
        return <Wifi />
      case 'Beachfront': 
        return <BeachAccess />
    }
  }

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-txt-gray text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen px-4">
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
      <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 px-4">
        {/* GROUP FILTER - MOBILE RESPONSIVE */}
        <div className="pt-10 flex flex-col lg:flex-row w-full mb-6 gap-4">
          {/* CHECK IN */}
          <div className="relative flex-1" ref={checkInRef}>
            <div className="flex items-center justify-between border border-txt-primary p-3 cursor-pointer select-none"  
                 onClick={() => setShowCheckInDate(!showCheckInDate)}>
              <div className="flex items-center">
                <CalendarClock className='mr-2 w-4 h-4'/>
                <span className={'text-[14px]'}>
                {formatDisplayDate(tempFilters.checkIn, 'checkin')}
                </span>
              </div>
              <ArrowDown className="w-3 h-3" />
            </div>
            {showCheckInDate && (
              <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none left-0 right-0 lg:left-auto lg:right-auto">
                <DatePicker
                  selected={tempFilters.checkIn}
                  onChange={handleCheckInSelect}
                  minDate={new Date()}
                  inline
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          {/* CHECK OUT */}
          <div className="relative flex-1" ref={checkOutRef}>
            <div className="flex items-center justify-between border border-txt-primary p-3 cursor-pointer select-none"  
                 onClick={() => setShowCheckOutDate(!showCheckOutDate)}>
              <div className="flex items-center">
                <CalendarClock className='mr-2 w-4 h-4'/>
                <span className={'text-[16px]'}>
                {formatDisplayDate(tempFilters.checkOut, 'checkout')}
                </span>
              </div>
              <ArrowDown className="w-3 h-3" />
            </div>
            {showCheckOutDate && (
              <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none left-0 right-0 lg:left-auto lg:right-auto">
                <DatePicker
                  selected={tempFilters.checkOut}
                  onChange={handleCheckOutSelect}
                  minDate={tempFilters.checkIn ? new Date(tempFilters.checkIn.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                  inline
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          {/* SELECT PERSON */}
          <div className="relative flex-1" ref={selectPersonRef}>
            <div className="flex items-center justify-between border border-txt-primary p-3 cursor-pointer select-none"  
                 onClick={() => setShowSelectPerson(!showSelectPerson)}>
              <div className="flex items-center text-[16px]">
                <GroupSearch className='mr-2 w-4 h-4'/>
                {formatGuestDisplay()}
              </div>
              <ArrowDown className="w-3 h-3" />
            </div>
            {showSelectPerson && (
              <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full left-0 right-0 lg:left-auto lg:right-auto">
                <ul className="w-full">
                  <li className="flex justify-between border-b border-b-txt-primary p-3 hover:bg-stone-200">
                    <div className="flex items-center">
                      <Group className="mr-4 w-4 h-4"/>
                      <span className="text-[14px]">Adults</span>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className="w-6 h-6 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50 text-sm"
                        onClick={() => handleGuestCountChange('adults', 'decrement')}
                        disabled={tempFilters.adults <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 text-[14px] min-w-[20px] text-center">
                        {tempFilters.adults}
                      </span>
                      <button 
                        className="w-6 h-6 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50 text-sm"
                        onClick={() => handleGuestCountChange('adults', 'increment')}
                        disabled={tempFilters.adults >= 10}
                      >
                        +
                      </button>
                    </div>
                  </li>
                  <li className="flex justify-between p-3 hover:bg-stone-200">
                    <div className="flex items-center">
                      <Face className="mr-4 w-4 h-4"/>
                      <span className="text-[14px]">Children</span>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className="w-6 h-6 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50 text-sm"
                        onClick={() => handleGuestCountChange('children', 'decrement')}
                        disabled={tempFilters.children <= 0}
                      >
                        -
                      </button>
                      <span className="mx-3 text-[14px] min-w-[20px] text-center">
                        {tempFilters.children}
                      </span>
                      <button 
                        className="w-6 h-6 flex items-center justify-center border border-txt-primary cursor-pointer disabled:opacity-50 text-sm"
                        onClick={() => handleGuestCountChange('children', 'increment')}
                        disabled={tempFilters.children >= 5}
                      >
                        +
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* THAY ĐỔI: Nút Search */}
          <button 
            className="bg-txt-secondary text-white cursor-pointer py-3 text-[16px] lg:flex-1"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <h1 className='uppercase text-[24px] lg:text-[32px] font-subtitle text-txt-secondary font-semibold mb-6 leading-tight'>
          CÁC DỰ ÁN CHO THUÊ
        </h1>
        
        {/* Active Filters Display */}
        {(selectedLocation || searchFilters.checkIn || selectedSorting.value !== 'per_room_per_night') && (
          <div className="flex items-center mb-4 gap-2 flex-wrap">
            <span className="text-[14px] font-semibold">Active Filters:</span>
            {selectedLocation && (
              <div className="flex items-center bg-txt-secondary text-white px-2 py-1 rounded-full">
                <span className="text-[12px] mr-1">Location: {selectedLocation.name}</span>
                <button 
                  onClick={clearLocationFilter}
                  className="text-white hover:text-gray-200 text-[12px]"
                >
                  ×
                </button>
              </div>
            )}
            {searchFilters.checkIn && searchFilters.checkOut && (
              <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-full">
                <span className="text-[12px] mr-1">
                  {formatDisplayDate(searchFilters.checkIn)} - {formatDisplayDate(searchFilters.checkOut)}
                </span>
                <button 
                  onClick={clearDateFilters}
                  className="text-white hover:text-gray-200 text-[12px]"
                >
                  ×
                </button>
              </div>
            )}
            {selectedSorting && selectedSorting.value !== 'per_room_per_night' && (
              <div className="flex items-center bg-txt-primary text-white px-2 py-1 rounded-full">
                <span className="text-[12px] mr-1">Sort: {selectedSorting.name}</span>
                <button 
                  onClick={clearSortingFilter}
                  className="text-white hover:text-gray-200 text-[12px]"
                >
                  ×
                </button>
              </div>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-txt-secondary hover:text-blue-700 text-[12px] font-semibold"
            >
              Clear All
            </button>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row w-full mb-10 gap-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            {/* LOCATION */}
            <div className="relative w-full lg:w-[200px]" ref={locationRef}>
              <div className="flex items-center justify-between border border-txt-primary p-3 cursor-pointer select-none w-full"  
                   onClick={() => setShowSelectLocation(!showSelectLocation)}>
                <div className="flex items-center text-[16px] mr-2">
                  <AddLocation className='mr-2 w-4 h-4'/>
                  <div className="max-w-[200px] flex-1 truncate">
                    {selectedLocation ? selectedLocation.name : 'Select your location'}
                  </div>
                </div>
                <ArrowDown className="w-4 h-4" />
              </div>
              {showSelectLocation && (
                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full left-0 right-0 lg:left-auto lg:right-auto">
                  <ul className="w-full">
                    {LOCATION_ITEMS.map(locationItem=>(
                      <li className="flex justify-between border-b border-b-txt-primary p-3 cursor-pointer hover:bg-gray-200" 
                          key={locationItem.id}
                          onClick={() => handleLocationSelect(locationItem)}>
                          <div className="flex items-start">
                            <Distance className="mr-3 w-4 h-4"/>
                            <div>
                              <p className="text-[14px] font-semibold">{locationItem.name}</p>
                              <p className="text-[12px]">{locationItem.country}</p>
                            </div>
                          </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* SORTING */}
            <div className="relative w-full lg:w-[210px]" ref={sortingRef}>
              <div className="flex items-center justify-between border border-txt-primary p-3 cursor-pointer select-none w-full"  
                   onClick={() => setShowSortingOptions(!showSortingOptions)}>
                <div className="flex items-center text-[16px]">
                  <FilterList className='mr-2 w-4 h-4'/>
                  <span className="max-w-[300px] truncate">
                    {selectedSorting ? selectedSorting.name : 'Default sorting'}
                  </span>
                </div>
                <ArrowDown className="w-3 h-3" />
              </div>
              {showSortingOptions && (
                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full left-0 right-0 lg:left-auto lg:right-auto">
                  <ul className="w-full">
                    {SORTING_ITEMS.map(sortingItem=>(
                      <li className="flex justify-between border-b border-b-txt-primary p-3 cursor-pointer hover:bg-gray-200" 
                          key={sortingItem.id}
                          onClick={() => handleSortingSelect(sortingItem)}>
                          <div className="flex items-start">
                            {sortingItem.icon}
                            <div className="ml-2">
                              <p className="text-[14px] font-semibold">{sortingItem.name}</p>
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
      </div>
      
      {/* LIST ITEM */}
      {!params.propertyId ? (
        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 px-4">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[16px] text-txt-gray">
              Found {rentProperties.length} propert{rentProperties.length !== 1 ? 'ies' : 'y'}
              {selectedLocation && ` in ${selectedLocation.name}`}
              {searchFilters.checkIn && searchFilters.checkOut && ` for selected dates`}
            </p>
            {/* Hiển thị loại sort đang được áp dụng */}
            <p className="text-sm text-txt-secondary mt-1">
              Sorting by: <strong>{selectedSorting.name}</strong>
            </p>
            {/* Hiển thị thông tin guests đang được áp dụng */}
            {searchFilters.checkIn && searchFilters.checkOut && (
              <p className="text-xs text-txt-secondary mt-1">
                Guests: <strong>{searchFilters.adults} adults, {searchFilters.children} children</strong>
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 mb-20">
            {rentProperties.length > 0 ? (
              rentProperties.map(property => (
                <div className="cursor-pointer bg-bg-primary shadow-sm hover:shadow-md transition-shadow" key={property._id} >
                  <div className="h-[200px] lg:h-[250px]">
                    <OptimizedImage 
                      src={getPropertyImage(property)} 
                      alt={property.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="mt-3 text-[20px] lg:text-[24px] font-subtitle font-semibold text-txt-secondary leading-tight">
                      {property.title}
                    </h1>
                    <p className="mt-2 text-[14px]">{property.location}</p>
                    <div className="flex items-center mt-2 flex-wrap gap-1">
                      <p className="text-[13px] font-semibold">
                        {formatPrice(property.price, property.priceUnit)}
                      </p>
                      <div className="w-[6px] h-[6px] rounded-full bg-dot mx-1"></div>
                      <p className="text-[13px]">{property.bedrooms || property.beds} Bedrooms</p>
                      <div className="w-[6px] h-[6px] rounded-full bg-dot mx-1"></div>
                      <p className="text-[13px]">{property.bathrooms} Bathrooms</p>
                    </div>
                    {searchFilters.checkIn && searchFilters.checkOut && (
                      <div className="mt-2 text-green-600 text-[12px] font-semibold">
                        ✓ Available for selected dates
                      </div>
                    )}
                    <button 
                      className="text-[14px] uppercase border border-txt-primary flex items-center justify-center p-2 mt-3 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer w-full"
                      onClick={() => navigate(`/en/properties-for-rent/${property._id}`)}
                    >
                      view more
                      <ArrowRight className="ml-2 w-4 h-4"/>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-2 xl:col-span-3 text-center py-8">
                <p className="text-txt-gray text-base">
                  {selectedLocation || searchFilters.checkIn 
                    ? 'No properties found matching your criteria. Try adjusting your filters.'
                    : 'No properties available.'
                  }
                </p>
                {(selectedLocation || searchFilters.checkIn) && (
                  <button 
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-20">
          {currentProperty && (
            <div className="bg-bg-primary pb-10">
              <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 px-4">
                {/* Property Detail Content */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:flex-1">
                    <OptimizedImage 
                      src={getPropertyImage(currentProperty)} 
                      alt={currentProperty.title} 
                      className="w-full object-cover h-[300px] lg:h-[400px]" 
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:w-1/3">
                    {currentProperty.gallery && currentProperty.gallery.slice(0, 2).map((image, index) => (
                      <OptimizedImage 
                        key={image._id || index}
                        src={`https://cdn.latelia.com/latelia/${image.thumbnailKey || image.key}`} 
                        alt={currentProperty.title} 
                        className="w-full h-[150px] lg:h-[190px] object-cover"
                      />
                    ))}
                  </div>
                </div>
                
                {/* Gallery Slider */}
                {currentProperty.gallery && currentProperty.gallery.length > 0 && (
                  <div className="mt-4 relative select-none">
                    <Swiper
                      modules={[Autoplay, Pagination, Navigation]}
                      spaceBetween={10}
                      slidesPerView={2}
                      breakpoints={{
                        640: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                      pagination={{ clickable: true }}
                      navigation={{
                        nextEl: '.custom-next-button',
                        prevEl: '.custom-prev-button',
                      }}
                    >
                      {currentProperty.gallery.map((image) => (
                        <SwiperSlide key={image._id}>
                          <OptimizedImage
                            src={`https://cdn.latelia.com/latelia/${image.thumbnailKey || image.key}`}
                            alt={currentProperty.title}
                            className="w-full h-[120px] lg:h-[150px] object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button className="custom-prev-button absolute -left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-1">
                      <ChevronLeft className="w-4 h-4"/>
                    </button>
                    <button className="custom-next-button absolute -right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-1">
                      <ChevronRight className="w-4 h-4"/>
                    </button>
                  </div>
                )}

                {/* Property Details */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h1 className="text-[28px] lg:text-[32px] font-subtitle text-txt-secondary font-semibold leading-tight">
                      {currentProperty.title}
                    </h1>
                    <div className="flex items-center mt-4 flex-col lg:flex-row gap-3">
                      <div className="bg-txt-secondary px-4 py-2 text-bg-primary rounded-4xl text-[14px] w-full lg:w-auto text-center">
                        {currentProperty.type || 'Hotel'}
                      </div>
                      <div className="flex flex-row justify-center">
                        <Star className="w-4 h-4" />
                        <Star className={'ml-2 w-4 h-4'}/>
                        <Star className={'ml-2 w-4 h-4'}/>
                        <Star className={'ml-2 w-4 h-4'}/>
                        <Star className={'ml-2 w-4 h-4'}/>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-6 flex-wrap gap-2">
                      <p className="text-[14px]">{currentProperty.beds || currentProperty.bedrooms} Beds</p>
                      <div className="bg-dot w-[6px] h-[6px] rounded-full"></div>
                      <p className="text-[14px]">{currentProperty.bathrooms} Bathrooms</p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <h1 className="text-[24px] text-txt-secondary">
                        ${currentProperty.price}
                      </h1>
                      <h1 className="text-[18px] text-txt-secondary ml-2">
                        {currentProperty.priceUnit || 'per night'}
                      </h1>
                    </div>
                    <div className="w-full h-[1px] bg-txt-primary my-6"></div>
                    <p className="text-[16px] lg:text-[18px] leading-relaxed">{currentProperty.descriptionShort}</p>
                    
                    {/* THÊM: Phần description với show more */}
                    {currentProperty.description && (
                      <div className="mt-4">
                        {showFullDescription && (
                          <p className={`text-[14px] lg:text-[16px] leading-relaxed ${!showFullDescription ? 'line-clamp-3' : ''}`}>
                            {currentProperty.description}
                          </p>
                        )}
                        <button 
                          className="underline font-semibold text-[14px] mt-3 cursor-pointer hover:text-txt-secondary"
                          onClick={handleShowMoreClick}
                        >
                          {showFullDescription ? 'Show less' : 'Show more'}
                        </button>
                      </div>
                    )}
                    
                    <div className="w-full h-[1px] bg-txt-primary my-6"></div>
                    
                    {/* Highlights */}
                    {currentProperty.highlights && currentProperty.highlights.length > 0 && (
                      <ul>
                        {currentProperty.highlights.map((highlight, index) => {
                          let Icon =  Highlighter;
                          if(index === 0) // outdoor entertainment 
                            Icon = OutdoorGrill
                          else if(index === 1) //Room in a rantal unit 
                            Icon = Bed
                          else if(index  ===2) //Free cancellation for 24 hours
                            Icon = AddGroupOff;
                          return (
                            <li className="flex items-start mb-6" key={highlight._id || index}>
                              <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                              <div className="ml-3 text-[14px]">
                                <h4 className="font-semibold">{highlight.title}</h4>
                                <p className="mt-1">{highlight.description}</p>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                    <div className="w-full h-[1px] bg-txt-primary my-6"></div>
                    <h1 className="text-[24px] font-subtitle font-semibold text-txt-secondary">
                      Amenities
                    </h1>
                    
                    {/* Amenities */}
                    {currentProperty.amenities && currentProperty.amenities.length > 0 && (
                      <ul className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-3">
                        {currentProperty.amenities.map((amenity, index) => (
                          <li className="flex items-center" key={index}>
                            <div className="w-4 h-4 flex items-center justify-center">
                              {renderAmenities(amenity)}
                            </div>
                            <p className="ml-2 text-[14px]">{amenity}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {/* Contact Form */}
                  <div className="mt-8 lg:mt-0">
                    <div className="bg-white border p-4 lg:p-6 rounded-sm text-center">
                      <h1 className="text-[28px] lg:text-[32px] text-txt-secondary font-subtitle font-semibold mb-6 leading-tight">
                        Get in touch
                      </h1>
                      
                      {formSuccess && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                          Thank you! Your booking request has been submitted. We will contact you soon.
                        </div>
                      )}
                      
                      {formError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                          {formError}
                        </div>
                      )}
                      
                      <form onSubmit={handleFormSubmit}>
                        <input 
                          type="text" 
                          name="firstName"
                          placeholder="First Name" 
                          className="w-full rounded-sm mb-3 p-3 border border-gray-300 text-sm"
                          value={contactForm.firstName}
                          onChange={handleFormChange}
                          required
                        />
                        <input 
                          type="text" 
                          name="lastName"
                          placeholder="Last Name" 
                          className="w-full rounded-sm mb-3 p-3 border border-gray-300 text-sm"
                          value={contactForm.lastName}
                          onChange={handleFormChange}
                          required
                        />
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Email Address" 
                          className="w-full rounded-sm mb-3 p-3 border border-gray-300 text-sm"
                          value={contactForm.email}
                          onChange={handleFormChange}
                          required
                        />
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="Mobile phone number" 
                          className="w-full rounded-sm mb-3 p-3 border border-gray-300 text-sm"
                          value={contactForm.phone}
                          onChange={handleFormChange}
                          required
                        />
                        <textarea 
                          name="message"
                          placeholder="Write your message here ..." 
                          className="w-full rounded-sm mb-3 p-3 border border-gray-300 text-sm"
                          rows="4"
                          value={contactForm.message}
                          onChange={handleFormChange}
                        ></textarea>
                        
                        <div className="flex flex-row items-start mt-2 text-txt-primary">
                            <div 
                              className="border mt-1 mr-2 cursor-pointer w-[24px] h-[24px] flex items-center justify-center flex-shrink-0" 
                              onClick={() => setConsent(!consent)}
                            >
                              {consent && (
                                <Check className="w-[12px] h-[12px]" />
                              )}
                            </div>
                            <p className="text-[12px] text-left">
                              {t('footer:policy')}
                            </p>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={formLoading}
                          className="cursor-pointer text-[16px] uppercase w-full py-3 bg-txt-secondary text-bg-primary mt-6 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formLoading ? 'Submitting...' : 'Submit Booking Request'}
                        </button>
                      </form>
                    </div>
                    
                    {/* Map */}
                    <div className="mt-10">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.7484136613452!2d105.74611147590936!3d20.96261619004587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2sPhenikaa%20University!5e0!3m2!1sen!2s!4v1761578035476!5m2!1sen!2s" 
                        width="100%" 
                        height="300"
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                        className="rounded-sm"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Properties */}
          <div>
            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 px-4">
              <h1 className="text-[24px] font-subtitle font-semibold text-txt-secondary">
                You might also like this
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 mb-20">
                {getRelatedProperties().length > 0 ? (
                  getRelatedProperties().map(property => (
                    <div className="cursor-pointer bg-bg-primary shadow-sm hover:shadow-md transition-shadow" key={property._id} >
                      <div className="h-[200px]">
                        <OptimizedImage 
                          src={getPropertyImage(property)} 
                          alt={property.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-4">
                        <h1 className="mt-3 text-[20px] font-subtitle font-semibold text-txt-secondary leading-tight">
                          {property.title}
                        </h1>
                        <p className="mt-2 text-[13px]">{property.location}</p>
                        <div className="flex items-center mt-2 flex-wrap gap-1">
                          <p className="text-[13px] font-semibold">
                            {formatPrice(property.price, property.priceUnit)}
                          </p>
                          <div className="w-[6px] h-[6px] rounded-full bg-dot mx-1"></div>
                          <p className="text-[13px]">{property.bedrooms || property.beds} Bedrooms</p>
                          <div className="w-[6px] h-[6px] rounded-full bg-dot mx-1"></div>
                          <p className="text-[13px]">{property.bathrooms} Bathrooms</p>
                        </div>
                        <button 
                          className="text-[14px] uppercase border border-txt-primary flex items-center justify-center p-2 mt-3 hover:bg-txt-secondary hover:text-bg-primary cursor-pointer w-full"
                          onClick={() => navigate(`/en/properties-for-rent/${property._id}`)}
                        >
                          view more
                          <ArrowRight className="ml-2 w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 lg:col-span-2 xl:col-span-4 text-center py-8">
                    <p className="text-txt-gray text-base">
                      No related properties found.
                    </p>
                  </div>
                )}
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