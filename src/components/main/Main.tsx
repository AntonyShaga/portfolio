import React from 'react';
import {MySkills} from "../my skills/MySkills";
import {MyWorks} from "../my works/MyWorks";
import {Hiring} from "../hiring/Hiring";
import {Contacts} from "../contacts/Contacts";
import {PortfolioArrayType} from "../../redax/redax";
import {Navigate, Route, Routes,} from "react-router-dom";

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
            <Routes>
                <Route path={'/'} element={<Navigate to={'/head'}/>}/>
                <Route path='/skill' element={<MySkills mySkills={main.mySkills}/>}/>
                <Route path='/prodject' element={<MyWorks myWorks={main.myWorks}/>}/>
            </Routes>
            <MySkills mySkills={main.mySkills}/>
            <MyWorks myWorks={main.myWorks}/>
            <Hiring/>
            <Contacts contacts={main.contacts} callbackValueInput={callbackValueInput} callbackValueTextarea={callbackValueTextarea}/>
        </main>
    );
};