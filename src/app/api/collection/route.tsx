import axios from 'axios';
import { db } from 'lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error_msg: 'You have to be logged in.' },
        { status: 401 },
      );
    }

    const user = await db.user.findFirst({
      where: { email: session.user.email },
      include: { collection: true },
    });

    const userCollection = user.collection.items;

    if (userCollection.length === 0)
      return new Response(JSON.stringify({ games: [], gamesCount: 0 }));

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id, platforms.name, first_release_date, slug; where id = (${userCollection});`,
      {
        headers: {
          'Content-Type': 'text/plain',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      },
    );

    const games = response.data;

    let data = {
      games,
      gamesCount: games.length,
    };

    return new Response(JSON.stringify(data));
  } catch (e) {
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
