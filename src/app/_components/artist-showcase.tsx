export default function ArtistShowcase({
  images,
  name,
  id,
}: {
  images: { url: string }[];
  name: string;
  id: string;
}) {
  const imageSource = images[0]
    ? images[0].url
    : "https://via.placeholder.com/150";

  return (
    <div className="mb-2 w-56 overflow-hidden rounded-md border-2 border-slate-700">
      <img className="h-56 w-56 object-fill" src={imageSource} alt={name} />
      <p
        className="w-full truncate break-all border-t-2 border-slate-300 bg-slate-200 p-2 text-center text-sm font-medium text-slate-700"
        title={name}
      >
        {name}
      </p>
    </div>
  );
}
