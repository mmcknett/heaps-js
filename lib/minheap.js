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
    const currentKey = this.store[index];

    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;

    const leftChildKey = this.store[leftChildIndex] && this.store[leftChildIndex].key;
    const rightChildKey = this.store[rightChildIndex] && this.store[rightChildIndex].key;

    const isLessThanLeft = currentKey < leftChildKey;
    const isLessThanRight = currentKey < rightChildKey;


    // If current is the minimum or there is nothing to swap with, we're done.
    if (isLessThanLeft && isLessThanRight ||
        leftChildIndex >= this.store.length) {
      return;
    }

    // If right child index is past the end, see if we should swap with left.
    if (rightChildIndex >= this.store.length) {
      if (!isLessThanLeft) {
        this.swap(index, leftChildIndex);
      }
      return;
    }

    // These things should exist, at this point.
    assert(typeof leftChildKey !== 'undefined');
    assert(typeof rightChildKey !== 'undefined');

    // It's not less than both, so if it's less than one of
    // the remaining children, swap with the other child.
    if (isLessThanLeft) {
      this.swap(index, rightChildIndex);
      this.heapDown(rightChildIndex);
    } else if (isLessThanRight) {
      this.swap(index, leftChildIndex);
      this.heapDown(leftChildIndex);
    } else {
      // And if it's less than neither, swap with the lesser
      // of the two children.
      const childIndex = leftChildKey < rightChildKey ?
        leftChildIndex :
        rightChildIndex;
      this.swap(index, childIndex);
      this.heapDown(childIndex);
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
