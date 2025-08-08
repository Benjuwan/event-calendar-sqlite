import { atom } from "jotai";
import { roomsType } from "../components/rooms/ts/roomsType";

export const timeBlockBegin: number = 9; // 予約可能-開始時間
export const timeBlockEnd: number = 21;  // 予約可能-終了時間

//「：」より後の文字がスケジュールテーブルに表示されます
const rooms: roomsType = [
    { room: 'いざなみ広場：いざなみ市' },
    { room: 'せせらぎ館：せせらぎ市' },
    { room: 'そよかぜ市場：そよかぜ市' }
];
export const roomsAtom = atom<roomsType>(rooms);

// 予約内容確認用のツールチップ
export const roomsInfoToolTipAtom = atom<string | undefined>(undefined);