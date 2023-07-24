import React, {FC} from 'react';
import {MySkills} from "../my skills/MySkills";
import {MyWorks} from "../my works/MyWorks";
import {Hiring} from "../hiring/Hiring";
import {Contacts} from "../contacts/Contacts";
import {PortfolioArrayType} from "../../redax/redax";

type PropsForMaintype = {
    main:PortfolioArrayType
    callbackValueInput: (value: string, id: string) => void
    callbackValueTextarea:(value:string)=>void
}
export const Main:React.FC<PropsForMaintype> = (
    {
        main,
        callbackValueInput,
        callbackValueTextarea,
    }
) => {
    return (
        <main>
            <MySkills mySkills={main.mySkills}/>
            <MyWorks myWorks={main.myWorks}/>
            <Hiring hiring={main.hireMe}/>
            <Contacts contacts={main.contacts} callbackValueInput={callbackValueInput} callbackValueTextarea={callbackValueTextarea}/>
        </main>
    );
};