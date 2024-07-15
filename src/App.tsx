import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// static pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

// dynamic pages (media)
import MoviePage from "./pages/MediaPage/MoviePage";
import TVShowPage from "./pages/MediaPage/TVShowPage";
import PersonPage from "./pages/MediaPage/PersonPage";

function App() {

  return (
    <>
      <Router>
        <Header />
        <main className='flex-1 py-8 w-11/12 mx-auto text-slate-100'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/movies/:id' element={<MoviePage />} />
          <Route path='/tv-shows/:id' element={<TVShowPage />} />
          <Route path='/people/:id' element={<PersonPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
