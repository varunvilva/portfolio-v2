import dea from '../assets/DEA.png';
import jio from '../assets/jio.webp';
import kafka from '../assets/kafka2.png';
import kickdrum from '../assets/kickdrum2.png';
import publication from '../assets/image.png';
import ship from '../assets/ship3.jpg';

export const images: Record<string, string> = {
  dea,
  jio,
  kafka,
  kickdrum,
  publication,
  ship,
};

export const resolveImage = (key: string): string => {
  const url = images[key];
  if (!url) throw new Error(`Unknown image key: "${key}". Add it to src/data/assets.ts.`);
  return url;
};
