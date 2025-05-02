import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

type Props = {
  videoUrl: string; // either a VdoCipher videoId or a full Cloudinary URL
  title?: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState<{
    otp: string;
    playbackInfo: string;
  }>({ otp: "", playbackInfo: "" });
  const [loading, setLoading] = useState(false);

  // Detect Cloudinary URL vs VdoCipher videoId
  const isCloudinary = videoUrl.startsWith("http");

  useEffect(() => {
    if (!isCloudinary) {
      setLoading(true);
      axios
        .post("http://localhost:4004/api/course/getVdoCipherOTP", {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch VdoCipher OTP:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [videoUrl, isCloudinary]);

  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {isCloudinary ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
        </div>
      ) : loading ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Loading video...</p>
        </div>
      ) : videoData.otp && videoData.playbackInfo ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=7peKJpS6FCv8z3VY`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Video not available</p>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
