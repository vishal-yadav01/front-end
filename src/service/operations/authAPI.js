import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

//* end points
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CONTACT_US_API,
} = endpoints;

//* send otp
export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      //("send otp api response==", response);
      //(response.data.success);
      if (!response.data.success) {
        throw new error(
          response.data.message || "An error occurred during otp send."
        );
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      //("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//* singup
export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        otp,
        password,
        confirmPassword,
      });
      //("SIGNUP API response............", response);
      if (!response.data.success) {
        throw new Error(
          response.data.message || "An error occurred during signup."
        );
      }
      toast.success("singup Succeful");
      navigate("/login");
    } catch (error) {
      //("singup api error .......", error);
      toast.error(error?.response.data?.message);
      navigate("/signup");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

//*login
export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("LOADING...");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      //("LOGIN API response...........", response);
      if (!response.data.success) {
        throw new Error(
          response.data.message || "An error occurred during Login."
        );
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const initials = `${response.data.user.firstName[0]}${response.data.user.lastName[0]}`;
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${initials}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      //  **********Persist user data in localStorage to retain session across page reloads or browser restarts**********
      //! if i not sotre user then we need to make code useing (useEffect) to call backend on each referh to get user data that why we need it
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile");
    } catch (error) {
      //("LOGIN API ERROR............", error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

//* log out
export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
};

//* get Passwrod Reset token
export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      //("RESET PASSWORD TOKEN RESPONSE....", response);
      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "An error occurred during Sent password reset email"
        );
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      //("RESET PASSWORD TOKEN Error", error);
      const errorMessage = error.response?.data?.message;

      toast.error(errorMessage);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

//* reset password
export const resetPassword = (password, confirmPassword, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      //("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      //("RESET PASSWORD TOKEN Error", error.response?.data?.message);
      toast.error(
        error?.response?.data?.message === "token not valid"
          ? "Time Up go for it again"
          : "Unable to reset password"
      );
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

//* contact form
export const contactForm = async (data, setLoading) => {
  //("data of form hook====", data);

  try {
    setLoading(true);
    //(CONTACT_US_API);

    const response = await apiConnector("POST", CONTACT_US_API, data);
    //("Contact form response========", response);
  } catch (error) {
    console.error("Contact form error========", error.message);
  } finally {
    setLoading(false);
  }
};
