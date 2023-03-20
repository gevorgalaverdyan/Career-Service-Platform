const db = require('../models');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const Resume = db.resume;
const User = db.user;

const createResume = async (req, res, next) => {
  const studentId = req.params.studentId;
  const resumeToCreate = new Resume({
    studentId,
  });

  User.findOne({ userId: studentId }).exec((err, student) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!student) {
      return res.status(404).send({ message: 'Student Not Found' });
    }

    resumeToCreate.student = student._id;

    resumeToCreate.save((err, createdResume) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const path = `files/${student.userId}_${req.file.originalname}`;

      const storageRef = ref(getStorage(), path);

      resumeToCreate.resume = path;

      uploadBytes(storageRef, req.file.buffer).then(snapshot => {
        console.log(snapshot);
        res.status(201).json({
          message: 'Resume succesfully uploaded!',
        });
      });
    });
  });
};

module.exports = { createResume };
export {};