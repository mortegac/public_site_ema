# Harness Engineering con Claude — Plan de Mejora

> Basado en: "Harness Engineering with Claude: 14-Step Roadmap" — Lev Deviatkin (Jun 2026)
> Análisis aplicado al proyecto `public_site_ema` · Energica City

**Premisa del artículo:** "Un loop es tan bueno como el harness que lo soporta. La auto-mejora nunca fue una propiedad del modelo — es una propiedad del harness que construyes alrededor de él."

---

## Estado Actual del Harness (diagnóstico)

| Componente | Estado | Puntaje |
|-----------|--------|---------|
| `.claude/` folder + hooks | ✅ Excelente | 9/10 |
| `CLAUDE.md` documentación | ✅ Excelente | 9/10 |
| MCP tools (code-review-graph) | ✅ Activo | 8/10 |
| Skills personalizados | ✅ 6 skills | 7/10 |
| Cobertura de tests | 🚨 Crítico | 2/10 |
| Organización de componentes | ⚠️ Riesgoso | 5/10 |
| Capa de datos documentada | ⚠️ Riesgoso | 5/10 |
| Enforcement del design system | ⚠️ Riesgoso | 5/10 |

---

## Parte 1 — Qué es el Harness (Steps 1–4)

### Step 1: El harness actual

El harness de este proyecto tiene 4 elementos:
- **Modelo**: Claude Sonnet 4.6 (default session)
- **Tools**: code-review-graph MCP + herramientas built-in (Read, Edit, Bash, Grep, etc.)
- **Permisos**: Hooks que auto-actualizan el grafo + npm audit async
- **Contexto inicial**: `CLAUDE.md` (comprehensive) + `MEMORY.md` (auto-memory)

**Lo que falta**: subagentes especializados para tareas repetitivas del proyecto (cotizador, email templates, GraphQL queries).

### Step 2: Estructura `.claude/` actual

```
.claude/
├── CLAUDE.md              ✅ Documentado
├── settings.json          ✅ Hooks configurados
├── settings.local.json    ✅ Permisos locales
├── skills/                ✅ 6 skills activos
│   ├── debug-issue.md
│   ├── design-system.md
│   ├── explore-codebase.md
│   ├── refactor-safely.md
│   └── review-changes.md
└── (falta) agents/        ❌ No hay subagentes definidos
└── (falta) memory/        ✅ Existe via auto-memory system
```

**Gap principal**: no hay `agents/` con subagentes especializados del dominio.

### Step 3: Los tres "pisos" del harness

| Piso | Estado actual |
|------|--------------|
| **Harness** (configuración estática) | Parcialmente completo — hooks OK, falta agents/ |
| **Loop** (automatización timer-driven) | ❌ No implementado |
| **Self-improving** (loop + memoria compuesta) | ❌ No implementado |

El proyecto está en Piso 1. El plan a continuación asciende a Piso 2.

### Step 4: El harness por defecto

Sin mejoras, Claude re-deriva cada sesión: estructura del proyecto, convenciones de código, relaciones entre archivos. El `CLAUDE.md` actual mitiga esto bien, pero falta contexto sobre: el schema GraphQL, el flujo de Webpay, y los templates de EmailJS.

---

## Parte 2 — Construir la Fundación (Steps 5–9)

### Step 5: CLAUDE.md — Hechos permanentes ✅ (bien)

**Estado**: Excelente. Cubre infraestructura AWS, routing, Redux, CMS, analytics.

**Mejoras menores pendientes**:
- [ ] Agregar: política de branches y PR (actualmente no documentada)
- [ ] Agregar: patrones de integración GraphQL/AppSync con un ejemplo mínimo
- [ ] Eliminar: cualquier procedimiento que ya esté en skills (CLAUDE.md debe ser facts, no how-to)
- [ ] Agregar: advertencia sobre `CotizadorWizard.tsx` (3,300 líneas, navegar con MCP graph primero)

Límite objetivo: mantener bajo ~600 tokens. Mover todo procedimiento a skills.

### Step 6: settings.json — Permisos y modelo

**Estado**: Bueno. Hooks funcionando.

**Mejoras**:

```json
// Agregar a .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          // Bloquear comandos destructivos
          "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '(rm -rf|git push --force|git reset --hard|drop table)' && exit 2 || exit 0"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          // Hook existente: code-review-graph update
          "command": "code-review-graph update --skip-flows",
          "timeout": 5000
        }, {
          "type": "command",
          // NUEVO: type-check rápido en archivos tsx modificados
          "command": "echo \"$CLAUDE_TOOL_RESULT\" | grep -q '\\.tsx' && cd /path/to/project && npx tsc --noEmit --skipLibCheck 2>&1 | head -20 || true",
          "timeout": 15000
        }]
      }
    ]
  }
}
```

**Mejoras críticas**:
- [ ] **PreToolUse gate**: bloquear `rm -rf`, `git push --force`, `git reset --hard` determinísticamente
- [ ] **PostToolUse type-check**: correr `tsc --noEmit` rápido después de editar `.tsx`
- [ ] **Stop hook**: verificar que el build no está roto al finalizar una sesión larga

### Step 7: Subagentes — Contextos aislados

**Estado**: ❌ No hay subagentes definidos en el proyecto.

**Subagentes recomendados para crear en `.claude/agents/`**:

#### `cotizador-reviewer.md`
Revisor dedicado del CotizadorWizard. Contexto fresco, sin los sesgos del agente principal que acaba de escribir código.
- Especializado en: cálculos de precio, estado del wizard, flujo de Webpay
- Trigger: después de cualquier cambio en `CotizadorWizard.tsx`

#### `email-template-agent.md`
Agente especializado en EmailJS templates y HTML de emails.
- Conoce: service IDs, template IDs, variables disponibles
- Evita re-derivar la estructura de templates cada vez

#### `graphql-query-agent.md`
Agente especializado en AppSync/Amplify Gen 2 data layer.
- Conoce: el schema GraphQL, los modelos DynamoDB, las Lambda resolvers
- Uso: cuando se necesita agregar o modificar queries/mutations

**Patrón clave del artículo**: el subagente más valioso es un **reviewer con perspectiva fresca** que verifica el output del agente principal. Para este proyecto: un revisor de cálculos del cotizador previo al push.

### Step 8: Skills — Procedimientos reutilizables

**Estado**: 6 skills existentes. Bien.

**Skills faltantes para agregar**:

| Skill | Cuándo usar | Prioridad |
|-------|------------|-----------|
| `cotizador-calc-check.md` | Después de cambiar cualquier cálculo de precio/instalación | 🔴 Alta |
| `emailjs-template.md` | Al agregar campos a emails o crear nuevos templates | 🔴 Alta |
| `amplify-graphql.md` | Al agregar modelos, queries o mutations al backend | 🟡 Media |
| `prismic-slice.md` | Al crear o modificar slices de CMS | 🟡 Media |
| `redux-slice.md` | Al agregar nuevas features al store | 🟡 Media |
| `webpay-integration.md` | Al modificar el flujo de pago | 🔴 Alta |

**Skill `cotizador-calc-check.md` — contenido mínimo**:
```markdown
# Cotizador Calc Check

Antes de hacer push con cambios en precios o cálculos:

1. Leer `docs/cotizador-calculo-flujo.md` y verificar que la lógica coincide
2. Verificar que `INSTALL_BASE` y `SEC_BASE` no se doblan
3. Confirmar que el precio que llega a `payDirect(amount, ...)` es el correcto
4. Verificar que el amount de Webpay y el que se muestra en UI coinciden
5. Correr `npm run build` — cero errores
```

### Step 9: Hooks — Enforcement determinístico

**Estado**: Parcialmente implementado.

**Problema identificado**: el artículo dice "coloca enforcement en hooks, NO en CLAUDE.md". Actualmente algunas reglas de seguridad están solo en CLAUDE.md (ej: "nunca hacer push sin build exitoso"). Deben estar en hooks.

**Hooks críticos a agregar**:

```bash
# Hook PreToolUse: bloquear push sin build
# (actualmente está como texto en CLAUDE.md — moverlo aquí)
if echo "$CLAUDE_TOOL_INPUT" | grep -q "git push"; then
  cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema
  npm run build 2>&1 | tail -5
  [ $? -ne 0 ] && echo "ERROR: build fallido, push bloqueado" && exit 2
fi
```

```bash
# Hook PostToolUse: lint automático en archivos editados
if echo "$CLAUDE_TOOL_INPUT" | grep -qE '\.(tsx|ts)$'; then
  npx eslint --fix "$FILE" 2>&1 | head -10
fi
```

---

## Parte 3 — Hacer que Compueste (Steps 10–14)

### Step 10: Agregar un Loop

**Estado**: ❌ No implementado.

**Cuándo aplica**: no es urgente para el flujo actual (desarrollo interactivo). Considerar para:
- Monitoreo nocturno de errores en Vercel logs
- Verificación periódica de que los eventos de tracking llegan correctamente
- Reports automáticos del estado del funnel de cotizador

**Implementación futura** (cuando haya una tarea repetitiva clara):
```
/loop revisar los últimos errores de Vercel y clasificarlos por severidad
```

### Step 11: Workflows dinámicos

**Estado**: Disponible via herramienta `Workflow`. No se usa sistemáticamente.

**Workflows recomendados para este proyecto**:

```javascript
// workflow: review-cotizador-changes
// Uso: después de cambios en CotizadorWizard.tsx
phase('Analyze')
const changes = await agent('Detectar qué cambió en CotizadorWizard.tsx vs main', {schema: CHANGES_SCHEMA})

phase('Verify')
const verified = await parallel(changes.areas.map(area => () =>
  agent(`Verificar cálculo para: ${area}. Buscar inconsistencias precio UI vs payDirect vs DB`, {schema: VERDICT_SCHEMA})
))

return verified.filter(v => v.hasIssue)
```

**Casos de uso inmediatos**:
- Review de cambios en el cotizador (verificación adversarial de precios)
- Audit de tracking events (verificar que nuevos eventos tienen los props correctos)
- Refactor seguro de componentes grandes (fan-out análisis de impacto)

### Step 12: Agregar Memoria

**Estado**: ✅ Auto-memory activo en `.claude/projects/.../memory/`.

**Mejoras**:
- [ ] Agregar memoria de "cálculos verificados" (cuando un cálculo fue auditado y aprobado, no re-derivar)
- [ ] Agregar memoria de "templates EmailJS" (IDs, variables, estructura — evitar buscar en el código cada vez)
- [ ] Agregar memoria de "sesiones de debugging" (qué se intentó, qué funcionó)

**Patrón artículo**: Write before ending → Read at start → Distill into skills.

### Step 13: Cerrar el Loop

El ciclo de mejora para este proyecto:

```
Cambio de código
    ↓
code-review-graph auto-update (hook existente)
    ↓
[FALTANTE] Reviewer subagente verifica cambios
    ↓
[FALTANTE] Memory registra patrones problemáticos
    ↓
[FALTANTE] Skills capturan las lecciones aprendidas
    ↓
Siguiente sesión hereda el conocimiento
```

**El gap más grande**: no hay reviewer subagente que verifique cambios del agente principal. Este es el paso de mayor impacto.

### Step 14: Distribuir el Harness

**Para el equipo**:

Una vez estabilizado, el harness de este proyecto debería ser instalable en el backoffice (`ema-backofficev2`) sin re-derivar convenciones desde cero.

**Bundle a distribuir**:
- `skills/cotizador-calc-check.md`
- `skills/emailjs-template.md`
- `skills/webpay-integration.md`
- `agents/cotizador-reviewer.md`
- `rules/` con reglas específicas del dominio energía solar

---

## Plan de Implementación Priorizado

### Fase 1 — Quick wins (1-2 días)

| Tarea | Impacto | Esfuerzo |
|-------|---------|---------|
| PreToolUse hook: bloquear rm -rf y force-push | 🔴 Seguridad | Bajo |
| Crear skill `cotizador-calc-check.md` | 🔴 Calidad | Bajo |
| Crear skill `webpay-integration.md` | 🔴 Calidad | Bajo |
| Agregar a CLAUDE.md: advertencia sobre CotizadorWizard.tsx tamaño | 🟡 Productividad | Muy bajo |
| Mover "build antes de push" de CLAUDE.md a hook | 🔴 Enforcement | Bajo |

### Fase 2 — Fundación sólida (1 semana)

| Tarea | Impacto | Esfuerzo |
|-------|---------|---------|
| Crear `agents/cotizador-reviewer.md` | 🔴 Calidad crítica | Medio |
| Crear skill `emailjs-template.md` | 🟡 Productividad | Bajo |
| Documentar schema GraphQL en `docs/arquitecture/graphql-schema.md` | 🟡 Contexto | Medio |
| PostToolUse hook: type-check rápido en archivos .tsx | 🟡 Calidad | Bajo |
| Agregar 10 tests unitarios para lógica del cotizador | 🔴 Cobertura | Alto |

### Fase 3 — Escala y compuesto (1 mes)

| Tarea | Impacto | Esfuerzo |
|-------|---------|---------|
| Workflow: review adversarial de cambios en cotizador | 🔴 Calidad | Medio |
| Split CotizadorWizard.tsx en 3-4 archivos | 🔴 Mantenibilidad | Alto |
| Jest + tests unitarios para Redux slices | 🟡 Cobertura | Alto |
| Memoria de cálculos verificados (distilled skills) | 🟡 Productividad | Medio |
| Distribuir harness al backoffice | 🟢 Equipo | Medio |

---

## Errores Comunes a Evitar (del artículo)

| Error | Situación actual | Acción |
|-------|-----------------|--------|
| ❌ Bloat en CLAUDE.md con procedimientos | Parcialmente OK | Mover procedimientos a skills |
| ❌ Enforcement en CLAUDE.md en vez de hooks | "Build antes de push" está en CLAUDE.md | Mover a PreToolUse hook |
| ❌ Un solo agente escribe Y verifica su propio trabajo | Situación actual | Crear cotizador-reviewer subagente |
| ❌ Sin memoria entre sesiones | Auto-memory activo | Agregar memoria de dominio específico |
| ❌ Loops en harness débil | No hay loops todavía | Bien — primero fortalecer el harness |
| ❌ Permisos sin escanear | settings.json revisado | Auditar settings.local.json periódicamente |

---

## Problema Principal Identificado

**`CotizadorWizard.tsx` — 3,300 líneas, un solo archivo**

Este es el mayor riesgo para agentes AI en este proyecto. El artículo enfatiza que el harness define el comportamiento del agente — un archivo monolítico de 3,300 líneas causa:

1. Agentes que pierden contexto navegando el archivo
2. Cambios en una sección que rompen lógica en otra (difícil de verificar sin tests)
3. Cálculos de precio mezclados con UI, imposible de testear en aislamiento
4. Reviewer subagente que no puede leer el archivo completo en una pasada

**Solución a largo plazo**: dividir en:
- `CotizadorState.ts` — tipos, estado inicial, reducers
- `CotizadorStep1.tsx` — componente Paso 1 (tipo + dirección)
- `CotizadorStep2.tsx` — componente Paso 2 (cargador)
- `CotizadorStep3Casa.tsx` — Paso 3 para casa
- `CotizadorStep3Edificio.tsx` — Paso 3 para edificio
- `cotizador-calc.ts` — funciones de cálculo puras (testeables)
- `CotizadorWizard.tsx` — orquestador (~200 líneas)

Esto transforma el problema más difícil del harness en el área más segura para trabajar.

---

*Documento creado: 24 de junio 2026 · basado en análisis de harness engineering aplicado a public_site_ema*
