import image from "../assets/images/pawrfect-registration-4.png";
import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function Register() {


  return (
      <AuthLayout image={image}>
        <RegisterForm />
      </AuthLayout>
  );
}
