import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCats } from './store/cats/CatsReducer';
import { getCategories } from './store/categories/CategoriesReducer';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CatsList from './components/CatsList';
import Header from './components/Header';


function App() {
  let currentParams = null;
  const cats = useSelector((state) => state.cats.cats);
  const [catsList, setCatsList] = useState(cats);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useRef(1);

  const changeSearchParams = (paramsPage = null) => {
    currentParams = searchParams.entries();
    if (!paramsPage) {
      paramsPage = page.current += 1;
    }
    const currParams = { ...currentParams, page: paramsPage };
    setSearchParams(currParams);
  }

  const handleLoadMore = () => {
    changeSearchParams();
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);


  useEffect(() => {

    currentParams = searchParams.entries();

    dispatch(getCats(currentParams));
  }, [searchParams, dispatch]);

  useEffect(() => {
    setCatsList([...catsList, ...cats]);
  }, [cats]);

  return (
    <>
      <Header />
      <div className='content'>
        <Sidebar resetPage={() => page.current = 1} setCats={() => setCatsList(() => [])} />
        <main className='main'>
          <CatsList cats={catsList} />
          <button className='load-btn' type='button' onClick={handleLoadMore}>Load more...</button>
        </main>
      </div>
    </>

  );
}

export default App;
