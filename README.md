# Desafío Fullstack Ricardo Meza

## Solución del Desafío

### ¿Qué archivos/componentes creaste y qué hacen?

1.  **`frontend/src/app/home.module.css`** y **`frontend/src/app/[brandId]/page.module.css`**:
    *   **Propósito:** Centralizar y modularizar los estilos CSS para las páginas principales.
    *   **Función:** Reemplazan estilos en línea y clases de utilidad largas por clases semánticas, mejorando la legibilidad y mantenibilidad del código.

2.  **`frontend/src/components/ErrorMessage.tsx`** y **`frontend/src/components/ErrorMessage.module.css`**:
    *   **Propósito:** Crear un componente reutilizable para mostrar alertas de error.
    *   **Función:** Encapsula la lógica visual y los estilos de los mensajes de error, permitiendo su uso consistente tanto en el home como en las páginas de detalle de marca.

3.  **`frontend/src/app/loading.tsx`**:
    *   **Propósito:** Mejorar la experiencia de carga (UX).
    *   **Función:** Cuando la app esté cargando, se muestra un mensaje de carga con el logo corporativo.

4.  **`frontend/src/app/[brandId]/page.tsx`**:
    *   **Propósito:** Implementar la lógica de negocio y visualización de la página de detalle de marca.
    *   **Función:** Transforma la configuración técnica recibida del backend (métodos de envío, pago, etc.) en una sección de **Preguntas Frecuentes (FAQ)** interactiva. Incluye lógica para renderizado condicional de preguntas (como la de cupones) y respuestas dinámicas basadas en la data de la marca.

5.  **`frontend/src/app/home.tsx`**:
    *   **Propósito:** Mejorar la presentación de la lista de marcas.
    *   **Función:** Se muestran las marcas disponibles para seleccionar.

### ¿Qué te gustó y qué mejorarías?

**Me gustó:**
*   La arquitectura basada en **Next.js App Router**, que facilita el manejo de rutas dinámicas y layouts.
*   El uso de **CSS Modules**, que permite tener estilos locales sin conflictos y mantiene el código JSX limpio.
*   La flexibilidad para crear componentes reutilizables como el `Loading` y el sistema de acordeón para las FAQs.

**Mejoraría:**
*   **Componentes:** Implementaría componentes reutilizables para las tarjeta de marca y las FAQs, en la carpeta "components".
*   **Manejo de Errores:** Implementaría un `error.tsx` global de Next.js para capturar errores no controlados.

### ¿Qué harías distinto para escalar mejor?

1.  **Sistema de Diseño:** Si la aplicación creciera, implementaría un sistema de diseño más robusto, con componentes reutilizables, como las tarjetas de marcas y las FAQs.
2.  **Testing:** Agregaría pruebas unitarias (con Jest/React Testing Library) para los componentes críticos como la lógica de generación de respuestas de las FAQs, y pruebas E2E para asegurar el flujo de navegación.
3.  **Capa de Servicios:** Abstraería las llamadas a la API en una capa de servicios dedicada en el frontend. Esto permitiría manejar mejor la lógica de caché, reintentos y transformación de datos antes de que lleguen a los componentes.
4.  **[Extra] Internacionalización:** Prepararía la estructura para soportar múltiples idiomas desde el principio si se prevé expansión a otros mercados.
