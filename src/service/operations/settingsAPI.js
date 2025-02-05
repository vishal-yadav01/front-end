import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";

//* learning ********* https://chatgpt.com/c/673ef473-d8dc-8008-bc26-ffafd7a9c14d

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  CHANGE_PASSWORD_API,
} = settingsEndpoints;

export const updateDisplayPicture = (token, formData) => {
  // console.log(formData);

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(
      //   "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      //   response
      // );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data.data));
      // const updatedImageUser = {
      //   ...user,
      //   image: response.data.data.image,
      // };
      // localStorage.setItem("user", JSON.stringify(updatedImageUser));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Display Picture Updated Successfully");
    } catch (error) {
      // console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
};

export const updateProfile = (token, formData) => {
  // console.log("seting api data", formData);

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // console.log(" UPDATE_PROFILE_API================>", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      // console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
};

export const updatePassword = async (token, formData) => {
  // console.log("update password", formData);

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    // console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

export const deleteAccount = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account Delete Succefully");
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      // console.log("ACCOUNT DETLTE_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
};
