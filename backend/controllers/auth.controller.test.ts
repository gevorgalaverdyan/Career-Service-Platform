const controller = require('./auth.controller');
const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const mockingoose = require('mockingoose');

beforeEach(() => {
  mockingoose.resetAll();
});

describe('Authentication: Register route', () => {
  it('Should create a new user if user information is valid', async () => {
    // Arrange
    const req = {
      body: {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bobbuilder@build.ca',
        company: 'BobTheBuilder',
        password: 'bobisbuilding',
      },
    };
    const res: any = {};
    const next = jest.fn();

    mockingoose(userModel).toReturn(
      {
        ...req.body,
      },
      'find'
    );

    // Act
    await controller.register(req, res, next);

    // Assert
    expect(res.status).toBeCalledWith(201);
  });
});

export {};
