import { v4 as uuidv4 } from 'uuid';

import { validateUUIDv4 } from "../../utils/validator";
import * as actionTypes from "../types/actionTypes";


function createCategory(name) {
  return {
    type: actionTypes.CREATE_CATEGORY,
    payload: {
      id: uuidv4(),
      name,
      taskList: [],
      color: "#3395f0",
    },
  };
}


function updateCategory(updatedCategory) {
  if (!validateUUIDv4(updatedCategory.id)) {
    throw new Error(`Updated category doesn't have a valid UUIDv4 id - ${updatedCategory.id}`);
  }

  return {
    type: actionTypes.UPDATE_CATEGORY,
    payload: updatedCategory,
  };
}


function deleteCategory(id) {
  if (!validateUUIDv4(id)) {
    throw new Error(`Category doesn't have a valid UUIDv4 id - ${id}`);
  }

  return {
    type: actionTypes.DELETE_CATEGORY,
    payload: {
      id,
    },
  };
}


function attachToCategory(categoryId, taskId) {
  if (!validateUUIDv4(categoryId) || !validateUUIDv4(taskId)) {
    throw new Error(`Category or task doesn't have a valid UUIDv4 id - ${id} / ${taskId}`);
  }

  return {
    type: actionTypes.ATTACH_TO_CATEGORY,
    payload: {
      categoryId,
      taskId,
    },
  };
}


function detachFromCategory(categoryId, taskId) {
  if (!validateUUIDv4(categoryId) || !validateUUIDv4(taskId)) {
    throw new Error(`Category or task doesn't have a valid UUIDv4 id - ${categoryId} / ${taskId}`);
  }

  return {
    type: actionTypes.DETACH_FROM_CATEGORY,
    payload: {
      categoryId,
      taskId,
    },
  };
}


function move(target, sourceId, targetId) {
  if (!validateUUIDv4(sourceId) || !validateUUIDv4(targetId)) {
    throw new Error(`Source or target id for move action doesn't have a valid UUIDv4 id - ${sourceId} / ${targetId}`);
  }

  return {
    type: target === "task" ? actionTypes.MOVE_TASK : actionTypes.MOVE_CATEGORY,
    payload: {
      sourceId,
      targetId,
    },
  };
}

export default {
  createCategory,
  updateCategory,
  deleteCategory,
  attachToCategory,
  detachFromCategory,
  move,
};