import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="w-full lg:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="w-full shadow-white"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-[50%] flex flex-col gap-10">
          <div className="text-3xl lg:text-4xl font-semibold">
            Become an
            <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-full lg:w-[90%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
