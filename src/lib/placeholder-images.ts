import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Note: The main gallery page now loads from Firestore.
// This file is kept for other sections of the site.
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
