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

    while(currentNode != null){
      parentNode = currentNode;

      if(currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if(currentNode.getData() < data){
        currentNode = currentNode.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);
    if(parentNode.getData() > data) parentNode.setLeftSubTree(newNode);
    else parentNode.setRightSubTree(newNode);
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

  remove(targetData){
    let fakeParentRootNode = new BinaryTree(0);
    let parentNode = fakeParentRootNode;
    let currentNode = this.root;
    let deletingNode = null;

    fakeParentRootNode.setRightSubTree(this.root);
    while(currentNode != null && currentNode.getData() != targetData) {
      parentNode = currentNode;
      if(currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    if(currentNode == null) {
      return;
    }

    deletingNode = currentNode;

    if(deletingNode.getLeftSubTree() == null && deletingNode.getRightSubTree() == null) {
      if(parentNode.getLeftSubTree() == deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else {
      if(deletingNode.getLeftSubTree == null || deletingNode.getRightSubTree == null) {
        let deletingNodeChild;
        if(deletingNode.getLeftSubTree() != null) {
          deletingNodeChild = deletingNode.getLeftSubTree();
        } else {
          deletingNodeChild = deletingNode.getRightSubTree();
        }

        if(parentNode.getLeftSubTree() == deletingNode) {
          parentNode.setLeftSubTree(deletingNodeChild);
        } else {
          parentNode.setRightSubTree(deletingNodeChild);
        }
      } else {
        let replacingNode = deletingNode.getLeftSubTree();
        let replacingNodeParent = deletingNode;

        while(replacingNode.getRightSubTree() != null) {
          replacingNodeParent = replacingNode;
          replacingNode = replacingNode.getRightSubTree();
        }

        let deletingNodeData = deletingNode.getData();
        deletingNode.setData(replacingNode.getData());

        if(replacingNodeParent.getLeftSubTree() == replacingNode) {
          replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
        } else {
          replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
        }

        deletingNode = replacingNode;
        deletingNode.setData(deletingNodeData);
      }

      if(fakeParentRootNode.getRightSubTree() != this.root) {
        this.root = fakeParentRootNode.getRightSubTree();
      }

      return deletingNode;
    }
  }
}

let _binarySearchTree = new binarySearchTree();
_binarySearchTree.insert(18);
_binarySearchTree.insert(15);
_binarySearchTree.insert(10);
_binarySearchTree.insert(6);
_binarySearchTree.insert(3);
_binarySearchTree.insert(8);
_binarySearchTree.insert(12);
_binarySearchTree.insert(11);
_binarySearchTree.insert(31);
_binarySearchTree.insert(27);
_binarySearchTree.insert(24);
_binarySearchTree.insert(20);
_binarySearchTree.insert(33);
_binarySearchTree.insert(35);
_binarySearchTree.insert(37);

_binarySearchTree.root.inOrderTraversal(_binarySearchTree.root);


console.log(`===== Search 6 =====`);
console.log(_binarySearchTree.search(6));

console.log(`===== Search 1 =====`);
console.log(_binarySearchTree.search(1));

_binarySearchTree.remove(10);
_binarySearchTree.root.inOrderTraversal(_binarySearchTree.root);