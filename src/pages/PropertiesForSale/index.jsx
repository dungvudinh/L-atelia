import { useState } from "react";
import { useTranslation } from "react-i18next";
import {Sort,Adjust} from '../../assets/icons';
import { ListFilter, MapPinPlusIcon } from "lucide-react";
import { AddLocation,ArrowDown,PageInfo, FilterList,Payments, PaymentArrowDown, Apartment, ChairUmbrella,Villa,SourceEnvironment,Distance} from "../../assets/icons";
import sale1 from '../../assets/images/sale_1.png'
import sale2 from '../../assets/images/sale_2.png'
import sale3 from '../../assets/images/sale_3.png'
import sale5 from '../../assets/images/sale_5.png'
import sale6 from '../../assets/images/sale_6.png'
import Footer from "../../layouts/components/Footer";
import { LocalizedLink } from "../../components/LocalizedLink";
import CustomSelect from "../../components/CustomSelect";
 const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
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
const LOCATION_ITEMS = [
    {id:1, name:'Ho Chi Minh City', country:'Viet Nam'},
    {id:2, name:'Nha Trang', country:'Viet Nam'},
    {id:3, name:'Ha Noi', country:'Viet Nam'},
    {id:4, name:'Vung Tau', country:'Viet Nam'},
    {id:5, name:'Sapa', country:'Viet Nam'},
]
function PropertiesForSale() {
    const [selectedValue, setSelectedValue] = useState('');
    const [showSelectLocation, setShowSelectLocation] = useState(false);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [showPropertiesOptions, setShowPropertiesOptions] = useState(false);
    const {t} = useTranslation('propertiesForSale');
    return ( 
        <div className="mt-20">
            <div className="flex justify-center">
                <div className="xl:max-w-screen-xl w-full mt-10">
                    <h1 className="uppercase text-[60px] font-subtitle text-txt-secondary mb-15 font-semibold">{t('propertiesForSale:title')}</h1>
                    {/* FILTER */}
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
            </div>
             {/* IMAGES */}
             <div >
                <div className="relative h-[600px]">
                    <img src={sale1} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                    <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                        <LocalizedLink to={'/properties-for-sale/1'}>
                            FOR SALE
                        </LocalizedLink>
                    </button>
                </div>
                {/* IMAGE 2 */}
                <div className="relative h-[600px] mt-4">
                    <img src={sale2} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                    <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                        <LocalizedLink to={'/properties-for-sale/2'}>
                            FOR SALE
                        </LocalizedLink>
                    </button>
                </div>
                <div className="relative h-[600px] mt-4">
                    <img src={sale3} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                    <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                        <LocalizedLink to={'/properties-for-sale/1'}>
                            FOR SALE
                        </LocalizedLink>
                    </button>
                </div>
                <div className="relative h-[600px] mt-4">
                    <img src={sale5} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                    <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                        FOR SALE
                    </button>
                </div>
                <div className="relative h-[600px] mt-4">
                    <img src={sale6} alt="" className="w-full h-full" style={{objectFit:'cover'}}/>
                    <button className="absolute top-10 right-10 bg-txt-secondary text-white p-3">
                        FOR SALE
                    </button>
                </div>
            </div>
            <Footer withContact={false} />
        </div>
     );
}

export default PropertiesForSale;