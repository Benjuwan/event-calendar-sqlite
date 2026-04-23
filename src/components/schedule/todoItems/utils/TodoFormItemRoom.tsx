import { SyntheticEvent, Dispatch, Ref, memo, SetStateAction, useEffect } from "react";
import { todoItemType } from "../ts/todoItemType";
import { roomsType } from "@/components/rooms/ts/roomsType";
import { useHandleFormEntries } from "@/hooks/useHandleFormEntries";
import { useCheckTimeValidation } from "../hooks/useCheckTimeValidation";

function TodoFormItemRoom({ rooms, todoItems, setTodoItems, roomRef, validationTxt, setValidationTxt }: {
    rooms: roomsType,
    todoItems: todoItemType,
    setTodoItems: Dispatch<SetStateAction<todoItemType>>,
    roomRef: Ref<HTMLSelectElement> | undefined,
    validationTxt: string,
    setValidationTxt: (txt: string) => void
}) {
    const { handleFormEntries } = useHandleFormEntries();

    const { checkTimeValidation } = useCheckTimeValidation();

    useEffect(() => {
        checkTimeValidation(todoItems, setValidationTxt, validationTxt);
    }, [todoItems, setValidationTxt, validationTxt, checkTimeValidation]);

    return (
        <>
            {rooms.length > 0 &&
                <>
                    <label htmlFor="rooms"><span>場所</span></label>
                    <select name="rooms" id="rooms" ref={roomRef} onChange={(e: SyntheticEvent<HTMLSelectElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)}>
                        {rooms.map((room, i) => (
                            <option key={i} value={room.room}>{room.room}</option>
                        ))}
                    </select>
                </>
            }
        </>
    )
}

export default memo(TodoFormItemRoom);