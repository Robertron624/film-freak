import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { RootState, AppDispatch } from "../store";
import { fetchSearchResults, selectSearchResults } from "../slices/searchSlice";

import SearchResultGrid from "../components/ui/SearchResultGrid";
import { useLocation } from "react-router-dom";


const SearchResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => selectSearchResults(state));
  const loading = useSelector((state: RootState) => state.search.loading);
  const error = useSelector((state: RootState) => state.search.error);

  const location = useLocation();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query') || '';
    const filterParam = searchParams.get('filter') || 'all';

    setQuery(queryParam);
    setFilter(filterParam);

    if (queryParam) {
      dispatch(fetchSearchResults({ query: queryParam, filter: filterParam }));
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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Search Results</h1>
      <p className="mt-2">
        Found 
        <span className="font-bold ml-2 text-accent">
          {results.length}
        </span> results for
        <span className="font-bold mx-2 text-accent">
          {query}
        </span>
        in 
        <span className="font-bold mx-2 text-accent">
          {filter}
        </span>
        category
      </p>
      <div className="mt-16">
          <SearchResultGrid results={results} />
      </div>
    </div>
  );
};

export default SearchResults;
