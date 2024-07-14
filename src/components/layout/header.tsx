import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FilterTermSearch } from "../../types";

import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, ContactMail as ContactMailIcon } from "@mui/icons-material";


import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";

const navLinks = [
  { title: "Home", path: "/", icon: HomeIcon },
  { title: "About", path: "/about", icon: InfoIcon },
  { title: "Contact", path: "/contact", icon: ContactMailIcon },
];

const filterTermsSearch: { label: string; value: FilterTermSearch }[] = [
  { label: "All", value: "all" },
  { label: "Movie", value: "movie" },
  { label: "TV Show", value: "tv" },
  { label: "People", value: "people" },
];

export default function Header() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterTermSearch>("all");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterTermSearch);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchUrl = `/search?query=${search}&filter=${filter}`;
    // Navigate to the search results page
    navigate(searchUrl);

    // Clear the search input and set the filter back to 'all' after searching
    setSearch("");
    setFilter("all");
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <header className='flex justify-between items-center w-11/12 bg-light-purple rounded-md px-4 py-2 mx-auto flex-wrap gap-2'>
      <div className="flex gap-2 w-full md:w-auto justify-between md:justify-start items-center">
        <a href="/" className='flex items-center flex-shrink-0'>
          <figure >
            <img
              src='/images/logo.png'
              alt='Logo'
              className='md:w-16 md:h-16 w-12 h-12 rounded-md '
              width={64}
              height={64}
            />
          </figure>
        </a>
        <nav className='hidden md:flex gap-3 items-center'>
          <ul className='flex gap-4'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  className={`text-lg hover:text-slate-400 transition-all duration-300 ease-in-out border-b-2 flex gap-1 items-center ${
                    location.pathname === link.path
                      ? "text-accent font-bold hover:text-accent border-accent"
                      : "text-slate-100 border-transparent hover:text-accent hover:border-accent"
                  }`}
                  to={link.path}
                >
                  <link.icon />
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <IconButton
          onClick={toggleDrawer(true)}
          color='secondary'
          aria-label='open drawer'
          edge='end'
          sx={{
            padding: "0px",
            display: { md: "none" },
          }}
        >
          <MenuIcon 
            sx={{
              width: "2.5rem",
              height: "2.5rem",
            }}
          />
        </IconButton>
        <Drawer
          anchor='right'
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setDrawerOpen(false);
                }}
              >
                <link.icon />
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <form className='flex items-center w-full md:w-auto' onSubmit={onSearch}> 
        <select
          name='filter'
          id='filter'
          className='p-2 rounded-l-md border-r h-10 border-purple bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out w-[30%] md:w-auto'
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
          className='p-2 h-10 rounded-r-md md:max-w-80 bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out w-[70%] md:w-auto'
          name='search'
          id='search'
          onChange={handleSearch}
          value={search}
        />
      </form>
    </header>
  );
}
