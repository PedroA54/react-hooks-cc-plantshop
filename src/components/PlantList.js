import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants,searchParams,handleDelete,handleEdit}) {
  const renderPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchParams.toLowerCase())).map((plant) => <PlantCard key={plant.id} {...plant} handleDelete={handleDelete} handleEdit={handleEdit}/>)

  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;
