import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'

export interface SelectableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	isSelected: boolean
}
const RawSelectableArea = styled.div``
export const SelectableArea = styled(RawSelectableArea as any as React.ComponentType<SelectableAreaProps>) `
	border-radius: 3px;
	border: 1px solid ${({ isSelected }) => isSelected ? '#2196F3' : 'transparent'};
	background: ${({ isSelected }) => isSelected ? '#E3F2FD' : 'transparent'};
`
