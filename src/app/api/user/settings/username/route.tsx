import { getAuthSession } from 'lib/auth';
import { NextResponse } from 'next/server';
import { db } from 'lib/db';
import { validator } from 'utils/validator';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error_msg: 'You have to be logged in.' },
        { status: 401 },
      );
    }

    const { username } = await req.json();

    validator.username.parse(username);

    // check if the username is already taken
    const usernameExists = await db.user.findFirst({
      where: { username },
    });

    if (usernameExists) {
      return NextResponse.json(
        { error_msg: 'Username already exists.' },
        { status: 400 },
      );
    }

    // update the user
    const user = await db.user.update({
      where: { email: session.user.email },
      data: {
        username,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error_msg: e.errors[0].message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
