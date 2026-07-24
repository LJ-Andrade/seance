"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  /** YouTube video id (the part after `v=`). */
  id: string;
  /** Accessible title for the player / thumbnail button. */
  title: string;
  /**
   * Custom poster image. Defaults to YouTube's own high-res thumbnail so a
   * chosen frame shows instead of a random one.
   */
  poster?: string;
  className?: string;
};

/**
 * Lazy YouTube "facade": renders a static poster with a play button and only
 * loads the real iframe on click. Keeps the initial page light (no YouTube
 * scripts/cookies until the user opts in) and lets us control the thumbnail.
 */
export function YouTubeEmbed({ id, title, poster, className }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  const thumbnail = poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={title}
      className={`group absolute inset-0 h-full w-full cursor-pointer ${className ?? ""}`}
    >
      {/* Poster is external (YouTube) or a local static asset; a plain img keeps
          it simple and avoids remote-image config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
      <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 transition-transform group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="white" aria-hidden className="ml-1 size-7">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
