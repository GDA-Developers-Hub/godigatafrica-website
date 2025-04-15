#!/bin/bash

# Upgrade pip, setuptools, and wheel
pip install --upgrade pip setuptools wheel

# Install all dependencies from requirements.txt
pip install -r requirements.txt
