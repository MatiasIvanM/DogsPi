import React, { useState } from 'react';
import { createDog } from '../../Redux/Actions/actions'
import { useDispatch } from 'react-redux';

const FormComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    image:'',
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Realiza las validaciones aquí
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.minHeight.trim()) {
      newErrors.minHeight = 'La altura mínima es requerida';
    }

    if (!formData.maxHeight.trim()) {
      newErrors.maxHeight = 'La altura máxima es requerida';
    }

    if (!formData.minWeight.trim()) {
      newErrors.minWeight = 'El peso mínimo es requerido';
    }

    if (!formData.maxWeight.trim()) {
      newErrors.maxWeight = 'El peso máximo es requerido';
    }

    if (!formData.lifeSpan.trim()) {
      newErrors.lifeSpan = 'Los años de vida son requeridos';
    }

    if (formData.minHeight >= formData.maxHeight) {
      newErrors.minHeight = 'La altura mínima debe ser menor que la máxima';
    }

    if (formData.minWeight >= formData.maxWeight) {
      newErrors.minWeight = 'El peso mínimo debe ser menor que el máximo';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Por favor, ingresa una URL válida';
    }

    // Si hay errores, no enviar el formulario y muestra los mensajes
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);


    // Limpia los errores y el formulario después de enviar
    setErrors({});
    setFormData({
      name: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      lifeSpan: '',
      temperaments: [],
      image: '',
    });


    try {
      // Llamada a la acción para crear la raza
      await dispatch(createDog(formData));
      // Resto del código después de enviar el formulario
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  


  return (
    <div>
      <h1>Crear Nueva Raza</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="minHeight">Altura Mínima:</label>
          <input
            type="number"
            id="minHeight"
            name="minHeight"
            value={formData.minHeight}
            onChange={handleInputChange}
          />
          {errors.minHeight && <span className="error">{errors.minHeight}</span>}
        </div>
        <div>
          <label htmlFor="maxHeight">Altura Máxima:</label>
          <input
            type="number"
            id="maxHeight"
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleInputChange}
          />
          {errors.maxHeight && <span className="error">{errors.maxHeight}</span>}
        </div>
        <div>
          <label htmlFor="minWeight">Peso Mínimo:</label>
          <input
            type="number"
            id="minWeight"
            name="minWeight"
            value={formData.minWeight}
            onChange={handleInputChange}
          />
          {errors.minWeight && <span className="error">{errors.minWeight}</span>}
        </div>
        <div>
          <label htmlFor="maxWeight">Peso Máximo:</label>
          <input
            type="number"
            id="maxWeight"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleInputChange}
          />
          {errors.maxWeight && <span className="error">{errors.maxWeight}</span>}
        </div>
        <div>
          <label htmlFor="lifeSpan">Años de Vida:</label>
          <input
            type="number"
            id="lifeSpan"
            name="lifeSpan"
            value={formData.lifeSpan}
            onChange={handleInputChange}
          />
          {errors.lifeSpan && <span className="error">{errors.lifeSpan}</span>}
        </div>
        {/* Agregar campo para temperamentos (puede ser un select o una lista de checkboxes) */}
        <div>
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div>
          <button type="submit">Crear Raza</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;