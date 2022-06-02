import { commandRouter } from "../src/utils/commands";
import fs from "fs";

const consoleSpy = jest.spyOn(console, "log").mockImplementation();

const helpMessage =
  "Usage:\n\t" +
  "node index.js <filePath>\n\n\t" +
  "Ensure that the file follows the format specified in the README.md file.\n\n" +
  "Options:\n\t" +
  "-help:\tPrints this help message\n\t" +
  "-demo:\tCreates a demo file (demo.txt) and executes over it\n\n" +
  "Example:\n\tnode index.js ./data/employees.txt\n\t" +
  "node index.js -help\n\t" +
  "node index.js -demo";

const demoOutput = "ASTRID-RENE: 2\nANDRES-RENE: 2\nANDRES-ASTRID: 3";
const demoData =
  "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
  "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
  "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";

describe("Test the commands routes", () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });
  it("shows help message", () => {
    const checkConsoleOutput = () => {
      expect(console.log).toBeCalledTimes(1);
      expect(console.log).toHaveBeenLastCalledWith(helpMessage);
    };
    //Send more than one argument
    consoleSpy.mockClear();
    commandRouter(["-help", "test"]);
    checkConsoleOutput();
    //Send help argument
    consoleSpy.mockClear();
    commandRouter(["-help"]);
    checkConsoleOutput();
    //Send bad argument
    consoleSpy.mockClear();
    commandRouter(["-unknown"]);
    checkConsoleOutput();
  });
  it("shows demo program", () => {
    commandRouter(["-demo"]);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(demoOutput);
  });
  it("executes the program", () => {
    jest.spyOn(fs, "readFileSync").mockReturnValueOnce(demoData);
    commandRouter(["input.txt"]);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(demoOutput);
  });
});
