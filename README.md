# Toteat - Desafío Técnico 
## By Trinidad Vargas

Aplicación web: https://toteat-front-lczyyc6jm-trinidadvargas.vercel.app/

Backend: https://github.com/TrinidadVargas/toteat-backend

Frontend: https://github.com/TrinidadVargas/toteat-front

### **Problema a resolver**

- En base al contexto provisto, propongo desarrollar una aplicación para generar información para facilitar la toma de decisiones para gestión del negocio.
- Métricas propuestas: total de ventas por mes y día de la semana. El backend genera datos filtrados por mesero, cajero, zona de la mesa y horario, pero en esta etapa no se visualizan los filtros.

### Resultado
Hay dos vistas principales una de gráfico de barra y la otra de una tabla resúmen. Ambas vistas muestran las siguientes métricas: Venta promedio, máxima, minima, total y cantidad de ventas.

1. Gráfico de Barra

La vista de gráfico de barra permite ver los resultados agrupando los datos por distintos periodos como mes, día y día de la semana, entendiendo que a un restorán le permite analizar sus resultados para enfocar ofertas y turnos de sus trabajadores.
Además se puede filtrar los resultados por mesero, cajero, zona de las mesas y hora del día, siendo almuerzo antes de las 5pm y cena despues de las 5pm.

2. Tabla resúmen

Esta vista muestra dos tablas resúmen. Una de los resultados de los trabajadores, ya sean meseros o cajeros. Esta tabla agrega el indicador ```dinners per day``` que son las personas atendidas promedio por día y ```minutes per ticket```que indica el tiempo promedio de ticket en minutos.
La segunda tabla es de métricas por zona y mesas. Se muestra cada zona con sus resultados y luego las mesas pertenecientes a esa zona. Esta tabla agrega el indicador ```minutes per day``` de minutos que la mesa fue usada cada día.

### Resolución del problema y Diseño técnico

#### Análisis de datas
Primero se analizó los datos entregados por Toteat para elegir las métricas que generan información útil. Estas son los totales de venta por día, mes, día de la semana y con distintos filtros como se mencionó. Y las métricas de venta de los productos que se dejó para una segunda etapa.

#### Backend
- Se usó un templete de Flask hecho por Microsoft que viene con un setup simple para una Api y con las configuraciones para testing y deploy en distintas plataformas.
- Para la capa de datos se decidió utilizar el json provisto (se validó con los entrevistadores), ya que la aplicación propuesta se requiere acceso de solo lectura y leer los datos directamente desde el file system es una solución simple y temporal que permitirá entender mejor el negocio, para luego buscar una alternativa más adecuada.  Las alternativas son usar una base de datos no-sql que mantiene la estructura, pero no trae mayores beneficios o usar una base de datos SQL que requiere normalizar los datos y cambiar la estructura.
- Se creó el endpoint ```estadísticas``` en la ruta ```routes``` y las funciones que permiten analizar los datos en ```use_cases```.
- Se crearon test de las funciones de análisis de datos
- Se hizo deploy de la aplicación en Heroku. 


#### Frontend
- Para el frontend se usó NextJs, un framework sobre NodeJs y React que incluye configuraciones simples y permite deployar en menos de 1 minuto en Vercel.
- Se crearon los requests de los datos con Axios.
- En ```routes``` se encuentra la vista principal de las estadísticas, donde se pueden elegir que se muestren los datos por día, mes o día de la semana.
- En ```components/Chart.js``` se creó el componente que entrega el gráfico de barras y recibe los datos procesados por las funciones definidas en ```utils/charts``` ya que el paquete ChartJs requiere los datos en una estructura definida.
- Se deployó la aplicación en Vercel.
- Algunos paquetes usados son Axios para los requests, ChartJs para los gráficos y Mantine para el estilo.

### Mejora Continua
Las principales mejoras que haría a futuro (sin limite de tiempo) son:
- Generar los datos en el backend y la visualización en el frontend de las estadísticas de ventas de los diferentes productos.
- Generar tests para los endpoints de la Api en el backend.
- Definir una base de datos para poder agregar datos de nuevas ventas. Ya sea por un post de una venta o a través de un archivo.

**Nota:** la opción gratis de Heroku baja los servidores que no se están usando, por lo que el primer request al backend puede fallar y no se verán las estadísticas. Recargar la página si esto sucede.

Vista de un gráfico


## Para el desarrollo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<!-- git push -u origin main -->
<!-- https://appdividend.com/2022/03/12/react-axios/ -->


#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

