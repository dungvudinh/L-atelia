import { useEffect,useState } from "react";
import Footer from "../../layouts/components/Footer";
import CustomSelect from "../../components/CustomSelect";
import { initFlowbite } from "flowbite";
import { Datepicker } from 'flowbite-react';
import { CalendarClock, ArrowDown } from "../../assets/icons";
const theme = {
    popup: {
      footer: {
        base: "hidden"
      }
    }
  };
function PropertiesForRent() {
    const [selectCheckInDate, setSelectCheckInDate] = useState(null);
    const [selectCheckOutDate, setSelectCheckOutDate] = useState(null);
  const [showCheckInDate, setShowCheckInDate] = useState(false);
  const [showCheckOutDate, setShowCheckOutDate] = useState(false);
    
    return ( 
        <div className="mt-20">
            <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mx-auto mt-10 px-4">
                {/* GROUP FILTER */}
                <div className="pt-20 flex ">
                    {/* CHECK IN */}
                    <div className="relative mr-5">
                        <div className="flex items-center w-[325px] justify-between border border-txt-primary p-2 cursor-pointer"  onClick={() => setShowCheckInDate(!showCheckInDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                Check in
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckInDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg rounded left-3">
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
                    <div className="relative">
                        <div className="flex items-center w-[325px] justify-between border border-txt-primary p-2 cursor-pointer"  onClick={() => setShowCheckOutDate(!showCheckOutDate)}>
                            <div className="flex items-center">
                                <CalendarClock className='mr-2'/>
                                Check in
                            </div>
                            <ArrowDown />
                        </div>
                        {showCheckOutDate && (
                            <div className="absolute top-full mt-1 z-50 bg-white shadow-lg rounded left-3">
                            <Datepicker
                                inline
                                onSelectedDateChanged={(date) => {
                                setSelectedDate(date);
                                setShowDatepicker(false);
                                }}
                                theme={theme}
                                className="w-full!"
                            />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
     );
}

export default PropertiesForRent;