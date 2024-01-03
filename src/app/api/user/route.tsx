import { getAuthSession } from 'lib/auth';
import { db } from 'lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error_msg: 'You have to be logged in.' },
        { status: 401 },
      );
    }

    const user = await db.user.findFirst({
      where: { email: session.user.email },
      include: { favorites: true, collection: true },
    });

    const data = {
      collection: user.collection,
      favorites: user.favorites,
    };

    return new Response(JSON.stringify(data));
  } catch (e) {
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
