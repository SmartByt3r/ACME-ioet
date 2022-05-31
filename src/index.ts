import { readFileSync } from "fs";
import { Employee, WorkDay } from "./models/Employee";
import { deserializeEmployees } from "./utils/deserializer";

function printTable(employees: Employee[]) {
  while (employees.length > 0) {
    const employee = employees.shift();
    if (!employee) break;

    employees.forEach((otherEmployee) => {
      let counter = 0;
      otherEmployee.workedSchedule.forEach((workDay) => {
        employee.workedSchedule.forEach((otherWorkDay) => {
          if (otherWorkDay.coincidesWith(workDay)) counter++;
        });
      });
      if (counter > 0)
        console.log(
          `${otherEmployee.employeeName}-${employee.employeeName}: ${counter}`
        );
    });
  }
}

try {
  const file = readFileSync("input.txt", "utf8");
  const employees = deserializeEmployees(file);
  printTable(employees);
} catch (error) {
  console.error(error);
}
