import type { AlbumTreeItem, Selection, Song } from "./types";

type ReleasesListProps = {
  isEmpty: boolean;
  albumTree: AlbumTreeItem[];
  singles: Song[];
  selected: Selection;
  onAlbumSelect: (albumId: string) => void;
  onSongSelect: (songId: string) => void;
};

export default function ReleasesList({
  isEmpty,
  albumTree,
  singles,
  selected,
  onAlbumSelect,
  onSongSelect,
}: ReleasesListProps) {
  return (
    <div className="releases">
      {isEmpty && <p>You have no releases!</p>}
      {albumTree.map(({ album, songs }) => (
        <div key={album.id} className="release-group">
          <div
            className={`release-item ${selected?.type === "album" && selected.id === album.id ? "selected" : ""}`}
            onClick={() => onAlbumSelect(album.id)}
          >
            {album.name}
          </div>
          {songs.map((song) => (
            <div
              key={song.id}
              className={`release-item song-item ${selected?.type === "song" && selected.id === song.id ? "selected" : ""}`}
              onClick={() => onSongSelect(song.id)}
            >
              {song.name}
            </div>
          ))}
        </div>
      ))}

      {singles.length > 0 && (
        <div className="release-group">
          <div className="release-item singles-label">Singles</div>
          {singles.map((song) => (
            <div
              key={song.id}
              className={`release-item song-item ${selected?.type === "song" && selected.id === song.id ? "selected" : ""}`}
              onClick={() => onSongSelect(song.id)}
            >
              {song.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
