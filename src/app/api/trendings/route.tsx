import axios from 'axios';

export async function GET(req: Request) {
  try {
    const date = Math.round(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() / 1000,
    );
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, total_rating_count, cover.image_id, platforms.name, first_release_date, slug; where total_rating_count > 1 & first_release_date > ${date}; sort total_rating_count desc; limit 20;`,
      {
        headers: {
          'Content-Type': 'text/plain',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      },
    );

    // return only the game that have a cover image
    const data = await response.data.filter((game: any) => {
      if (game.cover) {
        return game;
      }
    });

    return new Response(JSON.stringify(data));
  } catch (e) {
    return new Response('Could not find game', { status: 500 });
  }
}
