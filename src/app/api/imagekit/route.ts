import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

// IMPORTANT: These credentials should be stored in environment variables for security.
// Your client will need to create a .env.local file in the root of the project
// and add these values from their ImageKit dashboard.
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "YOUR_PRIVATE_KEY",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "YOUR_URL_ENDPOINT"
});

export async function GET() {
  try {
    const files = await imagekit.listFiles({
      // You can add more options here, like path, tags, etc.
    });

    // We filter just for files, not folders
    const imageFiles = files.filter(file => file.type === 'file');

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error fetching from ImageKit:', error);
    return NextResponse.json({ message: 'Error fetching images from ImageKit' }, { status: 500 });
  }
}
