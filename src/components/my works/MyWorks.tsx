import React from 'react';
import {Title} from "../title/Title";
import {MyWorksType} from "../../redax/redax";
import {MyWork} from "./my work/MyWork";
import style from './MyWorks.module.css'
type PropsForMyWorks = {
    myWorks: MyWorksType
}
export const MyWorks: React.FC<PropsForMyWorks> = (
    {
        myWorks
    }
) => {

    let myWork = myWorks.myWork.map(el => <MyWork key={el.id} myWorkDescription={el.myWorkDescription} myWorkPhoto={el.myWorkPhoto}
                                                  myWorksButton={el.myWorksButton}/>)
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Title title={myWorks.title}/>
                <div className={style.my__works__container}>
                    {myWork}
                </div>
            </div>
        </div>

    );
};







