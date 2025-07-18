import { subMonths, subWeeks, subYears } from 'date-fns'

export function gettingStartEndDateAccordingToFilter(by: 'week' | 'month' | 'year'): {
  startDate: Date
  endDate: Date
} {
  const endDay = new Date()
  let starterDay = null
  if (by === 'week') {
    starterDay = subWeeks(endDay, 1)
  } else if (by === 'month') {
    starterDay = subMonths(endDay, 1)
  } else {
    starterDay = subYears(endDay, 1)
  }

  return { startDate: starterDay, endDate: endDay }
}
