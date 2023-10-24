import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCounterClockwiseIcon } from "@radix-ui/react-icons";
import { readFileContent } from "@/lib/actions";

export const FileContent = async ({ full_name, path }: { full_name: string; path: string }) => {
  const data = await readFileContent(full_name, path);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{full_name}</CardTitle>
        <CardDescription>{path}</CardDescription>
      </CardHeader>
      <CardContent>{data.fileContents ?? <i>No file selected for display.</i>}</CardContent>
      <CardFooter className="gap-2 flex flex-col items-center">
        <div className="text-sm text-gray-500">
          Click the button bollow to prepend "Komment Demo Task" to the top of this file and push it back to the repo
        </div>
        <Button className="w-full">
          <RotateCounterClockwiseIcon className="mr-2 h-4 w-4" />
          Update & push to repo
        </Button>
      </CardFooter>
    </Card>
  );
};
