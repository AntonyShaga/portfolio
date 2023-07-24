import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './SimpleButton.module.css'
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SimpleButtonPropsType = DefaultButtonPropsType & {
    title: string
}
export const SimpleButton: React.FC<SimpleButtonPropsType> = (
    {
        title
    }
) => {
    return (
        <button className={style.button} >
            {title}
        </button>
    );
};
