let value = [9, 12, 12345];
console.log(
  value.filter((y) =>
    [
      9, 12, 15, 18, 21, 24, 65, 67, 68, 71, 73, 76, 77, 79, 82, 85, 88, 89, 92,
    ].includes(Number(y))
  )
);


