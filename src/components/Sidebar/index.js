import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './styles.css';


const Sidebar = ({ resetPage, setCats }) => {
    const categories = useSelector((state) => state.categories.categories);
    const [searchParams, setSearchParams] = useSearchParams();


    const handleCategoryClick = (e) => {
        resetPage();
        setCats();
        const paramsId = searchParams.get('id');
        const currentId = e.target.dataset.id;
        if (paramsId === currentId) return;
        setSearchParams({ id: currentId });
    }

    return (
        <ul className='categories'>
            {categories && categories.map(category => (
                <li className='categories-item' key={category.id} >
                    <button className='categories-item-btn' data-id={category.id} type='button' onClick={handleCategoryClick}>{category.name}</button>
                </li>
            ))}
        </ul>
    )
}

export default Sidebar;