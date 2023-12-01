export const getRandomColor = (): string =>  {
    const basicColors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#000080', '#800080'];
    const randomIndex = Math.floor(Math.random() * basicColors.length);
  
    return basicColors[randomIndex];
}


export const getBlackOrWhiteColor = (color: string): string => {
    const blueColors = ['#0000FF', '#000080'];
    const purpleColors = ['#800080'];
    const greenColors = ['#008000'];
  
    if (blueColors.includes(color)) {
      return '#FFFFFF'; // белый для синего
    } else if (purpleColors.includes(color)) {
      return '#FFFFFF'; // белый для фиолетового
    } else if (greenColors.includes(color)) {
      return '#FFFFFF'; // белый для зеленого
    } else {
      return '#000000'; // черный для остальных цветов
    }
}

export const getColorsForSprint= () => {
    const backgroundColor = getRandomColor()
    const color = getBlackOrWhiteColor(backgroundColor)
    return {color,backgroundColor}
}