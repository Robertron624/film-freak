import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// static pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

// dynamic pages (media)
const MoviePage = lazy(() => import("./pages/MediaPage/MoviePage"));
const TVShowPage = lazy(() => import("./pages/MediaPage/TVShowPage"));
const PersonPage = lazy(() => import("./pages/MediaPage/PersonPage"));

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className='flex-1 py-8 w-11/12 mx-auto text-slate-100'>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
