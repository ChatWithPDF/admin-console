import { client } from "../api-clients/bff-client";

const dataProvider = {
  getList: async (resource: any, params: any): Promise<any> => {
    let body: any = {
      pagination: {
        page: 1,
        perPage : 10
      }
    }
    if(params) {
      body['filter'] = params.filter
      if(params.pagination) {
        body.pagination.page = params.pagination.page
        body.pagination.perPage = params.pagination.perPage
      }
    }
    const response = await client.post(`/document/find`,body,{
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
        total: response?.data?.pagination.totalDocuments,
        data: response?.data?.documents || [],
      };
    } 
    if (body.filter && body.filter.content) {
      data.data = data.data.filter((item: any) => item.content.includes(body.filter.content));
    }
    data.data = data.data.map((item:any)=>{
      item.content = item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content;
      item.heading = item.heading.length > 100 ? `${item.heading.substring(0, 100)}...` : item.heading;
      item.summary = item.summary.length > 100 ? `${item.summary.substring(0, 100)}...` : item.summary;
      return item
    })
    return data
  },
  update: async (resource: any, {id,data}: any): Promise<any> => {
    const response = await client.post("/document", {id,...data},
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = response?.data;
      return {data:data[0]}
    } 
    return {data}
  },
  create: async (resource: any, {data}: any): Promise<any> => {
    const response = await client.post("/document", {...data, id: parseInt(data.id)},
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = response?.data;
      return {data:data[0]}
    } 
    return {data}
  },
  delete: async (resource: any, params: any): Promise<any> => {
    const response = await client.delete(`/document/${params.id}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = {data: response?.data};
      return data
    } 
    return null
  },
  getOne: async (resource: any, params: any): Promise<any> => {
    const response = await client.get(`/document/${params.id}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = {data: response?.data};
      return data
    } 
    return null
  }
};
export default dataProvider;
