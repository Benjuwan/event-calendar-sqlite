import Link from "next/link";
import { memo } from "react";
import baseStyle from "../../styles/page.module.css";

function Header() {
    return (
        <header className={baseStyle.theHeader}>
            <nav>
                <ul>
                    <li><Link href={'/'}>TOP</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default memo(Header);