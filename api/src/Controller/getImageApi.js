require("dotenv").config();
const { API_KEY, URL } = process.env;
const axios = require("axios");

const getImages = async (id) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/images/${id}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const imageUrl = response.data.url;
 

    return imageUrl;
  } catch (error) {
    console.error("Error in getImages:", error);
  }
};

module.exports = getImages;