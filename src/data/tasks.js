export const tasks = [
  {
    id: 1,
    name: "CONSTRUCCION DE GALPON INDUSTRIAL",
    start: "2024-02-26",
    end: "2024-03-07",
    children: [
      {
        id: 2,
        name: "PRELIMINARES",
        start: "2024-02-26",
        end: "2024-03-06",
        children: [
          { id: 3, name: "Caseta Guardián Bodega", start: "2024-02-26", end: "2024-02-27" },
          { id: 4, name: "Batería sanitaria Obreros", start: "2024-03-06", end: "2024-03-06" },
          { id: 5, name: "Cerramiento provisional", start: "2024-02-26", end: "2024-02-28" },
          { id: 6, name: "Cerramiento h=2.40m con tabla", start: "2024-02-28", end: "2024-02-29" },
          { id: 7, name: "Letrero de obra", start: "2024-02-28", end: "2024-02-29" }
        ]
      },
      {
        id: 8,
        name: "ESTRUCTURAS EN HORMIGON ARMADO",
        start: "2024-02-29",
        end: "2024-03-07",
        children: [
          { id: 9, name: "Cisterna de H.A.", start: "2024-02-29", end: "2024-02-29" },
          { id: 10, name: "Muro de piedra base", start: "2024-03-01", end: "2024-03-02" },
          { id: 11, name: "Replantillo", start: "2024-03-01", end: "2024-03-03" },
          { id: 12, name: "Plintos", start: "2024-03-02", end: "2024-03-05" },
          { id: 13, name: "Riostras", start: "2024-03-04", end: "2024-03-06" },
          { id: 14, name: "Columnas Planta Alta", start: "2024-03-06", end: "2024-03-07" }
        ]
      }
    ]
  }
];