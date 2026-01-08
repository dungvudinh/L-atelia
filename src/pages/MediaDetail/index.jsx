// components/MediaDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../../layouts/components/Footer';
import OptimizedImage from '../../components/OptimizedImage';
import { LocalizedLink } from '../../components/LocalizedLink';
import mediaService from '../../services/mediaService';
import media1 from '../../assets/images/media1.webp';

function MediaDetail() {
    const { mediaId } = useParams();
    const navigate = useNavigate();
    const [media, setMedia] = useState(null);
    const [previousMedia, setPreviousMedia] = useState(null);
    const [nextMedia, setNextMedia] = useState(null);
    const [relatedStories, setRelatedStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch media detail và các bài viết liên quan
    useEffect(() => {
        const fetchMediaData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // 1. Fetch media detail
                const mediaResponse = await mediaService.getMediaById(mediaId);
                
                if (mediaResponse.success) {
                    const currentMedia = mediaResponse.data;
                    setMedia(currentMedia);

                    // 2. Fetch all published media để tìm previous/next
                    const allMediaResponse = await mediaService.getAllMedia({
                        status: 'published',
                        limit: 100,
                        sort: 'createdAt:desc'
                    });

                    if (allMediaResponse.success) {
                        const mediaList = allMediaResponse.data;
                        const currentIndex = mediaList.findIndex(item => item._id === mediaId);
                        
                        // Tìm previous media (bài cũ hơn)
                        if (currentIndex > 0) {
                            setPreviousMedia(mediaList[currentIndex - 1]);
                        } else {
                            setPreviousMedia(null);
                        }
                        
                        // Tìm next media (bài mới hơn)
                        if (currentIndex < mediaList.length - 1 && currentIndex !== -1) {
                            setNextMedia(mediaList[currentIndex + 1]);
                        } else {
                            setNextMedia(null);
                        }

                        // 3. Fetch related stories (cùng category, loại trừ bài hiện tại)
                        const relatedResponse = await mediaService.getAllMedia({
                            status: 'published',
                            category: currentMedia.category,
                            limit: 4
                        });

                        if (relatedResponse.success) {
                            // Loại bỏ bài viết hiện tại và giới hạn 3 bài
                            const filteredRelated = relatedResponse.data
                                .filter(item => item._id !== mediaId)
                                .slice(0, 3);
                            setRelatedStories(filteredRelated);
                        }
                    }
                } else {
                    throw new Error(mediaResponse.message || 'Failed to fetch media details');
                }
            } catch (err) {
                console.error('Error fetching media data:', err);
                setError(err.message || 'Failed to load media details.');
            } finally {
                setLoading(false);
            }
        };

        if (mediaId) {
            fetchMediaData();
        }
    }, [mediaId]);

    // Get media image - fallback to default image
    const getMediaImage = (mediaItem) => {
        if (mediaItem?.featuredImage) return mediaItem.featuredImage.url;
        return media1;
    };

    // Get media type/category with proper formatting
    const getMediaType = (mediaItem) => {
        if (mediaItem?.category) {
            return mediaItem.category.toUpperCase();
        }
        return 'LIFESTYLE';
    };

    // Navigate to media detail
    const handleNavigateToMedia = (mediaId) => {
        navigate(`/vi/media/${mediaId}`);
    };

    // Handle previous/next navigation
    const handlePreviousClick = () => {
        if (previousMedia) {
            handleNavigateToMedia(previousMedia._id);
        }
    };

    const handleNextClick = () => {
        if (nextMedia) {
            handleNavigateToMedia(nextMedia._id);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-txt-gray text-lg">Loading media details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg max-w-md">
                        <h2 className="text-xl font-semibold mb-2">Error Loading Content</h2>
                        <p className="mb-4">{error}</p>
                        <button 
                            onClick={() => navigate('/media')}
                            className="px-6 py-2 bg-txt-secondary text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Media
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Media not found state
    if (!media) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg max-w-md">
                        <h2 className="text-xl font-semibold mb-2">Media Not Found</h2>
                        <p className="mb-4">The requested media content could not be found.</p>
                        <button 
                            onClick={() => navigate('/media')}
                            className="px-6 py-2 bg-txt-secondary text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Media
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <div className="mt-20">
            {/* Featured Image */}
            <div className='w-full h-64 md:h-96 lg:h-210'>
                <OptimizedImage 
                    src={getMediaImage(media)} 
                    alt={media.title} 
                    className='w-full h-full object-cover' 
                />
            </div>

            <div className='flex flex-col items-center mt-8 md:mt-16 lg:mt-30 px-4'>
                {/* Content Field */}
                <div className='w-full flex justify-center'>
                    <div 
                        className="media-content w-full max-w-4xl text-[16px] lg:text-[18px] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: media.content }}
                    />
                </div>

                {/* Divider */}
                <div className='xl:max-w-screen-xl lg:max-w-[900px] h-[1px] bg-txt-gray opacity-50 w-full my-8 md:my-16 lg:my-30'></div>

                {/* Navigation - Previous/Next */}
                <div className='xl:max-w-screen-lg w-full flex gap-6 md:gap-8 lg:gap-12 flex-col md:flex-row'>
                    {/* Previous Media */}
                    <div className={`${previousMedia ? 'flex-1' : 'flex-1 opacity-40'} transition-all duration-300`}>
                        <div 
                            className={`text-center group ${previousMedia ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={handlePreviousClick}
                        >
                            <p className='mb-3 md:mb-4 lg:mb-5 font-subtitle uppercase text-base md:text-lg lg:text-xl font-semibold text-txt-gray'>
                                PREVIOUS
                            </p>
                            
                            {previousMedia ? (
                                <>
                                    <div className='overflow-hidden shadow-lg'>
                                        <OptimizedImage 
                                            src={getMediaImage(previousMedia)} 
                                            alt={previousMedia.title}
                                            className='w-full h-40 md:h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                                        />
                                    </div>
                                    <p className='my-3 md:my-4 text-sm md:text-base text-txt-gray'>
                                        {getMediaType(previousMedia)}
                                    </p>
                                    <p className='text-base md:text-lg lg:text-xl font-subtitle text-txt-secondary font-semibold line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center px-2'>
                                        {previousMedia.title}
                                    </p>
                                    <button className='mt-3 md:mt-4 rounded-full p-2 duration-200 ease-in hover:bg-stone-200 cursor-pointer'>
                                        <ArrowLeft size={20} className='text-txt-gray md:w-6 md:h-6'/>
                                    </button>
                                </>
                            ) : (
                                <div className='py-8 md:py-12 bg-gray-50 rounded-lg'>
                                    <p className='text-txt-gray text-sm md:text-base'>No previous article</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Next Media */}
                    <div className={`${nextMedia ? 'flex-1' : 'flex-1 opacity-40'} transition-all duration-300`}>
                        <div 
                            className={`text-center group ${nextMedia ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={handleNextClick}
                        >
                            <p className='mb-3 md:mb-4 lg:mb-5 font-subtitle uppercase text-base md:text-lg lg:text-xl font-semibold text-txt-gray'>
                                NEXT
                            </p>
                            
                            {nextMedia ? (
                                <>
                                    <div className='overflow-hidden shadow-lg'>
                                        <OptimizedImage 
                                            src={getMediaImage(nextMedia)} 
                                            alt={nextMedia.title}
                                            className='w-full h-40 md:h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                                        />
                                    </div>
                                    <p className='my-3 md:my-4 text-sm md:text-base text-txt-gray'>
                                        {getMediaType(nextMedia)}
                                    </p>
                                    <p className='text-base md:text-lg lg:text-xl font-subtitle text-txt-secondary font-semibold line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center px-2'>
                                        {nextMedia.title}
                                    </p>
                                    <button className='mt-3 md:mt-4 rounded-full p-2 duration-200 ease-in hover:bg-stone-200 cursor-pointer'>
                                        <ArrowRight size={20} className='text-txt-gray md:w-6 md:h-6'/>
                                    </button>
                                </>
                            ) : (
                                <div className='py-8 md:py-12 bg-gray-50 rounded-lg'>
                                    <p className='text-txt-gray text-sm md:text-base'>No next article</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Stories Section */}
                {relatedStories.length > 0 && (
                    <>
                        <div className='xl:max-w-screen-xl lg:max-w-[900px] h-[1px] bg-txt-gray opacity-50 w-full my-8 md:my-16 lg:my-30'></div>

                        <div className='xl:max-w-screen-xl lg:max-w-[900px] mb-8 md:mb-16 lg:mb-30 w-full'>
                            <h4 className='text-xl md:text-2xl lg:text-4xl font-subtitle text-txt-secondary text-center font-semibold mb-6 md:mb-8 lg:mb-12'>
                                Related Stories
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {relatedStories.map((item) => (
                                    <div 
                                        key={item._id} 
                                        className='cursor-pointer group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
                                        onClick={() => handleNavigateToMedia(item._id)}
                                    >
                                        <div className='h-40 md:h-48 lg:h-60 w-full overflow-hidden'>
                                            <OptimizedImage 
                                                src={getMediaImage(item)} 
                                                alt={item.title}
                                                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                            />
                                        </div>
                                        <div className='p-4 md:p-5 lg:p-6'>
                                            <h4 className='text-xs md:text-sm lg:text-base text-txt-gray mb-2 font-medium'>
                                                {getMediaType(item)}
                                            </h4>
                                            
                                            <h4 className='text-base md:text-lg lg:text-xl font-subtitle text-txt-secondary font-semibold mb-2 md:mb-3 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]'>
                                                {item.title}
                                            </h4>
                                            
                                            <p className='text-xs md:text-sm lg:text-base text-txt-gray mb-3 md:mb-4 line-clamp-2 leading-relaxed'>
                                                {item.excerpt || 'Discover more about this story...'}
                                            </p>
                                            
                                            <div className='flex justify-between items-center'>
                                                <LocalizedLink 
                                                    to={`/media/${item._id}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button className='border border-txt-gray px-3 md:px-4 py-1 md:py-2 cursor-pointer text-xs md:text-sm lg:text-base hover:bg-txt-secondary hover:text-white hover:border-txt-secondary transition-colors duration-300 rounded'>
                                                        READ MORE
                                                    </button>
                                                </LocalizedLink>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* No Related Stories Message */}
                {relatedStories.length === 0 && !loading && (
                    <div className='xl:max-w-screen-xl lg:max-w-[900px] mb-8 md:mb-16 lg:mb-30 w-full text-center'>
                        <div className='py-8 md:py-12 bg-gray-50 rounded-lg'>
                            <p className='text-txt-gray text-base md:text-lg'>No related stories found</p>
                            <button 
                                onClick={() => navigate('/vi/media')}
                                className='mt-3 md:mt-4 px-4 md:px-6 py-2 bg-txt-secondary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base'
                            >
                                Browse All Stories
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer withContact={false}/>
        </div>
    );
}

export default MediaDetail;