import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {Sort,Adjust} from '../../assets/icons';
import { ListFilter, MapPinPlusIcon } from "lucide-react";
import { AddLocation,ArrowDown,PageInfo, FilterList,Payments, PaymentArrowDown, Apartment, ChairUmbrella,Villa,SourceEnvironment,Distance} from "../../assets/icons";
import sale1 from '../../assets/images/sale/sale_1.webp'
import sale2 from '../../assets/images/sale/sale_2.webp'
import sale3 from '../../assets/images/sale/sale_3.webp'
import sale5 from '../../assets/images/sale/sale_5.webp'
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import OptimizedImage from "../../components/OptimizedImage";


const SORTING_ITEMS = [
    {id:1, name:'Per room per night', desc:'Include taxes & fee', icon:<Payments className={'mr-2 mt-1'}/>},
    {id:2, name:'Per room per night', desc:'Exclude taxes & fees', icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
    {id:3, name:'Total price', desc:'Include taxes & fees',icon:<Payments className={'mr-2 mt-1'}/>},
    {id:4, name:'Total price', desc:'Exclude taxes & fees',icon:<PaymentArrowDown className={'mr-2 mt-1'}/>},
];

const PROPERTIES_ITEMS = [
    {id:1, name:'Hotel', icon:<Apartment className={'mr-2'}/>}, 
    {id:2, name:'Resort', icon:<ChairUmbrella className={'mr-2'} />}, 
    {id:3, name:'Villa', icon:<Villa className={'mr-2'}/>},
    {id:4, name:'Apartment', icon:<SourceEnvironment className={'mr-2'}/>},
];

const LOCATION_ITEMS = [
    {id:1, name:'Ho Chi Minh City', country:'Viet Nam'},
    {id:2, name:'Nha Trang', country:'Viet Nam'},
    {id:3, name:'Ha Noi', country:'Viet Nam'},
    {id:4, name:'Vung Tau', country:'Viet Nam'},
    {id:5, name:'Sapa', country:'Viet Nam'},
];
const LIST_PROPERTIES = [
    {id:1, imgSrc: sale1, to:'/properties-for-sale/1'},
    {id:2, imgSrc: sale2, to:'/properties-for-sale/2'},
    {id:3, imgSrc: sale3, to:'/properties-for-sale/3'},
    {id:4, imgSrc: sale5, to:'/properties-for-sale/4'},
]
function PropertiesForSale() {
    const [showSelectLocation, setShowSelectLocation] = useState(false);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [showPropertiesOptions, setShowPropertiesOptions] = useState(false);
    const {t} = useTranslation('propertiesForSale');
    
    // Refs cho các dropdown
    const locationRef = useRef(null);
    const sortingRef = useRef(null);
    const propertiesRef = useRef(null);

    // Hook xử lý click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
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
        console.log('Selected property:', propertiesItem);
        setShowPropertiesOptions(false);
        // Thêm logic xử lý khi chọn property ở đây
    };

    // Hàm xử lý khi click vào sorting item
    const handleSortingSelect = (sortingItem) => {
        console.log('Selected sorting:', sortingItem);
        setShowSortingOptions(false);
        // Thêm logic xử lý khi chọn sorting ở đây
    };

    return ( 
        <div className="mt-20">
            <div className="flex justify-center">
                <div className="xl:max-w-screen-xl w-full mt-10">
                    <h1 className="uppercase text-[60px] font-subtitle text-txt-secondary mb-15 font-semibold">{t('propertiesForSale:title')}</h1>
                    
                    {/* FILTER */}
                    <div className="flex items-center justify-between w-full mb-20">
                        <div className="flex">
                            <button className="flex items-center bg-txt-secondary px-20 py-2 text-bg-primary text-[18px] font-light mr-5">
                                <Sort className='mr-4'/>
                                More Filter
                            </button>
                            
                            {/* LOCATION */}
                            <div className="relative mr-5 flex-1" ref={locationRef}>
                                <div 
                                    className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                                    onClick={() => setShowSelectLocation(!showSelectLocation)}
                                >
                                    <div className="flex items-center mr-8 text-[18px]">
                                        <AddLocation className='mr-2'/>
                                        Select your location
                                    </div>
                                    <ArrowDown />
                                </div>
                                {showSelectLocation && (
                                    <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full">
                                        <ul className="w-full">
                                            {LOCATION_ITEMS.map(locationItem => (
                                                <li 
                                                    className={`flex justify-between p-2 ${locationItem.id !== LOCATION_ITEMS.length ? 'border-b border-b-txt-primary' :''} py-2 cursor-pointer hover:bg-gray-200`} 
                                                    key={locationItem.id}
                                                    onClick={() => handleLocationSelect(locationItem)}
                                                >
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
                            
                            {/* PROPERTIES */}
                            <div className="relative mr-5" ref={propertiesRef}>
                                <div 
                                    className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                                    onClick={() => setShowPropertiesOptions(!showPropertiesOptions)}
                                >
                                    <div className="flex items-center mr-8 text-[18px]">
                                        <PageInfo className='mr-2'/>
                                        Select your property
                                    </div>
                                    <ArrowDown />
                                </div>
                                {showPropertiesOptions && (
                                    <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full">
                                        <ul className="w-full">
                                            {PROPERTIES_ITEMS.map(propertiesItem => (
                                                <li 
                                                    className={`flex justify-between p-2 ${propertiesItem.id !== PROPERTIES_ITEMS.length ? 'border-b border-b-txt-primary' :''} py-2 cursor-pointer hover:bg-gray-200`} 
                                                    key={propertiesItem.id}
                                                    onClick={() => handlePropertiesSelect(propertiesItem)}
                                                >
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
                            </div>
                        </div>
                        
                        {/* SORTING */}
                        <div className="relative ml-5" ref={sortingRef}>
                            <div 
                                className="flex items-center justify-between border border-txt-primary p-2 cursor-pointer select-none"  
                                onClick={() => setShowSortingOptions(!showSortingOptions)}
                            >
                                <div className="flex items-center mr-12 text-[18px]">
                                    <FilterList className='mr-2'/>
                                    Default sorting
                                </div>
                                <ArrowDown />
                            </div>
                            {showSortingOptions && (
                                <div className="absolute top-full mt-1 z-50 bg-white shadow-lg select-none w-full">
                                    <ul className="w-full">
                                        {SORTING_ITEMS.map(sortingItem => (
                                            <li 
                                                className={`flex justify-between p-2 flex justify-between ${sortingItem.id !== SORTING_ITEMS.length ? 'border-b border-b-txt-primary' :''} py-2 cursor-pointer hover:bg-gray-200 py-2 cursor-pointer`} 
                                                key={sortingItem.id}
                                                onClick={() => handleSortingSelect(sortingItem)}
                                            >
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
            </div>
            
            {/* IMAGES */}
            <div>
                {
                    LIST_PROPERTIES.map(property => (
                        <div className="relative h-[600px]">
                            <LocalizedLink to={property.to}>
                            <OptimizedImage src={property.imgSrc} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                            <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                                    FOR SALE
                            </button>
                            </LocalizedLink>
                        </div>
                    ))
                }
                
            </div>
            
            <Footer withContact={false} />
        </div>
    );
}

export default PropertiesForSale;