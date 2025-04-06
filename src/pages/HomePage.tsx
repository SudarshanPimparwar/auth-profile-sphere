
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-grow">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Welcome to AuthFlow
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A secure and easy-to-use authentication system with JWT tokens and profile management.
                </p>
              </div>
              <div className="space-x-4">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <Button className="group">
                      Go to Profile 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="group">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="group">
                        Sign Up 
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
                <p className="text-muted-foreground">JWT token-based authentication for secure login and session management.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">Profile Management</h3>
                <p className="text-muted-foreground">Update and manage your profile information with ease.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">Client List</h3>
                <p className="text-muted-foreground">View and manage your client information from a central dashboard.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 lg:gap-6 md:items-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              © 2025 AuthFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
