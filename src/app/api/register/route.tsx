import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { validator } from 'utils/validator';
import { db } from 'lib/db';

export async function POST(req) {
  try {
    const { email, username, password, confirmPassword } = await req.json();

    // check the field
    validator.email.parse(email);
    validator.username.parse(username);
    validator.password.parse(password);
    validator.confirmPassword.parse(confirmPassword);

    // check if the email already exists
    const emailCheck = await db.user.findUnique({
      where: { email: email },
    });

    if (emailCheck) {
      return NextResponse.json(
        { error_msg: 'Email already exists.' },
        { status: 400 },
      );
    }

    // check if the username already exists
    const usernameCheck = await db.user.findUnique({
      where: { username: username },
    });

    if (usernameCheck) {
      return NextResponse.json(
        { error_msg: 'Username already exists.' },
        { status: 400 },
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user
    await db.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        image:
          'https://res.cloudinary.com/dbusghutj/image/upload/v1703244196/avatars/ecug8a5etataypreksi0.png',
        collection: {
          create: {},
        },
        favorites: {
          create: {},
        },
      },
    });

    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error_msg: e.errors[0].message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 },
    );
  }
  return NextResponse.json({ message: 'User registered.' }, { status: 201 });
}
