import { FormProvider, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Circle from "@/assets/images/circle.svg";
import Lock from "@/assets/images/lock.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    emailUsername: z
        .string()
        .min(5, { message: "Username / Email too short." })
        .max(64, { message: "Username / Email too long." }),
    password: z
        .string()
        .min(8, { message: "Password too short." })
        .max(32, { message: "Password too long." }),
});

type Login = z.infer<typeof loginSchema>;

export default function LoginFormBox() {
    const navigate = useNavigate();
    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailUsername: "",
            password: "",
        },
    });

    async function onSubmit(values: Login) {
        try {
            const response = await axios.post(
                "https://localhost:7092/api/auth/login",
                values
            );
            console.log("Response:", response);
            navigate("/map");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const errorMessage =
                    error.response.data || "An error occurred";
                form.setError("password", {
                    type: "server",
                    message: errorMessage,
                });
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
            <Card className="p-6 bg-primary/50 border-none text-primary w-full max-w-[741px] md:w-[500px] lg:w-[741px]">
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col w-full gap-6"
                    >
                        <section className="flex flex-col gap-5 relative">
                            <FormField
                                control={form.control}
                                name="emailUsername"
                                render={({ formState }) => (
                                    <FormItem>
                                        <div className="relative">
                                            <img
                                                src={Circle}
                                                alt="circle"
                                                className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 md:w-8"
                                                draggable="false"
                                            />
                                            <FormControl>
                                                <Input
                                                    {...form.register(
                                                        "emailUsername",
                                                        {
                                                            required:
                                                                "Email / Username required",
                                                        }
                                                    )}
                                                    className="h-[60px] md:h-[80px] text-lg md:text-2xl text-center font-auth bg-transparent text-white border-gray-400 w-full"
                                                    placeholder="USERNAME"
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="h-[20px] mt-2">
                                            {formState.errors.emailUsername && (
                                                <p className="text-red-500 text-sm">
                                                    {
                                                        formState.errors
                                                            .emailUsername
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ formState }) => (
                                    <FormItem>
                                        <div className="relative">
                                            <img
                                                src={Lock}
                                                alt="lock"
                                                className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 md:w-8"
                                                draggable="false"
                                            />
                                            <FormControl>
                                                <Input
                                                    {...form.register(
                                                        "password",
                                                        {
                                                            required:
                                                                "Password required",
                                                        }
                                                    )}
                                                    type="password"
                                                    className="h-[60px] md:h-[80px] text-lg md:text-2xl text-center font-auth bg-transparent text-white border-gray-400 w-full"
                                                    placeholder="PASSWORD"
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="h-[20px] mt-2">
                                            {formState.errors.password && (
                                                <p className="text-red-500 text-sm">
                                                    {
                                                        formState.errors
                                                            .password.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </section>

                        <Button
                            type="submit"
                            className="w-full h-[60px] md:h-[80px] text-xl md:text-3xl font-auth"
                        >
                            LOGIN
                        </Button>
                    </form>
                </FormProvider>
            </Card>
        </div>
    );
}
