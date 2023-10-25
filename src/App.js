import React from "react";
import styled from "styled-components";
import TaskList from "./components/TaskList";
import VideoPlayer from "./components/VideoPlayer";

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <AppWrapper>
      <VideoPlayer />
      <TaskList />
    </AppWrapper>
  );
}

export default App;
