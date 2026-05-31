import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import initialFileSystem from "../data.js";
import FileTree from "./FileTree.jsx";
import addNewNode from "./AddNode.js";

function Sidebar() {
  const [showInput, setShowInput] = useState(false);
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [selectedFolder, setSelectedFolder] = useState(1);
  const nextId = useRef(5);
  const inputRef = useRef(null);
  const isCreatingFile = useRef(false);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const name = e.target.value;
      if (!name.trim()) return;
      let newNode;
      if (isCreatingFile.current) {
        newNode = {
          id: nextId.current++,
          name,
          isFolder: false,
        };
      } else {
        newNode = {
          id: nextId.current++,
          name,
          isFolder: true,
          children: [],
        };
      }
      setFileSystem((prev) => addNewNode(prev, selectedFolder, newNode));

      e.target.value = "";
      setShowInput(false);
    }
    if (e.key === "Escape") {
      e.target.value = "";
      setShowInput(false);
    }
  }
  return (
    <div className="sidebarContent">
      <div className="fileButtons">
        <button
          disabled={showInput}
          onClick={() => {
            isCreatingFile.current = true;
            setShowInput(true);
          }}
        >
          create file
        </button>
        <button
          disabled={showInput}
          onClick={() => {
            isCreatingFile.current = false;
            setShowInput(true);
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
          showInput={showInput}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Sidebar;
