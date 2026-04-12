let a = 1;
do {
  let b = 1;
  let star = "";

  do {
    star += "*";
    b++;
  } while (b <= a);

  console.log(star);
  a++;
} while (a <= 4);