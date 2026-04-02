import { GithubAuth } from "@/components/pages/onboarding/githubAuth";
import { getSession } from "@/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session?.user.firstLogin) {
    redirect("/dashboard");
  }
  return (
    <div>
      <GithubAuth />
    </div>
  );
}
