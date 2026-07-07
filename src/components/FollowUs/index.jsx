import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img1 from '../../assets/images/instagram/img1.webp'
import img2 from '../../assets/images/instagram/img2.webp'
import img3 from '../../assets/images/instagram/img3.webp'
import img4 from '../../assets/images/instagram/img4.webp'
import img5 from '../../assets/images/instagram/img5.webp'
import img6 from '../../assets/images/instagram/img6.webp'
import img7 from '../../assets/images/instagram/img7.webp'
import img8 from '../../assets/images/instagram/img8.webp'
import img9 from '../../assets/images/instagram/img9.webp'
const INSTAGRAM_IMAGES = [
  img1,img2,img3,,img4,img5,img6,img7,img8,img9
]

function FollowUs() {
    return (
        <div className="pb-16 w-full d-flex justify-center">
          <div className="w-full xl:max-w-screen-2xl lg:max-w-[900px] mx-auto !px-4 md:px-0">
            <p className="text-bg-secondary md:text-[20px] md:leading-[24px] text-[16px] leading-[20px] mb-6 mr-2">
                Follow us
                @
                <a href="#" className="underline decoration-1 underline-offset-2">
                    L'ateliaprojects
                </a>
            </p>
            <InViewSlider images={INSTAGRAM_IMAGES} />
          </div>
        </div>
    )
}

const InViewSlider = ({ images }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                initial={{ x: "30%" }}
                animate={isInView ? { x: 0 } : { x: "30%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <Swiper
                    modules={[FreeMode, Mousewheel]}
                    style={{ width: "100%" }}
                    spaceBetween={20}
                    slidesPerView={"auto"}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                    }}
                    watchOverflow={false}
                    grabCursor={true}
                    mousewheel={{ forceToAxis: true }}
                    touchAngle={45}
                    allowTouchMove={true}
                    onSwiper={(swiper) => console.log("Swiper initialized:", swiper)}
                >
                    {images.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: "200px" }}
                            className="rounded-2xl overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`instagram-${index}`}
                                    className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                                    draggable={false}
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    )
}

export default FollowUs;