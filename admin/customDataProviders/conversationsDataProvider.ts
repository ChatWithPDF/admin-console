const API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;
//@ts-ignore
const AUTH_TOKEN = JSON.parse(localStorage.getItem('userData'))?.user?.token;

// Function to fetch data from the API
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

const dataProvider = {
  getList: async (resource: any, params: any): Promise<any> => {
    const page = params.pagination?.page ?? 1;
    const perPage = params.pagination?.perPage ?? 10;

    let url = `${API_URL}/user/conversations?page=${page}&perPage=${perPage}`;

    // Check if date filtering is requested
    if (
      params.filter &&
      params.filter.fromDate &&
      params.filter.toDate &&
      !params.filter.mobile
    ) {
      const fromDateObj = new Date(params.filter.fromDate);
      const toDateObj = new Date(params.filter.toDate);
      fromDateObj.setHours(0, 0, 0, 0);
      toDateObj.setHours(23, 59, 59, 999);
      const fromDate = fromDateObj.toISOString().slice(0, 19).replace('T', ' ');
      const toDate = toDateObj.toISOString().slice(0, 19).replace('T', ' ');
      url = `${API_URL}/user/conversations?fromDate=${fromDate}&toDate=${toDate}&page=${page}&perPage=${perPage}`;
    }
    // Check if mobile filtering is requested
    else if (
      params.filter &&
      params.filter.mobile &&
      !params.filter.fromDate &&
      !params.filter.toDate
    ) {
      url = `${API_URL}/user/conversations?mobileNumber=${params.filter.mobile}&page=${page}&perPage=${perPage}`;
    }
    // Check if combined mobile and date filtering is requested
    else if (
      params.filter &&
      params.filter.mobile &&
      params.filter.fromDate &&
      params.filter.toDate
    ) {
      const fromDateObj = new Date(params.filter.fromDate);
      const toDateObj = new Date(params.filter.toDate);
      fromDateObj.setHours(0, 0, 0, 0);
      toDateObj.setHours(23, 59, 59, 999);
      const fromDate = fromDateObj.toISOString().slice(0, 19).replace('T', ' ');
      const toDate = toDateObj.toISOString().slice(0, 19).replace('T', ' ');
      url = `${API_URL}/user/conversations?mobileNumber=${params.filter.mobile}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&perPage=${perPage}`;
    }

    // Fetch data from the API
    const responseData = await fetchData(url);

    // Fetch chat history for each conversation
    const queryPromises = responseData.userHistory.map(async (e: any) => {
      const histUrl = `${API_URL}/user/chathistory/${e.conversationId}?userid=${e.userId}`;
      return await fetchData(histUrl);
    });
    const queries = await Promise.all(queryPromises);

    // Prepare the final data object
    const data: any = {
      total: responseData.pagination.totalConversations,
      data: responseData.userHistory.map((e: any, index: number) => ({
        id: e.conversationId,
        userid: e.userId,
        feedback: e.feedback,
        mobile: e.mobileNumber || params.filter?.mobile || 'Bot',
        lastUpdated: new Date(e.lastConversationAt).toLocaleDateString('en-GB'),
        queries: queries[index].length,
      })),
    };

    return data;
  },
};

export default dataProvider;
