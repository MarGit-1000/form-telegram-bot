
import daftarData from './daftar.json';
import fs from 'fs';

export const getDaftarData = () => {
  return daftarData.terdaftar;
};

export const updateDaftarData = async (newData) => {
  const currentData = getDaftarData();
  const updatedData = {
    terdaftar: [...currentData, newData]
  };
  
  try {
    await fs.promises.writeFile(
      './src/daftar.json', 
      JSON.stringify(updatedData, null, 2)
    );
    return true;
  } catch (error) {
    console.error('Error writing to file:', error);
    return false;
  }
};
