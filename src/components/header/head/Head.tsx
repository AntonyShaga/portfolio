import React from 'react';
import style from './Head.module.css'

export const Head = () => {
    return (
        <div className={style.wrapper}>
            <header className={`${style.container} ${style.header}`}>
                <div className={style.title__wrapper}>
                    <h1 className={style.title}>
                        Привет! <br/>
                        Меня зовут Антон. <br/>
                        Я Front-end developer. <br/>
                    </h1>
                </div>
                <div className={style.img__container}>
                    <img src='./head/header/foto/anime-like-gintama.png' alt=""/>
                </div>
            </header>
        </div>
    );
};