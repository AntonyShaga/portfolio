import React from 'react';
import {SimpleInput} from "../input/SimpleInput";
import {ContactsType} from "../../redax/redax";
import {Title} from "../title/Title";
import style from './Contacts.module.css'
import {SimpleButton} from "../button/SimpleButton";
import {SimpleTextArea} from "../textarea/SimpleTextArea";

type PropsForContactstype = {
    contacts: ContactsType
    callbackValueInput: (value: string, id: string) => void
    callbackValueTextarea:(value:string)=>void
}
export const Contacts: React.FC<PropsForContactstype> = (
    {
        contacts,
        callbackValueInput,
        callbackValueTextarea,
    }
) => {
    const callbackValue = (e: string, id: string) => {
        callbackValueInput(e, id)
        console.log(id)
    }
    const callbackValueTextAreaValue = (value:string) => {
        callbackValueTextarea(value)
    }

    let input = contacts.contactsArray.map(el => <SimpleInput key={el.id} callbackValue={callbackValue} id={el.id}
                                                              value={el.inputValue}/>)
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div>
                    <Title title={contacts.contactsTitle}/>
                </div>
                <form className={style.form}>
                    {input}
                    <SimpleTextArea callbackValue={callbackValueTextAreaValue} value={contacts.contactsTextArea}/>
                    <SimpleButton title={contacts.contactsButton}/>
                </form>
            </div>
        </div>
    );
};