import React from 'react';
import {HireMeType} from "../../redax/redax";
import {Title} from "../title/Title";
import {SimpleButton} from "../button/SimpleButton";
import style from './Hiring.module.css'
type PropsForHiringType = {
    hiring:HireMeType
}
export const Hiring:React.FC<PropsForHiringType> = (
    {
        hiring
    }
) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Title title={hiring.hiringTitle}/>
                <div className={style.hiring}>
                    <SimpleButton title={hiring.hiringButton}/>
                </div>
            </div>
        </div>
    );
};