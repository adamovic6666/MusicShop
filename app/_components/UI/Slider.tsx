// import Image from "next/image";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// const Slider = ({ slides }: SliderProps) => {
//   return (
//     // Import Swiper React components

//     // Import Swiper styles

//     <Swiper
//       className="container"
//       style={{ width: "100%", height: "100%", maxWidth: "600px" }}
//       slidesPerView={2}
//       onSlideChange={() => console.log("slide change")}
//       onSwiper={(swiper) => console.log(swiper)}
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//     >
//       {slides.map((slide: any) => {
//         return (
//           <SwiperSlide key={slide.id}>
//             <Image
//               src={process.env.NEXT_PUBLIC_API_URL + slide.path}
//               alt={`{listing-image-}${slide.id}`}
//               width={300}
//               height={300}
//             />
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

// export default Slider;
