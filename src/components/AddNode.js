function AddNode(node, parentId, newNode) {
  //when parentnode is found update it and return;
  if (node.id === parentId) {
    if (!node.isFolder) return node; //do nothing if its a file
    return {
      ...node,
      children: [...node.children, newNode],
    };
  }
  //if it's a file no changes to the node
  if (!node.isFolder) return node;

  //recurse through folder children
  const updatedChildren = node.children.map((child) =>
    AddNode(child, parentId, newNode),
  );
  return { ...node, children: updatedChildren };
}

export default AddNode;
