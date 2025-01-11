function mincost(arr)
{ 
//write your code here
// return the min cost
	// Min-heap priority queue
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(val) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        }

        pop() {
            if (this.heap.length === 0) return null;
            const min = this.heap[0];
            const end = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this.sinkDown(0);
            }
            return min;
        }

        bubbleUp(index) {
            const element = this.heap[index];
            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);
                const parent = this.heap[parentIndex];
                if (element >= parent) break;
                this.heap[index] = parent;
                index = parentIndex;
            }
            this.heap[index] = element;
        }

        sinkDown(index) {
            const length = this.heap.length;
            const element = this.heap[index];
            while (true) {
                let leftChildIdx = 2 * index + 1;
                let rightChildIdx = 2 * index + 2;
                let swap = null;

                if (leftChildIdx < length) {
                    const leftChild = this.heap[leftChildIdx];
                    if (leftChild < element) {
                        swap = leftChildIdx;
                    }
                }

                if (rightChildIdx < length) {
                    const rightChild = this.heap[rightChildIdx];
                    if (
                        (swap === null && rightChild < element) ||
                        (swap !== null && rightChild < this.heap[swap])
                    ) {
                        swap = rightChildIdx;
                    }
                }

                if (swap === null) break;
                this.heap[index] = this.heap[swap];
                index = swap;
            }
            this.heap[index] = element;
        }
    }

    // Initialize the heap with the given rope lengths
    const heap = new MinHeap();
    for (let length of arr) {
        heap.push(length);
    }

    let totalCost = 0;

    // Keep combining the two smallest ropes until one rope is left
    while (heap.heap.length > 1) {
        const first = heap.pop();
        const second = heap.pop();
        const cost = first + second;
        totalCost += cost;
        heap.push(cost);
    }

    return totalCost;
  
}

module.exports=mincost;
