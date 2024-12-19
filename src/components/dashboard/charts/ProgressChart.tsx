import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Resultado {
  trl: number;
  brl: number;
  crl: number;
  fecha: string;
}

interface ProgressChartProps {
  data: Resultado[];
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="trl"
          stroke="#16A34A"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="brl"
          stroke="#CA8A04"
        />
        <Line
          type="monotone"
          dataKey="crl"
          stroke="#DC2626"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
