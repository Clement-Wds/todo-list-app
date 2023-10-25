import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";

function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = useCallback((text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Math.random(), text, completed: false },
    ]);
  }, []);

  const deleteAllTasks = useCallback(() => {
    setTasks([]); // Supprimer toutes les tâches en remplaçant le tableau par un tableau vide
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return { tasks, addTask, deleteTask, toggleTaskCompletion, deleteAllTasks };
}

function TaskList() {
  const [filter, setFilter] = useState("all");
  const [storedTasks, setStoredTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const { tasks, addTask, deleteTask, toggleTaskCompletion, deleteAllTasks } =
    useTasks(storedTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "uncompleted") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  return (
    <TaskListWrapper>
      <StyledTitle>Liste de tâches</StyledTitle>
      <div>
        <FilterButtonsWrapper>
          <FilterButtonAll onClick={() => setFilter("all")}>
            Toutes
          </FilterButtonAll>
          <FilterButtonDone onClick={() => setFilter("completed")}>
            Complétées
          </FilterButtonDone>
          <FilterButtonNotDone onClick={() => setFilter("uncompleted")}>
            Non complétées
          </FilterButtonNotDone>
        </FilterButtonsWrapper>
      </div>
      <div>
        <TaskInput
          type="text"
          placeholder="Nouvelle tâche"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <TaskListStyled>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskText
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </TaskText>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <MarkTaskButton onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? "Démarquer" : "Marquer"}
              </MarkTaskButton>
              <DeleteTaskButton onClick={() => deleteTask(task.id)}>
                Supprimer
              </DeleteTaskButton>
            </div>
          </TaskItem>
        ))}
      </TaskListStyled>
      {tasks.length > 0 && (
        <DeleteAllTasksButton onClick={deleteAllTasks}>
          Supprimer toutes les tâches
        </DeleteAllTasksButton>
      )}
    </TaskListWrapper>
  );
}

// Titre
const TaskListOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Fond transparent pour le texte
  z-index: 1; /* Assurez-vous que le contenu est au-dessus de la vidéo en arrière-plan */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

// Conteneur de la liste de tâches
const TaskListWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 90%; // Ajuster la largeur pour les écrans plus petits
  }
`;

// Éléments de la liste de tâches
const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: relative; // Ajoutez cette ligne pour le positionnement relatif

  @media (max-width: 768px) {
    flex-direction: column; // Empiler les éléments sur les écrans plus petits
  }
`;

// Champ de texte pour les tâches
const TaskInput = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%; // Utiliser toute la largeur sur les écrans plus petits
  }
`;

// Liste de tâches
const TaskListStyled = styled.ul`
  list-style: none;
  padding: 0;
`;

// Texte de tâche
const TaskText = styled.span`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px; // Réduire la taille de la police sur les écrans plus petits
  }
`;

// Conteneur pour les boutons de filtre
const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column; // Empiler les boutons de filtre sur les écrans plus petits
  }
`;

// Boutons de filtre
const FilterButtonAll = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004ea6;
  }

  @media (max-width: 768px) {
    margin-left: 0; // Supprimer la marge à gauche sur les écrans plus petits
    margin-top: 10px; // Ajouter une marge en haut sur les écrans plus petits
  }
`;
const FilterButtonDone = styled.button`
  background-color: Green;
  color: White;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004ea6;
  }

  @media (max-width: 768px) {
    margin-left: 0; // Supprimer la marge à gauche sur les écrans plus petits
    margin-top: 10px; // Ajouter une marge en haut sur les écrans plus petits
  }
`;
const FilterButtonNotDone = styled.button`
  background-color: Red;
  color: White;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004ea6;
  }

  @media (max-width: 768px) {
    margin-left: 0; // Supprimer la marge à gauche sur les écrans plus petits
    margin-top: 10px; // Ajouter une marge en haut sur les écrans plus petits
  }
`;
const DeleteAllTasksButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 10px; // Espacement par rapport aux autres éléments
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    background-color: #bd2130;
  }
`;

// Bouton de tâche
const TaskButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e7e34;
  }

  &:active {
    background-color: #176928;
  }
`;

// Bouton de suppression de tâche
const DeleteTaskButton = styled(TaskButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    background-color: #bd2130;
  }
`;

// Bouton "Mark" de tâche
const MarkTaskButton = styled(TaskButton)`
  background-color: green;

  &:hover {
    background-color: black;
  }

  &:active {
    background-color: black;
  }
`;

export default TaskList;
