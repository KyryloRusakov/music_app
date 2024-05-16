import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData, songId }) => {
  const currentSong = songData?.tracks.find(song => song.id === songId);
  console.log(currentSong);

  return(
    <div className="relative w-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center">
          <img
            alt="art"
            src={artistId ? artistData.data.artist.visuals.avatarImage.sources[0].url : currentSong.album.images[0].url}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"  
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artistData.data.artist.profile.name : currentSong.name}</p>
              {!artistId && currentSong.artists.map((artist) => (
                <Link to={`/artists/${artist.id}`}>
                  <p className="text-base text-gray-400 mt-2">{artist.name}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full sm:h-18 h-8" />
    </div>
  )
};

export default DetailsHeader;
