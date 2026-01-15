# 🔥 Calorie Tracker - Context & Reducer

Una aplicación web de rastreo de calorías construida con **React**, **TypeScript** y **Vite**, que utiliza **Context API** y **useReducer** para la gestión del estado.

## 📋 Descripción

**Calorie Tracker** es una herramienta intuitiva que te permite registrar actividades relacionadas con calorías (comidas consumidas y ejercicio realizado) y visualizar tu balance calórico en tiempo real. La aplicación almacena automáticamente tus datos en el navegador utilizando **localStorage**.

### Características principales

- ✅ Agregar actividades (alimentos consumidos o ejercicio realizado)
- ✅ Visualizar consumo de calorías vs. calorías quemadas
- ✅ Calcular balance neto de calorías
- ✅ Listar todas las actividades registradas
- ✅ Eliminar actividades individuales
- ✅ Reiniciar la aplicación
- ✅ Persistencia de datos en localStorage
- ✅ Interfaz responsiva con Tailwind CSS

---

## 🛠️ Tecnologías utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Empaquetador y servidor de desarrollo
- **Context API** - Gestión del estado global
- **useReducer** - Patrón para acciones complejas de estado
- **Tailwind CSS** - Estilos utilitarios
- **Heroicons** - Iconos de React
- **UUID** - Generador de IDs únicos

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ActivityList.tsx      # Lista de actividades registradas
│   ├── CalorieDisplay.tsx    # Visualización de calorías consumidas/quemadas
│   ├── CalorieTracker.tsx    # Panel principal del rastreador
│   └── Form.tsx              # Formulario para agregar actividades
├── context/
│   └── ActivityContext.tsx   # Contexto y proveedor del estado
├── hooks/
│   └── useActivity.ts        # Hook personalizado para acceder al contexto
├── reducers/
│   └── activityReducer.ts    # Lógica del reducer
├── data/
│   └── categories.ts         # Categorías de actividades
├── types/
│   └── index.ts              # Definiciones de tipos TypeScript
├── App.tsx                   # Componente raíz
├── main.tsx                  # Punto de entrada
└── index.css                 # Estilos globales
```

---

## 🚀 Instalación y uso

### Prerequisitos

- Node.js >= 14
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tchock42/contador-calorias-reducer.git
cd contador-calorias-reducer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Previsualiza la compilación de producción
- `npm run lint` - Ejecuta el linter para revisar el código

---

## 💡 Cómo usar la aplicación

1. **Agregar una actividad:**
   - Ingresa el nombre de la actividad (p. ej., "Desayuno", "Correr")
   - Selecciona la categoría: "Comida" (consume calorías) o "Ejercicio" (quema calorías)
   - Ingresa la cantidad de calorías
   - Haz clic en "Guardar Actividad"

2. **Ver tu progreso:**
   - El panel superior muestra tus calorías consumidas y quemadas
   - El balance neto se actualiza automáticamente
   - Todas tus actividades aparecen en la lista inferior

3. **Eliminar una actividad:**
   - Haz clic en el botón eliminar (icono de basura) junto a cualquier actividad

4. **Reiniciar la app:**
   - Haz clic en "Reiniciar App" en la esquina superior derecha para borrar todos los datos

---

## 📊 Tipos de datos

### Activity
```typescript
type Activity = {
    id: string              // ID único generado con UUID
    category: number        // 1 = Comida, 2 = Ejercicio
    name: string           // Nombre de la actividad
    calories: number       // Cantidad de calorías
}
```

### Category
```typescript
type Category = {
    id: number             // 1 o 2
    name: string          // "Comida" o "Ejercicio"
}
```

---

## 🔄 Gestión del estado

La aplicación utiliza **Context API** con **useReducer** para manejar el estado de manera eficiente.

### Acciones disponibles (ActivityActions)

- `save-activity` - Agregar una nueva actividad
- `remove-activity` - Eliminar una actividad
- `restart-app` - Reiniciar la aplicación (borrar todas las actividades)

### Estado del contexto (ActivityState)

```typescript
{
    activities: Activity[]  // Array de actividades
}
```

### Valores proporcionados por el contexto

- `state` - Estado actual
- `dispatch` - Función para despachar acciones
- `caloriesConsumed` - Total de calorías consumidas
- `caloriesBurned` - Total de calorías quemadas
- `netCalories` - Balance neto (consumidas - quemadas)
- `categoryName()` - Función para obtener el nombre de una categoría
- `isEmptyActivities` - Booleano que indica si no hay actividades

---

## 💾 Persistencia de datos

La aplicación guarda automáticamente las actividades en `localStorage` bajo la clave `'activitiesCT'`. Los datos se cargan al iniciar la aplicación y se actualizan cada vez que se agrega o elimina una actividad.

---

## 🎨 Estilos

La interfaz utiliza **Tailwind CSS** para un diseño moderno y responsivo:

- **Header**: Verde lima (`bg-lime-600`) - Control y título
- **Formulario**: Verde lima claro (`bg-lime-500`) - Zona de entrada
- **Rastreador**: Gris oscuro (`bg-gray-800`) - Visualización de datos
- **Lista**: Fondo blanco - Listado de actividades

---

## 📝 Ejemplo de uso del hook personalizado

```typescript
import { useActivity } from './hooks/useActivity'

function MyComponent() {
    const { state, dispatch, caloriesConsumed, caloriesBurned, netCalories } = useActivity()
    
    // Despachar una acción
    const handleAddActivity = () => {
        dispatch({
            type: 'save-activity',
            payload: {
                activity: {
                    id: '1',
                    category: 1,
                    name: 'Desayuno',
                    calories: 500
                }
            }
        })
    }
    
    return (
        <div>
            <p>Consumidas: {caloriesConsumed}</p>
            <p>Quemadas: {caloriesBurned}</p>
            <p>Balance: {netCalories}</p>
        </div>
    )
}
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, abre un issue primero para discutir qué te gustaría cambiar.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

