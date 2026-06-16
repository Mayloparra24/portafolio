# maylocode.dev — Portafolio Personal

Portafolio web interactivo con estilo de escritorio de desarrollador. Construido con React, TypeScript y Vite, pensado para mostrar proyectos personales de forma más humana y cercana.

## Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Build tool:** Vite 5
- **Estilos:** Tailwind CSS v4
- **SEO:** react-helmet-async
- **Gestión de datos:** Archivos JSON cargados dinámicamente con `fetch()`
- **Despliegue:** Vercel

## Instalación

```bash
pnpm install
```

## Scripts Disponibles

```bash
pnpm run dev      # Servidor de desarrollo
pnpm run build    # Build de producción
pnpm run preview  # Preview del build
pnpm run lint     # Linter ESLint
```

## Proyecto desplegado

<https://maylocode.dev> - Portafolio desplegado en Vercel con dominio gratis dado en GitHub Student 



## Estructura del Proyecto

```
src/
├── components/
│   ├── layout/          # Layout y SEO
│   ├── sections/        # Secciones del portafolio (About, Projects, Skills, Contact)
│   └── terminal/        # Boot sequence y prompt de comandos
├── hooks/               # Hooks personalizados
├── types/               # Tipos TypeScript
└── index.css            # Variables de tema y utilidades
public/
├── data/                # Datos JSON de proyectos y habilidades
├── videos/              # Videos demostrativos de proyectos
├── cv-es.pdf            # CV en español
├── cv-en.pdf            # CV en inglés
├── og-image.svg         # Imagen para redes sociales
├── robots.txt           # SEO
└── sitemap.xml          # SEO
```

## Características

- **Escritorio de desarrollador:** Cada sección se presenta como una ventana de aplicación.
- **Navegación por comandos:** Usá `whoami`, `ls projects`, `cat skills` y `contact` para moverte.
- **Datos dinámicos:** Proyectos y habilidades se cargan desde archivos JSON con `fetch()`.
- **Videos demostrativos:** Al pasar el cursor sobre un proyecto se reproduce su video.
- **Diseño responsivo:** Funciona en escritorio, tablet y móvil.
- **SEO optimizado:** Meta tags dinámicas para redes sociales.

## Comandos de Navegación

| Comando | Sección |
|---|---|
| `whoami` | Perfil y presentación |
| `ls projects` | Lista de proyectos |
| `cat skills` | Tecnologías y habilidades |
| `contact` | Información de contacto |

## Licencia

[LICENSE MIT](LICENSE)
