import React, {ChangeEvent} from 'react';
import style from './SimpleTextArea.module.css'

type Props =  {
    value: string
    callbackValue: (e: string) => void
}
export const SimpleTextArea = (props:Props) => {
    const {value,callbackValue} = props
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        callbackValue(e.currentTarget.value)
    }
    return (
        <div>
            <textarea name=""
                      id=""
                      value={value}
                      onChange={onChangeHandler}
                      className={style.container}
            >
            </textarea>
        </div>
    );
};