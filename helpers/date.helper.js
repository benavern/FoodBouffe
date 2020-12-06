export function formatDuration(duration) {
  if (typeof duration !== 'number') return 'NA'
  if (duration > 60) {
    const hrs = Math.floor(duration / 60);
    const mins = duration - hrs * 60
    return mins
      ? `${hrs} H ${mins}`
      : `${hrs} H`
  }
  return `${duration} min`
}

export function formatDate(timestamp) {
  if(!timestamp) return ''
  const date = new Date(timestamp)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
