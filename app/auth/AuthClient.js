
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLogin, setIsLogin] = useState(
    searchParams.get('mode') !== 'register'
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const e = {};
    if (!formData.email) e.email = 'Email required';
    if (formData.password.length < 8) e.password = 'Minimum 8 characters';

    if (!isLogin) {
      if (!formData.firstName) e.firstName = 'First name required';
      if (!formData.lastName) e.lastName = 'Last name required';
      if (formData.password !== formData.confirmPassword)
        e.confirmPassword = 'Passwords do not match';
      if (!formData.acceptTerms) e.acceptTerms = 'Accept terms';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSuccess(true);
    setLoading(false);

    setTimeout(() => router.push('/account'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md border rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>

        {success ? (
          <div className="text-center">
            <Check className="mx-auto h-12 w-12 text-green-600" />
            <p className="mt-4 font-semibold">
              {isLogin ? 'Login successful' : 'Account created'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <>
                <input name="firstName" placeholder="First Name"
                  className="w-full border p-3 rounded"
                  onChange={handleChange} />

                <input name="lastName" placeholder="Last Name"
                  className="w-full border p-3 rounded"
                  onChange={handleChange} />
              </>
            )}

            <input name="email" placeholder="Email"
              className="w-full border p-3 rounded"
              onChange={handleChange} />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full border p-3 rounded pr-10"
                onChange={handleChange}
              />
              <button type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {!isLogin && (
              <>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                />

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="acceptTerms" onChange={handleChange} />
                  I accept terms & privacy policy
                </label>
              </>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#2596be] text-white py-3 rounded font-bold flex items-center justify-center gap-2">
              {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight />
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#2596be] font-semibold">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#2596be]">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

// export default function AuthClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [isLogin, setIsLogin] = useState(
//     searchParams.get('mode') !== 'register'
//   );

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     const e = {};
//     if (!formData.email) e.email = 'Email required';
//     if (formData.password.length < 8) e.password = 'Minimum 8 characters';

//     if (!isLogin) {
//       if (!formData.firstName) e.firstName = 'First name required';
//       if (!formData.lastName) e.lastName = 'Last name required';
//       if (formData.password !== formData.confirmPassword)
//         e.confirmPassword = 'Passwords do not match';
//       if (!formData.acceptTerms) e.acceptTerms = 'Accept terms';
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     await new Promise(r => setTimeout(r, 1200));
//     setSuccess(true);
//     setLoading(false);

//     setTimeout(() => router.push('/account'), 1200);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div className="w-full max-w-md border rounded-2xl shadow-xl p-8">

//         <h1 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? 'Sign In' : 'Create Account'}
//         </h1>

//         {success ? (
//           <div className="text-center">
//             <Check className="mx-auto h-12 w-12 text-green-600" />
//             <p className="mt-4 font-semibold">
//               {isLogin ? 'Login successful' : 'Account created'}
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">

//             {!isLogin && (
//               <>
//                 <input name="firstName" placeholder="First Name"
//                   className="w-full border p-3 rounded"
//                   onChange={handleChange} />

//                 <input name="lastName" placeholder="Last Name"
//                   className="w-full border p-3 rounded"
//                   onChange={handleChange} />
//               </>
//             )}

//             <input name="email" placeholder="Email"
//               className="w-full border p-3 rounded"
//               onChange={handleChange} />

//             <div className="relative">
//               <input
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 className="w-full border p-3 rounded pr-10"
//                 onChange={handleChange}
//               />
//               <button type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-500">
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>

//             {!isLogin && (
//               <>
//                 <input
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Confirm Password"
//                   className="w-full border p-3 rounded"
//                   onChange={handleChange}
//                 />

//                 <label className="flex items-center gap-2 text-sm">
//                   <input type="checkbox" name="acceptTerms" onChange={handleChange} />
//                   I accept terms & privacy policy
//                 </label>
//               </>
//             )}

//             <button
//               disabled={loading}
//               className="w-full bg-[#2596be] text-white py-3 rounded font-bold flex items-center justify-center gap-2">
//               {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
//               <ArrowRight />
//             </button>
//           </form>
//         )}

//         <p className="text-center text-sm mt-6">
//           {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
//           <button onClick={() => setIsLogin(!isLogin)} className="text-[#2596be] font-semibold">
//             {isLogin ? 'Sign up' : 'Sign in'}
//           </button>
//         </p>

//         <div className="text-center mt-4">
//           <Link href="/" className="text-sm text-gray-500 hover:text-[#2596be]">
//             ← Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
