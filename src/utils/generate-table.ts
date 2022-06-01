import { Employee, WorkDay } from "../models/Employee";

export type TableRow = { names: string; numberOfCoincidences: number };

/**
 * Generates a table with the number of coincidences for each employee workday schedule.
 * @param employees An array of Employee objects
 * @returns The table
 */
export function generateTable(employees: Employee[]): TableRow[] {
  type NewType = TableRow;

  const iterateOverWorkDays = (row: NewType, firstEmployee: Employee) => {
    return (workDay: WorkDay) => {
      firstEmployee.workedSchedule.forEach((otherWorkDay) => {
        if (otherWorkDay.coincidesWith(workDay)) row.numberOfCoincidences++;
      });
    };
  };
  const iterateOverEmployees = (firstEmployee: Employee) => {
    return (nextEmployee: Employee) => {
      let row: TableRow = {
        names: `${nextEmployee.employeeName}-${firstEmployee.employeeName}`,
        numberOfCoincidences: 0,
      };
      nextEmployee.workedSchedule.forEach(
        iterateOverWorkDays(row, firstEmployee)
      );
      if (row.numberOfCoincidences > 0) table.push(row);
    };
  };

  const table: TableRow[] = [];
  while (employees.length > 0) {
    const firstEmployee = employees.shift();
    if (!firstEmployee) break;
    employees.forEach(iterateOverEmployees(firstEmployee));
  }
  return table;
}

/**
 * Prints the output table to the console.
 * @param table The table to print
 */
export function printTable(table: TableRow[]) {
  table.forEach((row) => {
    console.log(`${row.names}: ${row.numberOfCoincidences}`);
  });
}
