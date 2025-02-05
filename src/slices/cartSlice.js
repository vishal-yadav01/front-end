import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  total: JSON.parse(localStorage.getItem("total")) || 0,
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error(`Course already in cart`);
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success(`Course added to cart: ${course.courseName}`);
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;

      const findCourse = state.cart.find((item) => item._id === courseId);
      const updatedCart = state.cart.filter((item) => item._id !== courseId);
      state.cart = updatedCart;

      state.total = updatedCart.reduce((sum, item) => sum + item.price, 0);
      state.totalItems = updatedCart.length;

      if (updatedCart.length === 0) {
        state.cart = [];
        state.total = 0;
        state.totalItems = 0;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success(`Course removed successfully: ${findCourse.courseName}`);
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      // toast.success("Cart has been reset");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
