
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className = "h-8 w-8" }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Loader2 className={`animate-spin text-accent ${className}`} />
    </div>
  );
};

export default LoadingSpinner;
