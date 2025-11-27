🧭 PLAN DE REFINAMIENTO COMPLETO PARA CURSOR (VERSIÓN PROFESIONAL Y EJECUTABLE)

Este documento se entrega directamente a Cursor como instrucciones de trabajo.
Usa un archivo separado llamado PLAN_REFINAMIENTO_ALMALIBRE.md para que Cursor ejecute punto por punto.

🟦 SECCIÓN 1 — OBJETIVO GENERAL

Refinar el proyecto AlmaLibre para:

mejorar coherencia visual

profesionalizar el tono

reducir longitud visual

agregar secciones críticas (legal, ética, motivacional)

agregar citas científicas reales

alinear íconos, colores e imágenes

optimizar UX

agregar una sección “Mi Historia” genérica

mejorar credibilidad

preparar el proyecto para producción

🟩 SECCIÓN 2 — CAMBIOS GLOBALES EN TODAS LAS PÁGINAS
✔ 1. Reemplazar TODOS los íconos por una sola librería profesional

Usar Lucide Icons o Phosphor Regular (outline).

Tamaño: 32–40px

Fondo circular suave:

Azul pastel #EAF4FF

Morado pastel #F4E8FF

Rosa pastel #FFEAF4

Cursor debe:

buscar todos los <img> y <svg> de iconos actuales

reemplazarlos por <LucideIcon /> o la librería elegida

✔ 2. Aplicar una paleta de colores oficial
Colores principales
--primary: #1E90FF;     // Azul calma
--primary-soft: #EAF4FF;
--accent: #CAB3FF;      // Morado empatía
--background: #FFFFFF;
--surface: #F7F8FA;
--text-main: #0E1117;

Colores emocionales secundarios
--green-soft: #68CC9A;   // contención
--yellow-soft: #FFEEAA;  // luz interior
--pink-soft: #FFE0F0;    // empatía


Cursor debe:

crear archivo styles/palette.css

reemplazar todos los colores hardcodeados por variables

✔ 3. Cambiar TODAS las fotos actuales por imágenes más emocionales

Reemplazar:

fotos de coworking

gente riendo con laptops

Usar imágenes estilo:

manos entrelazadas

conversaciones íntimas

paisajes suaves

luz cálida

conexión humana real

Cursor:

revisar todas las secciones <img>

reemplazar rutas por nuevas imágenes ubicadas en /public/images/emocionales/

✔ 4. Reducir el texto y dividir secciones demasiado largas

Regla:

máximo 3 líneas por párrafo

máximo 2 párrafos por sección

Cursor debe:

acortar textos según versiones nuevas (incluidas más abajo)

reducir repetición (“si ayudamos a una persona…”)

mantener tono emocional pero más conciso

🟧 SECCIÓN 3 — SECCIONES NUEVAS A IMPLEMENTAR
🔥 1. Sección “Mi Historia” (GENÉRICA por ahora)

Crear nueva sección después de “Por qué existe AlmaLibre”.

Título:

La historia detrás de AlmaLibre

Texto:

AlmaLibre nació de un proceso personal de reflexión, crecimiento y búsqueda de un espacio seguro donde poder hablar sin miedo, sin juicios y sin etiquetas. Como muchos, viví momentos en los que me faltó un lugar humano, cálido y anónimo donde expresar lo que sentía.

De esa necesidad, surgió la idea de crear un refugio digital accesible para todos. Un espacio construido sobre respeto, empatía y humanidad.

Este proyecto no nace del interés por cifras ni por reconocimiento, sino del deseo sincero de que nadie pase por un momento difícil en completo silencio. Si AlmaLibre logra acompañar a una sola persona, entonces habrá cumplido su propósito.

Cursor:

crear componente AboutMyStory.jsx

agregarlo en /about después de la sección de misión/origen

🔥 2. Sección “Código Ético”

Crear nueva página:

/codigo-etico

Contenido:

Código Ético de AlmaLibre
AlmaLibre es un espacio seguro. Todas las interacciones deben proteger la dignidad, privacidad y bienestar de las personas.

1. Sin juicios.
Nadie será criticado por lo que siente.

2. Sin violencia verbal o emocional.
No se permiten insultos, burlas, ataques ni descalificaciones.

3. Escucha activa.
Fomentamos la atención genuina, empatía y comprensión.

4. Respeto absoluto.
Todos los usuarios, sin excepción, merecen un trato amable.

5. Confidencialidad.
Lo que se comparte en el espacio, queda en el espacio.

6. Prohibido compartir datos personales sensibles.
(RUT, dirección, fotos privadas, etc.)

7. Información solo con fines de apoyo emocional.
AlmaLibre no reemplaza ayuda psicológica profesional.

🔥 3. Sección Legal

Nueva página: /legal

Contenido:

Aviso Legal y Seguridad de la Información

AlmaLibre ofrece acompañamiento emocional, no terapia psicológica ni servicios clínicos.

Nadie del equipo se hace responsable por decisiones tomadas a partir de conversaciones.

Los datos personales se manejan bajo:

Ley 19.628 de Protección de Datos Personales (Chile)

Estándares internacionales de seguridad digital

No se comparten datos con terceros.

Los usuarios pueden solicitar eliminación de su cuenta y datos.

Se prohíbe publicar contenido ilegal:

violencia

acoso

explotación

difusión de datos privados

Se realiza moderación activa.

Cursor:

crear LegalPage.jsx

agregar link en footer

🔥 4. Página Motivacional Nueva (tipo crecimiento personal)

Ruta: /motivacion

Título:

Fortalece tu interior

Secciones:

Reconocer tus emociones

Texto basado en psicología real.

Aceptar errores como parte del crecimiento

Inspirado en Brian Tracy.

Repetición Espaciada para pensamientos positivos

Basado en neurociencia del aprendizaje.

Mini ejercicios

respiración

gratitud

afirmaciones

autoevaluación emocional

Cursor:

crear MotivationPage.jsx

🟪 SECCIÓN 4 — REESCRITURA DE TEXTO (VERSIÓN PROFESIONAL Y CORTA)

👇 Cursor debe reemplazar estos bloques:

Hero Principal (Home)

Un espacio seguro para expresar lo que sientes, sin juicios y sin presiones. Aquí tu voz importa, tu historia importa y tú importas.

Misión

Crear un refugio digital para cualquier persona que necesite ser escuchada o que desee ofrecer apoyo. Un lugar basado en respeto, empatía y humanidad real.

Por qué existe AlmaLibre

Vivimos en una sociedad en la que pedir ayuda puede dar miedo. AlmaLibre nace como un refugio digital donde nadie está solo. Queremos que las emociones tengan un lugar seguro donde ser expresadas, comprendidas y acompañadas.

Ciencia (con referencias reales)

La escucha activa reduce estrés y aumenta conexión emocional (Weger et al., 2014).

Expresar emociones mejora el bienestar psicológico (Pennebaker, 1997).

La conexión humana activa áreas cerebrales vinculadas a seguridad y calma (Hein & Singer, 2008).

🟫 SECCIÓN 5 — OPTIMIZACIÓN DE UX

Cursor debe:

acortar márgenes verticales en TODAS las secciones (reducir altura total del scroll)

alternar layout: izquierda → derecha → centro → derecha → izquierda

agrandar botones CTA

aumentar tamaño de texto a 16–18px

agregar scroll suave

agregar microanimaciones suaves (opacidad + translateY)

🟥 SECCIÓN 6 — ORDEN DE IMPLEMENTACIÓN PARA CURSOR

Cursor debe seguir este orden EXACTO:

Crear archivo PLAN_REFINAMIENTO_ALMALIBRE.md

Implementar paleta central

Reemplazar iconografía

Reemplazar imágenes

Acortar textos

Implementar nueva sección “Mi Historia”

Implementar página “Código Ético”

Implementar página “Legal”

Implementar página “Motivación”

Reorganizar sección de valores (quedan 6)

Insertar sección “Fundamentos científicos” con referencias reales

Ajustar UX general

Revisar redundancias

Limpiar código

Confirmar estilos globales

🟨 SECCIÓN 7 — NOTA FINAL PARA CURSOR

Después de terminar, eliminar este archivo de instrucciones para mantener la limpieza del proyecto.