export default function deleteNode(node, targetId) {
  //if current node is a file then nothing to delete inside it
  if (!node.isFolder) {
    return node;
  }
  //delete the current children of node if they have the targetId
  const filteredChildren = node.children.filter(
    (child) => child.id !== targetId,
  );
  //recurse through the children and do the same
  const updatedChildren = filteredChildren.map((child) =>
    deleteNode(child, targetId),
  );
  return {
    ...node,
    children: updatedChildren,
  };
}
