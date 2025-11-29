import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_PAGE_PATH_NAME } from "@/constants/adminPagePathName";

function ViewCurrentTimeTableDay({ ctrlMultiTimeTable, isLastWeek }: { ctrlMultiTimeTable: number, isLastWeek: boolean }) {
    const pathName: string = usePathname();

    const thisMonth: number = useMemo(() => new Date().getMonth() + 1, []);

    return (
        <>
            {(pathName.length === 1 || pathName === `/${ADMIN_PAGE_PATH_NAME}`) &&
                <p>- <b>{isLastWeek && ctrlMultiTimeTable <= 7 ? thisMonth + 1 : thisMonth}/{ctrlMultiTimeTable}</b> の予約内容（※7日後まで確認可能）</p>
            }
        </>
    );
}

export default memo(ViewCurrentTimeTableDay);