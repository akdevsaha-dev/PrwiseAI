"use client";

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-[200vh] w-full space-y-6 px-5 animate-pulse">
      {/* Top Metrics */}
      <div className="w-full gap-3 flex mt-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-1 flex justify-between px-4 py-5 h-34 rounded-lg dark:bg-neutral-900/70 bg-neutral-100 border dark:border-neutral-800 border-neutral-300"
          >
            <div className="space-y-4 w-full">
              <div className="h-3 w-28 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-6 w-16 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-3 w-24 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>

            <div className="w-8 h-8 rounded-md bg-neutral-300 dark:bg-neutral-700"></div>
          </div>
        ))}
      </div>

      {/* PR Table */}
      <div className="dark:bg-[#141415] bg-neutral-100 border dark:border-white/10 border-neutral-300 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="h-5 w-48 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
        </div>

        {/* Table */}
        <div className="h-100 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="dark:text-gray-400 text-neutral-500 sticky top-0 dark:bg-[#101011] bg-neutral-200 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3">PR Title</th>
                <th className="text-left px-6 py-3">Repository</th>
                <th className="text-left px-6 py-3">Author</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Risk</th>
                <th className="text-left px-6 py-3">AI Review</th>
                <th className="text-left px-6 py-3">Created</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-6 py-4">
                    <div className="h-4 w-56 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                    <div className="h-4 w-20 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-16 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-16 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
