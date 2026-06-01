import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import initialFileSystem from "../data.js";
import FileTree from "./FileTree.jsx";
import addNewNode from "./AddNode.js";
import renameNode from "./renameNode.js";
import deleteNode from "./deleteNode.js";

function Sidebar({ setSelectedFile }) {
  const [inputMode, setInputMode] = useState(null);
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [selectedFolder, setSelectedFolder] = useState(1); //only selects folders not files
  const [renamingNodeId, setRenamingNodeId] = useState(null); //selects both folders and files

  const nextId = useRef(5);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputMode && inputRef.current) inputRef.current.focus();
  }, [inputMode]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputMode(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleDelete(targetId) {
    setFileSystem((prev) => deleteNode(prev, targetId));
    if (selectedFolder === targetId) setSelectedFolder(0);
    console.log("selected file/folder has been deleted");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const name = e.target.value;
      if (!name.trim()) return;

      if (inputMode === "rename") {
        setFileSystem((prev) => renameNode(prev, renamingNodeId, name));
        setRenamingNodeId(null);
      } else {
        let newNode;
        if (inputMode === "createFile") {
          newNode = {
            id: nextId.current++,
            name,
            isFolder: false,
          };
        } else if (inputMode === "createFolder") {
          newNode = {
            id: nextId.current++,
            name,
            isFolder: true,
            children: [],
          };
        }
        setFileSystem((prev) => addNewNode(prev, selectedFolder, newNode));
      }

      e.target.value = "";
      setInputMode(null);
    }
    if (e.key === "Escape") {
      e.target.value = "";
      setInputMode(null);
      setRenamingNodeId(null);
    }
  }
  return (
    <div className="sidebarContent">
      <div className="fileButtons">
        <button
          disabled={inputMode}
          onClick={() => {
            setInputMode("createFile");
          }}
        >
          create file
        </button>
        <button
          disabled={inputMode}
          onClick={() => {
            setInputMode("createFolder");
          }}
        >
          create folder
        </button>
      </div>
      <div className="folder">
        <FileTree
          node={fileSystem}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          inputRef={inputRef}
          handleKeyDown={handleKeyDown}
          inputMode={inputMode}
          setInputMode={setInputMode}
          setRenamingNodeId={setRenamingNodeId}
          renamingNodeId={renamingNodeId}
          handleDelete={handleDelete}
          setSelectedFile={setSelectedFile}
        />
      </div>
    </div>
  );
}

export default Sidebar;
