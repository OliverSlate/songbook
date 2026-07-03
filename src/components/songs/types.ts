export type Selection = { type: "album" | "song"; id: string } | null;

export type Album = {
  id: string;
  name: string;
  releaseDate: string;
};

export type Section = {
  order: number | undefined;
  name: string;
  content: string;
};

export type Song = {
  id: string;
  name: string;
  key: string;
  tempo: string;
  albumId: string | null;
  sections: Section[];
};

export type AlbumTreeItem = {
  album: Album;
  songs: Song[];
};
