export function randomNumber(range: number, min: number = 0) {
  const rand = Math.floor(Math.random() * range);
  if (rand < min) { return min; }
  return rand;
}

export function randomColor() {
  const colors = ['black', 'white', 'green'];
  return colors[randomNumber(colors.length)]
}
