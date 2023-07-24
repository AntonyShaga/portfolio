import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from './SimpleInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>
type PropsForSimpleInput = Omit<DefaultInputPropsType, 'type'> & {
    callbackValue:(e:string,id:string)=>void
    id:string
}
export const SimpleInput: React.FC<PropsForSimpleInput> = (
    {
        value,
        callbackValue,
        id,

    }
) => {

    const onChangeCallback = (e:ChangeEvent<HTMLInputElement>)=> {
        callbackValue(e.currentTarget.value,id)
    }

    return (
        <div>
            <input type="text"
                   id={id}
                   value={value}
                   onChange={onChangeCallback}
                   className={style.container}
            />
        </div>
    );
};