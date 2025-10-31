"use server";

import * as cheerio from 'cheerio';

export type Metadata = {
  title: string | null;
  image: string | null;
  description: string | null;
};

export const getLinkPreview = async (url: string): Promise<Metadata> => {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'bot/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      return { title: null, image: null, description: null };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetaTag = (name: string) => {
      return (
        $(`meta[property="og:${name}"]`).attr('content') ||
        $(`meta[name="${name}"]`).attr('content') ||
        null
      );
    };

    const title = getMetaTag('title') || $('title').first().text() || null;
    const image = getMetaTag('image');
    const description = getMetaTag('description');

    // Make sure the image URL is absolute
    const imageUrl = image ? new URL(image, url).toString() : null;

    return { title, image: imageUrl, description };
  } catch (error) {
    console.error(`Error fetching link preview for ${url}:`, error);
    return { title: null, image: null, description: null };
  }
};
