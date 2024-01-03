import { getAuthSession } from 'lib/auth';
import { db } from 'lib/db';
import { NextResponse } from 'next/server';

// Add or remove game from collection
export async function POST(req: Request) {
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
      include: { collection: true },
    });

    const userCollection = user.collection.items;
    let action = '';

    // if the game is already in the collection, remove it
    if (userCollection.includes(id)) {
      userCollection.splice(userCollection.indexOf(id), 1);
      action = 'remove';
    } else {
      // otherwise add it
      userCollection.push(id);
      action = 'add';
    }

    // update the user collection
    await db.user.update({
      where: { email: session.user.email },
      include: { favorites: true },
      data: {
        collection: {
          update: {
            items: userCollection,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({ collection: user.collection, action }),
    );
  } catch (e) {
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
