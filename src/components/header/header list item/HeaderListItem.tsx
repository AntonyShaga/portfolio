import React from 'react';
import style from './HeaderListItem.module.css'
import {SimpleButton} from "../../button/SimpleButton";

type PropsForHeaderListType = {
    title: string
}
export const HeaderListItem: React.FC<PropsForHeaderListType> = (
    {
        title
    }
) => {
    return (
        <>
            <li className={style.item}><SimpleButton title={title}/></li>
        </>
    );
};

