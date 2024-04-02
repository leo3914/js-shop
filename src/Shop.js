import initialRender from "./js/core/initialRender";
import listener from "./js/core/listener";

class Shop {
  init() {
    console.log("Shop app start.");
    initialRender();
    listener();
  }
}

export default Shop;
