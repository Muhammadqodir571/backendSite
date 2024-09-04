const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class FileServers {
  async save(file) {
    try {
      const fileName = uuidv4() + '.jpg'; // UUID yaratish uchun uuidv4() chaqiriladi 
      const currentDir = __dirname;
      const fileStatic = path.join(currentDir, '..', 'static');
      const pathFile = path.join(fileStatic, fileName);

      if (!fs.existsSync(fileStatic)) {
        fs.mkdirSync(fileStatic, { recursive: true });
      }
      await file.mv(pathFile)
      return fileName;
    } catch (error) {
      throw new Error(`Faylni saqlashda xatolik yuz berdi: ${error}`);
    }
  }
}

module.exports = new FileServers();