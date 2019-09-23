const { MinHeap } = require('../lib/minheap');

// This method uses a heap to sort an array.
// Time Complexity:  ?
// Space Complexity: ?
function heapsort(list) {
  if (list.length < 1) {
    return list;
  }

  const heap = new MinHeap();
  list.forEach(item => heap.add(item));
  return list.map(() => heap.remove());
};

module.exports = heapsort;
