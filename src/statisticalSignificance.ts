import log from './utils/log'

const normDist = (x: number) => {
    const t = 1 / (1 + .2316419 * Math.abs(x))
	const d = .3989423 * Math.exp(-x * x / 2)
	let prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
	if (x > 0) prob = 1-prob
	return prob
}

type SegmentProps = {
    visitors?: number
    conversions?: number
    conversionRate?: number
}

type CompleteSegment = {
    visitors: number
    conversions: number
    conversionRate: number
}

const checkConversionRate = (segment: CompleteSegment) => {
    if (segment.conversions / segment.visitors !== segment.conversionRate) throw new Error('Conversion Rate Mismatch')
    return segment
}

const completeSegment = (partialSegment: SegmentProps): CompleteSegment => {
    let { visitors, conversions, conversionRate } = partialSegment
    // log.dev(visitors, conversions, conversionRate)
    if (visitors !== undefined && conversions !== undefined && conversionRate !== undefined) return checkConversionRate(partialSegment as CompleteSegment)
    if (visitors !== undefined && conversions !== undefined) conversionRate = conversions / visitors
    else if (conversions !== undefined && conversionRate !== undefined) visitors = conversionRate / conversions
    else if (conversionRate !== undefined && visitors !== undefined) conversions = visitors * conversionRate
    else throw new Error('Not Enough Properties Provided')
    const segment: CompleteSegment = { visitors, conversions, conversionRate }
    return segment
}

const standardError = (segment: CompleteSegment) => Math.sqrt(segment.conversionRate * (1 - segment.conversionRate) / segment.visitors)

type Params = {
    control: SegmentProps
    variant: SegmentProps
}

const statisticalSignificance = (params: Params) => {
    // log.dev(params)
    const control = completeSegment(params.control)
    const variant = completeSegment(params.variant)
    if (control.conversions > control.visitors || variant.conversions > variant.visitors) throw new Error('Conversions Is Greater Than Visitors')
    const zScore = (control.conversionRate - variant.conversionRate) / Math.sqrt(Math.pow(standardError(control), 2) + Math.pow(standardError(variant), 2))
    return normDist(zScore)
}

export default statisticalSignificance
export {
    Params,
    SegmentProps,
    normDist,
}
