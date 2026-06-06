"use client";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { PullRequestsTable } from "@/components/dashboard/PullRequestsTable";
import { useDashboardStore } from "@/store/dashboardStore";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { DashboardSkeleton } from "./ui/dashSkeleton";
import { RefreshCw } from "lucide-react";

export const Dashboard = ({ workspaceId }: { workspaceId: string }) => {
  const isDashboardLoading = useDashboardStore(
    (state) => state.isDashboardLoading,
  );
  const metrics = useDashboardStore((state) => state.metrics);
  const prs = useDashboardStore((state) => state.prs);
  const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboard({ workspaceId });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchDashboard({ workspaceId });
  }, [fetchDashboard, workspaceId]);

  const lastAnalysis = metrics?.lastAnalysis
    ? formatDistanceToNow(new Date(metrics.lastAnalysis), { addSuffix: true })
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" months", "mo")
      .replace(" month", "mo")
      .replace(" years", "y")
      .replace(" year", "y")
    : "No analysis yet";

  if (isDashboardLoading && !isRefreshing) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="min-h-screen w-full space-y-6 px-6 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={isDashboardLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-semibold disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>
      <DashboardMetrics metrics={metrics} lastAnalysis={lastAnalysis} />
      <div className="pt-4">
        <PullRequestsTable prs={prs} />
      </div>
    </div>
  );
};
