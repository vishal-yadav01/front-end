import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Course_Card from "./Course_Card";

const CourseSlider = ({ courses }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cards on larger screens
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
          swipe: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile screens
          slidesToScroll: 1,
          swipe: true,
        },
      },
    ],
  };

  return (
    <>
      {courses?.length > 0 ? (
        <Slider {...settings} className="max-h-[32rem]">
          {courses.map((course, i) => (
            <div key={i}>
              <Course_Card course={course} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-xl text-richblack-5">
          No courses available at the moment
        </p>
      )}
    </>
  );
};

export default CourseSlider;
