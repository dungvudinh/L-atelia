import { useState } from "react";
import { useTranslation } from "react-i18next";
import {Sort,Adjust} from '../../assets/icons';
import { ListFilter, MapPinPlusIcon } from "lucide-react";
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
function PropertiesForSale() {
    const [selectedValue, setSelectedValue] = useState('');
    const {t} = useTranslation('propertiesForSale');
    return ( 
        <div className="mt-20">
            <div className="flex justify-center">
                <div className="xl:max-w-screen-xl w-full mt-10">
                    <h1 className="uppercase text-[60px] font-subtitle text-txt-secondary">{t('propertiesForSale:title')}</h1>
                    {/* FILTER */}
                    <div className="flex mt-10">
                        <button className="px-20 bg-txt-secondary py-2 text-[18px] text-white flex items-center">
                            <Sort className={'mr-4'}/>
                            More Filter
                        </button>
                        <div className="border flex items-center border-txt-primary ml-8 p-2">
                            <MapPinPlusIcon width={20}/>
                            {/* <select name="" id="" className="outline-none text-[18px] ml-2">
                                <option value="">Select your location</option>
                            </select> */}
                             <CustomSelect
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Choose an option"
      />
                        </div>
                        <div className="border flex items-center border-txt-primary ml-8 p-2">
                            <Adjust />
                            <select name="" id="" className="outline-none text-[18px] ml-2">
                                <option value="">Select your property</option>
                            </select>
                        </div>
                        <div className="border flex items-center border-txt-primary ml-40 p-2">
                            <ListFilter width={20}/>
                            <select name="" id="" className="outline-none text-[18px] ml-2">
                                <option value="">Default sorting</option>
                            </select>
                        </div>
                    </div>
                   
                </div>
            </div>
             {/* IMAGES */}
             <div className="mt-20">
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