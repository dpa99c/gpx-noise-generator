gpx-noise-generator [![Latest Stable Version](https://img.shields.io/npm/v/gpx-noise-generator.svg)](https://www.npmjs.com/package/gpx-noise-generator) [![Total Downloads](https://img.shields.io/npm/dt/gpx-noise-generator.svg)](https://npm-stat.com/charts.html?package=gpx-noise-generator)
=====================
A CLI tool to apply random noise to the position data in a GPX file.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Purpose](#purpose)
- [Behaviour](#behaviour)
- [Installation](#installation)
- [Usage](#usage)
  - [Command-line options](#command-line-options)
    - [-h or --help](#-h-or---help)
    - [-v or --version](#-v-or---version)
    - [-i or --input](#-i-or---input)
    - [-o or --output](#-o-or---output)
    - [--probability](#--probability)
    - [--max](#--max)
    - [--min](#--min)
    - [--verbose](#--verbose)
    - [--debug](#--debug)
- [Example usage](#example-usage)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Purpose
This tool enables random noise to be applied to a GPX file in order to simulate varying levels of GPS noise that occur when reading position data from GPS receivers in the real-world.

<!-- DONATE -->
[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG_global.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZRD3W47HQ3EMJ)

I dedicate a considerable amount of my free time to developing and maintaining my Open Source software.
To help ensure this tool is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance. Please consider donating if you're using this tool in an app that makes you money, if you're being paid to make the app, if you're asking for new features or priority bug fixes.
<!-- END DONATE -->

# Behaviour
- The tool takes CLI arguments enabling you to specify an input GPX file on your local filesystem and optionally a different filename to write the resulting output to.
- It iterates over each position point (`wpt`/`rtept`/`trkpt`) and applies random noise to their `lat`/`lon` values based on the configured probability/min/max values.
- If probability dictates that noise should be applied to a point, the random noise factor will be evaluated independently for the `lat` vs `lon` values (i.e. they are unlikely to have the same noise factor).

# Installation

    npm install -g gpx-noise-generator

# Usage

Once `gpx-noise-generator` is installed globally, it can be run from anywhere:

    $ gpx-noise-generator

By default (with no options specified), it will display usage info.

## Command-line options

### -h or --help

    $ gpx-noise-generator -h
    $ gpx-noise-generator --help

Displays usage information.

### -v or --version

    $ gpx-noise-generator -v
    $ gpx-noise-generator --version

Displays currently installed version of this module.


### -i or --input
Filepath of the source GPX file

    $ gpx-noise-generator --input=/path/to/my.source.gpx

### -o or --output
Filepath to write the output GPX file (containing noise).
If not specified, the source GPX file will be overwritten.

    $ gpx-noise-generator --input=/path/to/my.source.gpx --output=/path/to/my.target.gpx
    
### --probability
Probability that noise will be applied to any given point in the GPX file.
Defaults to 100% if not specified.

Since this probability is evaluated for each point in the file, the overall number of points to which noise was applied will only approximate to the input value.

    $ gpx-noise-generator --probability=50
    
### --max
Maximum % noise to apply to a given point if probability dictates noise should be applied.
Defaults to 100% if not specified.

Specifies the maximum % of the existing value by which it can be modified.
e.g. if `lat="50.0"` and  `--max=50`, the resulting noise value will be more than `lat="25.0"` and less than `lat="75.0"`.

    $ gpx-noise-generator --max=50
    
### --min
Minimum % noise to apply to a given point if probability dictates noise should be applied.
Defaults to 0% if not specified.

Specifies the minimum % of the existing value by which it can be modified.
e.g. if `lat="50.0"` and  `--min=50`, the resulting noise value will be less than `lat="25.0"` and more than `lat="75.0"`.

    $ gpx-noise-generator --min=50

### --verbose

Displays detailed log output.

    $ gpx-noise-generator --verbose
    
### --debug

Displays debug log output.

    $ gpx-noise-generator --debug

# Example usage

    $ gpx-noise-generator --input=/path/to/my.source.gpx --output=/path/to/my.target.gpx --probability=50 --min=5 --max=10

License
================

The MIT License

Copyright (c) 2020 Dave Alden / Working Edge Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
