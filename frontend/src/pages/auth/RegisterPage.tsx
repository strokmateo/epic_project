import AuthPipeline from "../../components/AuthPipeline";
import RegisterFormBox from "../../components/RegisterFormBox";

export default function RegisterPage() {
    return <AuthPipeline authFormComponent={<RegisterFormBox />} />;
}
