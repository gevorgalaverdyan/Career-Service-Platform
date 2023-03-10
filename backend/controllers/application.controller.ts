const db = require('../models');
const moment = require('moment');
const Application = db.application;
const User = db.user;
const Job = db.job;

const createApplication = async (req, res, next) => {
  const { jobId, userId, resumeUrl, coverLetterUrl, transcriptUrl } = req.body;

  const application = new Application({
    resumeUrl,
    coverLetterUrl,
    transcriptUrl,
  });

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
        application.createdOn = moment().format('yyyy-mm-dd:hh:mm:ss');
        application.status = 'Submitted';

        application.save((err, application) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.status(201).json({
            jobId: associatedJob.jobId,
            userId: associatedCandidate.userId,
            status: application.status,
            createdOn: application.createdOn,
            resumeUrl,
            coverLetterUrl,
            transcriptUrl,
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
    .populate('candidate', 'job')
    .exec((err, application) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!application) {
        return res.status(404).send({ message: 'Application Not Found' });
      }

      res.status(200).json({
        jobId: application.job.jobId,
        userId: application.candidate.userId,
        status: application.status,
        createdOn: application.createdOn,
        resumeUrl: application.resumeUrl,
        coverLetterUrl: application.coverLetterUrl,
        transcriptUrl: application.transcriptUrl,
      });
    });
};

const getAllApplications = async (req, res) => {
  Application.find({})
    .populate('candidate', 'job')
    .exec((err, applications) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!applications) {
        return res.status(404).send({ message: 'Applications not found.' });
      }

      const applicationsFormatted = applications.map(application => {
        return {
          jobId: application.job.jobId,
          userId: application.candidate.userId,
          status: application.status,
          createdOn: application.createdOn,
          resumeUrl: application.resumeUrl,
          coverLetterUrl: application.coverLetterUrl,
          transcriptUrl: application.transcriptUrl,
        };
      });

      res.status(200).json(applicationsFormatted);
    });
};

module.exports = { createApplication, getApplicationById, getAllApplications };
