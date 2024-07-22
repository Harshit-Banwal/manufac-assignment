import data from '../agroData.json';

interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': number | string;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': number | string;
  'Area Under Cultivation (UOM:Ha(Hectares))': number | string;
}

export const processData = () => {
  const processedData = (data as CropData[]).map((d) => ({
    ...d,
    'Crop Production (UOM:t(Tonnes))':
      d['Crop Production (UOM:t(Tonnes))'] === ''
        ? 0
        : Number(d['Crop Production (UOM:t(Tonnes))']),
    'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))':
      d['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] === ''
        ? 0
        : Number(d['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']),
    'Area Under Cultivation (UOM:Ha(Hectares))':
      d['Area Under Cultivation (UOM:Ha(Hectares))'] === ''
        ? 0
        : Number(d['Area Under Cultivation (UOM:Ha(Hectares))']),
  }));

  return processedData;
};

export const aggregateData = (data: CropData[]) => {
  const yearlyProduction: { [key: string]: { max: CropData; min: CropData } } =
    {};
  const cropStats: {
    [key: string]: { yieldSum: number; areaSum: number; count: number };
  } = {};

  data.forEach((item) => {
    const year = item.Year.split(', ')[1];
    const crop = item['Crop Name'];
    const production = item['Crop Production (UOM:t(Tonnes))'] as number;
    const yieldOfCrop = item[
      'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'
    ] as number;
    const area = item['Area Under Cultivation (UOM:Ha(Hectares))'] as number;

    //------------------------------ Yearly max/min production
    if (!yearlyProduction[year]) {
      yearlyProduction[year] = { max: item, min: item };
    } else {
      if (
        production >
        Number(yearlyProduction[year].max['Crop Production (UOM:t(Tonnes))'])
      ) {
        yearlyProduction[year].max = item;
      }
      if (
        production <
        Number(yearlyProduction[year].min['Crop Production (UOM:t(Tonnes))'])
      ) {
        yearlyProduction[year].min = item;
      }
    }

    //-------------------------------- Crop stats
    if (!cropStats[crop]) {
      cropStats[crop] = { yieldSum: yieldOfCrop, areaSum: area, count: 1 };
    } else {
      cropStats[crop].yieldSum += yieldOfCrop;
      cropStats[crop].areaSum += area;
      cropStats[crop].count += 1;
    }
  });

  const yearlyTable = Object.entries(yearlyProduction).map(
    ([year, { max, min }]) => ({
      year,
      maxProductionCrop: max['Crop Name'],
      minProductionCrop: min['Crop Name'],
    })
  );

  const cropTable = Object.entries(cropStats).map(
    ([crop, { yieldSum, areaSum, count }]) => ({
      crop,
      avgYield: (yieldSum / count).toFixed(3),
      avgArea: (areaSum / count).toFixed(3),
    })
  );

  return { yearlyTable, cropTable };
};
