import { useEffect, useState } from "react";
import "./App.css";

interface BusLine {
  route: string;
  province: string;
  type: string;
  effective_date: string;
}

function App() {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [filtered, setFiltered] = useState<BusLine[]>([]);
  const [routeFilter, setRouteFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: BusLine[]) => {
        setBusLines(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = busLines;
    if (routeFilter) {
      result = result.filter((line) =>
        line.route?.toLowerCase().includes(routeFilter.toLowerCase())
      );
    }
    if (provinceFilter) {
      result = result.filter((line) => line.province === provinceFilter);
    }
    if (typeFilter) {
      result = result.filter((line) => line.type === typeFilter);
    }
    if (dateFilter) {
      result = result.filter((line) => line.effective_date === dateFilter);
    }
    setFiltered(result);
  }, [routeFilter, provinceFilter, typeFilter, dateFilter, busLines]);

  // Get distinct values for filters
  const provinces = Array.from(
    new Set(busLines.map((l) => l.province).filter(Boolean))
  );
  const types = Array.from(
    new Set(busLines.map((l) => l.type).filter(Boolean))
  );
  const dates = Array.from(
    new Set(busLines.map((l) => l.effective_date).filter(Boolean))
  );

  return (
    <main>
      <header>
        <h1>Líneas de Autobús - BusCyL</h1>
        <p>Filtra por ruta, provincia, tipo y fecha de vigencia.</p>
      </header>
      <section aria-label="Filtros" className="filters">
        <label htmlFor="route">Ruta:</label>
        <input
          id="route"
          type="text"
          value={routeFilter}
          onChange={(e) => setRouteFilter(e.target.value)}
          placeholder="Buscar por ruta"
          aria-label="Filtrar por ruta"
        />

        <label htmlFor="province">Provincia:</label>
        <select
          id="province"
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          aria-label="Filtrar por provincia"
        >
          <option value="">Todas</option>
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          aria-label="Filtrar por tipo"
        >
          <option value="">Todos</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label htmlFor="date">Fecha de vigencia:</label>
        <select
          id="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Filtrar por fecha de vigencia"
        >
          <option value="">Todas</option>
          {dates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </section>

      <section aria-label="Listado de líneas" className="table-section">
        <table role="table" aria-label="Líneas de autobús">
          <thead>
            <tr>
              <th scope="col">Ruta</th>
              <th scope="col">Provincia</th>
              <th scope="col">Tipo</th>
              <th scope="col">Fecha de vigencia</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No hay resultados
                </td>
              </tr>
            ) : (
              filtered.map((line, idx) => (
                <tr key={idx}>
                  <td>{line.route}</td>
                  <td>{line.province}</td>
                  <td>{line.type}</td>
                  <td>{line.effective_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
