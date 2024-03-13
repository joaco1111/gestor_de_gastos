import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartsIncome = () => {
  const listaIngresos = [
    { categoria: 'Salario', cantidad: 2000 },
    { categoria: 'Venta de Productos', cantidad: 500 },
    { categoria: 'Intereses', cantidad: 100 },
    { categoria: 'Bonificación', cantidad: 300 },
  ];

  const calcularTotalesPorCategoria = (ingresos) => {
    const totalesPorCategoria = {};

    ingresos.forEach((ingreso) => {
      const { categoria, cantidad } = ingreso;
      if (totalesPorCategoria[categoria]) {
        totalesPorCategoria[categoria] += cantidad;
      } else {
        totalesPorCategoria[categoria] = cantidad;
      }
    });

    return Object.entries(totalesPorCategoria).map(([categoria, total]) => ({
      name: categoria,
      total,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
  };

  const datosIngresos = calcularTotalesPorCategoria(listaIngresos);

  return (
    <div>
      <h2>Tipos de ingresos</h2>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="total"
          isAnimationActive={false}
          data={datosIngresos}
          cx={200}
          cy={200}
          outerRadius={80}
          innerRadius={40}
          label
          fill="#8884d8"
        >
          {datosIngresos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartsIncome;
