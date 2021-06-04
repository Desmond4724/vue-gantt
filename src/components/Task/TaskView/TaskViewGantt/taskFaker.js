import Faker from "faker"


import format from 'date-fns/format'
import add from 'date-fns/add'


export const montView = () => {
  const width = 800
  return {
    topCells: new Array(1).fill(null).map((item, index) => {
      return {
        width: width + 'px',
        left: (index * width) + 'px',
        text: format(add(new Date(), {days: index}), "MMM, yyyy")
      }
    }),
    bottomCells: new Array(25).fill(null).map((item, index) => {
      return {
        width: 80 + 'px',
        left: (index * 80) + 'px',
        text: format(add(new Date(), {days: index}), "MMM dd"),
        top: '0'
      }
    })
  }
}