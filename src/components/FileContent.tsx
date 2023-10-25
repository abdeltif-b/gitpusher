"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon } from "@radix-ui/react-icons";
import { PushButton } from "@/components/PushButton";
import { fileContentDataType, fileContentProps } from "@/lib/types";
import { useEffect, useState } from "react";

export const FileContent = ({ full_name, path }: fileContentProps) => {
  const [data, setData] = useState<fileContentDataType>({ content: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/file-content?full_name=${full_name}&path=${path}`;
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

    if (path) fetchData();
  }, [full_name, path]);

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex">
          <FileIcon className="mr-2 h-4 w-4" /> {path != "" ? path : <i>Select a file to display its content below</i>}
        </CardTitle>
        <CardDescription>{full_name}</CardDescription>
      </CardHeader>
      <CardContent className="font-mono whitespace-pre-line">
        <div className="max-h-[500px] scrolling-auto scrolling-touch overflow-scroll">{data.content}</div>
      </CardContent>
      <CardFooter className="gap-2 flex flex-col items-center">
        <PushButton full_name={full_name} path={path} />
      </CardFooter>
    </Card>
  );
};
