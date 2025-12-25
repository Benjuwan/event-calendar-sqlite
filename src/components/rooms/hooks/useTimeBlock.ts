import { useMemo } from "react";
import { todoItemType } from "@/components/schedule/todoItems/ts/todoItemType";
import { reservedInfoType } from "../ts/roomsType";

export const useTimeBlock = () => {
    // memo.todoID との比較用データ生成処理（当日より1週間分の各部屋ごとのタイムテーブル配列{relevantReservations}を用意するため）
    const useCreateTimeTableViewDay: (ctrlMultiTimeTable: number) => string = (ctrlMultiTimeTable: number) => {
        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;

        // 当年当月の「0日目」を取得（翌月の0日＝当月の最終日）し、その日付（最終日）を出す
        const thisLastDay = new Date(thisYear, thisMonth, 0).getDate();

        // 最終週かどうか判定
        const isLastWeek: boolean = new Date().getDate() > (thisLastDay - 7);

        const isNextMonth: boolean = useMemo(() => ctrlMultiTimeTable - 7 < 0, [ctrlMultiTimeTable]);
        const isDec: boolean = useMemo(() => thisMonth === 12, [thisMonth]);

        const theYear: number = useMemo(() => isNextMonth && isDec ? thisYear + 1 : thisYear, [isNextMonth, isDec, thisYear]);
        const theMonth: number = useMemo(() => isLastWeek && isNextMonth ?
            (isDec ? 1 : thisMonth + 1) : thisMonth,
            [isLastWeek, isNextMonth, isDec, thisMonth]);

        const theTimeTableViewDay: string = useMemo(() => {
            return `${theYear}/${theMonth}/${ctrlMultiTimeTable}`;
        }, [theYear, theMonth, ctrlMultiTimeTable]);

        return theTimeTableViewDay;
    }

    // 予約状態（isReserved）の確認及び予約内容情報の取得を行う
    const getReservedInfo: (relevantReservations: todoItemType[], timeBlock: number, minBlock: number) => reservedInfoType = (
        relevantReservations: todoItemType[],
        timeBlock: number,
        minBlock: number
    ) => {
        let reservedInfo: reservedInfoType = {
            isReserved: false,
            content: ""
        };

        for (const todoItem of [...relevantReservations]) {
            const theTime = parseInt(`${timeBlock}${minBlock.toString().padStart(2, '0')}`);
            const start = parseInt(todoItem.startTime?.split(':').join('') ?? '0');
            const finish = parseInt(todoItem.finishTime?.split(':').join('') ?? '0');

            if (theTime >= start && theTime <= finish) {
                reservedInfo = {
                    isReserved: theTime >= start && theTime <= finish,
                    content: todoItem.todoContent,
                    room: todoItem.rooms,
                    person: todoItem.person,
                    startTime: todoItem.startTime,
                    finishTime: todoItem.finishTime
                }
            }
        }

        return reservedInfo;
    };

    return { useCreateTimeTableViewDay, getReservedInfo }
}