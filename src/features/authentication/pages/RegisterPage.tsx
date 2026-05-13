import Button from "@/components/atom/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/molecule/InputField";
import { Link } from "react-router";
import RegisterSchema from "../schema/registerSchema";
import { signUp } from "../services/authService";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (data: { email: string, password: string, confirmPassword: string }) => {
    signUp(data)
  }

  return (
    <section className="space-y-16 w-full max-w-[440px] p-10 py-14 shadow-md border border-subtle rounded-sm">
      <div className="text-center space-y-1">
        <h1 className="text-4xl lg:text-[3vw] font-bold leading-none">Register</h1>
        <p className="text-lg lg:text-[1.2vw] text-foreground-muted">Create an account to get started</p>
      </div>
      <form className="text-center space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <InputField
            label="Email"
            type="email"
            {...register("email", { required: "Email required" })}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            showForPassword={false}
            {...register("password", { required: "Password required" })}
            error={errors.password?.message}
          />
          <InputField
            label="Confirm Password"
            type="password"
            showForPassword={false}
            {...register("confirmPassword", { required: "Confirm Password required" })}
            error={errors.confirmPassword?.message}
          />
        </div>
        <Button variant="primary">
          Sign Up
        </Button>

        <div className="text-foreground-muted">
          <p>Already have a account? <Link to="/login" className="text-foreground">Login</Link></p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage