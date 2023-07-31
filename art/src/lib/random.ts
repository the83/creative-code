export function randomNumber(range: number) {
  return Math.floor(Math.random() * range);
}

export function randomColor() {
  const colors = ['black', 'white', 'green'];
  return colors[randomNumber(colors.length)]
}
