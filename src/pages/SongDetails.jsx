import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader } from '../components';

import { useGetSongDetailsQuery, useGetTopChartsQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();

  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery({ songid });
  const { data: charts } = useGetTopChartsQuery();

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={charts} songId={songid} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.lyrics ? (
            songData.lyrics.lines.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">{line.words}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Lyrics not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
