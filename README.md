# Clínica Linnen

Sitio público de Clínica Linnen, una clínica odontológica con enfoque humanizado en Valdivia.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables de entorno

Copiar `.env.example` a `.env.local`. La aplicación funciona sin credenciales usando contenido local de respaldo. Al configurar InsForge, el BFF obtiene la revisión publicada; al configurar ImageKit, las imágenes se sirven con optimización desde su CDN.

## Comandos

- `npm run dev`: entorno local.
- `npm run typecheck`: validación TypeScript.
- `npm run lint`: reglas de calidad.
- `npm run build`: compilación de producción.

## Documentación

- [Arquitectura de contenidos](docs/arquitectura-contenidos-y-direccion-visual.md)
- [Arquitectura técnica](docs/arquitectura-tecnica.md)
- [Modelo propuesto para InsForge](infra/insforge/content-model.sql)
