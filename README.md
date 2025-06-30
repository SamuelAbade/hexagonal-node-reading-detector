
# Reading Detector -  Hexagonal con Node.js
Esta aplicación de línea de comandos lee un fichero de lecturas de clientes .csv o .xml, calcula la mediana anual de cada cliente y detecta las lecturas que se desvían más de un 50% de dicha mediana. Muestra en pantalla una tabla con las lecturas sospechosas.

## Requisitos

- Node, de preferencia en su última versión
- Npm o yarn (Utilizado en mi caso npm)

## Instalación

En una terminal:
1. Clona o descarga el repositorio con el comando `git clone`
2. Instala dependencias con ` npm install ` o `yarn install`

## Uso

Desde la raíz del proyecto ejecuta:

```
node src/application/main.js <ruta_al_archivo>
```

### Ejemplos

-   Con CSV:
    
    ```
    node src/application/main.js data/2016-readings.csv
    ```
    
-   Con XML:
    
    ```
    node src/application/main.js data/2016-readings.xml
    ```
    

Verás una tabla alineada con las columnas:

| Client ID        | Period   | Value     | Median    |
|------------------|----------|-----------|-----------|
| 583ef6329df6b    | 2016-07  | 37970     | 36827     |
| ...              | ...      | ...       | ...       |
