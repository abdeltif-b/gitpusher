import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserInfo } from "@/components/UserInfo";
import { UserRepositories } from "@/components/UserRepositories";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);

  if (!session) redirect("api/auth/signin");

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <UserInfo />
      <UserRepositories />
    </div>
  );
}
