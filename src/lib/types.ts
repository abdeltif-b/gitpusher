export type repositoryFilesProps = { full_name: string; default_branch: string };
export type fileContentProps = { full_name: string; path: string };

export type repositoryFilesSelectItemType = { type: string; path: string };
export type userRepositoriesItemType = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  description: string;
  html_url: string;
  full_name: string;
  default_branch: string;
};

export type repositoryFilesDataType = {
  tree: repositoryFilesSelectItemType[];
};
export type fileContentDataType = {
  content: string;
};
