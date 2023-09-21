import { Metadata } from "next";
import { UserAuthForm } from "./form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginView() {
  return (
    <div className="container relative flex-col h-[100vh] items-center justify-center lg:grid lg:max-w-none md:grid-cols-2 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 h-full xs:p-2 sm:p-16">
        <div className="flex flex-col space-y-2 text-left absolute top-12 xs:left-2 sm:left-16">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back!
          </h1>
        </div>

        <UserAuthForm />
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 bg-[url('/images/login-banner.png')] bg-cover bg-center" />
      </div>
    </div>
  );
}
