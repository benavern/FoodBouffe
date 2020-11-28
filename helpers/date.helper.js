export function formatDuration(duration) {
  if (typeof duration !== 'number') return 'NA'
  if (duration > 60) {
    const hrs = Math.floor(duration / 60);
    const mins = duration - hrs * 60
    return mins
      ? `${hrs} Heures ${mins} Mins`
      : `${hrs} Heures`
  }
  return `${duration} Mins`
}
