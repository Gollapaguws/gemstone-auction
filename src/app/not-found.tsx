import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold text-[#EDED3B] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>404</h1>
        <h2 className="text-2xl font-bold text-[#2B2C30] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>PAGE NOT FOUND</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-gold inline-block">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
