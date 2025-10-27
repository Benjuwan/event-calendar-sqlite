import Rooms from "@/components/rooms/Rooms";
import Calendar from "@/components/schedule/calendar/Calendar";

export default async function CtrlSchedulesPage() {
    return (
        <main>
            <h1>--- 管理者権限ページ | スケジュール設定モード ---</h1>
            <Rooms />
            <Calendar />
        </main>
    );
}