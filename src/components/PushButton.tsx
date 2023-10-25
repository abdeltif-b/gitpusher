"use client";
import { Button } from "@/components/ui/button";
import { updateAndPushFileContent } from "@/lib/actions";
import { fileContentProps } from "@/lib/types";
import { RotateCounterClockwiseIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const PushButton = ({ full_name, path }: fileContentProps) => {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/push-file-content", {
      method: "POST",
      body: JSON.stringify({ full_name: full_name, path: path }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Message pushed to GitHub repository successfully.");
      // dirty way to refresh the page (I'm not using mutation to only refresh the query needed)
      window.location.href = "/";
    } else {
      alert("Error: message not pushed to GitHub repository.");
    }
  };

  if (!path) return <div></div>;
  return (
    <div>
      <div className="text-sm text-gray-500">
        Click the button bollow to prepend "Komment Demo Task" to the top of this file and push it back to the repo
      </div>
      <Button className="w-full" onClick={handleClick}>
        <RotateCounterClockwiseIcon className="mr-2 h-4 w-4" />
        Update & push to repo
      </Button>
    </div>
  );
};
