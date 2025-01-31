"use client";

import React, { useActionState } from "react";

import { signUpCredensial } from "@/lib/action";
import { RegisterButton } from "@/components/button";


const RegisterForm: React.FC = () => {
  const [state, formAction] = useActionState(signUpCredensial, null);

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
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nama
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-red-500 text-sm mt-2">
            {state?.error?.name}
          </span>
        </div>
      </div>
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
          placeholder="alex@gmail.com"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-red-500 text-sm mt-2">
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
          placeholder="********"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-red-500 text-sm mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Konfirmasi Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="********"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-red-500 text-sm mt-2">
            {state?.error?.confirmPassword}
          </span>
        </div>
      </div>
      <RegisterButton />
    </form>
  );
};

export default RegisterForm;
