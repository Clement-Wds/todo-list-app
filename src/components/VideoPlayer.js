import React from "react";
import styled from "styled-components";
import VideoToDisplay from "../videos/baissetatete.mp4"; // Importez la vidéo depuis le répertoire videos

const VideoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function VideoPlayer() {
  return (
    <VideoWrapper>
      <VideoOverlay>
        <Video autoPlay muted loop>
          <source src={VideoToDisplay} type="video/mp4" />
        </Video>
      </VideoOverlay>
    </VideoWrapper>
  );
}

export default VideoPlayer;
