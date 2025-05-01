'use client'
import Cross from "@/icons/Cross";
import Burger from "@/icons/Burger";
import Button from "@/components/ui/Button";

interface BurgerButtonProps {
    open: boolean;
    onClickAction: () => void;
}

export default function BurgerButton({open, onClickAction}: BurgerButtonProps) {
    return (
        <Button onClick={onClickAction} aria-label="Toggle menu">
            {open ? <Cross className={"w-6 h-6"}/> : <Burger className={"w-6 h-6"}/>}
        </Button>
    )
}
