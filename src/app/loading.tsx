export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#EDED3B] border-t-[#2B2C30] rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-sm tracking-wider uppercase" style={{ fontFamily: "Poppins, sans-serif" }}>Loading...</p>
      </div>
    </div>
  );
}
