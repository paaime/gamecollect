import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('name');

    if (!name) return new Response('Invalid query', { status: 400 });

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields *, artworks.image_id, platforms.name, cover.image_id, genres.name, screenshots.image_id, videos.*, involved_companies.company.name, similar_games.*, similar_games.cover.image_id, themes.name, collections.name, franchises.name, player_perspectives.name, websites.*, game_engines.name, game_modes.name; where slug = "${name}";`,
      {
        headers: {
          'Content-Type': 'text/plain',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      },
    );

    if (response.data.length === 0)
      return new Response('Game not found', { status: 404 });

    return new Response(JSON.stringify(response.data[0]));
  } catch (e) {
    return new Response('Could not find game', { status: 500 });
  }
}
