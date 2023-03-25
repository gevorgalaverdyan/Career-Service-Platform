const db = require('../models');
const {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} = require('firebase/storage');
const Resume = db.resume;
const User = db.user;

const uploadResume = async (req, res, next) => {
  const studentId = req.params.studentId;

  User.findOne({ userId: studentId }).exec((err, student) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!student) {
      return res.status(404).send({ message: 'Student Not Found' });
    }

    Resume.findOne({ student: student._id }).exec((err, resume) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const path = `files/${student.userId}_CV`;
      const storageRef = ref(getStorage(), path);

      if (!resume) {
        const resumeToCreate = new Resume({
          student: student._id,
          resume: path,
        });

        resumeToCreate.save((err, createdResume) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
            res.status(201).json({
              message: 'Resume succesfully uploaded!',
            });
          });
        });
      } else {
        deleteObject(storageRef).then(() => {
          uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
            console.log('updated');
            res.status(204).json({
              message: 'Resume succesfully updated!',
            });
          });
        });
      }
    });
  });
};
const deleteResume = async (req, res) => {
  const StudentId = req.params.studentId;
  const resumeToDelete = new Resume({
    StudentId,
  });

  User.findOne({ userId: StudentId }).exec((err, student) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!student) {
      return res.satus(404).send({ mesage: 'Student not found' });
    }

    resumeToDelete.student = student._id;

    const path = `files/${student.userId}_CV`;

    const storageRef = ref(getStorage(), path);

    deleteObject(storageRef).then(() => {
      res.status(201).json({
        message: 'Resume succesfully updated!',
      });
    });
  });
};

const getResume = async (req, res) => {
  const StudentId = req.params.studentId;

  User.findOne({ userId: StudentId }).exec((err, student) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!student) {
      return res.satus(404).send({ mesage: 'Student not found' });
    }

    Resume.findOne({ student: student._id }).exec((err, resumeUrl) => {
      if (!resumeUrl) {
        res.status(404).send({ message: 'Resume not found!' });
        return;
      }

      res.status(200).json({
        resume: resumeUrl.resume,
      });
    });
  });
};

module.exports = { uploadResume, getResume, deleteResume };
export {};
