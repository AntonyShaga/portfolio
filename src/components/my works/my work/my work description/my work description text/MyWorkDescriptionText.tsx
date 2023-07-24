import React from "react";
type PropsForMyWorkDescriptionTextType = {
    myWorkDescriptionText:string
}
export const MyWorkDescriptionText:React.FC<PropsForMyWorkDescriptionTextType> = (
    {
        myWorkDescriptionText
    }
) => {
    return (
        <p>
            {myWorkDescriptionText}
        </p>
    )
}