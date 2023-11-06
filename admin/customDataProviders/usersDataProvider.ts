const dataProvider = {
  getList: async (resource: any, params: any): Promise<any> => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;

    let queryString = '!email:*'; // Ignoring users that have a email because they are tester bots

    // Check if filter by ID is requested
    if (params.filter && params.filter.id) {
      queryString = `id:${params.filter.id}`;
    }
    // Check if filter by mobile is requested
    else if (params.filter && params.filter.mobile) {
      queryString = `username:${params.filter.mobile}`;
    }

    // Fetch user data from the API based on the query string and pagination parameters
    const response = await fetch(
      `/api/user/search?page=${page}&perPage=${perPage}&queryString=${queryString}`
    );
    const responseData = await response.json();

    // Retrieve user IDs from the response
    const userIds = responseData.users.map((user: any) => user.id);

    // Fetch conversation data for each user
    const promises = userIds?.map(async (userId: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BFF_API_URL}/user/conversations?userid=${userId}`,
        {
          headers: {
            authorization: `Bearer ${
              //@ts-ignore
              JSON.parse(localStorage.getItem('userData'))?.user?.token
            }`,
          },
        }
      );
      const convResponseData = await response.json();

      const conversationIds = convResponseData.userHistory.map(
        (item: any) => item.conversationId
      );

      const promises2 = conversationIds.map(async (conversationId: any) => {
        try {
          const hist = await fetch(
            `${process.env.NEXT_PUBLIC_BFF_API_URL}/user/chathistory/${conversationId}?userid=${userId}`,
            {
              headers: {
                authorization: `Bearer ${
                  //@ts-ignore
                  JSON.parse(localStorage.getItem('userData'))?.user?.token
                }`,
              },
            }
          );
          const historyData = await hist.json();
          return historyData;
        } catch (error) {
          // Handle error
          console.error(error);
        }
      });

      const queryArray = await Promise.all(promises2);
      const messageCount = queryArray.reduce((acc, curr) => {
        // Iterate over each chat history object and add up the number of messages
        return acc + curr.length;
      }, 0);

      // Add the total message count to the user object
      const user = responseData.users.find((user: any) => user.id === userId);
      user.messageCount = messageCount;

      return user;
    });

    await Promise.all(promises);

    // Prepare the final data object with the required fields
    const data: any = {
      total: responseData.total,
      data: responseData.users.map((user: any) => ({
        id: user.id,
        mobile: user.mobilePhone || user.username,
        lastLogin: new Date(
          user.lastLoginInstant || user.registrations?.[0]?.lastLoginInstant
        ).toLocaleDateString('en-US', {
          timeZone: 'Asia/Kolkata',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        queries: user.messageCount,
      })),
    };

    return data;
  },
};

export default dataProvider;
