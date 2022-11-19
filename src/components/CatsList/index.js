import './styles.css';

const CatsList = ({ cats }) => {

    return (
        <div className='cats'>
            {cats && cats.map((cat, index) => (
                <div className={`cats-item`} key={index}>
                    <img className='cats-item-img' src={cat.url} width={cat.width} height={cat.height} alt={cat.id} />
                </div>
            ))}
        </div>
    )
}

export default CatsList;