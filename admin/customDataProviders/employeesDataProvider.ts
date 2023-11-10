import { client } from "../api-clients/bff-client";

let finalData: any;

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
    let p:any = {}
    if(params.pagination.page) p['page'] = params.pagination.page;
    if(params.pagination.perPage) p['pageSize'] = params.pagination.perPage;
    if(params.filter.mobileNumber) p['mobileNumber'] = params.filter.mobileNumber;
    if(params.filter.name) p['name'] = params.filter.name;
    const response = await client.get(`/user/employee`,{
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
      params:p
    });
    let data: any = {
      total: 0,
      data: [],
    }
    if (response?.data) {
      data = {
        total: response?.data?.pagination.totalEmployees,
        data: response?.data?.employees?.map((emp:any,id:any)=>{emp['id']=id;return emp}) || [],
      };
    } 
    finalData = data.data
    return data
  },
  update: async (resource: any, {id,data}: any): Promise<any> => {
    id = finalData[id].employeeId
    delete data.id
    const response = await client.put(`/user/employee/${id}`, data,
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
      return {data:{...data[0],id: 0}}
    } 
    return {data}
  },
  create: async (resource: any, {data}: any): Promise<any> => {
    delete data.id
    const response = await client.post(`/user/employee`, data,
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
      finalData.push(data)
      return {data:{...data[0],id: finalData.length-1}}
    } 
    return {data}
  },
  delete: async (resource: any, params: any): Promise<any> => {
    params.id = finalData[params.id].employeeId
    const response = await client.delete(`/user/employee/${params.id}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = {data: {...response?.data,id:0}};
      return data
    } 
    return null
  },
  getOne: async (resource: any, params: any): Promise<any> => {
    console.log(finalData)
    params.id = finalData[params.id].employeeId
    const response = await client.get(`/user/employee/${params.id}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = {data: {...response?.data,id:0}};
      return data
    } 
    return null
  }
};
export default dataProvider;
