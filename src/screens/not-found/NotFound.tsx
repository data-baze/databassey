import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-brand-primary px-6">
      {/* Big 404 */}
      <h1 className="text-[100px] md:text-[160px] font-light leading-none text-brand-primary/20 tracking-widest mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-lg md:text-xl text-brand-primary/60 -mt-4 mb-6">
        The page you're looking for doesn’t exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-black 
                    text-sm font-medium border border-brand-primary/10 
                   hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-primary
                   transition"
      >
        <ArrowLeft size={16} />
        Go Back Home
      </Link>

      {/* Subtle fade animation */}
      <div className="animate-pulse mt-10 text-xs text-brand-primary/30">
        Lost in the void of the internet...
      </div>
    </div>
  );
}
