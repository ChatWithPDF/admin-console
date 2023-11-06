import { client } from "../api-clients/bff-client";

const dataProvider = {
  getList: async (resource: any, params: any): Promise<any> => {
    const page = params.pagination?.page || 1,
    perPage = params.pagination?.perPage || 10;
    const response = await client.get(`/faq?page=${page}&perPage=${perPage}`,
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
        total: response?.data?.pagination.totalFaqs,
        data: response?.data?.faqs || [],
      };
    } 
    if (params.filter && params.filter.question) {
      data.data = data.data.filter((item: any) => item.question?.includes(params.filter.question));
    }
    if (params.filter && params.filter.questionInEnglish) {
      data.data = data.data.filter((item: any) => item.questionInEnglish?.includes(params.filter.question));
    }
    data.data = data.data.map((item:any)=>{
      item.question = item.question?.length > 50 ? `${item.question?.substring(0, 50)}...` : item.question;
      item.answer = item.answer?.length > 50 ? `${item.answer?.substring(0, 50)}...` : item.answer;
      item.questionInEnglish = item.questionInEnglish?.length > 50 ? `${item.questionInEnglish?.substring(0, 50)}...` : item.questionInEnglish;
      item.answerInEnglish = item.answerInEnglish?.length > 50 ? `${item.answerInEnglish?.substring(0, 50)}...` : item.answerInEnglish;
      return item
    })
    return data
  },
  update: async (resource: any, {id,data}: any): Promise<any> => {
    const response = await client.patch(`/faq/${id}`, {...data},
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
      return {data:data.faq}
    } 
    return {data}
  },
  create: async (resource: any, {data}: any): Promise<any> => {
    delete data.id
    const response = await client.post("/faq", data,
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
      return {data:data.faq}
    } 
    return {data}
  },
  delete: async (resource: any, params: any): Promise<any> => {
    const response = await client.delete(`/faq/${params.id}`,
    {
      headers: {
        authorization: `Bearer ${
          //@ts-ignore
          JSON.parse(localStorage.getItem('userData')).user.token
        }`,
      },
    });
    if (response?.data) {
      let data = {data: response?.data.faq};
      return data
    } 
    return null
  },
  getOne: async (resource: any, params: any): Promise<any> => {
    const response = await client.get(`/faq/${params.id}`,
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
