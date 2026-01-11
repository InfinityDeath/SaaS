import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Simula persistencia en la nube usando localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("cloud_notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("cloud_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === "") return;
    setNotes([...notes, { id: Date.now(), content: text }]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Mini SaaS Cloud – Gestor de Notas</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe una nota..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
            >
              <span>{note.content}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Ejemplo de aplicación SaaS básica desplegable en la nube (Vercel)
        </p>
      </div>
    </div>
  );
}

