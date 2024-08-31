const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const response = await fetch('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json');
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching provinces' }),
    };
  }
}
