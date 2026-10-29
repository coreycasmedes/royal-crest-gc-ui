import { useEffect, useRef, useState, type ElementType } from "react"

import { cn } from "@/lib/utils"

export interface VideoTextProps {
  src: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
  poster?: string
  /** Fetch the video only after page load so it never competes with first paint; skipped under reduced motion. */
  startOnLoad?: boolean
  playbackRate?: number
  /** A prop, not children: an Astro island receives children as rendered HTML. Lines share one video. */
  text: string | string[]
  lineHeight?: number
  fontSize?: string | number
  fontWeight?: string | number
  letterSpacing?: string
  textAnchor?: string
  dominantBaseline?: string
  fontFamily?: string
  /** woff2 to inline into the SVG mask, which cannot see fonts loaded by the page. */
  fontSrc?: string
  as?: ElementType
}

const FONT_LOADING = undefined
const FONT_UNAVAILABLE = null

export function VideoText({
  src,
  text,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  poster,
  startOnLoad = false,
  playbackRate = 1,
  lineHeight = 1.05,
  fontSize = 20,
  fontWeight = "bold",
  letterSpacing,
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  fontSrc,
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("")
  const [fontDataUrl, setFontDataUrl] = useState<string | null | undefined>(
    fontSrc ? FONT_LOADING : FONT_UNAVAILABLE,
  )
  const videoRef = useRef<HTMLVideoElement>(null)
  const lines = Array.isArray(text) ? text : [text]
  const accessibleText = lines.join(" ")
  const linesKey = lines.join("\n")

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate
  }, [playbackRate])

  // React sets `muted` only as a property; iOS Safari autoplay needs defaultMuted too.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.defaultMuted = muted
    video.muted = muted
  }, [muted])

  useEffect(() => {
    const video = videoRef.current
    if (!startOnLoad || !video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const start = () => {
      video.playbackRate = playbackRate
      video.play().catch(() => {})
    }
    if (document.readyState === "complete") {
      start()
      return
    }
    window.addEventListener("load", start, { once: true })
    return () => window.removeEventListener("load", start)
  }, [startOnLoad, playbackRate])

  useEffect(() => {
    if (!fontSrc) return
    let cancelled = false
    fetch(fontSrc)
      .then((res) => (res.ok ? res.blob() : Promise.reject(res.status)))
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          }),
      )
      .then((url) => !cancelled && setFontDataUrl(url))
      .catch(() => !cancelled && setFontDataUrl(FONT_UNAVAILABLE))
    return () => {
      cancelled = true
    }
  }, [fontSrc])

  useEffect(() => {
    if (fontDataUrl === FONT_LOADING) return

    const updateSvgMask = () => {
      const lines = linesKey.split("\n")
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize
      const letterSpacingAttr = letterSpacing
        ? ` letter-spacing='${letterSpacing}'`
        : ""
      // dy in em keeps line spacing tied to font size at every viewport width.
      const startDy = -((lines.length - 1) / 2) * lineHeight
      const tspans = lines
        .map((line, index) => {
          const dy = index === 0 ? startDy : lineHeight
          return `<tspan x='50%' dy='${dy}em'>${line}</tspan>`
        })
        .join("")
      const embeddedFamily = fontFamily.split(",")[0].trim().replace(/['"]/g, "")
      const fontFace = fontDataUrl
        ? `<defs><style>@font-face{font-family:'${embeddedFamily}';src:url(${fontDataUrl}) format('woff2');font-weight:100 900;}</style></defs>`
        : ""
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>${fontFace}<text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'${letterSpacingAttr}>${tspans}</text></svg>`
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
    fontDataUrl,
  ])

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <Component className={cn(`relative size-full`, className)}>
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
          autoPlay={autoPlay && !startOnLoad}
          muted={muted}
          loop={loop}
          preload={startOnLoad ? "none" : preload}
          poster={poster}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      <span className="sr-only">{accessibleText}</span>
    </Component>
  )
}
