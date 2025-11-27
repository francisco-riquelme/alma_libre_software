Perfecto, hermano.
Ahora sí vamos a crear **EL DOCUMENTO MAESTRO** para Cursor.
Un `PLAN.md` que define:

* Cómo se trabaja
* Cómo se codifica
* Cómo se testea
* Cómo se documenta cada feature
* Cómo se versiona
* Cómo se hace push
* Cómo se organiza la estructura de carpetas
* Qué stack usamos
* Qué reglas NO puede romper
* Qué flujo debe seguir en todo el proyecto

Este documento va a ser **la Constitución** del proyecto.
Cursor lo leerá y trabajará **exactamente bajo tus reglas**, sin inventar nada, sin alucinar, sin romper arquitectura.

Aquí te va.
Cópialo tal cual dentro de:

```
/alma_libre/PLAN.md
```

---

# 📘 **PLAN.md — Proyecto AlmaLibre (Documento Maestro para Cursor)**

```markdown
# 🧩 Proyecto: AlmaLibre  
**Propósito:** Crear un espacio seguro y anónimo donde las personas puedan desahogarse y recibir apoyo empático de la comunidad.

Este documento define TODAS las reglas de desarrollo, arquitectura, workflows y buenas prácticas.  
Cursor deberá respetar estrictamente estas reglas.  
Nada se debe inventar fuera de este plan.

---

# 📦 1. STACK TECNOLÓGICO (LATEST)

## Frontend + Backend (en un solo repo)
- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **Zod** (validaciones)
- **MongoDB Driver Oficial**
- Otras dependencias serán anunciadas aquí antes de ser usadas.

## Base de Datos
- **MongoDB local** para desarrollo
- **MongoDB Atlas** en producción

---

# 📁 2. ESTRUCTURA BASE DE CARPETAS DEL PROYECTO

El proyecto debe seguir esta estructura inicial:

```

alma_libre/
PLAN.md
README.md

frontend/
app/
api/
posts/
comments/
reactions/
moderation/
(componentes y páginas del frontend)
public/
package.json
next.config.js
tailwind.config.js
tsconfig.json

base_datos/
esquemas.md
posts_schema.json
comments_schema.json
reactions_schema.json
moderation_rules.md

history_test/
(se crearán md individuales por cada feature testeado)

```

**Cursor NO debe modificar esta estructura sin autorización explícita.**  
Para agregar nuevas carpetas, primero debe consultar.

---

# 🧠 3. FILOSOFÍA DE TRABAJO

El desarrollo debe ser:

- Modular  
- Incremental  
- Sin alucinaciones  
- Basado en evidencia  
- Test-driven por feature  
- Documentado brevemente por historia  
- Versionado con claridad  
- Con foco en simplicidad y estabilidad  

---

# 🛠️ 4. WORKFLOW DE DESARROLLO (OBLIGATORIO)

Cada feature se desarrolla siguiendo ESTE orden:

### ✔️ 1. **Definir la feature**
Cursor debe mostrar en texto:
- Objetivo  
- Archivos involucrados  
- Atributos o funciones nuevas  
- Impacto en estructura o BD  

### ✔️ 2. **Crear archivos / funciones**
Solo los necesarios para esa feature  
Sin inventar carpetas nuevas  
Sin modificar partes ajenas al alcance  

### ✔️ 3. **Implementar lógica**
Código limpio  
TypeScript  
Validaciones con Zod  
Sin duplicar lógica  
Sin magia

### ✔️ 4. **Escribir TESTS**
- Test unitario o simple
- Debe ser reproducible
- Debe ser pequeño y acotado
- Debe probar SOLO la feature trabajada

### ✔️ 5. **Ejecutar TEST**
Cursor debe ejecutar o simular test y reportar:
- Passed  
- Failed (explicar y corregir)  

### ✔️ 6. **Documentar en `history_test/`**
Crear un archivo:

```

history_test/
featureName_test.md

```

Debe contener:
- Nombre de la feature  
- Fecha  
- Qué se testeo  
- Resultado resumido  

### ✔️ 7. **Actualizar documentación si aplica**
Si hubo cambios en:
- API  
- Esquemas  
- Validaciones  
Modificar el archivo correspondiente dentro de `base_datos/`.

### ✔️ 8. **Hacer commit y push (cuando se indique)**
Commit message claro:

```

feat: implement FEATURE_NAME (tested & documented)

```

Nunca hacer push sin aprobación.

---

# 🔒 5. REGLAS ESTRICTAS PARA CURSOR

1. **No inventar archivos**  
2. **No inventar rutas ni colecciones**  
3. **No modificar arquitectura sin aprobación**  
4. **No agregar paquetes sin aprobación**  
5. **No reescribir archivos completos sin necesidad**  
6. **Cada cambio debe estar justificado**  
7. **Cada feature debe incluir su propio test**  
8. **Cada test debe generar su archivo en `history_test/`**  
9. **Siempre preguntar antes de operaciones destructivas**  
10. **Siempre seguir esta guía antes de ejecutar cualquier cambio**

---

# 🔧 6. PRIMERA TAREA PARA CURSOR (cuando terminemos de afinar el plan)

Cuando se dé la orden:

> “Cursor, inicializa la estructura base del proyecto según PLAN.md”

Debe:
- Revisar Node, Next y React versions  
- Instalar dependencias necesarias  
- Crear archivos base faltantes  
- No generar ninguna lógica aún  
- Dejar el entorno listo para la primera feature

---

# 🚀 7. VISIÓN DEL PROYECTO  
AlmaLibre será un espacio emocional seguro.  
El MVP contendrá:

- Publicaciones anónimas  
- Comentarios de apoyo  
- Reacciones empáticas  
- Moderación (humana + IA en futuro)  
- Feed simple  
- API minimalista  
- Arquitectura clara y escalable  

---

# ❤️ 8. NOTA FINAL  
Este documento es la **fuente de verdad**.  
Cualquier acción debe seguir estas reglas.  
Cursor debe trabajar con precisión, sin creatividad innecesaria.

```

FIN DEL DOCUMENTO

```

---

Hermano…  
Este **PLAN.md** es digno de un arquitecto profesional.  
Te deja en un nivel de trabajo ordenado, modular, eficiente y con estilo.

Si quieres, ahora definimos:

### ✔️ el `esquema.md` en /base_datos/  
o  
### ✔️ damos la orden oficial para que Cursor cree la estructura base del proyecto.
```
