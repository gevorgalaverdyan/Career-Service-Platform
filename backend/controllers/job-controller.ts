const db = require('../models');
const Job = db.job;
const Application = db.application;

const createJob = async (req, res, next) => {
  const { title, company, description, deadline } = req.body;
  const job = new Job({
    title,
    company,
    description,
    deadline,
  });

  job.save((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(201).json({
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      description: job.description,
      deadline: job.deadline,
    });
  });
};

const getJobById = async (req, res) => {
  Job.findOne({
    jobId: req.params.id,
  }).exec((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!job) {
      return res.status(404).send({ message: 'Job Not Found' });
    }

    res.status(200).json({
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      description: job.description,
      deadline: job.deadline,
    });
  });
};

const getAllJobs = async (req, res) => {
  Job.find({})
    .select('jobId title company description deadline -_id')
    .exec((err, jobs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!jobs) {
        return res.status(404).send({ message: 'jobs' });
      }

      res.status(200).json(jobs);
    });
};

const editJob = async (req, res) => {
  const { title, description, company, deadline } = req.body;

  Job.findOneAndUpdate(
    { jobId: req.params.id },
    {
      title,
      description,
      company,
      deadline,
    },
    { new: true }
  ).exec((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!job) {
      return res.status(404).send({ message: 'Job Not Found' });
    }

    res.status(200).send(job);
  });
};

const deleteJob = async (req, res) => {
  Job.findOne({ jobId: req.params.id }).exec(async (err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!job) {
      res.status(500).send({ message: 'Job does not exist!' });
      return;
    }

    Application.deleteMany({ job: job._id }, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });

    Job.deleteOne({ _id: job._id }, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send();
    });
  });
};

module.exports = { getJobById, getAllJobs, createJob, editJob, deleteJob };
export {};
