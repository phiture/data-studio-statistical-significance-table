import log from './utils/log'
import { Params as StatSigParams } from './statisticalSignificance'

const getIndexes = (fields: Field[]) => {
    // log.dev('fields', fields)
    const statSigColumnIndexes = <StatisticalSignificanceColumnIndexes>{}
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        switch (field.name) {
            case 'Conversions':
                statSigColumnIndexes.variantConversions = i
                break
            case 'Control Conversion':
                statSigColumnIndexes.controlConversions = i
                break
            case 'Unique Recipients':
                statSigColumnIndexes.variantVisitors = i
                break
            case 'Control Entries':
                statSigColumnIndexes.controlVisitors = i
                break
        }
        // log.dev('indexes', statSigColumnIndexes)
        // The type StatisticalSignificanceColumnIndexes actually doesn't allow undefined
        // but we are type casting an empty object above, so we need to check here.
        if (
            statSigColumnIndexes.variantConversions !== undefined
            && statSigColumnIndexes.controlConversions !== undefined
            && statSigColumnIndexes.variantVisitors !== undefined
            && statSigColumnIndexes.controlVisitors !== undefined
        ) return statSigColumnIndexes
    }
}

const getStatisticalSignificanceFromRow = (cells: TableCellValue[], indexes: StatisticalSignificanceColumnIndexes) => {
    const controlVisitors = Number(cells[indexes.controlVisitors])
    const controlConversions = Number(cells[indexes.controlConversions])
    const variantVisitors = Number(cells[indexes.variantVisitors])
    const variantConversions = Number(cells[indexes.variantConversions])
    let cellText = 'N/A'
    if (!isNaN(controlVisitors) && !isNaN(controlConversions) && !isNaN(variantVisitors) && !isNaN(variantConversions)) {
        const calculationData: StatSigParams = {
            control: { visitors: controlVisitors, conversions: controlConversions },
            variant: { visitors: variantVisitors, conversions: variantConversions },
        }
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
}
        
//       if (!isNaN(controlVisitors) && !isNaN(controlConversions) && !isNaN(variantVisitors) && !isNaN(variantConversions)) {
// }

type Field = {
    id: string,
    name: string,
    type: FieldType,
    concept: FieldConcept,
}

enum FieldType {
    'TEXT' = 'TEXT',
    'NUMBER' = 'NUMBER',
}

enum FieldConcept {
    'DIMENSION' = 'DIMENSION',
    'METRIC' = 'METRIC',
}

type StatisticalSignificanceColumnIndexes = {
    variantConversions: number,
    controlConversions: number,
    variantVisitors: number,
    controlVisitors: number,
}

type TableCellValue = (string | number)[]

export {
    getIndexes,
    getStatisticalSignificanceFromRow,
    Field,
    FieldType,
    FieldConcept,
}
