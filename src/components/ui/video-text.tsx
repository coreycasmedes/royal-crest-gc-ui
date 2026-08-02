import { useEffect, useRef, useState, type ElementType } from "react"

import { cn } from "@/lib/utils"

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string
  /**
   * Additional className for the container
   */
  className?: string
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean
  /**
   * Whether to mute the video
   */
  muted?: boolean
  /**
   * Whether to loop the video
   */
  loop?: boolean
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none"
  /**
   * Playback speed multiplier (1 = normal, 0.5 = half speed)
   * @default 1
   */
  playbackRate?: number
  /**
   * The content to display (will have the video "inside" it).
   * Pass an array to render multiple lines that share a single video
   * element, each line revealing a different horizontal band of the
   * same continuously-playing footage.
   */
  children: string | string[]
  /**
   * Line height for multi-line content, in em units relative to fontSize.
   * @default 1.05
   */
  lineHeight?: number
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number
  /**
   * Letter spacing for the text mask (CSS length, e.g. "-0.03em")
   */
  letterSpacing?: string
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  playbackRate = 1,
  lineHeight = 1.05,
  fontSize = 20,
  fontWeight = "bold",
  letterSpacing,
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const lines = Array.isArray(children) ? children : [children]
  const content = lines.join(" ")
  const linesKey = lines.join(" ")

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const updateSvgMask = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize
      const letterSpacingAttr = letterSpacing
        ? ` letter-spacing='${letterSpacing}'`
        : ""
      // Multi-line text as tspans within a single <text> element, offset by
      // dy in em units — spacing stays tied to font size at every viewport
      // instead of drifting against an independently-sized container.
      const startDy = -((lines.length - 1) / 2) * lineHeight
      const tspans = lines
        .map((line, index) => {
          const dy = index === 0 ? startDy : lineHeight
          return `<tspan x='50%' dy='${dy}em'>${line}</tspan>`
        })
        .join("")
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'${letterSpacingAttr}>${tspans}</text></svg>`
      setSvgMask(newSvgMask)
    }

    updateSvgMask()
    window.addEventListener("resize", updateSvgMask)
    return () => window.removeEventListener("resize", updateSvgMask)
  }, [
    linesKey,
    lineHeight,
    fontSize,
    fontWeight,
    letterSpacing,
    textAnchor,
    dominantBaseline,
    fontFamily,
  ])

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <Component className={cn(`relative size-full`, className)}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  )
}
