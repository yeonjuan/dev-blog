export type Meta = {
  title?: string;
  description?: string;
  keywords?: string;
  enableToc?: boolean;
}

export type Content = {
  html: string;
  meta: Meta;
}

export type FileInfo = {
  relPath: string;
}
