import AuthLayout from '../layout';
import { SignUpForm } from './user-register-form';

type Props = {
   token: string;
};

export default function RegisterView({ token }: Props) {
   return (
      <AuthLayout type="signup">
         <SignUpForm token={token} />
      </AuthLayout>
   );
}
