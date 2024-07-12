const NotFound: React.FC = () => {
  return (
    <>
        <section className='text-slate-200 mx-auto border border-light-purple rounded-md px-2 py-4 max-w-xl'>
        <h1 className='text-4xl text-center text-purple-700 '>
            404: Page Not Found
        </h1>
        <p className='text-lg text-center text-gray-500'>
            The page you are looking for does not exist.
        </p>
        </section>
        <a href="/" className="mt-14 bg-accent-dark text-slate-200 font-bold px-4 py-4 rounded-md hover:bg-accent-light hover:text-black duration-500 mx-auto flex max-w-56 justify-center">
            Go back to Home
        </a>
    </>
  );
};

export default NotFound;
