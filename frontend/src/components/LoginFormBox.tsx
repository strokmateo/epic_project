import { Form, useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

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

    function onSubmit(values: z.infer<typeof loginSchema>) {}

    return (
        <Card className="ml-[162px] bg-primary/50 border-none text-secondary w-[593px] h-[425px]">
            <Form>
                <form onSubmit={form.handleSubmit(onSubmit)}></form>
                <FormField
                    control={form.control}
                    name="emailUsername"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="USERNAME" ></Input>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </Form>
        </Card>
    );
}
