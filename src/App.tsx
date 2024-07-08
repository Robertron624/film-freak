import "./App.css";
import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import Header from "./components/layout/header";
import { Footer } from "./components/layout/footer";

function App() {
  const { movies, loading, error } = useMovies();
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  return (
    <>
      <Header />
      <main className='flex-1 py-4 w-11/12 mx-auto'>
        <section className='intro text-slate-200'>
          <h1 className='text-4xl text-center text-purple-700'>
            Welcome to <span className="text-accent text-5xl font-bold">Film Freak</span>
          </h1>
          <p className='text-lg text-center text-gray-500'>
            The best place to find your favorite movies
          </p>
        </section>
        <section id="featured" className="mt-4">
          <h2 className='text-2xl font-bold text-slate-300'>Featured Movies</h2>
          
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
