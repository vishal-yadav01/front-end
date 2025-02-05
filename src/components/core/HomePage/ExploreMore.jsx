import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "../HomePage/CourseCard";
import HighlightText from "./HighlightText";
const tagName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTag, setCurrentTag] = useState(tagName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCart, setCurrentCart] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const cartHandler = (val) => {
    const data = HomePageExplore.filter((item) => item.tag === val);
    setCourses(data[0].courses);
    setCurrentCart(data[0].courses[0].heading);
    setCurrentTag(val);
  };

  return (
    <div>
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tagName.map((item, index) => {
          return (
            <div
              className={`text-[16]
              ${
                currentTag === item
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              }
              px-7 py-[7px] rounded-full l  cursor-pointer hover:bg-richblack-900 hover:text-richblack-5
              `}
              key={index}
              onClick={() => cartHandler(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block lg:h-[200px]"></div>

      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((item, index) => {
          return (
            <CourseCard
              key={index}
              cardData={item}
              currentCard={currentCart}
              setCurrentCard={setCurrentCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
