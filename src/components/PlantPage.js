import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const plantsUrl = 'http://localhost:6001/plants';
  const [plants, setPlants] = useState([]);
  const [searchParams, setSearchParams] = useState('');
  const [edit, setEdit] = useState(0);

  const handlePlantSubmission = (e, newPlant) => {
    e.preventDefault();
    fetch(plantsUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant)
    })
    .then(resp => resp.json())
    .then(addedPlant => {
      setPlants([...plants, addedPlant]);
    })
    .catch(error => console.error('Error adding plant:', error));
  };

  const handleSearchParams = (search) => {
    setSearchParams(search);
  };

  const handleDelete = (id) => {
    fetch(`${plantsUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(resp => {
      if (resp.ok) {
        const filteredPlants = plants.filter((plant) => plant.id !== id);
        setPlants(filteredPlants);
      }
    })
    .catch(err => console.error('Error deleting plant:', err));
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleEditSubmission = (e, editedPlant) => {
    e.preventDefault();
    fetch(`${plantsUrl}/${editedPlant.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedPlant)
    })
    .then(resp => resp.json())
    .then(updatedPlant => {
      setPlants(plants.map((plant) => plant.id === updatedPlant.id ? updatedPlant : plant));
    })
    .catch(error => console.error('Error editing plant:', error));
    setEdit(0);
  };

  useEffect(() => {
    fetch(plantsUrl)
    .then(resp => resp.json())
    .then(data => setPlants(data))
    .catch(error => console.error('Error fetching plants:', error));
  }, [plantsUrl]);

  return (
    <main>
      <NewPlantForm handlePlantSubmission={handlePlantSubmission} handleEditSubmission={handleEditSubmission} edit={edit} plants={plants} />
      <Search handleSearchParams={handleSearchParams} />
      <PlantList plants={plants} searchParams={searchParams} handleDelete={handleDelete} handleEdit={handleEdit} />
    </main>
  );
}

export default PlantPage;
