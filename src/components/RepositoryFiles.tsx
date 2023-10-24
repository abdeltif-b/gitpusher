import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ExternalLinkIcon, FileIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const readRepositoryFiles = async (full_name: string, default_branch: string) => {
  try {
    const url = `https://api.github.com/repos/${full_name}/git/trees/${default_branch}?recursive=1`;

    const res = await fetch(url, { next: { tags: ["readRepositoryFiles"] }, cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const RepositoryFiles = async ({ full_name, default_branch }: { full_name: string; default_branch: string }) => {
  const data = await readRepositoryFiles(full_name, default_branch);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open files
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {full_name} <i className="text-sm text-gray-600">({default_branch})</i>
          </DialogTitle>
          <DialogDescription>Select one file from this repo to fetche its content.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[700px] w-xl rounded-md p-4 mt-4">
          {data.tree?.map((item) => {
            return item.type == "tree" ? (
              <span key={item.sha} className="flex items-center">
                <ChevronRightIcon className="mr-2 h-4 w-4" />
                <b>{item.path}</b>
              </span>
            ) : (
              <span key={item.sha} className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                {item.path}
              </span>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
