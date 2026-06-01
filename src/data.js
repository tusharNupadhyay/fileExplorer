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
        {
          id: 2,
          name: "App.js",
          isFolder: false,
          content: "// Write your App.js code here",
        },
        {
          id: 3,
          name: "styles.css",
          isFolder: false,
          content:
            "Incididunt mollit aliqua qui labore consequat. Aute occaecat exercitation sunt ullamco. Sint cillum amet sint Lorem deserunt voluptate in deserunt est ex. Laboris incididunt voluptate sunt Lorem culpa do. Et elit sunt mollit qui irure consectetur ipsum amet non consequat.",
        },
      ],
    },
    {
      id: 4,
      name: "package.json",
      isFolder: false,
      content:
        "Veniam minim ullamco nulla id nisi culpa ad consectetur incididunt proident est. Velit eiusmod qui velit in ut laborum ut non ullamco. Sit velit minim magna Lorem magna ea.",
    },
  ],
};

export default initialFileSystem;
