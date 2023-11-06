const AuthApplicationID = process.env.NEXT_PUBLIC_APPLICATION_ID;

export const getToken = async (userName: string, password: string) => {
  const body: any = {
    password: `${password}`,
    loginId: `${userName}`,
    applicationId: AuthApplicationID,
  };
  let response: any = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/login`, {
    method: 'POST',
    //@ts-ignore
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "x-application-id": AuthApplicationID
    },
    body: JSON.stringify(body)
  });
  response = await response.json();
  if (response?.result?.data) {
    localStorage.setItem(
      "userData",
      JSON.stringify(response?.result?.data)
    );
    const event: any = new Event('userFetched');
    event.value = response?.result?.data?.user?.token;
    event.key = 'jwtToken';
    document.dispatchEvent(event);
  }
  return response;
};

export const loginPreCheck = async (userName: string, password: string) => {
  const body: any = {
    password: `${password}`,
    loginId: `${userName}`,
    applicationId: AuthApplicationID,
  };
  let response: any = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/login`, {
    method: 'POST',
    //@ts-ignore
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "x-application-id": AuthApplicationID
    },
    body: JSON.stringify(body)
  });
  response = await response.json();
  console.log(response)
  if (response?.responseCode === "OK") return true;
  return false;
};

export const RefreshToken = async () => {
  const userData = JSON.parse(localStorage.getItem("userData") as string);
  const data = {
    token: userData?.user?.token,
    refreshToken: userData?.user?.refreshToken
  }
  if (data.token && data.refreshToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/refresh-token`, {
      method: 'POST',
      //@ts-ignore
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-application-id": AuthApplicationID
      },
      body: JSON.stringify(data)
    });
    let refreshData = await res.json();
    userData.user.token = refreshData.result.user.token;
    userData.user.refreshToken = refreshData.result.user.refreshToken;

    const event: any = new Event('refreshUserToken');

    event.value = refreshData.result.user.token;
    event.key = 'jwtToken';

    document.dispatchEvent(event);

    localStorage.setItem('userData', JSON.stringify(userData));
  }
};
