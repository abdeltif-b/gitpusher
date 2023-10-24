import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getErrorMessage } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const readRepositories = async () => {
  const session = await getServerSession(options);

  try {
    const url = `https://api.github.com/search/repositories?q=user:${session?.user?.name}`;

    const res = await fetch(url, { next: { tags: ["readRepositories"] }, cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const UserRepositories = async () => {
  const data = await readRepositories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              <span className="flex flex-col">
                <span>Created at: {item.created_at}</span>
                <span>Updated at: {item.updated_at}</span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>{item.description ?? <i>(No description provided)</i>} </CardContent>
          <CardFooter className="space-x-2">
            <Button variant={"secondary"} asChild>
              <Link href={item.html_url} target="_blank">
                <GitHubLogoIcon />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
