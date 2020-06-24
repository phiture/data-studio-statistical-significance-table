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
        metricID: [16, 329, 1, 34, 634, 4533],
      },
      {
        dimID: ['Campaign 2'],
        metricID: [31, 1002, 4, 5, 345, 4],
      },
      {
        dimID: ['Campaign 3'],
        metricID: [51, 77, 3, 0, 11, 0],
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
        name: 'Control Conversion',
        type: 'NUMBER',
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
    cellBackgroundColor: {
      value: {
        color: '#d1d1d1',
        opacity: 1,
      },
      defaultValue: {
        color: '#d9d9d9',
      },
    },
  },
}
