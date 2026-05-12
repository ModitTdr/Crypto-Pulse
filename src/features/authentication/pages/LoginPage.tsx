import Button from "@/components/atom/Button"
import { useForm } from "react-hook-form"
import LoginSchema from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/molecule/InputField";
import { Link } from "react-router";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: { email: string, password: string }) => {
    console.log(data);
  }

  return (
    <section className="space-y-16 w-full max-w-[440px] p-10 py-14 shadow-md border border-foreground-muted/10 rounded-sm">
      <div className="text-center space-y-1">
        <h1 className="text-4xl lg:text-[3vw] font-bold leading-none">Sign In</h1>
        <p className="text-lg lg:text-[1.2vw] text-foreground-muted">Login to your account to get started</p>
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
            {...register("password", { required: "Password required" })}
            error={errors.password?.message}
          />
        </div>
        <Button>
          Sign In
        </Button>

        <div className="text-foreground-muted">
          <p>Don't have an account? <Link to="/register" className="text-foreground">Register</Link></p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage