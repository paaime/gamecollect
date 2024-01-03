import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q');

    if (!q) return new Response('Invalid query', { status: 400 });

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id, platforms.name, first_release_date, slug; search "${q}"; limit 50;`,
      {
        headers: {
          'Content-Type': 'text/plain',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      },
    );

    return new Response(JSON.stringify(response.data));
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
