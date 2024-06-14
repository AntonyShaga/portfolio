import React from "react";
import {SimpleButton} from "../../button/SimpleButton";
import {MyWorkDescription} from "./my work description/MyWorkDescription";
import {MyWorkDescriptionType, MyWorkPhotoType} from "../../../redax/redax";
import style from './MyWork.module.css'

type PropsForMyWork = {
    myWorksButton: string
    myWorkPhoto: MyWorkPhotoType
    myWorkDescription: MyWorkDescriptionType
}
export const MyWork: React.FC<PropsForMyWork> = (
    {
        myWorkDescription,
        myWorkPhoto,
        myWorksButton
    }
) => {
    return (
        <div className={style.my__work__container}>
            <div>
                <img src={myWorkPhoto.url} alt=""/>
                <SimpleButton onClick={()=>{}}>{myWorksButton}</SimpleButton>
            </div>
            <MyWorkDescription myWorkDescription={myWorkDescription}/>
        </div>
    )
}