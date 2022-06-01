import { readFileSync, writeFileSync } from "fs";
import { deserializeEmployees } from "../utils/deserializer";
import { generateTable, printTable } from "../utils/generate-table";
/**
 * Prints the usage instructions.
 */
function help() {
  const usage =
    "Usage:\n\t" +
    "node index.js <filePath>\n\n\t" +
    "Ensure that the file follows the format specified in the README.md file.\n";
  const options =
    "Options:\n\t" +
    "-help:\tPrints this help message\n\t" +
    "-demo:\tCreates a demo file (demo.txt) and executes over it\n";
  const example =
    "Example:\n\tnode index.js ./data/employees.txt\n\t" +
    "node index.js -help\n\t" +
    "node index.js -demo";
  console.log(`${usage}\n${options}\n${example}`);
}
/**
 * Creates a demo file (demo.txt) and executes over it.
 */
function demo() {
  const demoData =
    "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
    "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
    "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";
  writeFileSync("demo.txt", demoData);
  run(demoData);
}
/**
 * Runs the program.
 * @param data The data to be processed
 */
function run(data: string) {
  const employees = deserializeEmployees(data);
  const table = generateTable(employees);
  printTable(table);
}

/**
 * Routes the command line arguments to the correct function.
 * @param argv The command line arguments
 * @returns void
 */
export function commandRouter(argv: string[]) {
  if (argv.length === 0 || argv[0] === "-help" || argv.length > 1) {
    help();
    return;
  }
  if (argv[0] === "-demo") {
    demo();
    return;
  }
  const fileData = readFileSync(argv[0], "utf8");
  run(fileData);
}
