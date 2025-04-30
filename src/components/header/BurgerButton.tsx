'use client'
import Cross from "@/icons/Cross";
import Burger from "@/icons/Burger";

interface BurgerButtonProps {
    open: boolean;
    onClick: () => void;
}

export default function BurgerButton({open, onClick}: BurgerButtonProps) {
    return (
        <button onClick={onClick} aria-label="Toggle menu">
            {open ? <Cross className={"w-6 h-6"}/> : <Burger className={"w-6 h-6"}/>}
        </button>
    )
}
