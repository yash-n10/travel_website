"use client"

import React, { useEffect, useState } from "react"

export function FloatingVideoGrid() {
  const [isMobile, setIsMobile] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<boolean[]>([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const videoWidth = isMobile ? "40vw" : "220px"
  const videoHeight = isMobile ? "22.5vw" : "124px"

  const cards = isMobile
    ? [
        { src: "/images/image_box1.jpeg", bottom: "4vw", right: "4vw" },
        { src: "/images/image_box2.jpeg", bottom: "4vw", right: "48vw" },
        { src: "/images/image_box3.jpeg", bottom: "4vw", right: "92vw" },
        { src: "/images/image_box4.jpeg", bottom: "30vw", right: "4vw" },
        { src: "/images/Karnataka.jpg", bottom: "30vw", right: "48vw" },
        { src: "/images/ladakh.jpg", bottom: "56vw", right: "4vw" },
      ]
    : [
        { src: "/images/image_box1.jpeg", bottom: "20px", right: "20px" },
        { src: "/images/image_box2.jpeg", bottom: "20px", right: "260px" },
        { src: "/images/image_box3.jpeg", bottom: "20px", right: "500px" },
        { src: "/images/image_box4.jpeg", bottom: "160px", right: "20px" },
        { src: "/images/Karnataka.jpg", bottom: "160px", right: "260px" },
        { src: "/images/ladakh.jpg", bottom: "300px", right: "20px" },
      ]

  useEffect(() => {
    setLoadedVideos(new Array(cards.length).fill(false))
  }, [isMobile])

  const handleVideoLoaded = (index: number) => {
    setLoadedVideos(prev => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "150vw" : "600px",
        overflow: "hidden",
        marginTop: "2.5rem",
      }}
    >
      {/* Background Image */}
      <img
        src="/images/Andaman.jpg"
        alt="City background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Video/Image Cards */}
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: card.bottom,
            right: card.right,
            width: videoWidth,
            height: videoHeight,
            border: "2px solid white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            zIndex: 10,
          }}
        >
          {/* Image overlay until video is ready */}
          {!loadedVideos[i] && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <img 
                src={card.src} 
                alt={`Thumbnail ${i}`} 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <video
            src={card.src}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => handleVideoLoaded(i)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  )
}
