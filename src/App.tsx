// dependencies
import { useEffect, useState } from "react";

// data
import { initialNote } from "./data/initialNote";
import { stressTestNote } from "./data/stressTestNote";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import SideMenu from "./components/SideMenu";
import Modal from "./components/Modal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

// styles
import "./styles/App.css";

// types
import NoteObj from "./types/NoteObj";

// Context
import NotesContext from "./context/notesContext";
import ThemeContext from "./context/themeContext";

function App() {
  const notesLS: NoteObj[] = JSON.parse(
    localStorage.getItem("notes") ||
      JSON.stringify([initialNote, stressTestNote])
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notes, setNotes] = useState(notesLS);
  const [currentNote, setCurrentNote] = useState(notes[0]);
  const currentNoteIndex = notes.indexOf(currentNote);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        currentNote,
        setCurrentNote,
        currentNoteIndex,
      }}
    >
      <ThemeContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
        }}
      >
        <SideMenu />
        <div id="body">
          <Header />
          <Main />
        </div>
        <Modal />
        <DeleteConfirmModal />
      </ThemeContext.Provider>
    </NotesContext.Provider>
  );
}

export default App;
