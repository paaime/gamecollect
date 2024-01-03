import { getAuthSession } from 'lib/auth';
import { db } from 'lib/db';
import { NextResponse } from 'next/server';
import cloudinary from 'utils/cloudinary';

const defaultImages = ['avatars/ecug8a5etataypreksi0'];

export async function POST(req: Request) {
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

    const { image } = await req.json();

    // check the image size
    const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
    const fileSize = req.headers.get('content-length');
    if (!fileSize || parseInt(fileSize, 10) > fileSizeLimit) {
      return NextResponse.json(
        { error_msg: 'File size exceeds the limit of 10 MB.' },
        { status: 400 },
      );
    }

    // delete the old image
    if (!defaultImages.includes(user.image)) {
      await cloudinary.v2.uploader.destroy(user.image);
    }

    const imageUploaded = await cloudinary.v2.uploader.upload(image, {
      unique_filename: true,
      resource_type: 'image',
      folder: 'avatars',
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        image: imageUploaded.url,
      },
    });

    return new Response(JSON.stringify({ image: imageUploaded.url }));
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error_msg: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
}
