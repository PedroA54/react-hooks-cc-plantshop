import React, {useState} from "react";

function PlantCard({id,image,name,price,handleDelete,handleEdit}) {
  const [status, setStatus] = useState(true)

  const toggleStatus = () => {
    setStatus(!status)

  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <div className='button-container'>

      {status ? (
        <button className="primary" onClick={toggleStatus}>In Stock</button>
      ) : (
        <button onClick={toggleStatus}>Out of Stock</button>
      )}
      <button className='edit' onClick={() => handleEdit(id)}>Edit</button>
      <button className='remove' onClick={() => handleDelete(id)}>X</button>

      </div>
    </li>
  );
}

export default PlantCard;