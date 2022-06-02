import { Employee, WorkDay } from "../src/models/Employee";
import { generateTable, printTable } from "../src/utils/generate-table";

const consoleSpy = jest.spyOn(console, "log").mockImplementation();
describe("Table generation tests", () => {
  const dataSetWithCoincidences = [
    new Employee("RENE", [
      new WorkDay("MO", "10:00", "12:00"),
      new WorkDay("TU", "10:00", "12:00"),
      new WorkDay("WE", "10:00", "12:00"),
    ]),
    new Employee("JUAN", [
      new WorkDay("MO", "10:00", "12:00"),
      new WorkDay("TU", "10:00", "12:00"),
      new WorkDay("WE", "10:00", "12:00"),
    ]),
    new Employee("ANDRES", [
      new WorkDay("MO", "10:00", "12:00"),
      new WorkDay("TU", "10:00", "12:00"),
      new WorkDay("WE", "10:00", "12:00"),
    ]),
  ];
  const dataSetWithNoCoincidences = [
    new Employee("RENE", [
      new WorkDay("MO", "10:00", "12:00"),
      new WorkDay("FR", "10:00", "12:00"),
    ]),
    new Employee("JUAN", [
      new WorkDay("MO", "07:00", "08:00"),
      new WorkDay("TU", "13:00", "21:00"),
    ]),
    new Employee("ANDRES", [
      new WorkDay("WE", "08:00", "17:00"),
      new WorkDay("TH", "08:00", "17:00"),
    ]),
  ];
  it("returns table with coincidences", () => {
    const table = generateTable(dataSetWithCoincidences);

    expect(table).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          names: expect.stringMatching(/(JUAN-RENE|RENE-JUAN)/),
          numberOfCoincidences: 3,
        }),
        expect.objectContaining({
          names: expect.stringMatching(/(ANDRES-RENE|RENE-ANDRES)/),
          numberOfCoincidences: 3,
        }),
        expect.objectContaining({
          names: expect.stringMatching(/(ANDRES-JUAN|JUAN-ANDRES)/),
          numberOfCoincidences: 3,
        }),
      ])
    );
  });

  it("returns table with no coincidences (empty)", () => {
    const table = generateTable(dataSetWithNoCoincidences);
    expect(table.length).toBe(0);
  });

  it("should print table to the console", () => {
    consoleSpy.mockClear();
    printTable(generateTable(dataSetWithCoincidences));
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(
        /(JUAN-RENE|RENE-JUAN): 3\n(ANDRES-RENE|RENE-ANDRES): 3\n(ANDRES-JUAN|JUAN-ANDRES): 3/
      )
    );
  });
});
