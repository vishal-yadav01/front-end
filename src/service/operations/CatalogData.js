import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  //(categoryId);

  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }
    );
    if (!response.data.success) {
      throw new Error("Could not Fetch Category Page");
    }
    result = response?.data?.data;
    return result;
  } catch (error) {
    //("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
