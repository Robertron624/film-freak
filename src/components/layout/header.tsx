
import { useState } from "react";
import { FilterTermSearch } from "../../types";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const filterTermsSearch: { label: string; value: FilterTermSearch }[]

= [
  { label: "All", value: "all" },
  { label: "Movie", value: "movie" },
  { label: "TV Show", value: "tv" },
  { label: "People", value: "people" },
];

export default function Header() {

  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterTermSearch>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterTermSearch);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Searching for ${search} in ${filter}`)

    // Clear the search input and set the filter back to 'all' after searching
    setSearch('');
    setFilter('all');

  };

  return (
    <header className='flex justify-between items-center w-11/12 bg-light-purple rounded-md px-4 py-2 mx-auto flex-wrap gap-2'>
      <nav className="flex gap-3 items-center">
        <figure className='flex items-center flex-shrink-0'>
          <img src='/images/logo.png' alt='Logo' className='md:w-16 md:h-16 w-12 h-12 rounded-md ' width={64} height={64} />
        </figure>
        <ul className='flex gap-4'>
          {navLinks.map((link) => (
            <li key={link.path}>
              <a
                className='text-slate-100 text-lg hover:text-slate-400 transition-all duration-300 ease-in-out'
                href={link.path}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <form 
        className='flex items-center'
        onSubmit={onSearch}
      >
        <select
          name='filter'
          id='filter'
          className='p-2 rounded-l-md border-r h-10 border-purple bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out'
          onChange={handleFilter}
          value={filter}
        >
          {filterTermsSearch.map((term) => (
            <option key={term.value} value={term.value}>
              {term.label}
            </option>
          ))}
        </select>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <input
          type='text'
          placeholder='Search...'
          className='p-2 h-10 rounded-r-md max-w-80 w-full bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out'
          name='search'
          id='search'
          onChange={handleSearch}
          value={search}
        />
      </form>
    </header>
  );
}
