import { Employee, WorkDay } from "../src/models/Employee";

describe("Employee object tests", () => {
  test("coincidences with other employees", () => {
    const employee1 = new Employee("RENE", [
      new WorkDay("MO", "10:00", "12:00"),
      new WorkDay("TU", "10:00", "12:00"),
      new WorkDay("TH", "01:00", "03:00"),
      new WorkDay("SA", "07:00", "12:00"),
    ]);
    const employee2 = new Employee("JUAN", [
      new WorkDay("MO", "07:00", "11:00"),
      new WorkDay("TU", "07:00", "10:00"),
      new WorkDay("FR", "12:00", "14:00"),
      new WorkDay("SA", "13:00", "19:00"),
    ]);
    //Test coincidence
    expect(
      employee1.workedSchedule[0].coincidesWith(employee2.workedSchedule[0])
    ).toBe(true);
    //Test coincidence in the edge of the schedule
    expect(
      employee1.workedSchedule[1].coincidesWith(employee2.workedSchedule[1])
    ).toBe(true);
    //Test day no coincidence
    expect(
      employee1.workedSchedule[2].coincidesWith(employee2.workedSchedule[1])
    ).toBe(false);
    //Test no coincidence in hours
    expect(
      employee1.workedSchedule[3].coincidesWith(employee2.workedSchedule[3])
    ).toBe(false);
  });
});
