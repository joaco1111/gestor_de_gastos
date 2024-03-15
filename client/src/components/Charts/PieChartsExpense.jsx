
import { PieChart, Pie, Tooltip, Legend, Cell} from 'recharts';

const PieChartsExpense = () => {
  const listaGastos = [
    { categoria: 'Comida', cantidad: 100 },
    { categoria: 'Transporte', cantidad: 150 },
    { categoria: 'Entretenimiento', cantidad: 50 },
    { categoria: 'Comida', cantidad: 200 },
    { categoria: 'Transporte', cantidad: 50 },
    { categoria: 'Alimentacion', cantidad: 100 },
    { categoria: 'Salud', cantidad: 100 },
    
  ];

  
  const calcularTotalesPorCategoria = (gastos) => {
    const totalesPorCategoria = {};

    //recorro la lista de gastos
    gastos.forEach((gasto) => {
        //extraigo la categoria y totales
      const { categoria, cantidad } = gasto;
      //si existe la categoria, se agrega a esa categoria
      if (totalesPorCategoria[categoria]) {
        totalesPorCategoria[categoria] += cantidad;
      } else {
        //sino existe se le agrega a la categoria con la cantidad actual
        totalesPorCategoria[categoria] = cantidad;
      }
    });

    //Lo convierto en key-value, cada par representa una categoría y su total de gastos
    
    return Object.entries(totalesPorCategoria).map(([categoria, total]) => ({
      name: categoria,
      total,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }));
  };

  // Calcular los totales por categoría
  const datosGastos = calcularTotalesPorCategoria(listaGastos);

  return (
    <div>
      {/* <h2>Lista de Gastos</h2>
      <ul>
        {listaGastos.map((gasto, index) => (
          <li key={index}>{` ${gasto.categoria}: $ ${gasto.cantidad}`}</li>
        ))}
      </ul> */}
      <h2>Tipos de gastos</h2>
      <PieChart width={400} height={400}>
        <Pie 
          dataKey="total" 
          isAnimationActive={false} 
          data={datosGastos} 
          cx={200} 
          cy={200} 
          outerRadius={80} 
          innerRadius={40}
          label fill="#8884d8"  
          >
        {datosGastos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartsExpense;