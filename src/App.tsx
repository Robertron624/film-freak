import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// pages imports
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
