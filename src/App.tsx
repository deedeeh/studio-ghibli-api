import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ movie, setMovie ] = useState<string>('');
  const [ buttonClicked, setButtonClicked ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState<string>('');

  useEffect(() => {
    getMovie('2baf70d1-42bb-4437-b551-e5fed5a87abe');
  }, [buttonClicked]);

  const getMovie = async (movieId: string) => {
    await axios(`https://ghibliapi.herokuapp.com/films/${movieId}`)
    .then((response: AxiosResponse) => {
      setMovie(response.data.title);
    })
    .catch((error: AxiosError) => {
      if(error.response?.status === 500) {
        setErrorMsg('Oops… something went wrong, try again 🤕');
      } else if(error.response?.status === 418) {
        setErrorMsg(`418 I'm a tea pot 🫖, silly`);
      } else {
        setErrorMsg(error.message);
      }
    });
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
    {errorMsg.length > 0 && <p className='App-header' role='alert'>{errorMsg}</p>}
    </div>
  );
}

export default App;
