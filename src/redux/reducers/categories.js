import { v4 as uuidv4 } from 'uuid';

import * as actionTypes from "../types/actionTypes.js";

const defaultState = [
  {
    id: uuidv4(),
    name: "To Do",
    editing: false,
    taskList: [],
  },
  {
    id: uuidv4(),
    name: "In Progress",
    editing: false,
    taskList: [],
  },
  {
    id: uuidv4(),
    name: "Finished",
    editing: false,
    taskList: [],
  },
  {
    id: uuidv4(),
    name: "Cancelled",
    editing: false,
    taskList: [],
  },
];

export default function categories(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY:
      return [...state, action.payload];

    case actionTypes.UPDATE_CATEGORY:
      return state.map((category) => {
        if (category.id === action.payload.id) {
          return { ...category, ...action.payload };
        }

        return category;
      });

    case actionTypes.DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.payload.id);

    case actionTypes.ATTACH_TO_CATEGORY: {
      const categoryId = action.payload.categoryId;
      const taskId = action.payload.taskId;

      return state.map((category) => {
        if (category.taskList.includes(taskId)) {
          return { ...category, taskList: category.taskList.filter((id) => id !== taskId) };
        }

        if (category.id === categoryId) {
          return { ...category, taskList: [...category.taskList, taskId] };
        }

        return category;
      });
    }

    case actionTypes.DETACH_FROM_CATEGORY: {
      const categoryId = action.payload.categoryId;
      const taskId = action.payload.taskId;

      return state.map((category) => {
        if (category.id === categoryId) {
          return { ...category, taskList: category.taskList.filter((id) => id !== taskId) };
        }

        return category;
      });
    }

    case actionTypes.MOVE_TASK: {
      const { sourceId, targetId } = action.payload;
      const sourceCategory = state.find((category) => category.taskList.includes(sourceId));
      const targetCategory = state.find((category) => category.taskList.includes(targetId));

      if (!sourceCategory || !targetCategory) {
        console.error('Source or target category not found');
        return state;
      }

      const sourceTaskIndex = sourceCategory.taskList.indexOf(sourceId);
      const targetTaskIndex = targetCategory.taskList.indexOf(targetId);

      if (sourceCategory.id === targetCategory.id) {
        return state.map((category) => {
          if (category.id === sourceCategory.id) {
            let newTaskList = [...sourceCategory.taskList];
            newTaskList.splice(sourceTaskIndex, 1);
            newTaskList.splice(targetTaskIndex, 0, sourceId);

            return { ...category, taskList: newTaskList };
          }

          return category;
        });
      }

      return state.map((category) => {
        if (category.id === sourceCategory.id) {
          let newTaskList = category.taskList.filter((task, index) => index !== sourceTaskIndex);
          return { ...category, taskList: newTaskList };
        }

        if (category.id === targetCategory.id) {
          let newTaskList = [...category.taskList];
          newTaskList.splice(targetTaskIndex, 0, sourceId);

          return { ...category, taskList: newTaskList };
        }

        return category;
      });
    }

    case actionTypes.MOVE_CATEGORY: {
      const { sourceId, targetId } = action.payload;

      const sourceCategoryIndex = state.findIndex((category) => category.id === sourceId);
      const targetCategoryIndex = state.findIndex((category) => category.id === targetId);

      if (sourceCategoryIndex === -1 || targetCategoryIndex === -1) {
        console.error('Source or target category not found');
        return state;
      }

      let newState = [...state];
      const [removedCategory] = newState.splice(sourceCategoryIndex, 1);
      newState.splice(targetCategoryIndex, 0, removedCategory);

      return newState;
    }

    default:
      return state;
  }
};
