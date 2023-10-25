import React from "react";
import styled from "styled-components";

import BackgroundVideoFile from "../videos/baissetatete.mp4";
const BackgroundVideo = () => {
  return (
    <StyledVideo autoPlay muted loop>
      <source src={BackgroundVideoFile} type="video/mp4" />
      Votre navigateur ne prend pas en charge la vidéo.
    </StyledVideo>
  );
};

const StyledVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  z-index: -1;
`;

export default BackgroundVideo;
