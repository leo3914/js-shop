import { products } from "../core/data";
import { categoryGroup, categoryTemplate } from "../core/selector";
import { renderProduct } from "./product";

export const createCategory = (categoryName) => {
  const template = categoryTemplate.content.cloneNode(true);
  template.querySelector(".cat-btn").innerText = categoryName;

  return template;
};

export const renderCategory = (categories) => {
  categories.forEach((category) => {
    categoryGroup.append(createCategory(category));
  });
};

export const handleCategoryGroup = (event) => {
  // console.log(event.target);
  if (event.target.classList.contains("cat-btn")) {
    const currentCategoryBtn = event.target;
    const currentCategory = event.target.innerText;
    // console.log(currentCategory);
    document.querySelector(".cat-btn.active")?.classList.remove("active");
    currentCategoryBtn.classList.add("active");
    renderProduct(
      products.filter(
        (el) => el.category === currentCategory || currentCategory === "All"
      )
    );
  }
};
