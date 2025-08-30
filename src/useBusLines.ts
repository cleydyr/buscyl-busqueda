import { useEffect, useState } from "react";

interface BusLine {
  route: string;
  province: string;
  type: string;
  effective_date: string;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function useBusLines() {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [filtered, setFiltered] = useState<BusLine[]>([]);
  const [routeFilter, setRouteFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [provinces, setProvinces] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    import("./data.json").then(({ default: data }: { default: BusLine[] }) => {
      setBusLines(data);
      setFiltered(data);

      // Get distinct values for filters
      setProvinces(
        Array.from(new Set(data.map((l) => l.province).filter(Boolean)))
      );
      setTypes(Array.from(new Set(data.map((l) => l.type).filter(Boolean))));
      setDates(
        Array.from(new Set(data.map((l) => l.effective_date).filter(Boolean)))
      );
    });
  }, []);

  useEffect(() => {
    const normalizedRouteFilter = normalizeText(routeFilter);

    setFiltered(
      busLines
        .filter(
          (line) =>
            !normalizedRouteFilter ||
            normalizeText(line.route).includes(normalizedRouteFilter)
        )
        .filter((line) => !provinceFilter || line.province === provinceFilter)
        .filter((line) => !typeFilter || line.type === typeFilter)
        .filter((line) => !dateFilter || line.effective_date === dateFilter)
    );
  }, [routeFilter, provinceFilter, typeFilter, dateFilter, busLines]);

  return {
    filtered,
    routeFilter,
    setRouteFilter,
    provinceFilter,
    setProvinceFilter,
    typeFilter,
    setTypeFilter,
    dateFilter,
    setDateFilter,
    provinces,
    types,
    dates,
  };
}

export type { BusLine };
