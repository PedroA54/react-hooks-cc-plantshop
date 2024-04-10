import React,{ useState, useEffect } from "react";

function NewPlantForm({handlePlantSubmission,edit,handleEditSubmission,plants}) {

const [newPlant, setNewPlant] = useState({});

  useEffect(() => {

    if(edit > 0) {
      fetch(`http://localhost:6001/plants/${edit}`)
      .then(resp => resp.json())
      .then(data => setNewPlant({
        id: data.id,
        name: data.name,
        image: data.image,
        price: data.price
      }))
    } else {
      setNewPlant({
        id: plants.length + 1,
        name: '',
        image: '',
        price: ''
      })

    }

  },[plants,edit])


  const handleSubmissionChange = (e) => {
    const {name,value} = e.target
    setNewPlant({
      ...newPlant,
      [name] : value
    })

  }

  return (

        <div className={edit ? 'edit-form' : 'new-plant-form' }>
       <h2>{edit ? `Edit Plant` : 'New Plant'}</h2>
        <form onSubmit={edit ? (e) => handleEditSubmission(e,newPlant) : (e) => handlePlantSubmission(e,newPlant) } onChange={handleSubmissionChange }>
          <input type="text" name="name" placeholder="Plant name" value={newPlant.name} />
          <input type="text" name="image" placeholder="Image URL" value={newPlant.image} />
          <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} />
          <button type="submit">{edit ? 'Edit Plant' : 'Add Plant'}</button>
        </form>
        
        </div>
        
  );
}

export default NewPlantForm;
