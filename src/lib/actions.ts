import { options } from "@/app/api/auth/[...nextauth]/options";
import { getErrorMessage } from "@/lib/utils";
import { getServerSession } from "next-auth";

export const readRepositories = async () => {
  const session = await getServerSession(options);

  try {
    const url = `https://api.github.com/search/repositories?q=user:${session?.user?.name}`;
    const response = await fetch(url, { next: { tags: ["readRepositories"] } });
    if (!response.ok) {
      return { error: "Failed to fetch data" };
    }
    const data = response.json();
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const readRepositoryFiles = async (full_name: string, default_branch: string) => {
  try {
    const url = `https://api.github.com/repos/${full_name}/git/trees/${default_branch}?recursive=1`;
    const response = await fetch(url, { next: { tags: ["readRepositoryFiles"] } });
    if (!response.ok) {
      return { error: "Failed to fetch data" };
    }
    const data = response.json();
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const readFileContent = async (full_name: string, path: string) => {
  try {
    const url = `https://api.github.com/repos/${full_name}/contents/${path}`;
    const response = await fetch(url, { next: { tags: ["readFileContent"] } });
    if (!response.ok) {
      return { error: "Failed to fetch data" };
    }
    const data = await response.json();

    // convert blob to string
    const fileContents = atob(data.content);

    return { fileContents: fileContents };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const updateAndPushFileContent = async (full_name: string, path: string) => {
  const token = "token";
  const content = `Komment Demo Task (appended at ${new Date()})`;

  try {
    // get the current file content
    const response = await fetch(`https://api.github.com/repos/${full_name}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} - ${await response.text()}`);
    }
    const data = await response.json();

    // decode the content, prepend text and encode it back
    const decodedContent = Buffer.from(data.content, "base64").toString("utf-8");
    const updatedContent = content + "\n" + decodedContent;
    const encodedContent = Buffer.from(updatedContent).toString("base64");

    // push to repo
    const updateResponse = await fetch(`https://api.github.com/repos/${full_name}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        message: "Update file (pushed by GitPusher)",
        content: encodedContent,
        sha: data.sha,
      }),
    });
    if (!updateResponse.ok) {
      throw new Error(`Failed to update file: ${updateResponse.status} - ${await updateResponse.text()}`);
    }
    const commitData = await updateResponse.json();
    return { success: true, commitData: commitData };
  } catch (error) {
    console.error("Error:", error);
  }
};
