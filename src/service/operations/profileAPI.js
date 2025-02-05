import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
const {
  GET_INSTRUCTOR_DATA_API,
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;

export const getUserEnrolledCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  var result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    //("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // //(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response?.data
    // );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API ERROR............",
    //   error.message
    // );
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
};

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  // console.log(toastId);

  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET_INSTRUCTOR_API_RESPONSE", response.data);
    result = response?.data?.courses;
  } catch (error) {
    // console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
