import {
	IconButton
} from '@lonord/react-electron-components'
// tslint:disable-next-line:no-submodule-imports
import { IconButtonProps } from '@lonord/react-electron-components/lib/button/icon'
import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'

export interface IndicatorButtonProps {
	showColor: string
}
const RawIndicatorButton = styled(IconButton as any as React.ComponentType<IndicatorButtonProps & IconButtonProps>) `
	color: ${({ showColor }) => showColor};
	background: transparent;
`
export const IndicatorButton: React.SFC<IndicatorButtonProps & React.HTMLAttributes<HTMLButtonElement>> = (props) => (
	<RawIndicatorButton {...props} icon="circle" />
)
