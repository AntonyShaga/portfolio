import React from 'react';
import {HeaderListItem} from "./header list item/HeaderListItem";
import {PortfolioArrayType} from "../../redax/redax";
import style from './Header.module.css'
import {Head} from "./head/Head";

type PropsForHeaderType = {
    hederMenu: PortfolioArrayType
}
export const Header: React.FC<PropsForHeaderType> = (
    {
        hederMenu
    }
) => {
    let list = hederMenu.navList.navButton.map(el => <HeaderListItem key={el.id} title={el.title}/>)
    return (
        <header className={style.wrapper}>
            <div className={`${style.header} ${style.container}`}>
                <ul className={style.menu}>
                    {list}
                </ul>
            </div>
            <Head/>
        </header>

    );
};
