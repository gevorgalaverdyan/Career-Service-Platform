const db = require('../models');
const { getStorage, ref, uploadBytes, deleteObject } = require('firebase/storage');
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

      const path = `files/${student.userId}_CV`;

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

const updateResume = async(req,res) => {
  //console.log('reached method');
  const StudentId = req.params.studentId;
  const resumeToUpdate = new Resume({
    StudentId
  });

  User.findOne({ userId: StudentId}).exec((err, student) => {
    if (err) {
      res.status(500).send( {message: err } );
      return;
    }

    if (!student) {
      return res.status(404).send({ message: 'Student Not Found' });
    }

    resumeToUpdate.student = student._id;
    //console.log('student found with id of ' + student._id);



    
  Resume.findOneAndUpdate({ student: req.param.studentId }, req.file, { new: true })
    .exec((err, updatedResume) => {
      if (err) {
        //console.log('ERROR');
        res.status(500).send({ message: err });
        return;
      }

      const path = `files/${student.userId}_CV`;

      const storageRef = ref(getStorage(), path);

      resumeToUpdate.resume = path;
      //console.log('path created: ready to upload');

      uploadBytes(storageRef, req.file.buffer).then(snapshot => {
        console.log(snapshot);
        res.status(201).json({
          message: 'Resume succesfully updated!',
        });
      });
    });

    // resumeToUpdate.save((err, updatedResume) => {
    //   if (err) {
    //     console.log('ERROR');
    //     res.status(500).send({ message: err });
    //     return;
    //   }

    //   const path = `files/${student.userId}_${req.file.originalname}`;

    //   const storageRef = ref(getStorage(), path);

    //   resumeToUpdate.resume = path;
    //   console.log('path created: ready to upload');

    //   uploadBytes(storageRef, req.file.buffer).then(snapshot => {
    //     console.log(snapshot);
    //     res.status(201).json({
    //       message: 'Resume succesfully updated!',
    //     });
    //   });
    // });
  });
};

const deleteResume = async(req, res) => {
  const StudentId = req.params.studentId;
  const resumeToDelete = new Resume({
    StudentId
  });

  User.findOne({userId: StudentId}).exec((err, student) => {
    if (err) {
      res.status(500).send( {message: err } );
      return;
    }

    if (!student) {
      return res.satus(404).send({ mesage: 'Student not found' });
    }

    resumeToDelete.student = student._id;
    //console.log('studen found wirth id of ' + student._id);

    const path = `files/${student.userId}_CV`;

    const storageRef = ref(getStorage(), path);

    deleteObject(storageRef).then(() => {
        res.status(201).json({
          message: 'Resume succesfully updated!',
        });
    });
  });
};

module.exports = { createResume, updateResume, deleteResume};
export {};