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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileContent } from "@/components/FileContent";
import { readRepositoryFiles } from "@/lib/actions";

type repositoryFilesType = { type: string; sha: string; path: string };

export const RepositoryFiles = async ({ full_name, default_branch }: { full_name: string; default_branch: string }) => {
  const data = await readRepositoryFiles(full_name, default_branch);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open files
        </Button>
      </DialogTrigger>

      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <div className="flex space-x-10">
          <div>
            <DialogHeader>
              <DialogTitle>
                {full_name} <i className="text-sm text-gray-600">({default_branch})</i>
              </DialogTitle>
              <DialogDescription>Select one file from this repo to fetch its content.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[700px] w-2xl rounded-md p-4 mt-4">
              {data.tree?.map((item: repositoryFilesType) => {
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
          </div>
          <div className="p-3 mt-3">
            <FileContent full_name={"abdeltif-b/test-gitpusher"} path={"README.md"} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
