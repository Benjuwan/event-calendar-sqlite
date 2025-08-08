import { memo } from "react";
import todoStyle from "../styles/todoStyle.module.css";
import { todoItemType } from "../ts/todoItemType";

type TodoItemsEditableTypes = {
    todoItem: todoItemType;
};

function TodoItemsEditable({ props }: { props: TodoItemsEditableTypes }) {
    const { todoItem } = props;

    return (
        <div className={todoStyle.editFalseMode}>
            <div className={todoStyle.editTargetContent}>
                <p>イベント内容：{todoItem.todoContent}</p>
                {todoItem.person && <p>担当者：{todoItem.person}</p>}
                {todoItem.rooms && <p>場所：{todoItem.rooms}</p>}
                {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
            </div>
        </div>
    );
}

export default memo(TodoItemsEditable);