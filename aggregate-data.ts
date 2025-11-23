import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BusRoute {
  route: string;
  province: string;
  concession: string;
  operator: string;
  type: string;
}

async function readCsvFile(filePath: string): Promise<BusRoute[]> {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const routes: BusRoute[] = [];

    const parser = fs.createReadStream(filePath).pipe(
      parse({
        columns: ["route", "province", "concession", "operator", "type"],
      })
    );

    for await (const record of parser) {
      // Work with each record
      routes.push(record);
    }

    console.log(
      `Processed ${routes.length} routes from ${path.basename(filePath)}`
    );

    return routes;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

async function readData(): Promise<void> {
  const srcDir = path.join(__dirname, "src");
  const outputPath = path.join(srcDir, "data.json");

  // Delete existing data.json file for deterministic output
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log("Deleted existing data.json file");
  }

  const allRoutes: BusRoute[] = [];

  // Process each CSV file
  const filePath = path.join(srcDir, "data.csv");

  if (fs.existsSync(filePath)) {
    const routes = await readCsvFile(filePath);
    allRoutes.push(...routes);
  } else {
    console.warn(`File data.csv not found, skipping...`);
  }

  // Removes all new lines from all fields in allRoutes
  allRoutes.forEach((route) => {
    Object.keys(route).forEach((key) => {
      route[key] = route[key].replace(/\n/g, " ").trim();
    });
  });

  // Remove all double spaces from all fields in allRoutes
  allRoutes.forEach((route) => {
    Object.keys(route).forEach((key) => {
      route[key] = route[key].replace(/\s{2,}/g, " ").trim();
    });
  });

  // Write read data to JSON file
  try {
    fs.writeFileSync(outputPath, JSON.stringify(allRoutes, null, 2), "utf-8");
    console.log(
      `Successfully wrote ${allRoutes.length} routes to data.json file`
    );
  } catch (error) {
    console.error("Error writing data.json:", error);
    process.exit(1);
  }
}

// Run the aggregation
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("Starting data reading...");
  console.time("readData");
  await readData();
  console.log("Data reading completed!");
  console.timeEnd("readData");
}
