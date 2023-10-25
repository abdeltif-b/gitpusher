import { readFileContent } from "@/lib/actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const full_name = searchParams.get("full_name") as string;
  const path = searchParams.get("path") as string;

  const data = await readFileContent(full_name, path);

  return Response.json(data);
}
