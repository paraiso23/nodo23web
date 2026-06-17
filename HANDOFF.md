# 🤝 Handoff · Proyecto web Nodo23 "Instaladores de IA"

**Rama:** `claude/inspiring-turing-HDwca` · todo commiteado y pusheado.
**Última actualización:** 2026-06-16

---

## 1. Contexto del proyecto

Reposicionamiento de Nodo23 como **"instaladores de inteligencia artificial"** para pymes.
Mensaje madre: *"Te instalamos la IA. Tú a lo tuyo."* Estamos construyendo la landing y material
de ventas. El tono de marca es claro, directo y con **humor seco** medido. En las últimas
iteraciones el cliente pidió ir **más al grano** (textos ~50% más cortos).

---

## 2. Entregables (qué hay subido)

| Archivo | Qué es | Estado |
|---|---|---|
| `public/instalamos.html` | Primera preview, estilo **oscuro/tech** (negro, verde neón) | ❌ **Descartado** (ver decisión de diseño) |
| `public/instalamos-claro.html` | Landing **corporativa/clara** con el copy largo completo | ✅ Funciona, pero **pendiente de meter el copy recortado** |
| `public/playbook.html` | Playbook de ventas (para Elizabeth, dpto. ventas) | ✅ Hecho |

**Cómo verlos:** `npm run dev` → `/instalamos-claro.html` o `/playbook.html`. En Vercel: `dominio/<archivo>`.

> Nota: el entorno no tiene navegador headless ni CDN offline → no se pueden generar capturas aquí;
> se ven abriendo el archivo o en el deploy.

---

## 3. Diseño — DECIDIDO ✅

Se descartó el estilo tech oscuro. Dirección final:

- **Corporativo, blanco, minimalista, editorial.**
- Tipografía: **Fraunces** (serif, titulares) + **Inter** (cuerpo).
- Paleta: blanco `#fff` + crema `#f7f6f2`, tinta `#16150f`, **acento verde sobrio `#15775a`**.
- Hairlines de 1px, mucho aire, fade-in suave al hacer scroll. Sin glow/neón/ticker.
- Una sola sección oscura (tinta) para los CTA finales, como contraste.

---

## 4. Estado del COPY (lo importante)

Estamos cerrando la web **bloque a bloque**: por cada bloque doy 5 opciones y el cliente elige.
**Voz acordada:** versión recortada + humor medido.

| Bloque | Estado | Notas |
|---|---|---|
| **1 · Hero** | 🟡 **EN DECISIÓN** | Varias rondas (A–E, variaciones de B y D, y 5 nuevas). **Sin elección final.** Favoritos rondan el ángulo "instaladores" (B) y "empleado/humor" (D). |
| **2 · El problema** | 🟢 | Texto base aprobado (versión corta). Se dieron 5 alternativas; sin cambio confirmado. |
| **3 · Qué hacemos** | 🟡 | Texto base + 5 alternativas dadas. Pendiente de elegir. |
| **4 · Qué instalamos** (4 servicios) | 🟢 | Copy largo en la web; falta versión recortada. |
| **5 · Las 6 automatizaciones** | 🟢 | Recortado listo. |
| **6 · Cómo funciona** | 🟢 | Recortado listo (4 pasos). |
| **7 · Para quién es/no es** | 🟡 | Texto base + 5 alternativas dadas. Pendiente de elegir. |
| **8 · Diferencia + método** | 🟢 | Recortado listo. |
| **9 · Precio** | 🟢 | Recortado listo. |
| **10 · Casos de uso** | 🟢 | Recortado listo (6 sectores). |
| **11 · FAQ** | 🟢 | Recortada (8 preguntas). |
| **12 · Bloque final + 13 · Formulario** | 🟢 | Listos. |

➡️ **Siguiente paso natural del copy:** terminar de elegir Hero, Qué hacemos y Para quién, y luego
**regenerar `instalamos-claro.html` con todo el copy recortado** (ahora tiene el largo).

---

## 5. Decisiones de producto/funcionalidad — DECIDIDAS ✅

- **CTAs → al formulario** (`Pedir revisión gratis`), no a WhatsApp directo.
- Los **CTA de cada servicio** ("Quiero una web con IA"…) llevan al formulario **y preseleccionan**
  esa opción en el desplegable.
- **El formulario, al enviar, abre WhatsApp** con los datos rellenados (sin backend).
- Precios mostrados como **"desde"** (anclas placeholder: instalación 350 €, mantenimiento 60 €/mes).

---

## 6. PENDIENTE del cliente (bloqueantes) 🔴

1. **Número de WhatsApp real.** Ahora placeholder `34600000000` en la línea `WA_NUMBER`
   (arriba del `<script>` de cada HTML). Sin esto el formulario no es operativo.
2. **Confirmar precios** (las cifras 350/60 son ancla, no validadas).
3. **Elegir Hero** (y los 2 bloques en decisión).

---

## 7. Decisiones abiertas (a discutir, no bloqueantes)

- **¿La web sustituye la home actual o vive aparte?** → de momento como página aparte (`/instalamos…`). Sin decidir.
- **¿Formulario por WhatsApp o email/backend?** → ahora WhatsApp. Cambiable.
- **Playbook está en `public/` → es público.** Se avisó; falta decidir si protegerlo/moverlo a `/docs`.
- **Tailwind se carga por CDN** → se puede "incrustar" para que funcione offline y cargue más rápido en producción.
- **Pasar a React** (ruta `/instalamos` dentro de la app) cuando el diseño esté aprobado.
  Ahora son HTML sueltos para iterar rápido.

---

## 8. Material de ventas

- `playbook.html` ya hecho: 11 partes + glosario + claims, índice lateral, botón Imprimir/PDF,
  para Elizabeth (nivel técnico medio).
- Ofrecido y **no hecho aún:** guion de llamada de 2 min, plantillas de primer contacto
  (WhatsApp/email), one-pager para clientes.

---

## 9. Por dónde seguir

1. Cerrar **Hero** (y bloques 3 y 7).
2. Regenerar `instalamos-claro.html` con el **copy recortado** definitivo.
3. Meter **WhatsApp real** y **precios confirmados**.
4. Decidir: ¿home o página aparte? ¿pasar a React? ¿proteger playbook?
5. (Opcional) material de ventas extra.
