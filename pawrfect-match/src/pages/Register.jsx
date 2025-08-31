import image from "../assets/images/registration.png";
import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function Register() {


  return (
      <AuthLayout image={image}>
        <RegisterForm />
      </AuthLayout>
  );
}
