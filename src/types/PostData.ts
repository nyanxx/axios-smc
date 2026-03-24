export type PostObject = {
  title: string;
  body: string;
  userId: number;
};

export type PostData = PostObject & { id: number };
