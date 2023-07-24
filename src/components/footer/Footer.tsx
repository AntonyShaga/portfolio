import React from 'react';
import {FooterType} from "../../redax/redax";
import {Title} from "../title/Title";
import style from './Footer.module.css'

type PropsForFooterType = {
    footer:FooterType
}
export const Footer = (props:PropsForFooterType) => {
    return (
        <footer className={style.wrapper}>
            <div className={style.container}>
                <Title title={props.footer.titleFooter}/>
                <div className={style.footer__box__container}>
                    <div className={style.footer__box}>
                        <div className={style.box}></div>
                        <div  className={style.box}></div>
                        <div  className={style.box}></div>
                        <div  className={style.box}></div>
                    </div>
                </div>

                <div className={style.foter__info}>
                    {props.footer.footer}
                </div>
            </div>
        </footer>
    );
};