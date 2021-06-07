import Faker from "faker"


import format from 'date-fns/format'
import add from 'date-fns/add'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
import endOfMonth from 'date-fns/endOfMonth'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import firstOfDay from "@/utils/date-fns/firstDayOfMonth";


export const montView = (start, end) => {

  const countMonth = differenceInCalendarMonths(end, start) + 1
  const date = {
    days: [],
    months: []
  }

  new Array(countMonth).fill(null).forEach((_, index) => {
    const d = add(start, {months: index})
    date.months.push(d)
    new Array(getDaysInMonth(d)).fill(null).forEach((_, index) => {
      date.days.push(add(d, {
        days: index
      }))
    })
  })
  let left = 0
  return {
    topCells: date.months.map((item, index) => {
      const currentCellWidth = getDaysInMonth(item) * 80
      const offsetLeft = left
      left += currentCellWidth
      return {
        width: currentCellWidth,
        left: offsetLeft,
        text: format(item, "MMM, yyyy")
      }
    }),
    bottomCells: date.days.map((item, index) => {
      return {
        width: 80,
        left: (index * 80),
        text: format(item, "MMM dd"),
        top: 0
      }
    }),
    allWidth: left
  }
}