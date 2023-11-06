export default async function handler(req, res) {
  const { queryString = '!email:*', page = 1, perPage = 10 } = req.query;

  // Sanitize query string
  const sanitizedQueryString = encodeURIComponent(queryString);

  // Calculate start row
  const calculatedStartRow = (page - 1) * perPage;

  try {
    const url = `${process.env.NEXT_PUBLIC_FUS_URL}/api/user/search?queryString=${sanitizedQueryString}&startRow=${calculatedStartRow}&numberOfResults=${perPage}`;
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FUS_AUTH,
        'x-application-id': process.env.NEXT_PUBLIC_APPLICATION_ID,
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
