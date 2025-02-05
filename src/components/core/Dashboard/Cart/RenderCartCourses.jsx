import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((course, indx) => (
          <div
            key={course._id}
            className={`flex w-full flex-wrap items-start justify-between gap-6 ${
              indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
            } ${indx !== 0 && "mt-6"} `}
          >
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course.category?.name || "Unknown Category"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">4.5</span>
                  <ReactStars
                    count={5}
                    value={course.rating || 0}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                  <span className="text-richblack-400">
                    {course.rating || 0} Ratings
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {course.price || 0}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
