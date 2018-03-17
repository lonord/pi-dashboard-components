import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'

const RawProgressBar = styled.div`
	height: 8px;
	border-radius: 4px;
`
export interface ProgressBarProps {
	progressColor?: string
	progressBackground?: string
	progress: number
}
function formatProgress(n: number) {
	if (n < 0) {
		n = 0
	}
	if (n > 100) {
		n = 100
	}
	n = Math.floor(n)
	return n
}
function combineLinearGradient(props: ProgressBarProps) {
	const color = props.progressColor || '#4FC3F7'
	const bg = props.progressBackground || '#E0E0E0'
	const p = props.progress || 0
	return `linear-gradient(90deg, ${color} ${p}%, ${bg} ${p}%)`
}
export const ProgressBar = styled(RawProgressBar as any as React.ComponentType<ProgressBarProps>) `
	background: ${combineLinearGradient};
`
