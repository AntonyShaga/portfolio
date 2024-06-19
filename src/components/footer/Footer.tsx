import React from 'react';
import {Title} from "../title/Title";
import style from './Footer.module.css'


export const Footer = () => {
    return (
        <footer className={style.wrapper}>
            <div className={style.container}>
                <Title as={'h2'}>{"Anton Shaga"}</Title>
                <div className={style.footer__box__container}>
                    <div className={style.footer__box}>
                        <div className={style.box}></div>
                        <div  className={style.box}></div>
                        <div  className={style.box}></div>
                        <div  className={style.box}></div>
                    </div>
                </div>

                <div className={style.foter__info}>
                    {"Все права защищены"}
                </div>
            </div>
        </footer>
    );
};