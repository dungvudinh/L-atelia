import media1 from '../../assets/images/media1.png'
import Footer from '../../layouts/components/Footer';
function Media() {
    return ( 
        <div>
            <div className="mt-20 flex justify-center mb-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mt-20 text-center">
                    <h1 className="text-[60px] font-subtitle font-semibold text-txt-secondary">Media</h1>
                    {/* FILTER */}
                <div className="flex justify-center text-[18px] text-txt-gray">
                        <p className="">Filter by:</p>
                        <ul className="flex ml-2 ">
                            <li className="px-8 text-black cursor-pointer">All</li>
                            <li className="px-8 cursor-pointer">Lifestyle</li>
                            <li className="px-8 cursor-pointer">Properties</li>
                            <li className="px-8 cursor-pointer">Product</li>
                        </ul>
                </div>
                {/* CONTENT */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                        <div className='cursor-pointer'>
                            <div className='h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
                                <img src={media1} alt="" className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'/>
                            </div>
                            <div className='mt-4 p-2'>
                                <h4 className='text-[18px] text-txt-gray mb-4'>PRODUCT</h4>
                                <h4 className='text-[25px] font-subtitle text-txt-secondary font-semibold mb-4'>
                                    Exploring Mon Cor: Berrow Projects Presents a Remarkable Architectural Marvel in Soller, Mallorca
                                </h4>
                                <p className='text-[18px] mb-4'>
                                    Dubbed Mon Cor, the newly renovated home dates to 1903
                                </p>
                                <button className='border border-txt-gray p-2 cursor-pointer text-[18px]'>READ MORE</button>
                            </div>
                        </div>

                        <div className='cursor-pointer'>
                            <div className='h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
                                <img src={media1} alt="" className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'/>
                            </div>
                            <div className='mt-4 p-2'>
                                <h4 className='text-[18px] text-txt-gray mb-4'>PRODUCT</h4>
                                <h4 className='text-[25px] font-subtitle text-txt-secondary font-semibold mb-4'>
                                    Exploring Mon Cor: Berrow Projects Presents a Remarkable Architectural Marvel in Soller, Mallorca
                                </h4>
                                <p className='text-[18px] mb-4'>
                                    Dubbed Mon Cor, the newly renovated home dates to 1903
                                </p>
                                <button className='border border-txt-gray p-2 cursor-pointer text-[18px]'>READ MORE</button>
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <div className='h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
                                <img src={media1} alt="" className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'/>
                            </div>
                            <div className='mt-4 p-2'>
                                <h4 className='text-[18px] text-txt-gray mb-4'>PRODUCT</h4>
                                <h4 className='text-[25px] font-subtitle text-txt-secondary font-semibold mb-4'>
                                    Exploring Mon Cor: Berrow Projects Presents a Remarkable Architectural Marvel in Soller, Mallorca
                                </h4>
                                <p className='text-[18px] mb-4'>
                                    Dubbed Mon Cor, the newly renovated home dates to 1903
                                </p>
                                <button className='border border-txt-gray p-2 cursor-pointer text-[18px]'>READ MORE</button>
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <div className='h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
                                <img src={media1} alt="" className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'/>
                            </div>
                            <div className='mt-4 p-2'>
                                <h4 className='text-[18px] text-txt-gray mb-4'>PRODUCT</h4>
                                <h4 className='text-[25px] font-subtitle text-txt-secondary font-semibold mb-4'>
                                    Exploring Mon Cor: Berrow Projects Presents a Remarkable Architectural Marvel in Soller, Mallorca
                                </h4>
                                <p className='text-[18px] mb-4'>
                                    Dubbed Mon Cor, the newly renovated home dates to 1903
                                </p>
                                <button className='border border-txt-gray p-2 cursor-pointer text-[18px]'>READ MORE</button>
                            </div>
                        </div>

                </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
     );
}

export default Media;