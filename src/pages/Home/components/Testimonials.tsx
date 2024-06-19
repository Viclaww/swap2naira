// import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// <!-- Initialize Swiper -->
// var swiper = new Swiper(".mySwiper", {
//   // Optional parameters
//   // slidesPerView: 5,
//   spaceBetween: 0,
//   centeredSlides: true,
//   speed: 1500,
//   autoplay: {
//     delay: 0,
//   },
//   loop: true,
//   slidesPerView: 'auto',
//   allowTouchMove: false,
//   disableOnInteraction: true,
// If we need pagination
// pagination: {
//   el: ".swiper-pagination",
//   clickable: true,
// },
// Navigation arrows
// navigation: {
//   nextEl: '.swiper-button-next',
//   prevEl: '.swiper-button-prev',
// },
// Breakpoints
// breakpoints: {
//   640: {
//     slidesPerView: 2,
//     spaceBetween: 20,
//   },
//   768: {
//     slidesPerView: 4,
//     spaceBetween: 40,
//   },
//   1024: {
//     slidesPerView: 5,
//     spaceBetween: 50,
//   },
// },
// });

const Testimonials = () => {
  const testimonies = [
    {
      name: "Tom Cruise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Dwayne Johnson",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
  ];

  //   const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {/* <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="flex px-5 gap-10">
            {testimonies.map(({ name, desc }, index) => (
              <SwiperSlide>
                <div className="bg-blueBlack p-4" key={index}>
                  <span className="text-8xl font-mono">"</span>
                  <p>{desc}</p>
                  <h3>{name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div> */}

      <div className="text-white">
        <h2 className="text-5xl font-bold text-center my-10 text-blueBlack">
          Testimonials
        </h2>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            slidesPerView={"auto"}
            allowTouchMove={false}
            speed={2500}
            autoplay={{
              delay: 0,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            <div className="flex px-5 gap-10">
              {testimonies.map(({ name, desc }, index) => (
                <SwiperSlide>
                  <div className="bg-blueBlack p-4" key={index}>
                    <span className="text-8xl font-mono">"</span>
                    <p>{desc}</p>
                    <h3>{name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
