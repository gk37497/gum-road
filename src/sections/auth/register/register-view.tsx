import AuthLayout from '../layout';
import { SignUpForm } from './user-register-form';

export default function RegisterView() {
   return (
      <AuthLayout type="signup">
         <SignUpForm />
      </AuthLayout>
   );
}
