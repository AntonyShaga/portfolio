import React from "react";
type PropsForMyWorkDescriptionTitletype = {
    myWorkDescriptionTitle:string
}
export const MyWorkDescriptionTitle:React.FC<PropsForMyWorkDescriptionTitletype> = (
    {
        myWorkDescriptionTitle
    }
) => {
    return (
        <h3>{myWorkDescriptionTitle}</h3>
    )
}