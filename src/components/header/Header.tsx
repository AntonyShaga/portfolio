import React from 'react';
import style from './Header.module.css'
import {Head} from "./head/Head";
import {SimpleButton} from "../button/SimpleButton";

export const Header = () => {
    return (
        <header className={style.wrapper}>
            <div className={`${style.header} ${style.container}`}>
                <ul className={style.menu}>
                    <li className={style.item}><SimpleButton name={'Главная'} onClick={() => {}}/></li>
                    <li className={style.item}><SimpleButton name={'Скилы'} onClick={() => {}}/></li>
                    <li className={style.item}><SimpleButton name={'Работы'} onClick={() => {}}/></li>
                    <li className={style.item}><SimpleButton name={'Контакты'} onClick={() => {}}/></li>
                </ul>
            </div>
            <Head/>
        </header>

    );
};
