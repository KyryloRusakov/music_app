import { Link } from 'react-router-dom';

const ArtistCard = ({ track }) => (
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg">
    <img alt="artist" src={track?.album.images[0].url} className="w-full h-56 rounded-lg" />
    <p className="mt-4 font-semibold text-lg text-white truncate">{track.artists.map((artist) => (
      <Link to={`/music_app/artists/${artist.id}`}>{artist.name}{' '}</Link>
    ))}
    </p>
  </div>
);
export default ArtistCard;
