import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './SimpleButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type Props = DefaultButtonPropsType & {
    onClick: () => void
    children: React.ReactNode
}
export const SimpleButton = ({children, onClick}: Props) => {
    return (
        <>
            <button className={style.button} onClick={onClick}>{children}</button>
        </>
    );
};
