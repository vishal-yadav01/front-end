import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`} className="group w-full">
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="relative">
          <img
            src={course?.thumbnail || "/default-thumbnail.jpg"}
            alt="course thumbnail"
            className="h-[200px] w-[72%] mx-auto rounded-t-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col gap-3">
          {/* Course Name */}
          <p className="text-base font-semibold text-richblack-5 line-clamp-2">
            {course?.courseName || "Untitled Course"}
          </p>

          {/* Instructor Name */}
          <p className="text-sm text-richblack-50 truncate">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName || "Unknown Instructor"}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-25 font-semibold">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400 text-sm">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-richblack-5">
            Rs. {course?.price || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
