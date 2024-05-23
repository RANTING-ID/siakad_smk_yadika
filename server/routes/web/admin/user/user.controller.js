import Guru from "../../../../models/guru.model.js";
import Murid from "../../../../models/murid.model.js";
import Users from "../../../../models/users.model.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import Kelas from "../../../../models/kelas.model.js";
import Jadwal_Pelajaran from "../../../../models/jadwal_pelajaran.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

// user
export const getUserPage = async (req, res) => {
  try {
      const dataUsers = await Users.findAll({attributes: {
          exclude: ["password"]
      }});

      const users = dataUsers.map((user) => {
          return {
            ...user.dataValues,
            id: hashids.encode(user.id)
          };
        });

        res.render('pages/admin/user/index.ejs', { users });
  } catch (err) {
      console.log(err.message);
      res.render("pages/errors/500");
  }
};

export const addUserPage = (req, res) => {
  res.render('pages/admin/user/add.ejs');
};

export const editUserPage = (req, res) => {
  res.render('pages/admin/user/edit.ejs');
};

// student
export const getStudentPage = async (req, res) => {
  try {
      const dataMurid = await Murid.findAll();

      const murids = dataMurid.map((murid) => {
          return {
            ...murid.dataValues,
            id: hashids.encode(murid.id),
            id_jurusan: hashids.encode(murid.id_jurusan),
            id_kelas: hashids.encode(murid.id_kelas),
          };
        });

        res.render('pages/admin/user/students.ejs', {murids});
  } catch (err) {
      console.log(err.message);
      res.render("pages/errors/500");
  }
};

export const detailStudentPage = (req, res) => {
  res.render('pages/admin/user/student-detail.ejs');
};

export const createStudentPage = (req, res) => {
  res.render('pages/admin/user/student-create.ejs');
};

export const editStudentPage = (req, res) => {
  res.render('pages/admin/user/student-edit.ejs');
};

// teacher
export const getTeacherPage = async(req, res) => {
  try {
    const dataGuru = await Guru.findAll();

    const guru = dataGuru.map((guru) => {
        return {
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        };
      });

    res.render('pages/admin/user/teachers.ejs', {guru});
} catch (err) {
    console.log(err.message);
    res.render("pages/errors/500");
}

};

export const addTeacherPage = async (req, res) => {
  res.render('pages/admin/user/teacher-add.ejs');
};

export const detailTeacherPage = async (req, res) => {
  try {
    const {id} = req.params;
    const validId = checkValidId(id);
    if(!validId) return res.render("pages/errors/400", { message: "ID guru tidak valid" });
    const dataGuru = await Guru.findOne({
        where: { id: validId },
    });

    // const jadwal = await Jadwal_Pelajaran.findAll({
    //   where: { id_mata_pelajaran: dataGuru.id_mata_pelajaran },
    //   include: [
    //     { model: Mata_Pelajaran},
    //     { model: Kelas,
    //       include:  [{
    //         model: Guru
    //       }]
    //     },
    //   ]
    // })

    const guru = {
        ...dataGuru.dataValues,
        id: hashids.encode(dataGuru.id),
    };
    
    res.render('pages/admin/user/teacher-detail.ejs', { guru });
  } catch (err) {
    console.log(err.message);
    res.render("pages/errors/500");

  }
};

export const editTeacherPage = (req, res) => {
  res.render('pages/admin/user/teacher-edit.ejs');
};
