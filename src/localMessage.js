/**
 * This file provides the mock "data" received
 * by your visualization code when you develop
 * locally.
 *
 */
export const message = {
  tables: {
    DEFAULT: [
      {
        dimID: ['Campaign 1'],
        metricID: [16.356, 329.02, 5.43, 34.266389487, 634, 4533],
      },
      {
        dimID: ['Campaign 2'],
        metricID: [31, 1002, 4, 5, 345, 4],
      },
      {
        dimID: ['Campaign 3'],
        metricID: [
          51,
          77,
          0,  // V conversions
          0,  // C conversions
          234,  // V total
          0,  // C total
        ],
      },
      {
        dimID: ['Campaign 4'],
        metricID: [41, 1522, 16, 342, 346, 66],
      },
    ],
  },
  fields: {
    dimID: [
      {
        id: 'qt_nzqx6a0xvb',
        name: 'Campaign',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
    ],
    metricID: [
      {
        id: 'qt_8isx6a0xvb',
        name: 'Clicks',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6a0xvc',
        name: 'Impressions',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6asdf0xvc',
        name: 'Conversions',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6asdf0xvd',
        name: 'Control Conversions',
        type: 'PERCENT',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6asdf0xve',
        name: 'Unique Recipients',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6asdf0xvf',
        name: 'Control Entries',
        type: 'NUMBER',
        concept: 'METRIC',
      },
    ],
  },
  style: {
    headerFontColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#000000",
        "opacity": 1
      }
    },
    headerFontSize: {
      "defaultValue": 14
    },
    headerFontFamily: {
      "defaultValue": "Roboto"
    },
    headerBackgroundColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#28ef8f",
        "opacity": 1
      }
    },
    headerBorderColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#ffffff",
        "opacity": 0
      }
    },
    bodyFontColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#000000",
        "opacity": 1
      }
    },
    bodyFontSize: {
      "defaultValue": 12
    },
    bodyFontFamily: {
      "defaultValue": "Roboto"
    },
    bodyBackgroundColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#ffffff",
        "opacity": 0
      }
    },
    bodyBorderColor: {
      value: { color: undefined, opacity: undefined },
      "defaultValue": {
        "color": "#ffffff",
        "opacity": 0
      }
    },
    variantConversionsColumnNames: {
      value: 'Unique Recipients, Sends, Target Sends, Variant Entries',
    },
    controlConversionsColumnNames: {
      value: 'Conversions, Target Conversions Variant Conversions',
    },
    variantVisitorsColumnNames: {
      value: 'Control Entries, Control Sends',
    },
    controlVisitorsColumnNames: {
      value: 'Control Conversions',
    },
    calculateStatisticalSignificance: {
      value: true
    },
    calculateStatisticalConfidence: {
      value: true
    },
    statisticalConfidenceColumnName: {
      value: 'Statistical Confidence'
    },
    statisticalSignificanceColumnName: {
      value: 'Statistical Significance'
    },
  },
}
