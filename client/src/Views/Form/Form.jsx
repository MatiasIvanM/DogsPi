import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog } from '../../Redux/Actions/actions'; // Importa la acción de crear perro

const FormPage = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [form, setForm] = useState({
    name: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    life_span: '',
    image: '',
    selectedTemperaments: [], // Aquí almacenamos los temperamentos seleccionados
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectTemperament = (e) => {
    const selectedTemperament = e.target.value;
    if (!form.selectedTemperaments.includes(selectedTemperament)) {
      setForm((prevForm) => ({
        ...prevForm,
        selectedTemperaments: [...prevForm.selectedTemperaments, selectedTemperament],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar las validaciones necesarias con JavaScript antes de hacer el post
    // ...

    const dogData = {
      name: form.name,
      height: {
        metric: `${form.min_height} - ${form.max_height} cm`,
      },
      weight: {
        metric: `${form.min_weight} - ${form.max_weight} kg`,
      },
      life_span: form.life_span,
      image: form.image,
      temperaments: form.selectedTemperaments,
    };

    dispatch(createDog(dogData)); // Llama a la acción para crear el perro
    // Aquí puedes realizar alguna acción adicional después de crear el perro
    // ...

    // Limpia los campos del formulario
    setForm({
      name: '',
      min_height: '',
      max_height: '',
      min_weight: '',
      max_weight: '',
      life_span: '',
      image: '',
      selectedTemperaments: [],
    });
  };

  return (
    <div>
      <h1>Create a New Dog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
  <label>Minimum Height (cm):</label>
  <input
    type="text"
    name="min_height"
    value={form.min_height}
    onChange={handleChange}
  />
</div>
<div>
  <label>Maximum Height (cm):</label>
  <input
    type="text"
    name="max_height"
    value={form.max_height}
    onChange={handleChange}
  />
</div>
<div>
  <label>Minimum Weight (kg):</label>
  <input
    type="text"
    name="min_weight"
    value={form.min_weight}
    onChange={handleChange}
  />
</div>
<div>
  <label>Maximum Weight (kg):</label>
  <input
    type="text"
    name="max_weight"
    value={form.max_weight}
    onChange={handleChange}
  />
</div>
<div>
  <label>Life Span:</label>
  <input
    type="text"
    name="life_span"
    value={form.life_span}
    onChange={handleChange}
  />
</div>
<div>
  <label>Image URL:</label>
  <input
    type="text"
    name="image"
    value={form.image}
    onChange={handleChange}
  />
</div>
{/* Temperament selection */}
<div>
  <label>Temperaments:</label>
  <select multiple onChange={handleSelectTemperament}>
    {temperaments.map((temp) => (
      <option key={temp.id} value={temp.name}>
        {temp.name}
      </option>
    ))}
  </select>
</div>
<button type="submit">Create Dog</button>
      </form>
    </div>
  );
};

export default FormPage;
