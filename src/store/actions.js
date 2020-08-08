export default {
  addCart(context, payload) {
    // 查找之前是否有该商品
    let oldProduct = context.state.cartList.find(
      item => item.iid === payload.item.iid
    );
    if (oldProduct) {
      context.commit("addItemCount", oldProduct);
    } else {
      payload.item.count = 1;
      context.commit("addToCart", payload.item);
    }
  }
};
