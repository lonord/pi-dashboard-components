import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'
import { SubTitle } from './components/common'
import { ProgressBar, ProgressBarProps } from './components/progress-bar'
import { SelectableArea, SelectableAreaProps } from './components/selectable-area'
import { Title, TitleProps } from './components/title'
import { ParamsMapper, RPCCompProps, withCustomRPCBaseUrl, withHTTPClient, withSSEClient } from './hoc'
import { FullSizeWrap } from './layout/common'

export {
	FullSizeWrap,
	SelectableArea,
	SelectableAreaProps,

	SubTitle,
	Title,
	TitleProps,

	ParamsMapper,
	RPCCompProps,
	withCustomRPCBaseUrl,
	withSSEClient,
	withHTTPClient,

	ProgressBar,
	ProgressBarProps
}
