import React from 'react';
import style from './Header.module.css'
import {Head} from "./head/Head";
import {SimpleButton} from "../button/SimpleButton";

export const Header = () => {
    return (
        <header className={style.wrapper}>
            <div className={`${style.header} ${style.container}`}>
                <ul className={style.menu}>
                    <li className={style.item}><SimpleButton  onClick={() => {}}>{'Главная'}</SimpleButton></li>
                    <li className={style.item}><SimpleButton  onClick={() => {}}>{'Скилы'}</SimpleButton></li>
                    <li className={style.item}><SimpleButton  onClick={() => {}}>{'Работы'}</SimpleButton></li>
                    <li className={style.item}><SimpleButton  onClick={() => {}}>{'Контакты'}</SimpleButton></li>
                </ul>
            </div>
            <Head/>
        </header>

    );
};
