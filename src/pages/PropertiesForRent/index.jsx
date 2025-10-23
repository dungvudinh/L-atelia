import { useState } from "react";
import brochureAndFloorPlans from '../../assets/images/brochure-and-floorplans.png'
import currentStatePhotos from '../../assets/images/current-state-photos.png'
import rendersShowingPotential from '../../assets/images/renders-showing-potential.png'
import item1 from '../../assets/images/brochure-and-floorplans/item1.png'
import Footer from "../../layouts/components/Footer";
const FILTERS = [
    {id:0, title:'Brochure and FloorPlans', type:'PDF', banner:brochureAndFloorPlans, data:[{id:1, src:item1}, {id:2, src:item1}, {id:3, src:item1},, {id:4, src:item1}]},
    {id:1, title:'Current State Photos', type:'JPG', banner:currentStatePhotos,  uploadDate: 'August 25 2025', data:[{id:1, src:item1}, {id:2, src:item1}, {id:3, src:item1},, {id:4, src:item1}]},
    {id:2, title:'Renders Showing Potential', type:'JPG', banner:rendersShowingPotential,uploadDate: 'August 25 2025' , data:[{id:1, src:item1}, {id:2, src:item1}, {id:3, src:item1},, {id:4, src:item1}]}
]
function PropertiesForRent() {
    const [filterId,setFilterId] = useState(0);
    const handleSetFilterId =(id)=>
    {
        console.log('ID', id)
        setFilterId(id);
    }
    console.log(FILTERS[filterId])
    return ( 
        <div className="">
            <div className="mt-20 flex justify-center mb-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10">
                    <h1 className="text-[60px] font-subtitle text-txt-secondary mb-10">Patiki Townhouse</h1>
                    <p className="text-[26px] text-txt-gray">
                        An architectural gem immaculately restored and modernized from its 1896 creation with no compromise on luxury. The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.
                    </p>
                    <ul className="mt-20 text-[25px] flex font-subtitle font-semibold">
                        {
                            FILTERS.map(filterItem=>(
                                <li className={`rounded-4xl text-txt-gray border border-txt-secondary px-10 py-2 cursor-pointer mr-4 select-none ${filterId === filterItem.id ? 'bg-txt-secondary text-white' :''} `} 
                                key={filterItem.id} onClick={()=>handleSetFilterId(filterItem.id)}>
                                    {filterItem.title}
                                </li>
                            ))
                        }
                    </ul>
                    {/* MAIN */}
                    <div className="mt-10 flex gap-10">
                            {/* SUMMARY */}
                            <div className="flex-basis basis-1/3">
                                <ul>
                                    {
                                        FILTERS.map(filterItem=>(
                                            <li key={filterItem.id} className="flex gap-5 mb-4 cursor-pointer" onClick={()=>handleSetFilterId(filterItem.id)}>
                                                <div className="w-[150px]">
                                                    <img src={filterItem.banner} alt="" className="w-full"/>
                                                </div>
                                                <div>
                                                    <p className="text-[18px] truncate font-semibold">{filterItem.title}</p>
                                                    <span className="text-[18px] text-txt-primary opacity-50">{filterItem.type}</span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* MAIN */}
                            <div className="flex-basis basis-3/4">
                            {
                                FILTERS[filterId].uploadDate && 
                                <div className="flex items-center mb-10 pl-2">
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                    <p className="w-150 text-center font-semibold">{FILTERS[filterId].uploadDate}</p>
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                </div>
                            }
                            <div className="overflow-y-auto scrollbar pl-8 h-500">
                                { FILTERS[filterId].data && 
                                    FILTERS[filterId].data.map(dataItem=>(
                                        <div key={dataItem.id} className="mb-4">
                                            <img src={dataItem.src} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
     );
}

export default PropertiesForRent;