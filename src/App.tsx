import './App.css'
import { useState } from 'react'
import { useMovies } from './hooks/useMovies'
import Header from './components/layout/header'

function App() {

  const { movies, loading, error } = useMovies()
  const [search, setSearch] = useState('')
  const [filteredMovies, setFilteredMovies] = useState(movies)

  console.log("MOVIES", movies)

  return (
    <>
      <Header />
    </>
  )
}

export default App
