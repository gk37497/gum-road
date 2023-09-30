import AuthLayout from '../layout';
import { UserAuthForm } from './user-login-form';

export default function LoginView() {
   return (
      <AuthLayout type="signin">
         <UserAuthForm />
      </AuthLayout>
   );
}
