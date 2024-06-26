import * as responses from "../../../../helpers/response.js";
import Penilaian from "../../../../models/penilaian.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getNilai = async (req, res) => {
  try {
      const dataNilai = await Penilaian.findAll();

      const data = dataNilai.map((nilai) => {
          return {
            ...nilai.dataValues,
            id: hashids.encode(nilai.id)
          };
        });

      responses.res200("Berhasil mengambil data mata pelajaran", data, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}

export const createNilai = async(req, res) => {
  try {
    const {id_murid, id_mata_pelajaran, tugas, uts, uas, semester} = req.body;
    const validIdMurid = checkValidId(id_murid);
    if(!validIdMurid) return responses.res400("ID murid tidak valid", res);
    
    const validIdMaPel = checkValidId(id_mata_pelajaran);
    if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

    await Penilaian.create({
      id_murid: validIdMurid,
      id_mata_pelajaran: validIdMaPel,
      tugas,
      uts,
      uas,
      semester
    })
    responses.res200("Data nilai berhasil dibuat", null, res);
  } catch (err) {
    console.log(err.message);
    responses.res500(res);
  }
}

export const updateNilai = async(req, res) => {
  try {
    const {id} = req.params;
    const {tugas, uts, uas} = req.body;
    const validId = checkValidId(id);
    if(!validId) return responses.res400("ID nilai tidak valid", res);


    const respons = await Penilaian.update({
      tugas,
      uts,
      uas
    },{
      where: {
        id: validId
      }
    })

    if(!respons[0]) return responses.res400("Maaf, nilai tidak ditemukan", res);
    responses.res200("Data nilai berhasil diperbarui", null, res);
  } catch (err) {
    console.log(err.message);
    responses.res500(res);
  }
}

export const delNilai = async (req, res) => {
  try {
      const {id} = req.params;
      const validId = checkValidId(id);
      if(!validId) return responses.res400("ID nilai tidak valid", res);
      
      const respons = await Penilaian.destroy({
          where: {id: validId}
      });
      
      if(!respons) return responses.res400("Maaf, nilai tidak ditemukan", res);
      responses.res200("Data nilai berhasil hapus", null, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}