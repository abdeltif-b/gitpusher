"use client";
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
import { repositoryFilesSelectItemType, repositoryFilesProps, repositoryFilesDataType } from "@/lib/types";
import { useEffect, useState } from "react";

export const RepositoryFiles = ({ full_name, default_branch }: repositoryFilesProps) => {
  const [data, setData] = useState<repositoryFilesDataType>({ tree: [] });
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/repository-files?full_name=${full_name}&default_branch=${default_branch}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open files
        </Button>
      </DialogTrigger>

      <DialogContent className={"lg:max-w-screen-lg max-h-screen"}>
        <div className="flex space-x-10">
          <ScrollArea className="max-h-[700px] w-[400px] rounded-md p-4 mt-4">
            <div>
              <DialogHeader>
                <DialogTitle>
                  {full_name} <i className="text-sm text-gray-600">({default_branch})</i>
                </DialogTitle>
                <DialogDescription>Select one file from this repo to fetch its content.</DialogDescription>
              </DialogHeader>
              {data.tree?.map((item: repositoryFilesSelectItemType) => {
                if (item.type == "tree")
                  return (
                    <div key={item.path} className="flex items-center p-1 rounded-sm">
                      <ChevronRightIcon className="mr-2 h-4 w-4" />
                      <b>{item.path}</b>
                    </div>
                  );
                return (
                  <div
                    key={item.path}
                    className="flex items-center p-1 rounded-sm hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => setPath(item.path)}
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    {item.path}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="p-3 mt-3">
            <FileContent full_name={full_name} path={path} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
