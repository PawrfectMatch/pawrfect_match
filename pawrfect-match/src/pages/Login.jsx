import image from "../assets/images/login-transp-8.png";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function Login() {


  return (
      <AuthLayout image={image}>
        <LoginForm />
      </AuthLayout>
  );
}
