"use client";

import { authClient } from "@/lib/auth-client";
import { useRepoStore } from "@/store/repoStore";
import { useUserStore } from "@/store/userStore";
import { axiosInstance } from "@/utils/instance";
import { LaptopMinimal, Loader, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type SettingsProps = {
  workspaceId: string;
  workspaceName: string;
};

export const Settings = ({ workspaceId, workspaceName }: SettingsProps) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const displayWorkspaceName = decodeURIComponent(workspaceName);
  const connectRepoUrl = useMemo(
    () =>
      `https://github.com/apps/prwise-ai/installations/new?state=${workspaceId}`,
    [workspaceId],
  );

  const user = useUserStore((state) => state.user);
  const isGettingUser = useUserStore((state) => state.isGettingUser);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const connected = useRepoStore((state) => state.connected);
  const installation = useRepoStore((state) => state.installation);
  const isGettingStatus = useRepoStore((state) => state.isGettingStatus);
  const getRepoStatus = useRepoStore((state) => state.getRepoStatus);

  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [confirmWorkspaceName, setConfirmWorkspaceName] = useState("");
  const isDeleteEnabled = confirmWorkspaceName.trim() === displayWorkspaceName;

  useEffect(() => {
    fetchUser();
    getRepoStatus({ workspaceId });
  }, [fetchUser, getRepoStatus, workspaceId]);

  const handleDisconnectRepo = async () => {
    if (!connected) {
      toast("No repository is connected to this workspace.");
      return;
    }

    const shouldContinue = window.confirm(
      "Disconnect the GitHub installation from this workspace?",
    );
    if (!shouldContinue) return;

    try {
      setIsDisconnecting(true);
      await axiosInstance.delete(
        `/v1/workspace/${workspaceId}/repo-connection`,
      );
      await getRepoStatus({ workspaceId });
      toast.success("Repository disconnected.");
    } catch (error) {
      console.error("Failed to disconnect repository", error);
      toast.error("Failed to disconnect repository.");
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!isDeleteEnabled) {
      toast.error("Type the workspace name to enable deletion.");
      return;
    }

    const shouldContinue = window.confirm(
      "This permanently deletes the workspace, pull requests, and analyses. Continue?",
    );
    if (!shouldContinue) return;

    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/v1/workspace/${workspaceId}`);
      toast.success("Workspace deleted.");
      router.push("/onboarding/workspace-setup");
    } catch (error) {
      console.error("Failed to delete workspace", error);
      toast.error("Failed to delete workspace.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-6 py-6 md:px-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm mt-1 dark:text-neutral-400 text-neutral-500">
          Manage workspace, account, and appearance preferences.
        </p>
      </div>

      <section className="rounded-xl border dark:border-neutral-800 border-neutral-300 dark:bg-neutral-900/60 bg-neutral-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Workspace</h2>
            <p className="text-sm mt-1 dark:text-neutral-400 text-neutral-500">
              {displayWorkspaceName}
            </p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full dark:bg-neutral-800 bg-neutral-200">
            ID: {workspaceId}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {isGettingStatus ? (
            <div className="text-sm dark:text-neutral-400 text-neutral-500">
              Checking repository connection...
            </div>
          ) : connected ? (
            <div className="text-sm dark:text-green-400 text-green-600">
              Connected to {installation?.accountLogin ?? "GitHub"}
            </div>
          ) : (
            <div className="text-sm dark:text-red-300 text-red-600">
              No repository connected
            </div>
          )}

          <Link
            href={connectRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs px-3 py-2 rounded-md dark:bg-neutral-800 bg-neutral-200 hover:opacity-90"
          >
            Connect repository
          </Link>

          <button
            onClick={handleDisconnectRepo}
            disabled={!connected || isDisconnecting}
            className="text-xs px-3 py-2 rounded-md border dark:border-neutral-700 border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDisconnecting ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" size={14} />
                Disconnecting...
              </span>
            ) : (
              "Disconnect repository"
            )}
          </button>
        </div>
      </section>

      <section className="rounded-xl border dark:border-neutral-800 border-neutral-300 dark:bg-neutral-900/60 bg-neutral-100 p-5">
        <h2 className="font-semibold text-lg">Appearance</h2>
        <p className="text-sm mt-1 dark:text-neutral-400 text-neutral-500">
          Set your preferred theme for this browser.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setTheme("light")}
            className={`text-sm px-3 py-2 rounded-md border flex items-center gap-2 ${theme === "light" ? "dark:border-white border-black" : "dark:border-neutral-700 border-neutral-300"}`}
          >
            <Sun size={14} />
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`text-sm px-3 py-2 rounded-md border flex items-center gap-2 ${theme === "dark" ? "dark:border-white border-black" : "dark:border-neutral-700 border-neutral-300"}`}
          >
            <Moon size={14} />
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`text-sm px-3 py-2 rounded-md border flex items-center gap-2 ${theme === "system" ? "dark:border-white border-black" : "dark:border-neutral-700 border-neutral-300"}`}
          >
            <LaptopMinimal size={14} />
            System
          </button>
        </div>
      </section>

      <section className="rounded-xl border dark:border-neutral-800 border-neutral-300 dark:bg-neutral-900/60 bg-neutral-100 p-5">
        <h2 className="font-semibold text-lg">Account</h2>
        <div className="mt-3 text-sm dark:text-neutral-400 text-neutral-500">
          {isGettingUser
            ? "Loading account..."
            : (user?.email ?? "No email found")}
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-4 text-sm px-3 py-2 rounded-md border dark:border-neutral-700 border-neutral-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <Loader className="animate-spin" size={14} />
          ) : (
            <LogOut size={14} />
          )}
          Logout
        </button>
      </section>

      <section className="rounded-xl border border-red-500/40 bg-red-500/5 p-5">
        <h2 className="font-semibold text-lg text-red-400">Danger zone</h2>
        <p className="text-sm mt-1 text-red-300/90">
          Delete this workspace permanently.
        </p>
        <div className="mt-4 space-y-3 space-x-4">
          <div className="text-xs text-red-300">
            Type <span className="font-semibold">{displayWorkspaceName}</span>{" "}
            to confirm.
          </div>
          <input
            value={confirmWorkspaceName}
            onChange={(e) => setConfirmWorkspaceName(e.target.value)}
            className="w-full md:w-96 px-3 py-2 rounded-md bg-transparent border border-red-500/40 focus:outline-none"
            placeholder={displayWorkspaceName}
          />
          <button
            onClick={handleDeleteWorkspace}
            disabled={!isDeleteEnabled || isDeleting}
            className="text-sm px-3 py-2.5 rounded-md bg-red-500/80 hover:bg-red-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" size={14} />
                Deleting workspace...
              </span>
            ) : (
              "Delete workspace"
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
