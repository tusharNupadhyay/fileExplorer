const initialFileSystem = {
  id: 0,
  name: "My Project",
  isFolder: true,
  children: [
    {
      id: 1,
      name: "src",
      isFolder: true,
      children: [
        { id: 2, name: "App.js", isFolder: false },
        { id: 3, name: "styles.css", isFolder: false },
      ],
    },
    { id: 3, name: "package.json", isFolder: false },
  ],
};

export default initialFileSystem;
