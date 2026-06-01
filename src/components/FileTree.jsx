import { useState } from "react";

function FileTree({
  node,
  selectedFolder,
  setSelectedFolder,
  inputMode,
  handleKeyDown,
  inputRef,
  setInputMode,
  setRenamingNodeId,
  renamingNodeId,
  handleDelete,
  setSelectedFile,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: 15, width: "90%" }}>
      <p
        onClick={() => {
          if (!node.isFolder) {
            setSelectedFile(node);
            return;
          }
          setSelectedFolder(node.id);
          setIsOpen(!isOpen);
        }}
        className={`folderFileNames ${selectedFolder === node.id ? " selectedFolder" : ""}`}
      >
        {inputMode === "rename" && renamingNodeId === node.id ? (
          <input
            className="createInput"
            ref={inputRef}
            defaultValue={node.name}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            {node.isFolder ? "📁" : "📄"}
            {node.name}
          </>
        )}
        {inputMode !== "rename" && (
          <>
            <button
              className="renameBtn"
              onClick={(e) => {
                e.stopPropagation();
                setRenamingNodeId(node.id);
                setInputMode("rename");
              }}
            >
              rename
            </button>
            <button
              className="deleteBtn"
              onClick={(e) => {
                e.stopPropagation();
                if (node.id === 0) return;
                handleDelete(node.id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </p>

      {isOpen && node.isFolder && (
        <>
          {node?.children.map((child) => (
            <FileTree
              key={child.id}
              node={child}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              inputMode={inputMode}
              setInputMode={setInputMode}
              handleKeyDown={handleKeyDown}
              inputRef={inputRef}
              setRenamingNodeId={setRenamingNodeId}
              renamingNodeId={renamingNodeId}
              handleDelete={handleDelete}
              setSelectedFile={setSelectedFile}
            />
          ))}
          {inputMode !== "rename" &&
            inputMode &&
            selectedFolder === node.id && (
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
