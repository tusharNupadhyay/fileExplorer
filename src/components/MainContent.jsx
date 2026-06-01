function MainContent({ selectedFile }) {
  if (!selectedFile) {
    return <div className="mainContent">Select a file to open</div>;
  }

  return (
    <div className="mainContent">
      <h2>{selectedFile.name}</h2>
      <p>{selectedFile.content}</p>
    </div>
  );
}
export default MainContent;
