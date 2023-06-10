import React from 'react';
import PropTypes from 'prop-types';

import Category from '../containers/Category.jsx';

const CategoryList = ({ categories, onEditCategory, onDeleteCategory, onMoveCategory }) => (
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

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    })
  ).isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
  onMoveCategory: PropTypes.func.isRequired,
};

export default CategoryList;
