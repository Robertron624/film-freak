import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { RootState, AppDispatch } from "../store";
import { fetchSearchResults, selectSearchResults } from "../slices/searchSlice";

import SearchResultGrid from "../components/ui/SearchResultGrid";
import { useLocation } from "react-router-dom";
import { Media } from "../types";

interface MultipleGridProps {
  results: Media[];
}
const MultipleGrids: React.FC<MultipleGridProps> = ({ results }) => {
  const movieResults = results.filter(
    (result) => result["media_type"] === "movie"
  );
  const tvResults = results.filter((result) => result["media_type"] === "tv");
  const peopleResults = results.filter(
    (result) => result["media_type"] === "person"
  );

  return (
    <div className='flex flex-col gap-12'>
      {movieResults.length > 0 && (
        <div>
          <h2 className='text-2xl font-bold mb-4'>Movies</h2>
          <SearchResultGrid results={movieResults} />
        </div>
      )}
      {tvResults.length > 0 && (
        <div>
          <h2 className='text-2xl font-bold mb-4'>TV Shows</h2>
          <SearchResultGrid results={tvResults} />
        </div>
      )}
      {peopleResults.length > 0 && (
        <div>
          <h2 className='text-2xl font-bold mb-4'>People</h2>
          <SearchResultGrid results={peopleResults} />
        </div>
      )}
    </div>
  );
};

const SearchResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => selectSearchResults(state));
  const loading = useSelector((state: RootState) => state.search.loading);
  const error = useSelector((state: RootState) => state.search.error);

  const location = useLocation();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query") || "";
    const filterParam = searchParams.get("filter") || "all";

    setQuery(queryParam);

    const filterToSet = filterParam === "people" ? "person" : filterParam;
    setFilter(filterToSet);

    if (queryParam) {
      dispatch(fetchSearchResults({ query: queryParam, filter: filterToSet }));
    }
  }, [dispatch, location.search]);

  if (loading) {
    return (
      <div className='mt-16 flex justify-center'>
        <CircularProgress color='secondary' size={100} thickness={5} />
      </div>
    );
  }

  if (error) {
    // handle 404 error

    if (error.status === 404) {
      return (
        <div>
          <h1 className='text-3xl font-bold'>Search Results</h1>
          <p className='text-2xl font-bold mt-8'>
            No Results Found for{" "}
            <span className='text-accent font-bold'>{query}</span> in{" "}
            <span className='text-accent font-bold'>{filter} </span>category
          </p>
        </div>
      );
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold'>Search Results</h1>
      <p className='mt-2'>
        Found
        <span className='font-bold ml-2 text-accent'>
          {results.length}
        </span>{" "}
        results for
        <span className='font-bold mx-2 text-accent'>{query}</span>
        in
        <span className='font-bold mx-2 text-accent'>{filter}</span>
        category
      </p>
      <div className='mt-16'>
        {/* 
            if the result filter is movie, tv or people, we can render only one Grid for all the results
            otherwise, we can render multiple Grids for each category
          */}
        {filter === "movie" || filter === "tv" || filter === "person" ? (
          <SearchResultGrid results={results} />
        ) : (
          <MultipleGrids results={results} />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
