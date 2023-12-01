import { BinaryTree } from './binaryTree.mjs';

class AVLTree {
  constructor(rootNode = null){
    this.root = rootNode;
  }

  search(targetData){
    let currentNode = this.root;
    while(currentNode != null){
      if(currentNode.getData() == targetData) return currentNode;
      else if(currentNode.getData() > targetData) {currentNode = currentNode.getLeftSubTree()}
      else {currentNode = currentNode.getRightSubTree()};
    }
    return null;
  }

  getHeight(node){
    if(node == null) {
      return 0;
    } else {
      return node.height;
    }
  }

  updateHeight(node){
    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
  }

  getBalanceFactor(node) {
    return this.getHeight(node.getLeftSubTree()) - this.getHeight(node.getRightSubTree());
  }

  rotateLeft(node) {
    let childNode = node.getRightSubTree();
    node.setRightSubTree(childNode.getLeftSubTree());
    childNode.setLeftSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotateRight(node) {
    let childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode.getRightSubTree());
    childNode.setRightSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotation(targetNode, data) {
    let balanceFactor = this.getBalanceFactor(targetNode);
    let isRootNode = false;
    if(targetNode == this.root) {
      isRootNode = true;
    }

    if(balanceFactor < -1 && data > targetNode.getRightSubTree().getData){
      targetNode = this.rotateLeft(targetNode);
    } else if(balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()){
      targetNode = this.rotateRight(targetNode);
    } else if(balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()){
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
      targetNode = this.rotateRight(targetNode);
    }
  }


}