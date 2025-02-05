import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[120px] mb-28">
      <div className=" flex gap-5 items-center  flex-col">
        <div className="text-4xl text-center font-semibold ">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-row items-center justify-center mt-5">
          <img
            src={Know_your_progress}
            className="object-contain -mr-32"
            alt="img"
          />
          <img src={Compare_with_others} className="object-contain" alt="img" />
          <img
            src={Plan_your_lessons}
            className="object-contain -ml-32"
            alt="img"
          />
        </div>
        <div className="w-fit">
          {" "}
          <CTAButton active={true} linkto={"/signup"}>
            <div>learn more</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
