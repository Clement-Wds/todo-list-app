import React from "react";
import TaskList from "./components/TaskList";
import styled from "styled-components";
import BackgroundVideo from "./components/VideoPlayer";

const AppWrapper = styled.div`
  position: relative;
`;

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Vous pouvez ajuster l'opacité ici */
  z-index: 1; /* Assurez-vous que le contenu est au-dessus de la vidéo en arrière-plan */
`;

function App() {
  return (
    <AppWrapper>
      <BackgroundVideo />

      <TaskList />
    </AppWrapper>
  );
}

export default App;
