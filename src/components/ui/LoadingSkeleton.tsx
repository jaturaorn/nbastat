export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-lg border border-gray-200 shadow-lg p-6 animate-pulse w-full">
      {/* Player Name - h2 text-2xl */}
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>

      {/* Draft Number - h4 text-lg */}
      <div className="h-7 bg-gray-200 rounded w-1/3"></div>

      {/* Position - p */}
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>

      {/* Team Info Section - div flex flex-col gap-1 */}
      <div className="flex flex-col gap-1">
        {/* Team Info Header - h3 text-xl */}
        <div className="h-7 bg-gray-200 rounded w-1/4"></div>

        {/* Team name + Jersey - div flex justify-between */}
        <div className="flex justify-between items-center">
          <div className="h-7 bg-gray-200 rounded w-2/3"></div>
          <div className="h-7 bg-gray-200 rounded w-8"></div>
        </div>

        {/* Height - div flex justify-between */}
        <div className="flex justify-between">
          <div className="h-7 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
