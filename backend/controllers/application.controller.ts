const db = require('../models');
const moment = require('moment');
const Application = db.application;
const User = db.user;
const Job = db.job;

const createApplication = async (req, res, next) => {
  const { jobId, userId } = req.body;

  const application = new Application({});

  application.save((err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Job.find({ jobId: jobId }, (err, job) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!job) {
        return res.status(404).send({
          message: 'Could not find the user associated with the application',
        });
      }
      const associatedJob = job[0];

      application.job = associatedJob._id;

      User.find({ userId: userId }, (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({
            message: 'Could not find the user associated with the application',
          });
        }
        const associatedCandidate = user[0];

        application.candidate = associatedCandidate._id;
        application.createdOn = moment().format('yyyy-mm-DD:hh:mm:ss');
        application.status = 'PENDING';

        application.save((err, application) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.status(201).json({
            applicationId: application.applicationId,
            jobId: associatedJob.jobId,
            userId: associatedCandidate.userId,
            status: application.status,
            createdOn: application.createdOn,
          });
        });
      });
    });
  });
};

const getApplicationById = async (req, res) => {
  Application.findOne({
    applicationId: req.params.id,
  })
    .populate('candidate')
    .populate('job')
    .exec((err, application) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!application) {
        return res.status(404).send({ message: 'Application Not Found' });
      }

      res.status(200).json({
        applicationId: application.applicationId,
        jobId: application.job._doc.jobId,
        userId: application.candidate._doc.userId,
        status: application.status,
        createdOn: application.createdOn,
      });
    });
};

const getApplicationsByUserId = async (req, res) => {
  User.findOne({ userId: req.params.id }).exec((err, user) => {
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    Application.find({ candidate: user._id })
      .populate('candidate')
      .populate('job')
      .exec((err, applications) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(applications);
        if (!applications) {
          return res.status(404).send({ message: 'Applications not found.' });
        }

        const applicationsFormatted = applications.map(application => {
          return {
            applicationId: application.applicationId,
            jobId: application.job._doc.jobId,
            userId: application.candidate._doc.userId,
            status: application.status,
            createdOn: application.createdOn,
          };
        });

        res.status(200).json(applicationsFormatted);
      });
  });
};

const getApplicationsByJobId= async (req, res) => {
  Job.findOne({ jobId: req.params.id }).exec((err, job) => {
    if (!job) {
      return res.status(404).send({ message: 'Job not found.' });
    }

    Application.find({ job: job._id })
      .populate('candidate')
      .populate('job')
      .exec((err, applications) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(applications);
        if (!applications) {
          return res.status(404).send({ message: 'Applications not found.' });
        }

        const applicationsFormatted = applications.map(application => {
          return {
            applicationId: application.applicationId,
            jobId: application.job._doc.jobId,
            userId: application.candidate._doc.userId,
            status: application.status,
            createdOn: application.createdOn,
          };
        });

        res.status(200).json(applicationsFormatted);
      });
  });
};

const updateApplication = async (req, res) => {
  const {status} = req.body;
  
  Application.findOneAndUpdate({
    applicationId: req.params.applicationId
  }, {status}, { new: true }).exec((err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!application) {
      return res.status(404).send({ message: 'Application Not Found' });
    }

    res.status(200).send(application);
  })
}

module.exports = {
  createApplication,
  getApplicationById,
  getApplicationsByJobId,
  getApplicationsByUserId,
  updateApplication
};

export {};