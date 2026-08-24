"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>!</h1>
        <h2 className="text-2xl font-bold text-[#2B2C30] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>SOMETHING WENT WRONG</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-gold">
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}
