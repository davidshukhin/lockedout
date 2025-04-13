"use client"

import * as React from "react"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { cn } from "~/lib/utils"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [hours, setHours] = React.useState<string>("")
  const [minutes, setMinutes] = React.useState<string>("")
  const [isPM, setIsPM] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (date) {
      let hours = date.getHours()
      const isPM = hours >= 12
      if (hours > 12) hours -= 12
      if (hours === 0) hours = 12
      setHours(hours.toString().padStart(2, "0"))
      setMinutes(date.getMinutes().toString().padStart(2, "0"))
      setIsPM(isPM)
    }
  }, [date])

  const handleTimeChange = () => {
    if (!hours || !minutes) return

    const hoursNum = parseInt(hours)
    const minutesNum = parseInt(minutes)

    let newHours = hoursNum
    if (isPM && newHours < 12) newHours += 12
    if (!isPM && newHours === 12) newHours = 0

    const newDate = date ? new Date(date) : new Date()
    newDate.setHours(newHours)
    newDate.setMinutes(minutesNum)
    setDate(newDate)
  }

  const handleHoursChange = (value: string) => {
    setHours(value)
    handleTimeChange()
  }

  const handleMinutesChange = (value: string) => {
    setMinutes(value)
    handleTimeChange()
  }

  const toggleAMPM = () => {
    setIsPM(!isPM)
    handleTimeChange()
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <Select value={hours} onValueChange={handleHoursChange}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")).map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={minutes} onValueChange={handleMinutesChange}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        onClick={toggleAMPM}
        className="w-16"
      >
        {isPM ? "PM" : "AM"}
      </Button>
    </div>
  )
} 