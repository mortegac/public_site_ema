import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Box, Typography, Card, CardContent, CardActionArea, Chip } from "@mui/material";
import HpHeaderNew from "@/app/components/shared/header/HpHeaderNew";
import { createClient } from "@/prismicio";
import { CANONICAL_DOMAIN } from "@/utils/seo-config";

interface StaticArticle {
  uid: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const STATIC_ARTICLES: StaticArticle[] = [
  { uid: "cargador-volvo-xc40-recharge-instalacion-chile", title: "Cargador Volvo XC40 y C40 Recharge: Guía de Instalación en Chile", description: "Instalación certificada de cargadores para Volvo XC40 y C40 Recharge desde $159.000. Técnicos SEC autorizados. Optimiza la carga AC para tarifa nocturna.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "instalacion-cargador-renault-kwid-e-tech-hogar", title: "Renault Kwid E-Tech: Cómo Instalar tu Cargador en Casa", description: "Guía técnica para instalar el cargador del Renault Kwid E-Tech en Chile. Conectores Tipo 2, normativa SEC. Precio desde $159.000 con certificado TE6.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "presupuesto-instalacion-cargador-electrico-desglose", title: "Presupuesto para Instalar un Cargador Eléctrico: ¿Qué Pagas Realmente?", description: "Desglose transparente del costo de instalación de cargador EV en Chile: desde $159.000 en casas y $369.000 en edificios. Qué incluye: protecciones, tablero, TE6.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "instalar-cargador-auto-electrico-valparaiso-vina", title: "Instalación de Cargadores EV en Valparaíso y Viña del Mar", description: "Expertos en electromovilidad para la V Región. Instalación certificada SEC de cargadores en Viña del Mar y Valparaíso. Proyectos residenciales y comerciales.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "cargador-portatil-vs-wallbox-cual-conviene", title: "Cargador Portátil vs. Wallbox: ¿Cuál es Mejor para tu Casa?", description: "Compara cargador portátil y Wallbox para autos eléctricos en Chile. Potencia, seguridad y costo. Por qué la instalación fija protege tu batería.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "como-instalar-cargador-tesla-wall-connector-paso-a-paso", title: "Tesla Wall Connector Gen 3: Instalación Paso a Paso en Chile", description: "Instala el Tesla Wall Connector Gen 3 en Chile. Compatibilidad con red monofásica y trifásica. Profesionales SEC certificados. Desde $279.000.", date: "2025-05-01", category: "Instalaciones" },
  { uid: "tramite-sec-te6-electromovilidad-plazos-requisitos", title: "Trámite TE6 ante la SEC: Plazos y Requisitos para tu Cargador", description: "Cómo obtener el certificado TE6 de la SEC para tu cargador eléctrico en Chile. Plazos, requisitos, costos y por qué es obligatorio para seguros de hogar.", date: "2025-05-01", category: "Normativa" },
  { uid: "instalar-cargador-ev-estacionamiento-oficina-santiago", title: "Puntos de Carga en Oficinas: Guía para Empresas en Santiago", description: "Electrifica el estacionamiento de tu empresa en Santiago. Beneficios tributarios, carga para empleados y flotas. Proyectos en Providencia y Las Condes.", date: "2025-05-01", category: "Empresas" },
  { uid: "cargador-inteligente-ocpp-beneficios-administracion", title: "OCPP: El Protocolo que Hace Inteligente a tu Cargador EV", description: "Qué es OCPP y por qué elegir cargadores con este protocolo. Gestión remota, programación horaria, integración con EVE y reducción de costos eléctricos.", date: "2025-05-01", category: "Tecnología" },
  { uid: "incentivos-mi-taxi-electrico-instalacion-cargadores", title: "Programa Mi Taxi Eléctrico: Carga Domiciliaria para Conductores", description: "Apoyo del programa Mi Taxi Eléctrico para instalar cargadores en casa. Subsidio del Ministerio de Energía para taxistas y colectiveros en Chile 2025.", date: "2025-05-15", category: "Beneficios" },
  { uid: "cargador-auto-electrico-monofasico-vs-trifasico", title: "Cargador Monofásico vs. Trifásico: ¿Cuál Necesita tu Auto Eléctrico?", description: "Diferencias entre cargador monofásico (7kW) y trifásico (22kW) para autos eléctricos en Chile. Elige según tu empalme y la capacidad de tu vehículo.", date: "2025-05-15", category: "Tecnología" },
  { uid: "seguridad-electrica-cargadores-ev-protecciones-necesarias", title: "Seguridad Eléctrica: Protecciones Críticas para tu Cargador EV", description: "Protecciones obligatorias para instalar un cargador EV seguro en Chile. Diferencial tipo A, interruptor automático. Normativa NCh Elec. 4/2003.", date: "2025-05-15", category: "Normativa" },
  { uid: "cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile", title: "Hyundai Ioniq 5 y 6: Tiempos de Carga y Cargadores Ideales", description: "Cuánto tarda cargar el Hyundai Ioniq 5 e Ioniq 6 en Chile. Tecnología 800V, cargadores AC y DC. Instalación certificada desde $159.000.", date: "2025-05-15", category: "Vehículos" },
  { uid: "infraestructura-carga-proyectos-inmobiliarios-nuevos", title: "Electromovilidad Inmobiliaria: El 1% que Cambia tu Proyecto", description: "Cómo habilitar el 100% de estacionamientos EV en proyectos inmobiliarios nuevos. El costo no supera el 1% del presupuesto eléctrico. Edificios EV Ready.", date: "2025-05-15", category: "Empresas" },
  { uid: "mantenimiento-correctivo-cargadores-fallas-comunes", title: "Fallas Comunes en Cargadores EV: Guía de Mantenimiento", description: "Qué hacer si tu cargador eléctrico deja de funcionar. Diagnóstico de fallas comunes, mantenimiento preventivo y servicio técnico especializado en Chile.", date: "2025-05-15", category: "Instalaciones" },
  { uid: "cargadores-ev-marcas-chinas-byd-mg-maxus", title: "Cargadores para Autos Chinos: BYD, MG y Maxus en Chile", description: "Instalación de cargadores compatibles con BYD, MG y Maxus en Chile. Estándares CCS2 y GBT. Técnicos certificados SEC. Desde $159.000.", date: "2025-05-15", category: "Vehículos" },
  { uid: "como-cobrar-carga-auto-electrico-gastos-comunes-eve", title: "Cómo Cobrar la Carga EV a Través de los Gastos Comunes", description: "Gestión transparente del consumo EV en edificios con plataforma EVE de Enérgica City. Cobro automático, balanceo de carga y app móvil.", date: "2025-05-15", category: "Tecnología" },
  { uid: "viajes-largos-auto-electrico-chile-red-publica-vs-privada", title: "Viajes Largos en Auto Eléctrico por Chile: Planificación 2025", description: "Cómo planificar viajes interurbanos en auto eléctrico en Chile 2025. Red de carga pública, apps de rutas y por qué la carga en casa es la base.", date: "2025-05-15", category: "Beneficios" },
  { uid: "depreciacion-acelerada-vehiculos-electricos-empresas-chile", title: "Beneficios Tributarios: Depreciación Acelerada para Flotas EV", description: "Cómo las empresas chilenas ahorran impuestos al electrificar flotas. Ley 21.505, crédito fiscal y ROI de infraestructura de carga.", date: "2025-05-15", category: "Empresas" },
  { uid: "futuro-electromovilidad-chile-metas-2035-2050", title: "Chile 2035: El Fin de los Autos a Gasolina y Cómo Prepararse", description: "La Estrategia Nacional de Electromovilidad de Chile: meta 2035 para vehículos cero emisiones y carbono neutralidad 2050. Cómo prepararse hoy.", date: "2025-05-15", category: "Beneficios" },
];

export const metadata: Metadata = {
  title: "Blog sobre Electromovilidad en Chile",
  description: "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile.",
  alternates: {
    canonical: `${CANONICAL_DOMAIN}/blog`,
  },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog`,
    title: "Blog sobre Electromovilidad | Energica City",
    description: "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile.",
  },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const client = createClient();
  const posts = await client.getAllByType("blog", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: CANONICAL_DOMAIN },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CANONICAL_DOMAIN}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, mb: 1 }}>
            Blog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: "1.1rem" }}>
            Artículos sobre electromovilidad, normativa SEC y cargadores eléctricos en Chile.
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 4 }}>

            {/* Prismic posts */}
            {posts.map((post) => {
              const title = post.data.meta_title ?? post.uid;
              const description = post.data.meta_description ?? "";
              const imageUrl = (post.data.meta_image as { url?: string })?.url ?? (post.data.image as { url?: string })?.url ?? "";
              const imageAlt = (post.data.meta_image as { alt?: string })?.alt ?? (post.data.image as { alt?: string })?.alt ?? title ?? "";
              const date = formatDate(post.first_publication_date);

              return (
                <Card
                  key={post.uid}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.14)" },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/blog/${post.uid}`}
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                  >
                    {imageUrl && (
                      <Box sx={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        />
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {date && (
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                          {date}
                        </Typography>
                      )}
                      <Typography variant="h2" component="h2" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>
                        {title}
                      </Typography>
                      {description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                        >
                          {description}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}

            {/* Static articles */}
            {STATIC_ARTICLES.map((article) => (
              <Card
                key={article.uid}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.14)" },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/blog/${article.uid}`}
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                >
                  {/* Category color bar */}
                  <Box sx={{ width: "100%", height: 4, background: "linear-gradient(90deg, #0898b9 0%, #4dbfd9 100%)", borderRadius: "8px 8px 0 0" }} />
                  <CardContent sx={{ flexGrow: 1, p: 3, width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.date)}
                      </Typography>
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{ height: 20, fontSize: "0.7rem", bgcolor: "#e0f4fa", color: "#0777a0", fontWeight: 600 }}
                      />
                    </Box>
                    <Typography variant="h2" component="h2" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {article.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}

          </Box>
        </Container>
      </Box>
    </>
  );
}
