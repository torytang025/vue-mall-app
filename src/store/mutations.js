export default {
  addItemCount(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  },
  changeCheckState(state, payload) {
    payload.checked = !payload.checked;
  }
};
