import { Group, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';

function Donut({data, label}) {
  return (
      <div>
        <Text fw={"bold"} mb="sm" ta="center">
          {label}
        </Text>
        <DonutChart data={data} mx="auto" />
      </div>
  );
}

export default Donut