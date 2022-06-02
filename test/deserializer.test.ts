import { Employee, WorkDay } from "../src/models/Employee";
import { deserializeEmployees } from "../src/utils/deserializer";

describe("Deserialization tests", () => {
  it("should return an array of employees", () => {
    const data =
      "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
      "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
      "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";
    const employees = deserializeEmployees(data);
    expect(employees.length).toBe(3);
    expect(employees[0]).toEqual(
      new Employee(
        "RENE",
        new Array(
          new WorkDay("MO", "10:00", "12:00"),
          new WorkDay("TU", "10:00", "12:00"),
          new WorkDay("TH", "01:00", "03:00"),
          new WorkDay("SA", "14:00", "18:00"),
          new WorkDay("SU", "20:00", "21:00")
        )
      )
    );
    expect(employees[1]).toEqual(
      new Employee(
        "ASTRID",
        new Array(
          new WorkDay("MO", "10:00", "12:00"),
          new WorkDay("TH", "12:00", "14:00"),
          new WorkDay("SU", "20:00", "21:00")
        )
      )
    );
    expect(employees[2]).toEqual(
      new Employee(
        "ANDRES",
        new Array(
          new WorkDay("MO", "10:00", "12:00"),
          new WorkDay("TH", "12:00", "14:00"),
          new WorkDay("SU", "20:00", "21:00")
        )
      )
    );
  });

  it("should throw an error if the data is not valid", () => {
    const data =
      "RENE=MON10:00-12:00,TUE10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
      "ASTRID=MO10:00-12:00,THU12:00-14:00,SU20:00-21:00";
    expect(() => deserializeEmployees(data)).toThrow(
      /Invalid data format at entry number ([0-9])+/
    );
  });

  it("should throw an error if the data is empty", () => {
    expect(() => deserializeEmployees("")).toThrow("The data is empty");
  });
});
