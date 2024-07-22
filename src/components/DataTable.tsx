import { processData, aggregateData } from '../utils/dataProcess';
import { Table, Text, Paper, Container, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';

const useStyles = createStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    border: `1px solid ${theme.colors.gray[4]}`,
    textAlign: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.gray[0],
  },
  td: {
    border: `1px solid ${theme.colors.gray[4]}`,
    textAlign: 'center',
    padding: theme.spacing.sm,
  },
  title: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
}));

const DataTable = () => {
  const data = processData();
  const { yearlyTable, cropTable } = aggregateData(data);
  const { classes } = useStyles();

  return (
    <Container>
      <Title order={2} className={classes.title}>
        Yearly Crop Production
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>Year</Text>
              </th>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>
                  Crop with Maximum Production
                </Text>
              </th>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>
                  Crop with Minimum Production
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {yearlyTable.map((row) => (
              <tr key={row.year}>
                <td className={classes.td}>
                  <Text>{row.year}</Text>
                </td>
                <td className={classes.td}>
                  <Text>{row.maxProductionCrop}</Text>
                </td>
                <td className={classes.td}>
                  <Text>{row.minProductionCrop}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      <Title order={2} className={classes.title}>
        Crop Statistics (1950-2020)
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>Crop</Text>
              </th>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>Average Yield (Kg/Ha)</Text>
              </th>
              <th className={classes.th}>
                <Text style={{ weight: 500 }}>
                  Average Cultivation Area (Ha)
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {cropTable.map((row) => (
              <tr key={row.crop}>
                <td className={classes.td}>
                  <Text>{row.crop}</Text>
                </td>
                <td className={classes.td}>
                  <Text>{row.avgYield}</Text>
                </td>
                <td className={classes.td}>
                  <Text>{row.avgArea}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default DataTable;
