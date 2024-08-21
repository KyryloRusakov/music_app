import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistOverviewQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id } = useParams();
  const { data: artistOverview, isFetching: isFetchingArtistOverview, error } = useGetArtistOverviewQuery({ id });
  console.log(artistOverview);
  console.log(id);

  if (isFetchingArtistOverview) return <Loader title="Loading artist details"/>;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={id} artistData={artistOverview}/>

      {/* <RelatedSongs 
        data={artistOverview}
        artistId={id}
        isPlaing={isPlaing}
        activeSong={activeSong}
      /> */}
    </div>
  )
};

export default ArtistDetails;
