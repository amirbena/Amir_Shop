async function* asyncGenerator(array: any[]) {
    let i = 0;
    while (i < array.length) {
      yield array[i++];
    }
  }
export default asyncGenerator;