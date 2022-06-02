import { Employee, WorkDay } from "../models/Employee";

export type TableRow = { names: string; numberOfCoincidences: number };

/**
 * Generates a table with the number of coincidences for each employee workday schedule.
 * @param employees An array of Employee objects
 * @returns The table
 */
export function generateTable(employees: Employee[]): TableRow[] {
  const table: TableRow[] = [];
  const _employees = [...employees];
  const iterateOverWorkDays = (row: TableRow, firstEmployee: Employee) => {
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

  while (_employees.length > 0) {
    const firstEmployee = _employees.shift();
    _employees.forEach(iterateOverEmployees(firstEmployee!));
  }
  return table;
}

/**
 * Prints the output table to the console.
 * @param table The table to print
 */
export function printTable(table: TableRow[]) {
  let outStr = table.reduce((acc, val, index) => {
    const entry = `${val.names}: ${val.numberOfCoincidences}`;
    return acc.concat(index + 1 === table.length ? `${entry}` : `${entry}\n`);
  }, "");
  console.log(outStr);
}
