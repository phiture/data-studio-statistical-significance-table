/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import calculateSignificance from '../statisticalSignificance'
import log from '../utils/log'
import { getIndexes } from '../statSigTableHelper'

import {DataContext} from '../utils/DataContext';

const MyTable = props => {
  // In this case, data could've been passed via props from the <MainComponent>,
  // but in a larger example, it can be helpful to use the Context API to load
  // data in multiple components without prop drilling.

  // DataContext was populated by the <DataProvider> in index.js
  const {value: data} = React.useContext(DataContext);

  const {fields, tables, style} = data;
  // log.dev(data)
  const allFields = fields.dimID.concat(fields.metricID);

  // Use default value as an initial backup
  const cellBackgroundColor =
    style.cellBackgroundColor.value || style.cellBackgroundColor.defaultValue;

  const tableStyle = css`
    padding: 10px;
    background: ${cellBackgroundColor.color};
  `;

  const getRow = (tableRow, ssi) => {
    const allColumns = tableRow.dimID.concat(tableRow.metricID);
    const rowCells = []
    // Data cells
    for (const i in allColumns) {
      rowCells.push(<td css={tableStyle} key={i}>
        {allColumns[i]}
      </td>)
    }
    // Significance cells
    if (ssi) {
      const controlVisitors = allColumns[ssi.controlVisitors]
      const controlConversions = allColumns[ssi.controlConversions]
      const variantVisitors = allColumns[ssi.variantVisitors]
      const variantConversions = allColumns[ssi.variantConversions]
      const calculationData = {
        control: { visitors: controlVisitors, conversions: controlConversions },
        variant: { visitors: variantVisitors, conversions: variantConversions },
      }
      let cellText = 'N/A'
      if (!isNaN(controlVisitors) && !isNaN(controlConversions) && !isNaN(variantVisitors) && !isNaN(variantConversions)) {
        try {
          const statSig = calculateSignificance(calculationData)
          cellText = `${Math.floor(statSig * 100)}%`
        } catch (e) {
          log.error('Cannot calculate statistical significance.', calculationData, e.message)
        }
      } else {
        log.error('Invalid values (non numeric)', calculationData)
      }
      rowCells.push(<td css={tableStyle}>{cellText}</td>)
    }
    return rowCells
  };

  // Process fields (header row) to get indexes for significance calculation
  const jsxHeaderCells = allFields.map(field => <th key={field.id}>{field.name}</th>)
  const statSigCellIndexes = getIndexes(allFields)
  if (statSigCellIndexes) jsxHeaderCells.push(<th key={'stat-sig'}>Statistical Significance</th>)
  else log.info('Missing required fields. The table will still work.', allFields)

  return (
    <table>
      <thead>
        <tr>
          {jsxHeaderCells}
        </tr>
      </thead>
      <tbody>
        {tables.DEFAULT.map((row, i) => (
          <tr key={i}>{getRow(row, statSigCellIndexes)}</tr>
        ))}
      </tbody>
    </table>
  );
};

MyTable.propTypes = {};

export default MyTable;
