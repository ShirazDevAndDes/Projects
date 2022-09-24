import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  // quantity: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const itemID = action.payload.itemInfo._id;
      const quantity = action.payload.itemQuantity;
      const size = action.payload.itemSize;

      const existedItem = state.items.reduce(
        (acc, cur) => (cur.itemInfo._id === itemID ? ++acc : acc),
        0
      );

      const existedSize = state.items.reduce(
        (acc, cur) =>
          cur.itemInfo._id === itemID && cur.itemSize === size ? ++acc : acc,
        0
      );

      if (existedItem) {
        if (existedSize) {
          state.items.forEach((item) => {
            if (item.itemInfo._id === itemID && item.itemSize === size) {
              if (item.itemQuantity != quantity) {
                item.itemQuantity = quantity;
              }
            }
          });
        } else {
          state.items.push(action.payload);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      // console.log(action.payload);
      state.items.splice(action.payload, 1);
    },
    resetCart: (state) => {
      // console.log(state.items);
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProducts, removeItem, resetCart } = cartSlice.actions;

export const cartItems = (state) => state.cart.items;
export const itemsCount = (state) => state.cart.items.length;

export const itemsTotal = (state) => {
  let total = 0;
  state.cart.items.forEach((item) => {
    total += parseInt(item.itemInfo.price[item.itemSize]) * item.itemQuantity;
  });

  return total;
};

export default cartSlice.reducer;
