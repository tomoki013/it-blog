"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getLinkPreview, Metadata } from '@/actions/metadataActions';
import { LinkIcon } from 'lucide-react';

type Props = {
  href: string;
};

const ExternalLinkCard = ({ href }: Props) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getLinkPreview(href);
        setMetadata(data);
      } catch (error) {
        console.error('Failed to fetch link preview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [href]);

  if (isLoading) {
    return (
      <div className="not-prose my-6 flex items-center gap-4 rounded-lg border border-cyan-500/30 bg-gray-900/50 p-4 animate-pulse">
        <div className="h-5 w-5 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }

  if (!metadata || !metadata.title) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="not-prose group relative my-6 flex items-center gap-4 rounded-lg border border-cyan-500/30 bg-gray-900/50 p-4 text-cyan-200 transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/60"
      >
        <LinkIcon className="h-5 w-5 flex-shrink-0 text-cyan-400" />
        <span className="truncate text-sm font-medium">{href}</span>
      </a>
    );
  }

  const { title, image, description } = metadata;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group relative my-6 flex flex-col sm:flex-row items-stretch gap-4 overflow-hidden rounded-lg border border-cyan-500/30 bg-gray-900/50 text-cyan-200 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/60 hover:shadow-cyan-500/20"
    >
      {image && (
        <div className="relative h-32 w-full sm:h-auto sm:w-48 flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-col justify-center p-4">
        <h3 className="mb-1 font-bold text-base text-cyan-100 group-hover:text-cyan-300">
          {title}
        </h3>
        <p className="mb-2 text-sm text-cyan-200/70 line-clamp-2">
          {description || 'No description available.'}
        </p>
        <div className="mt-auto flex items-center gap-2 text-xs text-cyan-400/60">
          <LinkIcon className="h-4 w-4" />
          <span className="truncate">{new URL(href).hostname}</span>
        </div>
      </div>
    </a>
  );
};

export default ExternalLinkCard;
