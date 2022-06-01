import { commandRouter } from "./utils/commands";

try {
  const args = process.argv.slice(2);
  commandRouter(args);
} catch (error) {
  console.error((error as Error).message);
}
