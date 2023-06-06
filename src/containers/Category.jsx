import Category from "../components/Category";
import categoryActions from "../redux/actions/categories";
import taskActions from "../redux/actions/tasks";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import * as objectTypes from "../redux/types/objectTypes";

const categorySource = {
    beginDrag(props) {
        return {
            id: props.category.id,
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },
};

const categoryTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.category.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        const sourceType = monitor.getItemType();
        if (!targetProps.category.taskList.length && sourceType === objectTypes.TASK) {
            targetProps.attachToCategory(targetId, sourceId);
        } else if (targetId !== sourceId && sourceType === objectTypes.CATEGORY) {
            targetProps.onMoveCategory(sourceId, targetId);
        }
    },
};

const collectDragSource = (DnDconnect, monitor) => ({
    connectDragSource: DnDconnect.dragSource(),
    connectDragPreview: DnDconnect.dragPreview(),
    isDragging: monitor.isDragging(),
});

const collectDropTarget = (DnDconnect) => ({
    connectDropTarget: DnDconnect.dropTarget(),
});

const mapStateToProps = (state) => ({
    allTasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
    onCreateTask(categoryId) {
        const newTask = taskActions.createTask("New task");
        dispatch(newTask);
        dispatch(categoryActions.attachToCategory(categoryId, newTask.payload.id));
    },

    onDeleteTask(categoryId, taskId) {
        dispatch(taskActions.deleteTask(taskId));

        if (categoryId) {
            dispatch(categoryActions.detachFromCategory(categoryId, taskId));
        }
    },

    onEditTask(taskId, value) {
        const updatedTask = {
            id: taskId,
        };

        if (value) {
            updatedTask.text = value;
            updatedTask.editing = false;
        } else {
            updatedTask.editing = true;
        }

        dispatch(taskActions.updateTask(updatedTask));
    },

    onMoveTask(sourceId, targetId) {
        dispatch(categoryActions.move("task", sourceId, targetId));
    },

    attachToCategory(categoryId, taskId) {
        dispatch(categoryActions.attachToCategory(categoryId, taskId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    DragSource(
        objectTypes.CATEGORY,
        categorySource,
        collectDragSource
    )(
        DropTarget(
            [objectTypes.TASK, objectTypes.CATEGORY],
            categoryTarget,
            collectDropTarget
        )(Category)
    )
);
