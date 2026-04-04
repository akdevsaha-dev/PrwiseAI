import { axiosInstance } from "@/utils/instance";
import toast from "react-hot-toast";
import { create } from "zustand";

type repo = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  url: string;
  language: string | null;
  issueCount: number;
};

type Installation = {
  id: string;
  installationId: string;
  accountLogin: string;
  accountType: string;
};

type repoStore = {
  totalRepos: number;
  isFetchingRepos: boolean;
  repos: repo[];
  getRepos: (data: { workspaceId: string }) => void;
  connected: boolean;
  installation: Installation | null;
  isGettingStatus: boolean;
  getRepoStatus: (data: { workspaceId: string }) => Promise<void>;
};

export const useRepoStore = create<repoStore>((set) => ({
  totalRepos: 0,
  repos: [],
  isFetchingRepos: false,
  connected: false,
  installation: null,
  isGettingStatus: false,
  getRepos: async ({ workspaceId }) => {
    try {
      set({ isFetchingRepos: true, repos: [] });
      const res = await axiosInstance.get<{
        totalRepos: number;
        repos: repo[];
      }>(`v1/repositories/${workspaceId}`);
      set({ repos: res.data.repos, totalRepos: res.data.totalRepos });
    } catch (error) {
      console.error("Error fetching repos", error);
      toast.error("Failed to fetch repositories!");
    } finally {
      set({ isFetchingRepos: false });
    }
  },
  getRepoStatus: async ({ workspaceId }) => {
    try {
      set({ isGettingStatus: true });
      const res = await axiosInstance.get(
        `v1/workspace/${workspaceId}/repo-status`,
      );
      set({
        connected: res.data.connected,
        installation: res.data.installation,
        isGettingStatus: false,
      });
    } catch (error: unknown) {
      console.error("Error fetching repos", error);
      toast.error("cannot fetch");
    } finally {
      set({ isGettingStatus: false });
    }
  },
}));
