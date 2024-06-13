import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './SimpleButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type Props = DefaultButtonPropsType & {
    name: string
    onClick: () => void
}
export const SimpleButton = ({name, onClick}: Props) => {
    return (
        <>
            <button className={style.button} onClick={onClick}>{name}</button>
        </>
    );
};
