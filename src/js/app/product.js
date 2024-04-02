import { products } from "../core/data";
import {
  cartItemGroup,
  openDrawer,
  productGroup,
  productTemplate,
} from "../core/selector";
import { createCartItem, updateCartItemCount, updateCartTotal } from "./cart";

const createProduct = (product) => {
  const template = productTemplate.content.cloneNode(true);
  template
    .querySelector(".product-card")
    .setAttribute("product-id", product.id);
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-description").innerText =
    product.description;
  template.querySelector(".product-price").innerText = product.price;
  template.querySelector(
    ".product-rating"
  ).innerText = `( ${product.rating.rate} / ${product.rating.count} )`;

  template.querySelector(".product-star").innerHTML = renderStars(
    product.rating.rate
  );

  const isExitedInCart = cartItemGroup.querySelector(
    `[cart-product-id='${product.id}']`
  );

  if (isExitedInCart) {
    template.querySelector(".product-add-cart-btn").innerText = "Added";
    template
      .querySelector(".product-add-cart-btn")
      .setAttribute("disabled", true);
  }

  return template;
};

const renderStars = (rate) => {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ${
      i <= Math.round(rate) ? "fill-gray-700" : "fill-gray-100"
    }">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
  `;
  }
  return stars;
};

export const renderProduct = (products) => {
  productGroup.innerHTML = null;
  products.forEach((product) => {
    productGroup.append(createProduct(product));
  });
};

export const handleProductGroup = (event) => {
  if (event.target.classList.contains("product-add-cart-btn")) {
    const currentBtn = event.target;
    currentBtn.innerText = "Added";
    currentBtn.setAttribute("disabled", true);
    const currentProductCard = event.target.closest(".product-card");
    const currentProductCardId = parseInt(
      currentProductCard.getAttribute("product-id")
    );

    const currentProductCardImage =
      currentProductCard.querySelector(".product-img");
    // console.log(currentProductCardImage);
    const animateImg = new Image();
    animateImg.src = currentProductCardImage.src;
    animateImg.style.position = "fixed";
    animateImg.style.zIndex = "90";
    animateImg.style.left =
      currentProductCardImage.getBoundingClientRect().left + "px";
    animateImg.style.top =
      currentProductCardImage.getBoundingClientRect().top + "px";
    animateImg.style.width =
      currentProductCardImage.getBoundingClientRect().width + "px";
    animateImg.style.height =
      currentProductCardImage.getBoundingClientRect().height + "px";
    // animateImg.classList.add = "z-0";

    document.body.append(animateImg);

    const keyframes = [
      {
        top: currentProductCardImage.getBoundingClientRect().top + "px",
        left: currentProductCardImage.getBoundingClientRect().left + "px",
      },
      {
        top: openDrawer.querySelector("svg").getBoundingClientRect().top + "px",
        left:
          openDrawer.querySelector("svg").getBoundingClientRect().left + "px",
        height: 0 + "px",
        width: 0 + "px",
        transform: "rotate(2turn)",
      },
    ];
    const duration = 900;

    const addToCartAnimation = animateImg.animate(keyframes, duration);

    addToCartAnimation.addEventListener("finish", () => {
      animateImg.remove();
      openDrawer.classList.add("animate__tada");
      openDrawer.addEventListener("animationend", () => {
        openDrawer.classList.remove("animate__tada");
        updateCartItemCount();
        updateCartTotal();
      });
    });

    const currentProduct = products.find(
      (product) => product.id === currentProductCardId
    );
    cartItemGroup.append(createCartItem(currentProduct, 1));

    // updateCartItemCount();
    // updateCartTotal();
  }
};
