#!/bin/bash

echo "NPM installation for package.json in Backend"
npm i --force
echo "Backend install Completed"

echo "NPM installation for package.json in Frontend"
cd ./frontend && npm i --force
echo "Frontend install Completed"

cd ../
