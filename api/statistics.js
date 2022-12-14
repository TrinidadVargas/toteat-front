import apiUtils from './api'

const statisticsApi = {
  getStatistics: params => {
    const url = '/statistics/sales_by_period/';
    return apiUtils.api({
      method: 'GET',
      url,
      params,
    });
  },
  getSummary: params => {
    const url = '/statistics/sales_summary/';
    return apiUtils.api({
      method: 'GET',
      url,
      params,
    });
  },
};

export default statisticsApi;
