"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider({ children, ...props }: any) {

    return (
        <Swiper
            slidesPerView={1}
            direction="horizontal"
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            {...props}
        >
            {children?.map((_item: any, index: any) => (
                <SwiperSlide >
                    {_item.props?.children}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export const SliderItem = SwiperSlide;