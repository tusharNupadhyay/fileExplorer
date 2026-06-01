export default function renameNode(node, targetId, name) {
  //found node
  if (node.id === targetId) {
    return {
      ...node,
      name: name,
    };
  }
  //file is found so there's nowhere else to search
  if (!node.isFolder) {
    return node;
  }
  //recurse through the children
  const updatedChildren = node.children.map((child) =>
    renameNode(child, targetId, name),
  );

  return {
    ...node,
    children: updatedChildren,
  };
}
