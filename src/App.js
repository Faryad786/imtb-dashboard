import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
// import MoviesList from './components/Page/MoviePage';

function App() {
  return (
    <Router> 
        <Header />
        <Routes>
          {/* <Route path="/" element={<MoviesList />} /> */}
        
        </Routes>
    </Router>
  );
}

export default App;
