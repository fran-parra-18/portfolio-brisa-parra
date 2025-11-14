
'use server';

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

type Illustration = {
  id: string;
  imageUrl: string;
  description: string;
};

export async function getImages(): Promise<Illustration[]> {
  try {
    const files = await imagekit.listFiles({
      // Sort by creation date descending to get newest files first
      sort: 'DESC_CREATED',
    });

    // We filter just for files, not folders
    const imageFiles = files.filter(file => file.type === 'file');

    return imageFiles.map(img => ({
      id: img.fileId,
      imageUrl: img.url,
      description: img.name,
    }));
  } catch (error) {
    console.error('Error fetching from ImageKit:', error);
    // In case of an error, return an empty array to prevent the page from crashing.
    return [];
  }
}
