import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "スケジュール設定モード ｜ EventsCalendar-sys",
    description: "一般ユーザーには秘匿して、事業者のみが更新・編集を行うためのスケジュール設定ページ"
};

export default function CtrlSchedulesPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            {children}
        </section>
    );
}