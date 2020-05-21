function asyncIterator<T>(array: T[]): {
  next(): Promise<{
      value?:T
      done: boolean;
  }>;
} {
  return {
    next () {
      if (array.length) {
        return Promise.resolve({
          value: array.shift(),
          done: false
        })
      }
      else {
        return Promise.resolve({
          done: true
        })
      }
    }
  }
}

async function asyncGenerator<T>(array: T[]) {
  return {
    [Symbol.asyncIterator]: ()=> asyncIterator<T>(array)
  }
}
export default asyncGenerator;