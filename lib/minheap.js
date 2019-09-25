const assert = require('assert');

class HeapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class MinHeap {
  constructor() {
    this.store = [];
  }

  // This method adds a HeapNode instance to the heap
  // Time Complexity: ?
  // Space Complexity: ?
  add(key, value = key) {
    this.store.push(new HeapNode(key, value));
    this.heapUp(this.store.length - 1);
  }

  // This method removes and returns an element from the heap
  //   maintaining the heap structure
  // Time Complexity: ?
  // Space Complexity: ?
  remove() {
    if (this.isEmpty()) {
      return;
    }

    this.swap(0, this.store.length - 1);
    const removed = this.store.pop().value;

    this.heapDown(0);

    return removed;
  }


  // Used for Testing
  toString() {
    if (!this.store.length) {
      return "[]";
    }

    const values = this.store.map(item => item.value);
    const output = `[${values.join(', ')}]`;
    return output;
  }

  // This method returns true if the heap is empty
  // Time complexity: ?
  // Space complexity: ?
  isEmpty() {
    return this.store.length === 0;
  }

  // This helper method takes an index and
  //  moves it up the heap, if it is less than it's parent node.
  //  It could be **very** helpful for the add method.
  // Time complexity: ?
  // Space complexity: ?
  heapUp(index) {
    if (index <= 0) {
      // The top of the heap is guaranteed to be the minimum.
      return;
    }

    const indexParent = Math.floor((index - 1) / 2);
    if (this.store[indexParent].key >= this.store[index].key) {
      this.swap(indexParent, index);
      this.heapUp(indexParent);
    }
  }

  // This helper method takes an index and moves it down the
  // heap, maintaining the heap constraint.
  heapDown(index) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    if (right < this.store.length) {
      const min = this.store[left].key < this.store[right].key ? left : right;
      if (this.store[index].key > this.store[min].key) {
        this.swap(index, min);
        this.heapDown(min);
      }
    } else if (left < this.store.length) {
      if (this.store[index].key > this.store[left].key) {
        this.swap(index, left);
      }
    }
  }

  // If you want a swap method... you're welcome
  swap(index1, index2) {
    const s = this.store;
    [s[index1], s[index2]] = [s[index2], s[index1]];
  }
}

module.exports = {
  MinHeap
};
