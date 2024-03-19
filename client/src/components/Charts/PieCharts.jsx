
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieCharts = ({ pieData }) => {
    if (!pieData || !pieData.length) {
        return <div>No hay datos disponibles para mostrar el gráfico.</div>;
      }
    
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Colores para las secciones del gráfico

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        labelLine={false}
        label={true}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {
          pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieCharts;
