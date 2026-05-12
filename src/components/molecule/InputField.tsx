import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Button from "../atom/Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Input from "../atom/Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  showForPassword?: boolean;
  className?: string;
  error?: string;
}

const InputField = ({
  label,
  type = "text",
  showForPassword = type === "password" ? true : false,
  className,
  error,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-end w-full space-y-1">

      <div className="relative">
        <Input
          variant={error ? "error" : "default"}
          type={type === "password" ? showPassword ? "text" : "password" : type}
          placeholder=" "
          className={className}
          {...props}
        />

        <label
          className={twMerge(clsx(
            `
            bg-background text-foreground/80 text-base text-start px-2 ml-3
            absolute left-0 top-0 -translate-y-1/2
            transition-all duration-100 ease-in
            pointer-events-none outline-none ring-0

            peer-focus:top-0 peer-focus:px-2 
            peer-focus:w-fit  

            peer-placeholder-shown:top-1/2 
            peer-disabled:bg-transparent
            `,
            error && "text-red-500"
          ))}
        >
          {label}
        </label>

        {type === "password" && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-background flex items-center justify-center">
            <Button
              type="button"
              className={error ? "text-red-500" : "text-foreground/80"}
              onClick={() => setShowPassword(prev => !prev)}
              size="icon"
              variant="ghost"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </Button>
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm text-start">{error}</p>}

      {(showForPassword && type === "password") &&
        <Link to="/forgot-password" className="text-sm text-foreground/80">Forgot Password?</Link>
      }
    </div>
  )
}

export default InputField;