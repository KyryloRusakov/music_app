import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  return(
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden' } `}>
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.album.images[0].url} />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/music_app/songs/${song?.id}`}>
            {song.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 flex gap-3">
          {song.artists.map((artistsName) => (
            <Link to={`/music_app/artists/${artistsName.id}`}>{artistsName.name}</Link>
          ))}
        </p>
      </div>
    </div>
  )
};

export default SongCard;
