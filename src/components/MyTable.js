/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import calculateSignificance from '../statisticalSignificance'
import log from '../utils/log'
import numberWithCommas from '../utils/numberWithCommas'

import {DataContext} from '../utils/DataContext';

const MyTable = props => {
  // In this case, data could've been passed via props from the <MainComponent>,
  // but in a larger example, it can be helpful to use the Context API to load
  // data in multiple components without prop drilling.

  // DataContext was populated by the <DataProvider> in index.js
  const {value: data} = React.useContext(DataContext);

  const {fields, tables, style} = data;
  // log.debug('table render', data)
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
      // log.dev(allFields[i])
      let cellText = allColumns[i]
      switch (allFields[i].type) {
        case 'PERCENT':
          cellText = `${numberWithCommas(Math.round(cellText * 10000) / 100)}%`  // Percent to 2 decimal places
          break
        case 'NUMBER':
          cellText = numberWithCommas(cellText)
          break
      }
      rowCells.push(<td css={tableStyle} key={i}>
        {cellText}
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
      let cellToolTip
      if (!isNaN(controlVisitors) && !isNaN(controlConversions) && !isNaN(variantVisitors) && !isNaN(variantConversions)) {
        try {
          const statSig = calculateSignificance(calculationData)
          cellText = `${Math.floor(statSig * 100)}%`
        } catch (e) {
          // log.error('Cannot calculate statistical significance.', calculationData, e.message)
          cellToolTip = e.message
        }
      } else {
        // log.error('Invalid values (non numeric)', calculationData)
        cellToolTip = 'Invalid values (non numeric)'
      }
      rowCells.push(<td css={tableStyle} title={cellToolTip} key='stat-sig'>{cellText}</td>)
    }
    return rowCells
  };

  // Process fields (header row) to get indexes for significance calculation
  const jsxHeaderCells = []
  const statSigCellIndexes = {}
  for (const i in allFields) {
    // jsxHeaderCells
    const field = allFields[i]
    jsxHeaderCells.push(<th key={field.id}>{field.name}</th>)
    // statSigIndexes
    switch (field.name) {
      case 'Conversions':
        statSigCellIndexes.variantConversions = i
        break
      case 'Control Conversion':
        statSigCellIndexes.controlConversions = i
        break
      case 'Unique Recipients':
        statSigCellIndexes.variantVisitors = i
        break
      case 'Control Entries':
        statSigCellIndexes.controlVisitors = i
        break
    }
  }
  let toCalculateSignificance = false
  if (statSigCellIndexes.controlVisitors && statSigCellIndexes.controlConversions && statSigCellIndexes.variantVisitors && statSigCellIndexes.variantConversions) {
    toCalculateSignificance = true
  } else {
    log.info('Missing required fields. The table will still work.')
  }
  if (toCalculateSignificance) jsxHeaderCells.push(<th key={'stat-sig'}>Statistical Significance</th>)

  return (
    <table>
      <thead>
        <tr>
          {jsxHeaderCells}
        </tr>
      </thead>
      <tbody>
        {tables.DEFAULT.map((row, i) => (
          <tr key={i}>{getRow(row, toCalculateSignificance ? statSigCellIndexes : undefined)}</tr>
        ))}
      </tbody>
    </table>
  );
};

MyTable.propTypes = {};

export default MyTable;
