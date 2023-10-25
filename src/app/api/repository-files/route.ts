import { readRepositoryFiles } from "@/lib/actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const full_name = searchParams.get("full_name") as string;
  const default_branch = searchParams.get("default_branch") as string;

  const data = await readRepositoryFiles(full_name, default_branch);

  return Response.json(data);
}
