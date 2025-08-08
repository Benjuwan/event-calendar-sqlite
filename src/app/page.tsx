import Rooms from "../components/rooms/Rooms";
import Calendar from "../components/schedule/calendar/Calendar";

export default async function Home() {
  return (
    <main>
      <h1>イベントカレンダー</h1>
      <Rooms />
      <Calendar />
    </main>
  );
}
