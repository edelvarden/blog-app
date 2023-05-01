import { changeDateFormat } from "@/lib/changeDateFormat"

type DateProps = {
  dateString: string
}

const Date = (props: DateProps) => {
  const { dateString } = props
  const date = changeDateFormat(dateString)
  return <time dateTime={dateString}>{date}</time>
}

export default Date
