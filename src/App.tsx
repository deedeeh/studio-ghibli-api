import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ movie, setMovie ] = useState<string>('');
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    getMovie('2baf70d1-42bb-4437-b551-e5fed5a87abe');
  }, []);

  const getMovie = async (movieId: string) => {
    try {
      const response = await axios(`https://ghibliapi.herokuapp.com/films/${movieId}`);
      setMovie(response.data.title);
    } catch(error) {
      console.log(error)
    }
  }

  const handleOnClick = () => {
    getMovie('2baf70d1-42bb-4437-b551-e5fed5a87abe');
    setButtonClicked(true);
  }

  return (
    <div className="App">
      {!buttonClicked && <div className='App-button'>
        <button onClick={handleOnClick}>
          Load movie
        </button>
      </div>}
    {buttonClicked && movie.length > 0 && <h1 className='App-header'>{movie}</h1>}
    </div>
  );
}

export default App;
