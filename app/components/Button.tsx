import React, { Ref } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement> | undefined;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    disabled,
    type = "button",
    ref,
    ...props
}) => {
    return (
        <button
            type={type}
            className={twMerge(
                `w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition-all`,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
