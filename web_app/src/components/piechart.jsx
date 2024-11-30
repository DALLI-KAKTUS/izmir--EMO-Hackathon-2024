import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

const DrawPieChart = ({ newData }) => {
    const COLORS = [
        '#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00', 
        '#ff5722', '#03a9f4', '#4caf50', '#9c27b0', '#e91e63', 
        '#00bcd4', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107'
    ];

    const data = newData.map(item => ({
        name: item.className,
        value: item.count,
    }));

    const total = data.reduce((acc, entry) => acc + entry.value, 0);

    const renderTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { value, name } = payload[0];
            const percentage = ((value / total) * 100).toFixed(2);
            return (
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    padding: '8px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <p style={{ color: '#333' }}>{name}</p>
                    <p style={{ color: '#333' }}>{`${value} (${percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={500}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={200}
                    innerRadius={120} // Creates a donut effect
                    paddingAngle={2} // Adds space between slices
                    cornerRadius={8} // Rounds slice edges for a softer look
                    labelLine={false}
                    label={({ value, name }) => `${name}: ${value}`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={renderTooltip} />
                <Legend
                    align="center"
                    layout="horizontal"
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={12}
                    wrapperStyle={{ marginTop: 20, color: '#333' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default DrawPieChart;
