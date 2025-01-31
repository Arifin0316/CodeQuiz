"use client";

import React, { useActionState } from "react";

import { SignInCredensial } from "@/lib/action";
import { SignInButton } from "@/components/button";

const LoginForm: React.FC = () => {
  const [state, formAction] = useActionState(SignInCredensial, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.message && (
        <div
          className="text-red-800 text-sm p-4 mb-4 rounded-lg bg-red-100"
          role="alert"
        >
          {state?.message}
        </div>
      )}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='alex@gmail.com'
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live='polite' aria-atomic='true'>
          <span className='text-red-500 text-sm mt-2'>
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='********'
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live='polite' aria-atomic='true'>
          <span className='text-red-500 text-sm mt-2'>
            {state?.error?.password}
          </span>
        </div>
      </div>
      <SignInButton />
    </form>
  );
};

export default LoginForm;