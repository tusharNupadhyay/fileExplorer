import { useState } from "react";

function FileTree({
  node,
  selectedFolder,
  setSelectedFolder,
  showInput,
  handleKeyDown,
  inputRef,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: 15, width: "90%" }}>
      <p
        onClick={() => {
          if (!node.isFolder) return;
          setSelectedFolder(node.id);
          setIsOpen(!isOpen);
        }}
        className={`folderFileNames ${selectedFolder === node.id ? " selectedFolder" : ""}`}
      >
        {node.isFolder ? "📁" : "📄"}
        {node.name}
      </p>

      {isOpen && node.isFolder && (
        <>
          {node.children.map((child) => (
            <FileTree
              key={child.id}
              node={child}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              showInput={showInput}
              handleKeyDown={handleKeyDown}
              inputRef={inputRef}
            />
          ))}
          {showInput && selectedFolder === node.id && (
            <input
              className="createInput"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FileTree;
