import React from "react";
import {MyWorkDescriptionTitle} from "./my work description title/MyWorkDescriptionTitle";
import {MyWorkDescriptionText} from "./my work description text/MyWorkDescriptionText";
import {MyWorkDescriptionType} from "../../../../redax/redax";
type PropsForMyWorkDescriptionType = {
    myWorkDescription: MyWorkDescriptionType
}
export const MyWorkDescription:React.FC<PropsForMyWorkDescriptionType> = (
    {
        myWorkDescription
    }
) => {
    return (
        <div>
            <MyWorkDescriptionTitle myWorkDescriptionTitle={myWorkDescription.projectName}/>
            <MyWorkDescriptionText myWorkDescriptionText={myWorkDescription.shortDescription}/>
        </div>
    )
}