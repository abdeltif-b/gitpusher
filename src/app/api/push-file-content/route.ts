import { updateAndPushFileContent } from "@/lib/actions";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const { full_name, path } = await request.json();
  const data = await updateAndPushFileContent(full_name, path);

  revalidateTag("readFileContent");

  return Response.json(data);
}
