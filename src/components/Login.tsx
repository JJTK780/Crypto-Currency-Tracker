import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
        <h1 className="mb-6 text-2xl font-bold text-center text-black dark:text-white">
          Sign in to Trackibit
        </h1>
        <SignIn />
      </div>
    </div>
  );
}
