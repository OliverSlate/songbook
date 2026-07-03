import type { ReactNode } from "react";

type SongsHeaderProps = {
  children?: ReactNode;
  onAddAlbum: () => void;
  onAddSong: () => void;
};

export default function SongsHeader({
  children,
  onAddAlbum,
  onAddSong,
}: SongsHeaderProps) {
  return (
    <div className="header">
      <p>Songs</p>
      <div className="controls">
        <button id="add-album" onClick={onAddAlbum}>
          Add Album
        </button>
        <button id="add-song" onClick={onAddSong}>
          Add Song
        </button>
      </div>
      {children}
    </div>
  );
}
