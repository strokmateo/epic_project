import { FormProvider, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Circle from "@/assets/images/circle.svg";
import Lock from "@/assets/images/lock.svg";
import LoadingCircle from "@/assets/gifs/qubodup-loading2.gif";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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
    const { login } = useAuth();
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailUsername: "",
            password: "",
        },
    });

    async function onSubmit(values: Login) {
        try {
            setIsPosting(true);
            await login(values.emailUsername, values.password);
            navigate("/map"); // Redirect after successful login
        } catch (error) {
            form.setError("password", {
                type: "server",
                message: "Invalid email or password.",
            });
        } finally {
            setIsPosting(false);
        }
    }

    return (
        <Card className="ml-[31%] p-[40px] bg-primary/50 border-none text-primary w-[741px] h-[531px]">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full h-full justify-between"
                >
                    <section className="flex flex-col gap-[20px] relative">
                        <FormField
                            control={form.control}
                            name="emailUsername"
                            render={({ formState }) => (
                                <FormItem>
                                    <img
                                        src={Circle}
                                        alt="circle"
                                        className="absolute top-[39px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...form.register("emailUsername", {
                                                required:
                                                    "Email / Username required",
                                            })}
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="USERNAME"
                                        />
                                    </FormControl>
                                    {/* Reserve space for error */}
                                    <div className="h-[20px] mt-2">
                                        {formState.errors.emailUsername && (
                                            <p className="text-red-500 text-sm">
                                                {
                                                    formState.errors
                                                        .emailUsername.message
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
                                    <img
                                        src={Lock}
                                        alt="lock"
                                        className="absolute top-[192px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...form.register("password", {
                                                required: "Password required",
                                            })}
                                            type="password"
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="PASSWORD"
                                        />
                                    </FormControl>
                                    {/* Reserve space for error */}
                                    <div className="h-[20px] mt-2">
                                        {formState.errors.password && (
                                            <p className="text-red-500 text-sm">
                                                {
                                                    formState.errors.password
                                                        .message
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
                        disabled={isPosting ? true : false}
                        className="w-full relative h-[99px] rounded-none text-[48px] font-auth"
                    >
                        <>
                            <p>LOGIN</p>
                            {isPosting && (
                                <img
                                    src={LoadingCircle}
                                    alt="Loading circle"
                                    className="absolute right-5"
                                />
                            )}
                        </>
                    </Button>
                </form>
            </FormProvider>
        </Card>
    );
}
