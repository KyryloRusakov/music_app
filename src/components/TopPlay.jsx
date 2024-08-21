import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery, useGetArtistsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img alt={song.name} src={song.album.images[0].url} className="w-20 h-20 rounded-lg"/>
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/music_app/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song?.name}</p>
        </Link>
        <div className="flex gap-3">
          {song.artists.map((artistsName) => (
            <Link to={`/music_app/artists/${artistsName.id}`} className="text-base text-gray-300 mt-1">{artistsName.name}</Link>
          ))}
        </div>
      </div>
    </div>
      <PlayPause 
        song={song} 
        isPlaying={isPlaying} 
        activeSong={activeSong} 
        handlePause={handlePauseClick} 
        handlePlay={handlePlayClick}
      />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: charts } = useGetTopChartsQuery();
  const { data: artists } = useGetArtistsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  })
  
  const topPlays = charts?.tracks.slice(0, 5);
  console.log(topPlays);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: charts, i }));
    dispatch(playPause(true));
  }

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flow-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/music_app/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard 
              key={song.key} 
              song={song} 
              i={i} 
              isPlaying={isPlaying} 
              activeSong={activeSong} 
              handlePauseClick={handlePauseClick} 
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flow-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/music_app/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {artists?.artists?.map((artist, i) => (
            <SwiperSlide
              key={artist?.key}
              style={{width: '25%', height: 'auto'}}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/music_app/artist/${artist?.id}`}>
                <img alt="name" src={artist.images[0].url} className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay;
