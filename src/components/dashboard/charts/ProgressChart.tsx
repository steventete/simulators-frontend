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
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="brl"
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="crl"
          stroke="#ff7300"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
