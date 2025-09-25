![Build and deploy](https://github.com/cleydyr/buscyl-busqueda/actions/workflows/build-and-deploy.yml/badge.svg)
![Check PDF updates](https://github.com/cleydyr/buscyl-busqueda/actions/workflows/check-pdf-updates.yml/badge.svg)

# BusCyL - Buscador de Líneas de Autobús

Una iniciativa ciudadana independiente para facilitar la búsqueda de líneas de autobús en Castilla y León.

## ℹ️ Descripción

Este sitio web permite buscar y filtrar las líneas de autobús de Castilla y León de forma sencilla e intuitiva. Los datos provienen de documentos oficiales de la Junta de Castilla y León y se actualizan automáticamente cuando hay cambios.

**⚠️ Aviso importante:** Esta es una iniciativa ciudadana independiente y no está respaldada ni avalada por ningún nivel de gobierno.

## ✨ Características

- 🔍 **Búsqueda por ruta**: Encuentra líneas específicas por nombre
- 🌍 **Filtro por provincia**: Filtra por las diferentes provincias de la comunidad
- 📋 **Filtro por tipo**: Clasifica por tipo de servicio de transporte
- 📅 **Filtro por fecha de vigencia**: Busca por fechas de inicio del servicio
- 📱 **Diseño responsivo**: Optimizado para móviles y escritorio
- 🎨 **Interfaz intuitiva**: Colores y diseño accesibles

## 🔧 Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de desarrollo rápida
- **CSS3** - Estilos personalizados sin frameworks externos

## 📊 Fuentes de Datos

Los datos se extraen automáticamente de los siguientes documentos oficiales:

- [Anexo I - Rutas 1 septiembre](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/353/257/Anexo%20I%20-%20Rutas%201%20sept,0.pdf)
- [Anexo II - Rutas 15 septiembre](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/887/719/Anexo%20II%20-%20Rutas%2015%20sept,0.pdf)
- [Anexo III - Rutas 30 septiembre](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/997/516/Anexo%20III%20-%20Rutas%2030%20sept,0.pdf)

## 🤖 Monitorización Automática

El proyecto incluye un sistema de monitorización automática mediante GitHub Actions que:

- Verifica diariamente si hay actualizaciones en los documentos PDF oficiales
- Calcula checksums MD5 para detectar cambios
- Crea automáticamente issues cuando se detectan actualizaciones
- Mantiene un registro de las versiones de los documentos

## 🚀 Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cleydyr/buscyl-busqueda.git
cd buscyl-busqueda

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de la build
npm run lint         # Verificar código con ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── App.tsx              # Componente principal
├── App.css              # Estilos principales
├── useBusLines.ts       # Hook personalizado para datos
├── GitHubBanner.tsx     # Componente del banner de GitHub
├── Accordion.tsx        # Componente acordeón para fuentes
└── main.tsx             # Punto de entrada

.github/
└── workflows/
    └── check-pdf-updates.yml  # Workflow de monitorización

file-checksums.json     # Checksums de los archivos PDF
```

## 🎨 Paleta de Colores

El proyecto utiliza una paleta de colores específica:

- `#ffffff` - Blanco (fondos, texto en áreas oscuras)
- `#dc1414` - Rojo (acentos, estados hover) 
- `#ffdc00` - Amarillo (bordes, resaltados)
- `#782864` - Morado (elementos secundarios)
- `#000000` - Negro (texto principal)
- `#142828` - Verde azulado oscuro (fondos primarios, encabezados)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## 📝 Licencia

Este proyecto es de dominio público y puede ser utilizado libremente para fines educativos y no comerciales.

## 👥 Contacto

Si tienes sugerencias, problemas o preguntas, puedes:

- Abrir un [issue](https://github.com/cleydyr/buscyl-busqueda/issues)
- Hacer fork del proyecto y contribuir

---

💡 **Nota**: Este proyecto es una herramienta ciudadana para facilitar el acceso a información pública. No sustituye las fuentes oficiales y se recomienda verificar siempre con las autoridades competentes para información crítica.
