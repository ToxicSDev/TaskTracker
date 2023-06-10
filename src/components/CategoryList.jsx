import React from "react";

import Category from "../containers/Category.jsx";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory, onMoveCategory }) => {
  return (
    <div className="categories">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          onMoveCategory={onMoveCategory}
        />
      ))}
    </div>
  );
};

export default CategoryList;