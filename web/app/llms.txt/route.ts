import { absoluteUrl, siteConfig } from "@/lib/site";

// Plain-text summary for AI assistants that read the site directly
// (https://llmstxt.org). Facts mirror the client-confirmed business data; keep
// them in sync with the translation dictionaries and `siteConfig.contact`.
export const dynamic = "force-static";

export function GET() {
  const { contact } = siteConfig;
  const es = (path: string) => absoluteUrl("es", path);
  const en = (path: string) => absoluteUrl("en", path);

  const body = `# Séance — Laboratorio cosmético habilitado por ANMAT

> Laboratorio argentino en actividad desde 1990, en Caseros, provincia de Buenos Aires (SEANCE SRL). Fabricación para terceros de cosméticos Grado I y Grado II en formas líquidas, semisólidas y alcohólicas; registro ANMAT; hosting regulatorio; importación de cosméticos (Grado II de todas las categorías) y exportación. Fabricación e importación de productos domisanitarios. Producción y control de calidad bajo Buenas Prácticas de Fabricación (BPF), con Dirección Técnica propia.

Lote mínimo: 500 litros, o 5.000 unidades en formatos menores a 100 ml. Plazos: desarrollo de fórmula de 1 a 3 meses; alta del registro ANMAT en aproximadamente 72 horas hábiles con el expediente completo; producción en aproximadamente 4 semanas con materia prima y material de empaque en planta. Capacidad: tanques de hasta 3.500 L, 200.000 unidades por mes, fraccionamiento de 2 ml a 200 L. Atención en español e inglés, de lunes a viernes de 8 a 17 h; respuesta a solicitudes completas en 72 horas hábiles.

## Servicios

- [Fabricación para terceros](${es("servicios/fabricacion")}): desarrollo de fórmula, registro ANMAT, producción y control de calidad bajo BPF.
- [Hosting regulatorio](${es("servicios/hosting")}): registro y comercialización con el respaldo de un establecimiento habilitado y de la Dirección Técnica de Séance.
- [Importación](${es("servicios/importacion")}): importación de productos cosméticos, con habilitación también para exportar.

## Empresa y productos

- [Nosotros](${es("nosotros")}): alcance de habilitación, capacidades técnicas, misión y valores.
- [Productos Everest](${es("productos")}): marca propia de higiene, sanitización y cuidado personal, con fichas técnicas en PDF.

## Contacto

- [Contacto](${es("contacto")}): formulario, mapa y canales directos.
- Email: ${contact.emails.join(", ")}
- Teléfono: ${contact.phone}
- Domicilio: Directorio 3548, Caseros (CP 1678), partido de Tres de Febrero, provincia de Buenos Aires, Argentina.

## English

- [Home](${en("")})
- [Contract manufacturing](${en("servicios/fabricacion")})
- [Regulatory hosting](${en("servicios/hosting")})
- [Import](${en("servicios/importacion")})
- [About us](${en("nosotros")})
- [Everest products](${en("productos")})
- [Contact](${en("contacto")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
