import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

export default function GallerySection() {

    const images = [
        "https://www.imgacademy.com/sites/default/files/img-academy-lacrosse-camp-1.jpg",
        "https://www.imgacademy.com/sites/default/files/football-camp-o-6.jpg",
        "https://www.imgacademy.com/sites/default/files/basketball-camp-o-9.jpg",
        "https://www.imgacademy.com/sites/default/files/lacrosse-camp-overview-4.jpg",
        "https://www.imgacademy.com/sites/default/files/lacrosse-camp-o-4.jpg",
        "https://www.imgacademy.com/sites/default/files/baseball-camp-overview-10.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-baseball-camp-new-photos-1.jpg",
        "https://www.imgacademy.com/sites/default/files/basketball-camp-o-4.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-lacrosse-camp-2.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-lacrosse-camp-3.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-golf-camp-4.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-football-camp-3.jpg",
        "https://www.imgacademy.com/sites/default/files/baseball-camp-overview-3.jpg",
        "https://www.imgacademy.com/sites/default/files/baseball-camp-overview-11.jpg",
        "https://www.imgacademy.com/sites/default/files/basketball-camp-o-1.jpg",
        "https://www.imgacademy.com/sites/default/files/lacrosse-camp-overview-6.jpg",
        "https://www.imgacademy.com/sites/default/files/golf-facilities-o-2.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-football-camp-2.jpg",
        "https://www.imgacademy.com/sites/default/files/baseball-camp-overview-9.jpg",
        "https://www.imgacademy.com/sites/default/files/basketball-camp-overview-1.jpg",
        "https://www.imgacademy.com/sites/default/files/lacrosse-camp-overview-7.jpg",
        "https://www.imgacademy.com/sites/default/files/lacrosse-camp-o-3.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-golf-camp-2.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-baseball-camp-new-photos-2.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-lacrosse-camp-4.jpg",
        "https://www.imgacademy.com/sites/default/files/img-academy-golf-camp-3.jpg"
    ]

    const { isDark } = useContext(AuthContext)

    return (
        <div className="text-center ">
            <h1 className="text-5xl mt-20 mb-10 text-center font-bold text-[#2d2929]">Gallery</h1>
            <Swiper
                slidesPerView={"5"}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className={`mySwiper border-0 `}
            >
                {
                    images.map(item => <SwiperSlide
                        key={item}
                        className={`mb-12 text-center ${isDark ? 'bg-[#515b60]' : 'bg-[#EFEEEA]'}  rounded-lg`}
                    >
                        <img className="h-80 object-cover mx-auto" src={item} alt="" />
                    </SwiperSlide>)
                }
            </Swiper>

        </div>
    );
}