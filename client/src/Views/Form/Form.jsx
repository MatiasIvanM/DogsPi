/* import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDog } from '../../Redux/Actions/actions';
import Dropzone from 'react-dropzone';
import style from './Form.module.css';

const DogForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (files) => {
    setFormData({
      ...formData,
      image: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí realizas la petición POST a tu backend para agregar una nueva raza de perros
    dispatch(postDog(formData));
    // Luego puedes redirigir a la página de detalles de la nueva raza agregada
    // history.push('/dog/' + newDogId);
  };

  return (
    <div className={style.form_container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="life_span"
          placeholder="Life Span"
          value={formData.life_span}
          onChange={handleInputChange}
        />
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={style.dropzone}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop an image here, or click to select image</p>
              {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Selected" />}
            </div>
          )}
        </Dropzone>
        <button type="submit">Add Dog</button>
      </form>
    </div>
  );
};

export default DogForm; */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Importamos useHistory
import { postDog } from '../../Redux/Actions/actions';
import style from './Form.module.css';


const DogForm = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Obtenemos el objeto history

  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (files) => {
    setFormData({
      ...formData,
      image: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí realizas la petición POST a tu backend para agregar una nueva raza de perros
    dispatch(postDog(formData));
    // Luego puedes redirigir a la página de detalles de la nueva raza agregada
    // history.push('/dog/' + newDogId);
  };

  const handleCancel = () => {
    const shouldCancel = window.confirm(
      'Are you sure you want to cancel? Your changes will not be saved.'
    );
    if (shouldCancel) {
      // Redirigir al home
      history.push('/home');
    }
  };

  return (
    <div className={style.form_container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.form_title}>Add a New Dog</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className={style.form_input}
        />
        <input
          type="text"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleInputChange}
          className={style.form_input}
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleInputChange}
          className={style.form_input}
        />
        <input
          type="text"
          name="life_span"
          placeholder="Life Span"
          value={formData.life_span}
          onChange={handleInputChange}
          className={style.form_input}
        />
        <label className={style.file_input_label}>
          Drag 'n' drop an image here, or click to select image
          <input
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImageUpload(e.target.files)}
            className={style.file_input}
          />
        </label>
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Selected"
            className={style.selected_image}
          />
        )}
        <button type="submit" className={style.form_button}>
          Add Dog
        </button>
        <button type="button" onClick={handleCancel} className={style.form_button}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DogForm;