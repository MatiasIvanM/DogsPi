import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createDog } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import validateFormData from './validations';
import styles from './Form.module.css';

const FormComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let temperamentos = useSelector((state) => state.temperaments);

  const [temp, setTemp] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    lifeSpan: '',
    image: '',
    temperaments: [],
  });
  console.log("🚀 ~ file: Form.jsx:26 ~ FormComponent ~ formData:", formData)

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleOnChangeTemp = ({ target }) => {
    let { value } = target;

    if (temp.includes(value.name)) {
      alert('This temperament is already added');
    } else {
      setTemp([...temp, value]);

      // Actualiza los temperamentos en formData
      setFormData((prevData) => ({
        ...prevData,
        temperaments: [...prevData.temperaments, value],
      }));
    }
  };
  
  const handleDeleteTemp = (tempToDelete) => {
    const updatedTemp = temp.filter((t) => t !== tempToDelete);
    setTemp(updatedTemp);
  
    // Elimina el temperamento de formData
    setFormData((prevData) => ({
      ...prevData,
      temperaments: prevData.temperaments.filter((t) => t !== tempToDelete),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateFormData(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const formattedData = {
      name: formData.name,
      height: {
        imperial: `${formData.heightMin} - ${formData.heightMax}`,
        metric: `${formData.heightMin} - ${formData.heightMax}`,
      },
      weight: {
        imperial: `${formData.weightMin} - ${formData.weightMax}`,
        metric: `${formData.weightMin} - ${formData.weightMax}`,
      },
      life_span: formData.lifeSpan,
      image: formData.image,
      temperaments: formData.temperaments,
    };

    setErrors({}); // Limpiar errores
    setFormData({
      // Limpiar el formulario después de enviar
      name: '',
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: '',
      lifeSpan: '',
      image: '',
      temperaments: [],
    });

    try {
      await dispatch(createDog(formattedData));
      // Resto del código después de enviar el formulario
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nueva Raza</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Renderización de campo de nombre */}
        <div className={styles.field}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Renderización de campos de altura */}
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <label htmlFor="heightMin">Altura Mínima (cm):</label>
            <input
              type="number"
              id="heightMin"
              name="heightMin"
              value={formData.heightMin}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.gridItem}>
            <label htmlFor="heightMax">Altura Máxima (cm):</label>
            <input
              type="number"
              id="heightMax"
              name="heightMax"
              value={formData.heightMax}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            {errors.height && (
              <span className={styles.error}>{errors.height}</span>
            )}
          </div>
        </div>

        {/* Renderización de campos de peso */}
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <label htmlFor="weightMin">Peso Mínimo (kg):</label>
            <input
              type="number"
              id="weightMin"
              name="weightMin"
              value={formData.weightMin}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.gridItem}>
            <label htmlFor="weightMax">Peso Máximo (kg):</label>
            <input
              type="number"
              id="weightMax"
              name="weightMax"
              value={formData.weightMax}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            {errors.weight && (
              <span className={styles.error}>{errors.weight}</span>
            )}
          </div>
        </div>

        {/* Renderización de campo de esperanza de vida */}
        <div className={styles.field}>
          <label htmlFor="lifeSpan">Esperanza de Vida:</label>
          <input
            type="text"
            id="lifeSpan"
            name="lifeSpan"
            value={formData.lifeSpan}
            onChange={handleInputChange}
          />
          {errors.lifeSpan && (
            <span className={styles.error}>{errors.lifeSpan}</span>
          )}
        </div>

        {/* Renderización de campo de temperamentos */}
        <div className={styles.field}>
          <label htmlFor="temperaments" className={styles.label}>
            Temperamentos:
          </label>
          <div className={styles.temperamentContainer}>
            <select
              defaultValue={'DEFAULT'}
              className={styles.dropdown}
              onChange={handleOnChangeTemp}
            >
              <option value="DEFAULT" disabled className={styles.texto}>
                Temperamentos
              </option>
              {temperamentos.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            {temp.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => handleDeleteTemp(t)}
                className={styles.option}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Renderización de campo de URL de imagen */}
        <div className={styles.field}>
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          {errors.image && (
            <span className={styles.error}>{errors.image}</span>
          )}
        </div>

        {/* Renderización de botón de envío */}
        <div className={styles.field}>
          <button type="submit" className={styles.button}>
            Crear Raza
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

/* import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createDog } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import validateFormData from './validations';
import styles from './Form.module.css';*/

/*const FormComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let temperamentos = useSelector((state) => state.temperaments);

  const [temp, setTemp] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    lifeSpan: '',
    image: '',
    temperaments: [],
  });
  console.log("🚀 ~ file: Form.jsx:316 ~ FormComponent ~ formData:", formData)

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnChangeTemp = ({ target }) => {
    let { value } = target;

    if (temp.includes(value)) {
      alert("This temperament is already added");
    } else {
      setTemp([...temp, value]);

      setFormData((prevData) => ({
        ...prevData,
        temperaments: [...prevData.temperaments, value],
      }));
    }
  };

  const handleDeleteTemp = (tempToDelete) => {
    const updatedTemp = temp.filter((t) => t !== tempToDelete);
    setTemp(updatedTemp);

    setFormData((prevData) => ({
      ...prevData,
      temperaments: prevData.temperaments.filter((t) => t !== tempToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateFormData(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const formattedData = {
      name: formData.name,
      height: {
        imperial: '',
        metric: `${formData.heightMin} - ${formData.heightMax}`,
      },
      weight: {
        imperial: '',
        metric: `${formData.weightMin} - ${formData.weightMax}`
      },
      life_span: formData.lifeSpan,
      image: formData.image,
      temperaments: formData.temperaments,
    };

    setErrors({});
    setFormData({
      name: '',
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: '',
      lifeSpan: '',
      image: '',
      temperaments: [],
    });

    try {
      const response = await dispatch(createDog(formattedData));
      console.log('Response:', response); // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nueva Raza</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
  <label htmlFor="name">Nombre:</label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
  />
  {errors.name && <span className={styles.error}>{errors.name}</span>}
</div>

<div className={styles.gridContainer}>
  <div className={styles.gridItem}>
    <label htmlFor="heightMin">Altura Mínima (cm):</label>
    <input
      type="number"
      id="heightMin"
      name="heightMin"
      value={formData.height.min}
      onChange={handleInputChange}
    />
  </div>
  <div className={styles.gridItem}>
    <label htmlFor="heightMax">Altura Máxima (cm):</label>
    <input
      type="number"
      id="heightMax"
      name="heightMax"
      value={formData.height.max}
      onChange={handleInputChange}
    />
  </div>
  <div className={styles.field}>
    {errors.height && <span className={styles.error}>{errors.height}</span>}
  </div>
</div>

<div className={styles.gridContainer}>
  <div className={styles.gridItem}>
    <label htmlFor="weightMin">Peso Mínimo (kg):</label>
    <input
      type="number"
      id="weightMin"
      name="weightMin"
      value={formData.weight.min}
      onChange={handleInputChange}
    />
  </div>
  <div className={styles.gridItem}>
    <label htmlFor="weightMax">Peso Máximo (kg):</label>
    <input
      type="number"
      id="weightMax"
      name="weightMax"
      value={formData.weight.max}
      onChange={handleInputChange}
    />
  </div>
  <div className={styles.field}>
    {errors.weight && <span className={styles.error}>{errors.weight}</span>}
  </div>
</div>

<div className={styles.field}>
  <label htmlFor="lifeSpan">Esperanza de Vida:</label>
  <input
    type="text"
    id="lifeSpan"
    name="lifeSpan"
    value={formData.lifeSpan}
    onChange={handleInputChange}
  />
  {errors.lifeSpan && <span className={styles.error}>{errors.lifeSpan}</span>}
</div>

<div className={styles.field}>
  <label htmlFor="temperaments" className={styles.label}>
    Temperamentos:
  </label>
  <div className={styles.temperamentContainer}>
    <select
      defaultValue={"DEFAULT"}
      className={styles.dropdown}
      onChange={handleOnChangeTemp}
    >
      <option value="DEFAULT" disabled className={styles.texto}>
        Temperamentos
      </option>
      {temperamentos.map((t) => (
        <option key={t.id} value={t.name}>
          {t.name}
        </option>
      ))}
    </select>
    {temp.map((t) => (
      <button
        type="button"
        key={t}
        onClick={() => handleDeleteTemp(t)}
        className={styles.option}
      >
        {t}
      </button>
    ))}
  </div>
</div>

<div className={styles.field}>
  <label htmlFor="image">URL de la Imagen:</label>
  <input
    type="url"
    id="image"
    name="image"
    value={formData.image}
    onChange={handleInputChange}
  />
  {errors.image && <span className={styles.error}>{errors.image}</span>}
</div>

<div className={styles.field}>
  <button type="submit" className={styles.button}>Crear Raza</button>
</div>
      </form>
    </div>
  );
}; */

