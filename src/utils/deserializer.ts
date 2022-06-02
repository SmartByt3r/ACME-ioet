import { DaysOfWeek, Employee, WorkDay } from "../models/Employee";

const employeeNameRegEx = /[A-za-z]+/;
const dayRegEx = /(MO|TU|WE|TH|FR|SA|SU)/;
const hourRegEx = /(([0-1][0-9]|2[0-3]):[0-5][0-9])/;
const timeWorkedRegEx = new RegExp(`${hourRegEx.source}-${hourRegEx.source}`);
const workDayRegEx = new RegExp(`${dayRegEx.source}${timeWorkedRegEx.source}`);
const employeeWorkDayRegEx = new RegExp(
  `${employeeNameRegEx.source}=${workDayRegEx.source}(,${workDayRegEx.source})*$`
);

/**
 * This function deserializes a string into an Employee object.
 *
 * It is assumed that the string is in the format:
 *
 * $(NAME)=$(MO|TU|WE|TH|FR|SA|SU)$(HH:MM)-$(HH:MM),$(MO|TU|WE|TH|FR|SA|SU)$(HH:MM)-$(HH:MM),...
 *
 * @param employeesData The string to deserialize
 * @returns An array of Employees
 */
export function deserializeEmployees(employeesData: string): Employee[] {
  if (employeesData === "") throw new Error("The data is empty");

  const entries = employeesData.split(/\r?\n/g);

  return entries.map((entry, rowNumber) => {
    if (!employeeWorkDayRegEx.test(entry))
      throw new Error(`Invalid data format at entry number ${rowNumber + 1}`);

    const [employeeName, workedScheduleData] = entry.split("=");

    const workedSchedule = workedScheduleData.split(",").map((schedule) => {
      const [dayAndStartHour, endHour] = schedule.split("-");
      const day = dayAndStartHour.slice(0, 2);
      const startHour = dayAndStartHour.slice(2, dayAndStartHour.length);
      return new WorkDay(day as DaysOfWeek, startHour, endHour);
    });
    return new Employee(employeeName, workedSchedule);
  });
}
