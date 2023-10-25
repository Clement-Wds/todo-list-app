import React from "react";
import TaskList from "./components/TaskList";
import styled from "styled-components";
const AppWrapper = styled.div`
  background-color: #000; // Noir
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function App() {
  return (
    <AppWrapper>
      <TaskList />
    </AppWrapper>
  );
}

export default App;
