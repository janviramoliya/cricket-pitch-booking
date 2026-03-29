// Spinner Loader
export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Dots Loader
export function DotsLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300" />
    </div>
  );
}

// Full Screen Loader
export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
}

// Skeleton Loader Card
export function SkeletonCard() {
  return (
    <div className="p-4 border rounded-xl shadow w-72 animate-pulse">
      <div className="h-40 bg-gray-300 rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3" />
    </div>
  );
}
