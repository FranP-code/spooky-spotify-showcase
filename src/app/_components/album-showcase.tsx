import { TrackByAlbum } from "./spotify-data";

export default function AlbumShowcase({
  album,
  position,
  tracks,
}: TrackByAlbum) {
  const imageSource = album.images[0]
    ? album.images[0].url
    : "https://via.placeholder.com/150";

  return (
    <div
      key={album.id}
      className="flex w-full flex-wrap gap-3 rounded-xl bg-white bg-opacity-10 p-5 backdrop-blur-lg backdrop-filter"
    >
      <img className="h-36 w-36 rounded" src={imageSource} alt={album.name} />
      <section className="flex h-36 flex-grow flex-col">
        <h4 className="mb-2 text-lg font-semibold leading-none">
          {album.name}
        </h4>
        <ul className="overflow-scroll">
          {tracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
