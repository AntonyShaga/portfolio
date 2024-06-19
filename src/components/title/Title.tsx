import React, {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';
import style from "../my skills/MySkills.module.css";

type Props<T extends ElementType = 'h1'> = {
    as?: T
    className?:string
    children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Title =<T extends ElementType = 'h1'> (props: Props<T>) => {
    const {children,as: Component = 'h1' ,className} = props
    return (
        <Component className={!className ? style.title : className}>
            {children}
        </Component>
    );
};