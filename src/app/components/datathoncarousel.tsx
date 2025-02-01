"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AboutDatathonCarousel = () => {
    const carouselItems = [
      {
        image: "/images/datathon1.jpg", // Replace with your image paths
        text: "Join the biggest Datathon at UTA!",
      },
      {
        image: "/images/datathon2.jpg",
        text: "Learn, compete, and network with the best.",
      },
      {
        image: "/images/datathon3.jpg",
        text: "Win exciting prizes and recognition.",
      },
    ];
  
    return (
      <div className="about-datathon">
        <h3>About Datathon</h3>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image} alt={`Datathon ${index + 1}`} />
              <p>{item.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default AboutDatathonCarousel;