import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {onChangeInputValueAC, onChangeTextAreaValueAC, PortfolioArrayType} from "./redax/redax";
import {RootStoreType} from "./redax/store";
import {Footer} from "./components/footer/Footer";
import {Main} from "./components/main/Main";

function App() {
    const dispatch = useDispatch()
    const portfolioArray = useSelector<RootStoreType, PortfolioArrayType>(state => state)

    const callbackValueInput = (value:string,id:string) => {
        dispatch(onChangeInputValueAC(value,id))
    }
    const callbackValueTextarea = (value:string) => {
        dispatch(onChangeTextAreaValueAC(value))
    }

    return (
        <div className={'container'}>
            <Header hederMenu={portfolioArray}/>
            <Main main={portfolioArray} callbackValueInput={callbackValueInput} callbackValueTextarea={callbackValueTextarea}/>
            <Footer footer={portfolioArray.footer}/>
        </div>
    );
}

export default App;
