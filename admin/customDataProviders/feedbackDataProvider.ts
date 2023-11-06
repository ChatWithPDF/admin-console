import { client } from "../api-clients/bff-client";

const dataProvider = {
  getList: async (resource: any, params: any): Promise<any> => {
    const page = params.pagination?.page || 1,
    perPage = params.pagination?.perPage || 10;
    const response = await client.get(`/feedback?page=${page}&perPage=${perPage}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    let data: any = {
      total: 0,
      data: [],
    }
    if (response?.data) {
      data = {
        total: response?.data?.pagination.totalFeedbacks,
        data: response?.data?.feedbacks || [],
      };
    }
    return data
  }
};
export default dataProvider;
