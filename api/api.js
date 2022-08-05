const axios = require('axios');

const apiUtils = {
  statusCodes: {
    ok: 200,
    created: 201,
  },

  api: axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  }),
};

export default apiUtils;
