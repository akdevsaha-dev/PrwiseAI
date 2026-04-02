import { Octokit } from "octokit";
import { generateSecret } from "./generateSecret.js";

export const getInstallationAccessToken = async (installation_id: number) => {
  const jwtToken = generateSecret();
  const octokit = new Octokit({
    auth: jwtToken,
  });
  const response = await octokit.request(
    "POST /app/installations/{installation_id}/access_tokens",
    {
      installation_id: installation_id,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  return response.data.token;
};
