import { FormProvider, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Circle from "@/assets/images/circle.svg";
import Lock from "@/assets/images/lock.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const registerSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address." }).min(5).max(64),
        username: z.string().min(5).max(16),
        password: z.string()
            .min(8)
            .max(32)
            .regex(/[A-Z]/, "At least one uppercase letter required.")
            .regex(/[a-z]/, "At least one lowercase letter required.")
            .regex(/\d/, "At least one digit required."),
        repeatedPassword: z.string()
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.repeatedPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
                path: ["repeatedPassword"],
            });
        }
    });

export default function RegisterFormBox() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            repeatedPassword: "",
        },
    });

    async function onSubmit(values) {
        try {
            await axios.post("https://localhost:7092/api/auth/register", values);
            navigate("/map");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                form.setError("email", { type: "server", message: error.response.data || "An error occurred" });
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
            <Card className="p-6 bg-primary/50 border-none text-primary w-full max-w-[1000px]">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">
                        {['email', 'username', 'password', 'RepeatedPassword'].map((field, index) => (
                            <FormField key={field} control={form.control} name={field} render={({ formState }) => (
                                <FormItem>
                                    <div className="relative">
                                        <img src={field.includes("password") ? Lock : Circle} alt={field} 
                                            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 md:w-8" 
                                            draggable="false" />
                                        <FormControl>
                                            <Input {...form.register(field, { required: `${field} required` })} 
                                                type={field.includes("password") ? "password" : "text"} 
                                                className="h-[60px] md:h-[80px] text-lg md:text-2xl text-center font-auth bg-transparent text-white border-gray-400 w-full"
                                                placeholder={field.toUpperCase()} />
                                        </FormControl>
                                    </div>
                                    {formState.errors[field] && (
                                        <p className="text-red-500 text-sm mt-2">{formState.errors[field].message}</p>
                                    )}
                                </FormItem>
                            )} />
                        ))}
                        <Button type="submit" className="w-full h-[60px] md:h-[80px] text-xl md:text-3xl font-auth">REGISTER</Button>
                    </form>
                </FormProvider>
            </Card>
        </div>
    );
}