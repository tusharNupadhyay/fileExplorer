import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="mainContent">
        <MainContent />
      </main>
    </div>
  );
}

export default App;
