import { BinaryTree } from './binaryTree.mjs';

class binarySearchTree {
  constructor(rootNode = null){
    this.root = rootNode;
  }

  insert(data){
    if(this.root == null){
      this.root = new BinaryTree(data);
      return;
    }

    let currentNode = this.root;
    let parentNode = null;
    let isRight;
    while(currentNode != null){
      parentNode = currentNode;

      //if(currentNode.data == data) throw `already exists`;

      if(currentNode.data > data) {
        if(currentNode.getLeftSubTree() != null) currentNode = currentNode.getLeftSubTree();
        else {
          isRight = false;
          break;
        }
      }
      else {
        if(currentNode.getRightSubTree() != null) currentNode = currentNode.getrightSubTree();
        else {
          isRight = true;
          break;
        }
      }
    }

    if(isRight) currentNode.setRightSubTree(data);
    else currentNode.setLeftSubTree(data);
  }
}