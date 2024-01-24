//мидлвара для загрузки файлов
//multer - принимают формат ДАТА
import multer from "multer";
import path from "path";

import { HttpError } from "../Helpers/index.js";

const destination = path.resolve("tmp");

//1 из 3 настроек мидлвары указывает где сохранияем файл
// и с каким именем
const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

//Настройка веса файла
const limits = {
  fileSize: 1024 * 1024 * 5,
};

//настройка фильтра - запрет .ехе
const fileFilter = (req, file, callback) => {
  const extention = req.originalname.split(".").pop();
  if (extention === "exe") {
    callback(HttpError(400, ".exe not valid extention"));
  }
};

//
export const upload = multer({
  storage,
  limits,
  // fileFilter
});
