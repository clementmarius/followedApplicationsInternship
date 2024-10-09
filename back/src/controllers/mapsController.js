const axios = require('axios');
const { stringify } = require('flatted');

async function searchMaps(req, res) {
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({ message: 'Adresse non fournie' });
    }

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
            {
              params: {
                input: address,
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                types: '(cities)',
                language: 'fr',
                components: 'country:fr'
              }
            }
          );

        if (response.data.status === 'OK') {
            const jsonString = stringify(response.data);
            return res.status(200).json(jsonString);
        } else {
            return res.status(400).json({ message: response.data.status });
        }
    } catch (error) {
        console.log(error);

        const errorJsonString = stringify({ message: error.message });

        res.status(500).json(errorJsonString); 
    }
}

module.exports = {
    searchMaps,
}