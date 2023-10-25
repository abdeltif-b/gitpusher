import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const readRepositories = async () => {
  const session = await getServerSession(options);
  const url = `https://api.github.com/search/repositories?q=user:${session?.user?.name}`;

  try {
    const response = await fetch(url, {
      next: { tags: ["readRepositories"] },
      cache: "no-store",
      headers: {
        Authorization: `token ${session?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} - ${await response.text()}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const readRepositoryFiles = async (full_name: string, default_branch: string) => {
  const session = await getServerSession(options);
  const url = `https://api.github.com/repos/${full_name}/git/trees/${default_branch}?recursive=1`;

  try {
    const response = await fetch(url, {
      next: { tags: ["readRepositoryFiles"] },
      cache: "no-store",
      headers: {
        Authorization: `token ${session?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} - ${await response.text()}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const readFileContent = async (full_name: string, path: string) => {
  const session = await getServerSession(options);
  const url = `https://api.github.com/repos/${full_name}/contents/${path}`;

  try {
    const response = await fetch(url, {
      next: { tags: ["readFileContent"] },
      cache: "no-store",
      headers: {
        Authorization: `token ${session?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} - ${await response.text()}`);
    }
    const data = await response.json();

    // decode the content
    const decodedContent = Buffer.from(data.content, "base64").toString("utf-8");

    return { content: decodedContent };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateAndPushFileContent = async (full_name: string, path: string) => {
  const session = await getServerSession(options);
  const content = `Komment Demo Task (appended at ${new Date().toISOString()})\n`;
  const url = `https://api.github.com/repos/${full_name}/contents/${path}`;

  try {
    // get the current file content
    const response = await fetch(url, {
      next: { tags: ["updateAndPushFileContent"] },
      cache: "no-store",
      headers: {
        Authorization: `token ${session?.accessToken}`,
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
    const updateResponse = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${session?.accessToken}`,
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
