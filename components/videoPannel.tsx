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

  const videos = isMobile
    ? [
        { src: "/videos/video1.mp4", bottom: "4vw", right: "4vw" },
        { src: "/videos/video2.mp4", bottom: "4vw", right: "48vw" },
        { src: "/videos/video3.mp4", bottom: "4vw", right: "92vw" },
        { src: "/videos/video4.mp4", bottom: "30vw", right: "4vw" },
        { src: "/videos/video5.mp4", bottom: "30vw", right: "48vw" },
        { src: "/videos/video6.mp4", bottom: "56vw", right: "4vw" },
      ]
    : [
        { src: "/videos/video1.mp4", bottom: "20px", right: "20px" },
        { src: "/videos/video2.mp4", bottom: "20px", right: "260px" },
        { src: "/videos/video3.mp4", bottom: "20px", right: "500px" },
        { src: "/videos/video4.mp4", bottom: "160px", right: "20px" },
        { src: "/videos/video5.mp4", bottom: "160px", right: "260px" },
        { src: "/videos/video6.mp4", bottom: "300px", right: "20px" },
      ]

  // Ensure initial load state matches number of videos
  useEffect(() => {
    setLoadedVideos(new Array(videos.length).fill(false))
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
        src="/images/hongKong.jpeg"
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

      {/* Video Grid */}
      {videos.map((video, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: video.bottom,
            right: video.right,
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
                src="/images/dubai.jpeg" 
                alt="Play" 
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}

          <video
            src={video.src}
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