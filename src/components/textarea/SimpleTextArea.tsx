import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from './SimpleTextArea.module.css'
type DefaultTextAreaPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>

type PropsForSimpleTextAreaType = Omit<DefaultTextAreaPropsType, 'type'> & {
    value: string
    callbackValue: (e: string) => void
}
export const SimpleTextArea:React.FC<PropsForSimpleTextAreaType> = (
    {
        value,
        callbackValue
    }
) => {
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