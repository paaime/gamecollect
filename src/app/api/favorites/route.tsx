import axios from 'axios';
import { getAuthSession } from 'lib/auth';
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
      include: { favorites: true },
    });

    const favorites = user.favorites.items;

    if (favorites.length === 0) return new Response(JSON.stringify([]));

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id, slug; where id = (${favorites});`,
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

// Add or remove game from favorites
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    // get the id of the gane from the body, it must be a number
    const { id } = body;

    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error_msg: 'You have to be logged in.' },
        { status: 401 },
      );
    }

    const user = await db.user.findFirst({
      where: { email: session.user.email },
      include: { favorites: true },
    });

    const userFavorites = user.favorites.items;
    let action = '';

    // if the game is already in the collection, remove it
    if (userFavorites.includes(id)) {
      userFavorites.splice(userFavorites.indexOf(id), 1);
      action = 'remove';
    } else {
      // otherwise add it
      userFavorites.push(id);
      action = 'add';
    }

    // update the user collection
    await db.user.update({
      where: { email: session.user.email },
      include: { favorites: true },
      data: {
        favorites: {
          update: {
            items: userFavorites,
          },
        },
      },
    });

    return new Response(JSON.stringify({ favorites: userFavorites, action }));
  } catch (e) {
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
