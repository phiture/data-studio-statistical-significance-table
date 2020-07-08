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

  // Styling
  const {
    headerFontColor,
    headerFontSize,
    headerFontFamily,
    headerBackgroundColor,
    headerBorderColor,
    bodyFontColor,
    bodyFontSize,
    bodyFontFamily,
    bodyBackgroundColor,
    bodyBorderColor,
    calculateStatisticalSignificance: calculateSignificanceUserInput,
    calculateStatisticalConfidence: calculateConfidenceUserInput,
  } = style
  const tableHeaderStyle = css`
    color: ${headerFontColor.value.color || headerFontColor.defaultValue.color};
    font-size: ${headerFontSize.value || headerFontSize.defaultValue}px;
    font-family: "${headerFontFamily.value || headerFontFamily.defaultValue}", "${headerFontFamily.defaultValue}", sans-serif;
  `
  // background-color must be set on the same element that has position: sticky
  const tableHeaderCellStyle = css`
    padding: 8px;
    position: sticky;
    top: 0;
    background-color: ${headerBackgroundColor.value.color || headerBackgroundColor.defaultValue.color};
  `
  const tableBodyStyle = css`
    color: ${bodyFontColor.value.color || bodyFontColor.defaultValue.color};
    font-size: ${bodyFontSize.value || bodyFontSize.defaultValue}px;
    font-family: "${bodyFontFamily.value || bodyFontFamily.defaultValue}", "${bodyFontFamily.defaultValue}", sans-serif;
    background-color: ${bodyBackgroundColor.value.color || bodyBackgroundColor.defaultValue.color};
  `
  const tableBodyCellStyle = css`
    padding: 8px;
  `

  const getRow = (tableRow, toCalculateSignificance, toCalculateConfidence, ssi) => {
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
      rowCells.push(<td css={tableBodyCellStyle} key={i}>
        {cellText}
      </td>)
    }
    // Significance cells
    if (toCalculateSignificance || toCalculateConfidence) {
      const controlVisitors = allColumns[ssi.controlVisitors]
      const controlConversions = allColumns[ssi.controlConversions]
      const variantVisitors = allColumns[ssi.variantVisitors]
      const variantConversions = allColumns[ssi.variantConversions]
      const calculationData = {
        control: { visitors: controlVisitors, conversions: controlConversions },
        variant: { visitors: variantVisitors, conversions: variantConversions },
      }
      let statSig = undefined
      let cellToolTip
      if (!isNaN(controlVisitors) && !isNaN(controlConversions) && !isNaN(variantVisitors) && !isNaN(variantConversions)) {
        try {
          statSig = calculateSignificance(calculationData)
          // statSigCellText = `${Math.floor(statSig * 100)}%`
        } catch (e) {
          // log.error('Cannot calculate statistical significance.', calculationData, e.message)
          cellToolTip = e.message
        }
      } else {
        // log.error('Invalid values (non numeric)', calculationData)
        cellToolTip = 'Invalid values (non numeric)'
      }
      if (toCalculateConfidence) rowCells.push(<td css={tableBodyCellStyle} title={cellToolTip} key='stat-con'>
        {statSig !== undefined ? `${Math.floor((1 - statSig) * 100)}%` : 'N/A'}
      </td>)
      if (toCalculateSignificance) rowCells.push(<td css={tableBodyCellStyle} title={cellToolTip} key='stat-sig'>
        {statSig !== undefined ? `${Math.floor(statSig * 100)}%` : 'N/A'}
      </td>)
    }
    return rowCells
  };

  // Process fields (header row) to get indexes for significance calculation
  const jsxHeaderCells = []
  const statSigCellIndexes = {}
  for (const i in allFields) {
    // jsxHeaderCells
    const field = allFields[i]
    jsxHeaderCells.push(<th key={field.id} css={tableHeaderCellStyle}>{field.name}</th>)
    // statSigIndexes
    switch (field.name) {
      case 'Conversions':
      case 'Target Conversions':
      case 'Variant Conversions':
        statSigCellIndexes.variantConversions = i
        break
      case 'Control Conversions':
        statSigCellIndexes.controlConversions = i
        break
      case 'Unique Recipients':
      case 'Sends':
      case 'Sent':
      case 'Target Sends':
      case 'Variant Entries':
        statSigCellIndexes.variantVisitors = i
        break
      case 'Control Entries':
      case 'Control Sends':
        statSigCellIndexes.controlVisitors = i
        break
    }
  }
  let toCalculateSignificance = false
  let toCalculateConfidence = false
  console.log(style)  // TODOD: Delette
  log.debug('sig', calculateSignificanceUserInput)  // TODOD: Delette
  log.debug('conf', calculateConfidenceUserInput)  // TODOD: Delette
  if (statSigCellIndexes.controlVisitors && statSigCellIndexes.controlConversions && statSigCellIndexes.variantVisitors && statSigCellIndexes.variantConversions) {
    log.debug('columns exist', 'foo')  // TODOD: Delette
    if (calculateSignificanceUserInput.value) toCalculateSignificance = true
    if (calculateConfidenceUserInput.value) toCalculateConfidence = true
  } else {
    log.info('Missing required fields. The table will still work.')
  }
  if (toCalculateConfidence) jsxHeaderCells.push(<th key={'stat-con'} css={tableHeaderCellStyle}>Statistical Confidence</th>)
  if (toCalculateSignificance) jsxHeaderCells.push(<th key={'stat-sig'} css={tableHeaderCellStyle}>Statistical Significance</th>)

  return (
    <table>
      <thead css={tableHeaderStyle}>
        <tr>
          {jsxHeaderCells}
        </tr>
      </thead>
      <tbody css={tableBodyStyle}>
        {tables.DEFAULT.map((row, i) => (
          <tr key={i}>{getRow(row, toCalculateSignificance, toCalculateConfidence, statSigCellIndexes)}</tr>
        ))}
      </tbody>
    </table>
  );
};

MyTable.propTypes = {};

export default MyTable;
