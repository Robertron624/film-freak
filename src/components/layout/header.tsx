const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const filterTermsSearch = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movies" },
  { label: "TV Shows", value: "tv" },
  { label: "People", value: "people" },
];

export default function Header() {
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
      <form className='flex items-center'>
        <select
          name='filter'
          id='filter'
          className='p-2 rounded-l-md border border-purple bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out'
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
          className='p-2 rounded-r-md max-w-80 w-full bg-slate-100 text-slate-400 focus:outline-none transition-all duration-300 ease-in-out'
        />
      </form>
    </header>
  );
}
