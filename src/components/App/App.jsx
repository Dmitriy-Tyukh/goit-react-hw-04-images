import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyeled } from './App.style';
import scrollPage from 'helpers/scrollPage';
import pixabayApi from '../../serviceApi/pixabayApi';
import Searchbar from 'components/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ButtonLoadMore from 'components/Button';
import Loader from 'components/Loader';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dataImg, setDataImg] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  
  const fetchData = async (page, searchValue) => {
    try {
      setStatus('pending');
      const data = await pixabayApi(page, searchValue);
      const dataHits = data.hits.map(
        ({ id, webformatURL, largeImageURL, user }) => {
          return {
            id: id,
            webformatURL: webformatURL,
            largeImageURL: largeImageURL,
            user: user,
          };
        }
      );
      setDataImg(prevImg => [...prevImg, ...dataHits]);
      setStatus('sucsses');
        
    } catch ({ message }) {
      setError(message);
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    fetchData(page, searchValue);
  }, [page, searchValue]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const searchByValue = ({ name }) => {
    if (!name.trim()) { toast.error('Введите значение для поиска!');
      return;
    }
    setSearchValue(name);
    setDataImg([]);
    setPage(1);
  };

  return (
    <AppStyeled>
      <Searchbar onSubmitForm={searchByValue} status={status === 'pending'} />
      <ToastContainer theme="colored" />

      {error && <p>Error {error}, please reload the page and try again!</p>}

      <ImageGallery onSubmit={dataImg} />
      {status === 'pending' && <Loader />}

      {status === 'sucsses' && <ButtonLoadMore onIncrement={incrementPage} />}
    </AppStyeled>
  );
};

export default App;