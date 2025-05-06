
import { AuthForm } from '@/components/auth/AuthForm';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-end">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">MandateFlow</h1>
          <p className="text-muted-foreground">Simplified Loan Management</p>
        </div>
        
        <AuthForm />
        
        <p className="mt-8 text-sm text-center text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </main>
    </div>
  );
}
