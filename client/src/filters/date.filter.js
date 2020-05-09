export default function dateFilter (time) {
  console.log(time)
  return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`
}
