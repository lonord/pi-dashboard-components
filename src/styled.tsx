import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
	borderColor?: string
	borderWidth?: number
}
const RawTitle = styled.div`
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	color: #333;
	margin-bottom: 5px;
`
export const Title = styled(RawTitle as any as React.ComponentType<TitleProps>) `
	padding-left: 6px;
	border-left: ${({ borderWidth }) => (borderWidth || 4) + 'px'} solid ${({ borderColor }) => borderColor || '#333'};
`

export const SubTitle = styled.div`
	font-size: 14px;
	color: #999;
	margin-bottom: 6px;
`
