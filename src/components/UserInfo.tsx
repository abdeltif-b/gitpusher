import { options } from "@/app/api/auth/[...nextauth]/options";
import { SignOutButton } from "@/components/SignOutButton";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const UserInfo = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col items-center gap-1">
      <Image src={session?.user?.image as string} priority={false} width={60} height={60} alt="avatar" />
      <div className="font-bold">{session?.user?.name}</div>
      <div className="text-sm">{session?.user?.email}</div>
      <SignOutButton />
    </div>
  );
};
