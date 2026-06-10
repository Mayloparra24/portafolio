# Portafolio Inmersivo 3D - maylocode.dev

Portafolio web interactivo con experiencia 3D inmersiva, desarrollado con React, TypeScript y React Three Fiber.

## Stack Tecnológico

- **Frontend:** React 19 + TypeScript + Vite
- **Estilos:** Tailwind CSS v4
- **3D:** Three.js, @react-three/fiber, @react-three/drei
- **SEO:** react-helmet-async
- **Animaciones:** @react-spring/three
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

## Estructura del Proyecto

```
src/
├── components/
│   ├── layout/          # Layout y SEO
│   ├── three/           # Escena 3D
│   └── portfolio/       # UI del portafolio
├── data/                # Datos de proyectos
├── hooks/               # Hooks personalizados
└── types/               # Tipos TypeScript
public/
├── Computer.glb         # Modelo 3D
├── robots.txt           # SEO
└── sitemap.xml          # SEO
```

## Características

- **Experiencia 3D:** Modelo 3D interactivo de una computadora
- **Zoom animado:** Click o tecla para hacer zoom hacia el monitor
- **UI integrada:** Portafolio completo renderizado dentro del monitor 3D
- **Modo 2D:** Botón ESC para ver versión plana sin 3D
- **Video hover:** Las tarjetas de proyectos reproducen video al pasar el mouse
- **SEO optimizado:** Meta tags dinámicas para redes sociales

## Licencia

MIT
