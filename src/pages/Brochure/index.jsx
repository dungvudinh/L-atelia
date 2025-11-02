import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import brochureAndFloorPlans from '../../assets/images/brochure-and-floorplans.png'
import currentStatePhotos from '../../assets/images/current-state-photos.png'
import rendersShowingPotential from '../../assets/images/renders-showing-potential.png'
import item1 from '../../assets/images/brochure-and-floorplans/item1.png'
import Footer from "../../layouts/components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import brochure from '../../assets/images/brochure/brochure.png';
import brochure2 from '../../assets/images/brochure/brochure-2.png';
import brochure3 from '../../assets/images/brochure/brochure-3.png';
import brochure4 from '../../assets/images/brochure/brochure-4.png';
import brochure5 from '../../assets/images/brochure/brochure-5.png';
import brochure6 from '../../assets/images/brochure/brochure-6.png';
const FILTERS = [
    {
        id: 0, 
        title: 'Brochure', 
        type: 'PDF', 
        banner: brochureAndFloorPlans, 
        data: [
            {id: 1, src: item1}, 
            {id: 2, src: item1}, 
            {id: 3, src: item1}, 
            {id: 4, src: item1}
        ]
    },
    {
        id: 1, 
        title: 'Tiến độ thi công', 
        type: 'JPG', 
        banner: currentStatePhotos,
        data: [
            {
                uploadDate: 'August 25 2025',
                images: [
                    {id: 1, src: brochure}, 
                    {id: 2, src: brochure2}, 
                    {id: 3, src: brochure3}, 
                    {id: 4, src: brochure4},
                    {id: 5, src: brochure5},
                    {id: 6, src: brochure6}
                ]
            },
            {
                uploadDate: 'August 20 2025', 
                images: [
                    {id: 7, src: brochure}, 
                    {id: 8, src: brochure2}, 
                    {id: 9, src: brochure3}, 
                    {id: 10, src: brochure4},
                    {id: 11, src: brochure6}
                ]
            },
            {
                uploadDate: 'August 15 2025',
                images: [
                    {id: 12, src: brochure}, 
                    {id: 13, src: brochure3}, 
                    {id: 14, src: brochure6}
                ]
            }
        ]
    },
    {
        id: 2, 
        title: 'Hình ảnh thiết kế', 
        type: 'JPG', 
        banner: rendersShowingPotential,
        data: [
            {
                uploadDate: 'July 30 2025',
                images: [
                    {id: 15, src: brochure2}, 
                    {id: 16, src: brochure3}, 
                    {id: 17, src: brochure6}, 
                    {id: 18, src: brochure5},
                    {id: 19, src: brochure3},
                    {id: 20, src: brochure4},
                    {id: 21, src: brochure6},
                    {id: 22, src: brochure2}
                ]
            },
            {
                uploadDate: 'July 25 2025',
                images: [
                    {id: 23, src: brochure2}, 
                    {id: 24, src: brochure4}, 
                    {id: 25, src: brochure6}, 
                    {id: 26, src: brochure3}
                ]
            },
            {
                uploadDate: 'July 20 2025',
                images: [
                    {id: 27, src: brochure2}, 
                    {id: 28, src: brochure4}, 
                    {id: 29, src: brochure5}, 
                    {id: 30, src: brochure2},
                    {id: 31, src: brochure6}
                ]
            }
        ]
    }
]

function Brochure() {
    const [filterId, setFilterId] = useState(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const filter = searchParams.get('filter');
    
    useEffect(() => {
        setFilterId(filter || 0);
    }, [filter]);

    const handleSetFilterId = (filterItem) => {
        setFilterId(filterItem.id);
        navigate(`?filter=${filterItem.id}`);
    }

    // Kiểm tra nếu là Brochure (1 cột) hay các mục khác (3 cột)
    const isBrochure = filterId == 0;
    const gridClass = isBrochure 
        ? "grid grid-cols-1 gap-4"  // 1 cột cho Brochure
        : "grid grid-cols-3 gap-4"; // 3 cột cho Tiến độ thi công & Hình ảnh thiết kế

    return ( 
        <div className="">
            <div className="mt-20 flex justify-center mb-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10">
                    <h1 className="text-[60px] font-subtitle text-txt-secondary mb-10">Patiki Townhouse</h1>
                    <p className="text-[26px] text-txt-gray">
                        An architectural gem immaculately restored and modernized from its 1896 creation with no compromise on luxury. The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.
                    </p>
                    
                    <ul className="mt-20 text-[25px] flex font-subtitle font-semibold">
                        {FILTERS.map(filterItem => (
                            <li 
                                className={`w-[370px] rounded-4xl text-center text-txt-gray border border-txt-secondary px-10 py-2 cursor-pointer select-none ${filterId == filterItem.id ? 'bg-txt-secondary text-white' : ''}`} 
                                key={filterItem.id} 
                                onClick={() => handleSetFilterId(filterItem)}
                            >
                                {filterItem.title}
                            </li>
                        ))}
                    </ul>

                    {/* MAIN CONTENT */}
                    <div className="mt-10">
                        {/* Hiển thị cho Brochure (layout đơn giản) */}
                        {isBrochure && (
                            <div className={gridClass}>
                                {FILTERS[filterId].data && 
                                    FILTERS[filterId].data.map(dataItem => (
                                        <div key={dataItem.id} className="w-full">
                                            <OptimizedImage 
                                                src={dataItem.src} 
                                                alt="" 
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                        
                        {/* Hiển thị cho Tiến độ thi công & Hình ảnh thiết kế (có nhiều ngày) */}
                        {!isBrochure && FILTERS[filterId].data.map((dateGroup, groupIndex) => (
                            <div key={groupIndex} className="mb-12">
                                {/* Hiển thị ngày đăng */}
                                <div className="flex items-center mb-6 pl-2">
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                    <p className="w-150 text-center font-semibold text-lg">{dateGroup.uploadDate}</p>
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                </div>
                                
                                {/* Grid hình ảnh 3 cột */}
                                <div className={gridClass}>
                                    {dateGroup.images.map(imageItem => (
                                        <div key={imageItem.id} className="w-full h-[325px] ">
                                            <OptimizedImage 
                                                src={imageItem.src} 
                                                alt="" 
                                                className="w-full h-auto object-cover h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    );
}

export default Brochure;