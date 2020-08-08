export default {
  addCart(context, payload) {
    return new Promise(resolve => {
      // 查找之前是否有该商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.item.iid
      );
      if (oldProduct) {
        context.commit("addItemCount", oldProduct);
        resolve("成功添加商品至购物车");
      } else {
        payload.item.count = 1;
        context.commit("addToCart", payload.item);
        resolve("商品购物车数量+1");
      }
    });
  }
};
