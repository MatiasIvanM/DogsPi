function validateFormData(formData) {
    const errors = {};
  
    // Validación para el campo "name"
    if (!/^[A-Za-zñÑ\s]+$/.test(formData.name)) {
      errors.name = 'Name must contain only letters and spaces.';
    }
  
    // Validación para los campos de altura
    if (!formData.heightMin || !formData.heightMax) {
      errors.height = 'Both minimum and maximum height values are required.';
    } else if (!/^\d+$/.test(formData.heightMin) || !/^\d+$/.test(formData.heightMax)) {
      errors.height = 'Height values should be valid numbers.';
    } else if (formData.heightMin > formData.heightMax) {
      errors.height = 'Minimum height value cannot be greater than maximum height value.';
    
    }
  
    // Validación para los campos de peso
    if (!formData.weightMin || !formData.weightMax) {
      errors.weight = 'Both minimum and maximum weight values are required.';
    } else if (!/^\d+$/.test(formData.weightMin) || !/^\d+$/.test(formData.weightMax)) {
      errors.weight = 'Weight values should be valid numbers.';
    }else if (formData.weightMin > formData.weightMax) {
      errors.weight = 'Minimum height value cannot be greater than maximum height value.';
    
    }
  
    // Validación para el campo "lifeSpan"
    if (!/^\d+$/.test(formData.lifeSpan)) {
      errors.lifeSpan = 'Life expectancy should contain only numbers.';
    }
  
    // Validación para el campo "image"
    if (!/^https?:\/\/\S+$/.test(formData.image)) {
      errors.image = 'Image URL is invalid.';
    }
  
    // Validación para el campo "temperaments"
    if (formData.temperaments.length === 0) {
      errors.temperaments = 'You must select at least one temperament.';
    }
  
    return errors;
  }

export default validateFormData;