import { FormProvider, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Circle from "@/assets/images/circle.svg";
import Lock from "@/assets/images/lock.svg";

const loginSchema = z.object({
    emailUsername: z
        .string()
        .min(5, { message: "Username / Email too short." })
        .max(16, { message: "Username / Email too long." }),
    password: z
        .string()
        .min(8, { message: "Password too short." })
        .max(32, { message: "Password too long." }),
});

type Login = z.infer<typeof loginSchema>;

export default function LoginFormBox() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailUsername: "",
            password: "",
        },
    });

    function onSubmit(values: Login) {
        console.log(values);
    }

    return (
        <Card className="ml-[31%] p-[40px] bg-primary/50 border-none text-primary w-[741px] h-[531px]">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full h-full justify-between"
                >
                    <section className="flex flex-col gap-[40px] relative">
                        <FormField
                            control={form.control}
                            name="emailUsername"
                            render={({ field }) => (
                                <FormItem>
                                    <img
                                        src={Circle}
                                        alt="circle"
                                        className="absolute top-[39px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="USERNAME"
                                        ></Input>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <img
                                        src={Lock}
                                        alt="lock"
                                        className="absolute top-[185px] left-[25px]"
                                        draggable="false"
                                    />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            className="h-[99px] rounded-none text-center !text-[36px] font-auth bg-transparent text-white border-gray-400"
                                            placeholder="PASSWORD"
                                        ></Input>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </section>
                    <Button
                        type="submit"
                        className="w-full h-[99px] rounded-none text-[48px] font-auth"
                    >
                        LOGIN
                    </Button>
                </form>
            </FormProvider>
        </Card>
    );
}
