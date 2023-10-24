import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserInfo } from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);

  if (!session) redirect("api/auth/signin");

  return (
    <div className="flex flex-col items-center">
      <UserInfo />
    </div>
  );
}
