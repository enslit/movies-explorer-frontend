export const minutesToFormatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const min = Math.floor(minutes % 60);

  return (h ? `${h}ч ` : '') + `${min}м`;
};
