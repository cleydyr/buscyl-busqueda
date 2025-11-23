import "./App.css";
import { useBusLines } from "./useBusLines";
import { GitHubBanner } from "./GitHubBanner";
import { Accordion } from "./Accordion";

function App() {
  const {
    filtered,
    routeFilter,
    setRouteFilter,
    provinceFilter,
    setProvinceFilter,
    typeFilter,
    setTypeFilter,
    provinces,
    types,
  } = useBusLines();

  return (
    <main>
      <header>
        <GitHubBanner repoUrl="https://github.com/cleydyr/buscyl-busqueda" />
        <h1>Líneas de Autobús - BusCyL</h1>
        <p>Filtra por ruta, provincia y tipo.</p>
      </header>
      <section
        aria-label="Fuentes de datos"
        className="sources"
        style={{ marginTop: "2rem" }}
      >
        <Accordion title="Fuentes de los datos">
          <p>
            Las líneas de autobús han sido extraídas de los siguientes
            documentos oficiales de la Junta de Castilla y León:
          </p>
          <ul>
            <li>
              <a
                href="https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/660/872/Rutas%20bonificadas%20.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rutas+bonificadas+
              </a>
            </li>
          </ul>
        </Accordion>
      </section>
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
      </section>

      <section aria-label="Listado de líneas" className="table-section">
        <table role="table" aria-label="Líneas de autobús">
          <thead>
            <tr>
              <th scope="col">Ruta</th>
              <th scope="col">Provincia</th>
              <th scope="col">Tipo</th>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <footer className="disclaimer">
        <p>
          <strong>Aviso:</strong> Esta es una iniciativa ciudadana independiente
          y no está respaldada ni avalada por ningún nivel de gobierno.
        </p>
      </footer>
    </main>
  );
}

export default App;
