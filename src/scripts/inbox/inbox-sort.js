class SortArray {
  byCreated(arr, rows) {
    arr.sort(function (a, b) {
      return new Date(b.created) - new Date(a.created);
    });

    if (rows) {
      arr = arr.slice(0, rows);
    }
    return arr;
  }
}

const sortArray = new SortArray();

export default sortArray;
