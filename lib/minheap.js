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

  outsideHeap(index) {
    return index >= this.store.length;
  }

  getChildIndexAndKey = offset => index => {
    const childIndex = index * 2 + offset;
    const childKey = this.store[childIndex] && this.store[childIndex].key;
    return { index: childIndex, key: childKey };
  };

  getLeftChildIndexAndKey = this.getChildIndexAndKey(1);
  getRightChildIndexAndKey = this.getChildIndexAndKey(2);

  // This helper method takes an index and moves it down the
  // heap, maintaining the heap constraint.
  heapDown(index) {
    if (this.outsideHeap(index)) {
      return;
    }

    const currentKey = this.store[index].key;
    
    const { index: leftChildIndex, key: leftChildKey } = this.getLeftChildIndexAndKey(index);
    const { index: rightChildIndex, key: rightChildKey } = this.getRightChildIndexAndKey(index);

    const sortsAboveLeft = currentKey < leftChildKey;
    const sortsAboveRight = currentKey < rightChildKey;

    if ((sortsAboveLeft && sortsAboveRight) || this.outsideHeap(leftChildIndex)) {
      return;
    }

    if (this.outsideHeap(rightChildIndex)) {
      if (!sortsAboveLeft) {
        // No right child, but might need to swap with the left child before finishing.
        this.swap(index, leftChildIndex);
      }
      return;
    }

    const nextStep = childIndex => {
      this.swap(index, childIndex);
      this.heapDown(childIndex);
    }

    if (sortsAboveLeft && !sortsAboveRight) {
      nextStep(rightChildIndex);
    } else if (sortsAboveRight && !sortsAboveLeft) {
      nextStep(leftChildIndex);
    } else {
      const lesserChildIndex = leftChildKey < rightChildKey ? leftChildIndex : rightChildIndex;
      nextStep(lesserChildIndex);
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
