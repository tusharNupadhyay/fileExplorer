import { useState } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="container">
      <aside className="sidebar">
        <Sidebar
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </aside>
      <main className="mainContent">
        <MainContent selectedFile={selectedFile} />
      </main>
    </div>
  );
}

export default App;
