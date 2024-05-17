import * as responses from "../../../../helpers/response.js";
import Spp from "../../../../models/spp.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataSpp = await Spp.findAll();

        const data = dataSpp.map((spp) => {
            return {
              ...spp.dataValues,
              id: hashids.encode(spp.id)
            };
          });

        responses.res200("Berhasil mengambil data SPP", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID SPP tidak valid", res);
        const dataSpp = await Spp.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataSpp.dataValues,
            id: hashids.encode(dataSpp.id),
        };
        
        responses.res200("Berhasil mengambil data SPP", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { tingkat, tagihan, periode } = req.body;
        const tagihanInt = parseFloat(tagihan);
        const bulan = periode.split("-")[1];
        const tahun = periode.split("-")[0];
        
        const dataSpp = await Spp.findOne({
            where: {tingkat, tagihan:tagihanInt, bulan, tahun}
        });
        if(dataSpp) return responses.res400(`Maaf, tagihan dengan data tersebut sudah ada dengan ID ${hashids.encode(dataSpp.id)}`, res);

        await Spp.create({tingkat, tagihan: tagihanInt, bulan, tahun});
        responses.res201("SPP baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID SPP tidak valid", res);

        const { tingkat, tagihan, periode } = req.body;
        const tagihanInt = parseFloat(tagihan);
        const bulan = periode.split("-")[1];
        const tahun = periode.split("-")[0];
        
        const dataSpp = await Spp.findOne({
            where: {tingkat, tagihan:tagihanInt, bulan, tahun}
        });
        if(dataSpp) return responses.res400(`Maaf, tagihan dengan data tersebut sudah ada dengan ID ${hashids.encode(dataSpp.id)}`, res);

        const respons = await Spp.update({
            tingkat, tagihan: tagihanInt, bulan, tahun
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, data SPP tidak ditemukan", res);
        responses.res200("Data SPP berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID SPP tidak valid", res);
        
        const respons = await Spp.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, SPP tidak ditemukan", res);
        responses.res200("Data SPP berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}