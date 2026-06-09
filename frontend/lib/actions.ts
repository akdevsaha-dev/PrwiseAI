import axios from "axios";
import { authClient } from "./auth-client";
import { axiosInstance } from "../utils/instance";

interface handleWorkspaceSetupProp {
  workSpace_name: string;
  workSpace_Url: string;
}

export const handleGithubAuth = async () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
  await authClient.signIn.social({
    provider: "github",
    callbackURL: `${origin}/onboarding/welcome`,
  });
};

export const handleGoogleAuth = async () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${origin}/onboarding/welcome`,
  });
};

export const handleWorkspaceSetup = async ({
  workSpace_name,
  workSpace_Url,
}: handleWorkspaceSetupProp) => {
  try {
    const res = await axiosInstance.post(
      "/v1/onboarding/workspace-setup",
      {
        workSpace_name,
        workSpace_Url,
      }
    );

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error ?? "Something went wrong",
      };
    }

    return {
      error: "Something went wrong",
    };
  }
};

export const handleOnboardingComplete = async () => {
  try {
    const res = await axiosInstance.post(
      "/v1/onboarding/complete",
      {}
    );

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error ?? "Something went wrong",
      };
    }

    return {
      error: "Something went wrong",
    };
  }
};

