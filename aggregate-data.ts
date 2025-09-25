import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BusRoute {
  route: string;
  province: string;
  concession: string;
  operator: string;
  type: string;
  effective_date: string;
}

// Map CSV filenames to effective dates
const FILE_DATE_MAP: Record<string, string> = {
  "data-1.csv": "2025-09-01",
  "data-15.csv": "2025-09-15",
  "data-30.csv": "2025-09-30",
};

function parseCsvLine(line: string): Omit<BusRoute, "effective_date"> | null {
  const trimmedLine = line.trim();
  if (!trimmedLine) return null;

  const parts = trimmedLine.split(";");
  if (parts.length !== 5) {
    console.warn(`Skipping invalid line: ${line}`);
    return null;
  }

  return {
    route: parts[0].trim(),
    province: parts[1].trim(),
    concession: parts[2].trim(),
    operator: parts[3].trim(),
    type: parts[4].trim(),
  };
}

function readCsvFile(filePath: string, effectiveDate: string): BusRoute[] {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const routes: BusRoute[] = [];

    for (const line of lines) {
      const parsedData = parseCsvLine(line);
      if (parsedData) {
        routes.push({
          ...parsedData,
          effective_date: effectiveDate,
        });
      }
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

function aggregateData(): void {
  const srcDir = path.join(__dirname, "src");
  const outputPath = path.join(srcDir, "data.json");

  // Delete existing data.json file for deterministic output
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log("Deleted existing data.json file");
  }

  const allRoutes: BusRoute[] = [];

  // Process each CSV file
  for (const [fileName, effectiveDate] of Object.entries(FILE_DATE_MAP)) {
    const filePath = path.join(srcDir, fileName);

    if (fs.existsSync(filePath)) {
      const routes = readCsvFile(filePath, effectiveDate);
      allRoutes.push(...routes);
    } else {
      console.warn(`File ${fileName} not found, skipping...`);
    }
  }

  // Sort routes by effective_date, then by route name for consistent output
  allRoutes.sort((a, b) => {
    if (a.effective_date !== b.effective_date) {
      return a.effective_date.localeCompare(b.effective_date);
    }
    return a.route.localeCompare(b.route);
  });

  // Write aggregated data to JSON file
  try {
    fs.writeFileSync(outputPath, JSON.stringify(allRoutes, null, 2), "utf-8");
    console.log(
      `Successfully aggregated ${allRoutes.length} routes to data.json`
    );

    // Print summary statistics
    const byDate = allRoutes.reduce((acc, route) => {
      acc[route.effective_date] = (acc[route.effective_date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("Routes by effective date:");
    for (const [date, count] of Object.entries(byDate)) {
      console.log(`  ${date}: ${count} routes`);
    }
  } catch (error) {
    console.error("Error writing data.json:", error);
    process.exit(1);
  }
}

// Run the aggregation
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("Starting data aggregation...");
  aggregateData();
  console.log("Data aggregation completed!");
}
