# Data Studio Statistical Significance Table

[gs://data-studio-statistical-significance-table/dev](https://storage.cloud.google.com/data-studio-statistical-significance-table/dev/manifest.json)

[github.com/phiture/data-studio-statistical-significance-table](https://github.com/phiture/data-studio-statistical-significance-table)

![Table Overview](/doc/screenshots/table-overview.png?raw=true)

## Contents
- [Usage](#usage)
  - [What you will need](#what-you-will-need)
  - [Adding the table to your report](#adding-the-table-to-you-report)
  - [Troubleshooting](#troubleshooting)
    - [There is no **Statistical Significance** column](#there-is-no-statistical-significance-column)
    - [The table displayes **N/A**](#the-table-displays-NA)
- [Development](#development)
  - [Setup](#setup)
  - [Scripts](#scripts)

## Usage
### What you will need
- Working knowledge of [Google Data Studio](https://datastudio.google.com/)
- A report in Google Data Studio

### Adding the table to your report
1. [Add the table to your report by ID](https://support.google.com/datastudio/answer/9206527?hl=en#add-by-id),
using `gs://data-studio-statistical-significance-table/dev` as the **Manifest path**.
3. [Enable Community Visualizations in your data source](https://support.google.com/datastudio/answer/9206527?hl=en)
4. Make sure you have a dimension or metric for each of the following (Note: Column naming must be exact):
- **Unique Recipients**   - The number of non control group recipients
- **Conversions**         - The number of non control group conversions
- **Control Entries**     - The number of control group recipients
- **Control Conversion**  - The number of control group conversions

The table will then automatically display an additional **Statistical Significance** column.

### Troubleshooting
#### There is no **Statistical Significance** column
This is because you are missing required columns.
See step 4 in [Adding the table to your report](#adding-the-table-to-you-report)

#### The table displays **N/A**
The data in this row is not valid data for calculating statistical significance.
If you open your browser's JavaScript console you will see the error output
which contains the exact reason for this.

## Development
- [NodeJS](https://nodejs.org/en/)

This repository is forked from 
[anvilinsights/data-studio-react-starter](https://github.com/anvilinsights/data-studio-react-starter).
The original README is still in this repository in
[/doc/STARTER_README.md](/doc/STARTER_README.md).
The statistical significance formulas in
[statisticalSignificance.ts](/src/statisticalSignificance.ts)
were modified from
[www.math.ucla.edu/~tom/distributions/normal.html](https://www.math.ucla.edu/~tom/distributions/normal.html).

### Setup
- Get access to a [storage bucket](https://cloud.google.com/storage/docs/creating-buckets)
in Google Cloud
- Clone the
[repository](https://github.com/phiture/data-studio-statistical-significance-table.git)
and install dependencies with `git clone` and `npm i`
- Edit `dsccViz.gcsDevBucket` and `dsccViz.gcsProdBucket` in
[package.json](/package.json)
to point to the folders you would like to deploy to.

### Scripts
#### `npm start`
Start the visualization locally

#### `npm run deploy:dev`
Deploy the visualization to your development folder.
Changes will be reflected instantly.

#### `npm run deploy:prod`
Deploy the visualization to your production folder.
If you do this, `devMode` in
[manifest.json](/src/manifest.json)
is set to `true` and Data Studio will cache your visualization for
12 hours. Read
[Google's documentation](https://developers.google.com/datastudio/visualization/caching)
for more information.
