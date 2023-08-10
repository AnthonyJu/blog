// 创建时间
export function getDate() {
  const date = new Date()
  const timestamp = date.getTime()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const realMonth = month < 10 ? `0${month}` : month
  const realDay = day < 10 ? `0${day}` : day
  const realHour = hour < 10 ? `0${hour}` : hour
  const realMinute = minute < 10 ? `0${minute}` : minute
  const realSecond = second < 10 ? `0${second}` : second

  return {
    timestamp,
    year,
    realMonth,
    realDay,
    date: `${year}-${realMonth}-${realDay} ${realHour}:${realMinute}:${realSecond}`,
  }
}
