import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { connect } from "react-redux";

import categoryActions from "./redux/actions/categories";
import CategoryList from "./components/CategoryList";

const App = (props) => {
  return (
    <div className="tasktracker">
      <div className="app-title">
        <div className="app-buttons">
          <button className="reset-board" onClick={props.onReset}>
            Reset Board
          </button>
          <button className="add-category" onClick={props.onCreateCategory}>
            Add Category
          </button>
        </div>
      </div>
      <CategoryList
        categories={props.categories}
        onEditCategory={props.onEditCategory}
        onDeleteCategory={props.onDeleteCategory}
        onMoveCategory={props.onMoveCategory}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateCategory() {
    dispatch(categoryActions.createCategory("New Category"));
  },

  onEditCategory(categoryId, name) {
    const updatedCategory = {
      id: categoryId,
    };

    if (name) {
      updatedCategory.name = name;
      updatedCategory.editing = false;
    } else {
      updatedCategory.editing = true;
    }

    dispatch(categoryActions.updateCategory(updatedCategory));
  },

  onDeleteCategory(categoryId) {
    dispatch(categoryActions.deleteCategory(categoryId));
  },

  onMoveCategory(sourceId, targetId) {
    dispatch(categoryActions.move("category", sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
