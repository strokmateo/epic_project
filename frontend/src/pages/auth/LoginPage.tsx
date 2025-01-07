import AuthPipeline from "../../components/AuthPipeline";
import LoginFormBox from "../../components/LoginFormBox";

export default function LoginPage() {
    return (
        // <div className={"bg-auth-background bg-cover h-screen bg-center"}>
        // </div>

        // Pipeline for the login / register welcome animation and rendering
        // login / register screen. For details check the component.
        <AuthPipeline authFormComponent={<LoginFormBox />} />
    );
}
