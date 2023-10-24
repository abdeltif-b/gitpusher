import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { RepositoryFiles } from "@/components/RepositoryFiles";
import { readRepositories } from "@/lib/actions";
import { userRepositoriesItemType } from "@/lib/types";

export const UserRepositories = async () => {
  const data = await readRepositories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map((item: userRepositoriesItemType) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              <span className="flex flex-col">
                {/* a dirty way to format the date (I might use date-fns for better formatting) */}
                <span>Created at: {item.created_at.replace("T", " ").replace("Z", "")}</span>
                <span>Updated at: {item.updated_at.replace("T", " ").replace("Z", "")}</span>
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
            <RepositoryFiles full_name={item.full_name} default_branch={item.default_branch} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
