import { axiosInstance } from "@/utils/instance";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  name: string;
  image: string | null;
};
type userStore = {
  isGettingUser: boolean;
  user: User | null;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<userStore>((set) => ({
  user: null,
  isGettingUser: false,
  fetchUser: async () => {
    set({ isGettingUser: true });
    try {
      const res = axiosInstance.get<{ user: User | null }>("me");
      set({ user: (await res).data.user, isGettingUser: false });
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      set({ isGettingUser: false });
    }
  },
}));
