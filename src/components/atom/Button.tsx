
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "primary";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = ({ children, className, variant = 'default', size = "md", ...props }: ButtonProps) => {
  const baseStyle = "w-full py-3 px-4 border border-black/20 rounded-sm relative overflow-hidden flex items-center justify-center transition-all duration-200"

  const variantStyle = {
    default: "bg-foreground text-background",
    outline: "bg-transparent text-foreground",
    ghost: "bg-transparent text-foreground border-0",
    primary: "bg-primary/90 text-white border-0 hover:bg-primary"
  };
  const sizeStyle = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "w-6 h-6 p-0 flex items-center justify-center",
  };


  return (
    <button
      {...props}
      className={
        twMerge(
          clsx(
            baseStyle,
            variantStyle[variant],
            sizeStyle[size],
            className,
          )
        )
      }
    >
      {children}
    </button>
  )
}

export default Button