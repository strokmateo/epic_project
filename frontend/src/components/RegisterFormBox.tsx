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

const registerSchema = z
    .object({
        email: z
            .string()
            .min(5, { message: "Email too short." })
            .max(64, { message: "Email too long." })
            .email({ message: "Invalid email address." }),
        username: z
            .string()
            .min(5, { message: "Username too short." })
            .max(16, { message: "Username too long." }),
        password: z
            .string()
            .min(8, { message: "Password too short." })
            .max(32, { message: "Password too long." })
            .refine((password) => /[A-Z]/.test(password), {
                message: "At least one uppercase letter required.",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "At least one lowercase letter required.",
            })
            .refine((password) => /\d/.test(password), {
                message: "At least one digit required.",
            }),
        repeatedPassword: z
            .string()
            .min(8, { message: "Password too short." })
            .max(32, { message: "Password too long." })
            .refine((password) => /[A-Z]/.test(password), {
                message: "At least one uppercase letter required.",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "At least one lowercase letter required.",
            })
            .refine((password) => /\d/.test(password), {
                message: "At least one digit required.",
            }),
    })
    .superRefine((data, ctx) => {
        // Check if passwords match
        if (data.password !== data.repeatedPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
                path: ["repeatedPassword"],
            });
        }
    });

type Register = z.infer<typeof registerSchema>;

export default function RegisterFormBox() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            repeatedPassword: "",
        },
    });

    async function onSubmit(values: Register) {
        try {
            const response = await axios.post(
                "https://localhost:7092/api/auth/register",
                values
            );
            console.log("Response:", response); // Log the success response

            navigate("/login"); // Redirect to login page
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                // Handle server errors
                const errorMessage = error.response.data || "An error occurred";

                form.setError("email", {
                    type: "server",
                    message: errorMessage,
                });
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <Card className="ml-[31%] p-[40px] bg-primary/50 border-none text-primary w-[741px] h-[802px]">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full h-full justify-between"
                >
                    <section className="flex flex-col gap-[20px] relative">
                        <FormField
                            control={form.control}
                            name="email"
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
                                            {...form.register("email", {
                                                required: "Email required",
                                            })}
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="EMAIL"
                                        />
                                    </FormControl>
                                    {/* Reserve space for error */}
                                    <div className="h-[20px] mt-2">
                                        {formState.errors.email && (
                                            <p className="text-red-500 text-sm">
                                                {formState.errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ formState }) => (
                                <FormItem>
                                    <img
                                        src={Circle}
                                        alt="circle"
                                        className="absolute top-[195px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...form.register("username", {
                                                required: "Username required",
                                            })}
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="USERNAME"
                                        />
                                    </FormControl>
                                    {/* Reserve space for error */}
                                    <div className="h-[20px] mt-2">
                                        {formState.errors.username && (
                                            <p className="text-red-500 text-sm">
                                                {
                                                    formState.errors.username
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
                                    <img
                                        src={Lock}
                                        alt="lock"
                                        className="absolute top-[348px] left-[25px]"
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
                        <FormField
                            control={form.control}
                            name="repeatedPassword"
                            render={({ formState }) => (
                                <FormItem>
                                    <img
                                        src={Lock}
                                        alt="lock"
                                        className="absolute top-[504px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...form.register(
                                                "repeatedPassword",
                                                {
                                                    required:
                                                        "Password required",
                                                }
                                            )}
                                            type="password"
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="REPEAT PASSWORD"
                                        />
                                    </FormControl>
                                    {/* Reserve space for error */}
                                    <div className="h-[20px] mt-2">
                                        {formState.errors.repeatedPassword && (
                                            <p className="text-red-500 text-sm">
                                                {
                                                    formState.errors
                                                        .repeatedPassword
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
                        className="w-full h-[99px] rounded-none text-[48px] font-auth"
                    >
                        REGISTER
                    </Button>
                </form>
            </FormProvider>
        </Card>
    );
}
