export const randomRating = (min: number, max: number) => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(1))
}

export const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const consoleStyles: any = {
  log1: 'font: 2rem/1 Arial; color: crimson;',
  log2: 'font: 2rem/1 Arial; color: orangered;',
  log3: 'font: 2rem/1 Arial; color: olivedrab;',
  log4: 'font: 2rem/1 Arial; color: darkmagenta;',
  log5: 'font: 2rem/1 Arial; color: blue;'
}

export const log = (msg: string, style: string) => {
  console.log('%c' + msg, consoleStyles[style])
}
