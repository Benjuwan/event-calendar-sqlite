import { atom } from "jotai";
import { roomsType } from "../components/rooms/ts/roomsType";

export const timeBlockBegin: number = 9; // 予約可能-開始時間
export const timeBlockEnd: number = 19;  // 予約可能-終了時間

//「：」より後の文字がスケジュールテーブルに表示されます
const rooms: roomsType = [
    { room: 'ちゅーりっぷ組：0歳児' },
    { room: 'たんぽぽ組：1歳～2歳児' },
    { room: 'すみれ組：3歳～4歳児' },
    { room: 'こすもす組：5歳児' }
];
export const roomsAtom = atom<roomsType>(rooms);

// 予約内容確認用のツールチップ
export const roomsInfoToolTipAtom = atom<string | undefined>(undefined);