const array2 = [
  {
    id: 1,
    item: [1, 2, 3, 4],
  },
  {
    id: 2,
    item: [5, 6, 7, 8],
  },
];

let arr = array2.reduce((perev, obj) => {
  return [...perev, obj.item];
}, []);

console.log("arr: ", arr);

let array = [1, [2, 3, 4, [5, 6, 7, [8, 9]]]];
console.log(
  "array: ",
  array.reduce((prev, item) => {
    return prev.concat(item);
  }, [])
);
console.log(array.flat(Infinity));
