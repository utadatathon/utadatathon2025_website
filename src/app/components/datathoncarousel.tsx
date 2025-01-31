// "use client"; // Add this line for client-side rendering
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const AboutDatathonCarousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const carouselItems = [
//     {
//       image: "/images/datathon1.jpg", // Replace with your image paths
//       text: "Join the biggest Datathon at UTA!",
//     },
//     {
//       image: "/images/datathon2.jpg",
//       text: "Learn, compete, and network with the best.",
//     },
//     {
//       image: "/images/datathon3.jpg",
//       text: "Win exciting prizes and recognition.",
//     },
//   ];

//   return (
//     <div className="about-datathon">
//       <h3>About Datathon</h3>
//       <Slider {...settings}>
//         {carouselItems.map((item, index) => (
//           <div key={index}>
//             <img src={item.image} alt={`Datathon ${index + 1}`} />
//             <p>{item.text}</p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default AboutDatathonCarousel;