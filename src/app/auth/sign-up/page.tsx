'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (email === '' || password === '' || confirmPassword === '') {
        toast.error('Please fill all the fields.');
        return;
      }
      setLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Something went wrong');
      }
      const login = await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/default',
        redirect: false,
      });

      if (login.error) {
        toast.error('An error occured.');
        return;
      }

      if (login.ok) {
        toast.success('Account created successfully.');
        window.location.href = '/search';
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-16  flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[5vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign Up
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Create an account to start using Game Collect.
            </p>
            <div
              className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white"
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/search',
                })
              }
            >
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </p>
            </div>
            <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white">
              <div className="rounded-full text-xl">
                <FaDiscord className="text-blue-400" />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Discord
              </p>
            </div>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email"
              placeholder="mail@example.com"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Username */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Username"
              placeholder="Your username"
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password"
              placeholder="********"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Confirm Password"
              placeholder="********"
              id="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="linear mt-3 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              onClick={handleRegister}
            >
              {loading ? (
                <div className="flex h-full w-full items-center justify-center px-10">
                  <AiOutlineLoading className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
            <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Already have an account?
              </span>
              <a
                href="/auth/sign-in/"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SignUp;
