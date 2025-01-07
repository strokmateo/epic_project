import AuthPipeline from "../../components/AuthPipeline";

export default function LoginPage() {
    return (
        // <div className={"bg-auth-background bg-cover h-screen bg-center"}>
        // </div>

        <AuthPipeline authType={"login"} />
    );
}
