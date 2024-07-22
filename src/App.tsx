import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import DataTable from './components/DataTable';

export default function App() {
  return (
    <MantineProvider>
      <DataTable />
    </MantineProvider>
  );
}
