import Image from "next/image";

export type Logo = {
  src: string;
  alt: string;
  /** Intrinsic width / height of the file. */
  ratio: number;
};

type Props = {
  logos: Logo[];
  /** Seconds per full loop. */
  duration?: number;
  reverse?: boolean;
  /** How many times the list repeats inside each half — enough to overfill the row. */
  repeat?: number;
};

/**
 * Infinite logo strip. The track holds two identical halves and slides by
 * exactly -50%, so the loop is seamless. Pauses on hover; edges fade out.
 */
export function Marquee({ logos, duration = 40, reverse = false, repeat = 2 }: Props) {
  const half = Array.from({ length: repeat }, () => logos).flat();

  return (
    <div className="marquee-mask group overflow-hidden">
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-[var(--logo-gap)] pr-[var(--logo-gap)]"
          >
            {half.map((logo, i) => (
              <li
                key={`${logo.src}-${i}`}
                className="relative shrink-0"
                // Every logo fits the same box: as tall as allowed, but never wider than --logo-w.
                style={{
                  width: `min(var(--logo-w), var(--logo-h) * ${logo.ratio})`,
                  aspectRatio: logo.ratio,
                }}
              >
                <Image
                  src={logo.src}
                  alt={copy === 0 && i < logos.length ? logo.alt : ""}
                  fill
                  unoptimized
                  className="object-contain opacity-70"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
