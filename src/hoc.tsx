import createRPCClient, { RPCClient, SSEClient } from '@lonord/pi-status-rpc-client'
import * as React from 'react'

export interface RPCCompProps {
	rpcBaseUrl: string
}

export function withCustomRPCBaseUrl<P extends RPCCompProps>(Comp: React.ComponentType<P>, customRPCBaseUrl: string) {
	class CustomRPCBaseUrlComp extends React.Component<P, any> {
		render() {
			return (
				<Comp {...this.props} rpcBaseUrl={customRPCBaseUrl}/>
			)
		}
	}
	return CustomRPCBaseUrlComp as React.ComponentType<P>
}

export type ParamsMapper<P> = (props: P) => { [x: string]: any }

export function withSSEClient<P extends RPCCompProps, K extends keyof P>(Comp: React.ComponentType<P>,
	servicePath: string, paramsMapper: ParamsMapper<P>, dataPropName: K) {
	interface SSEClientCompState {
		sseData: any
	}
	function paramsEquals(p1: { [x: string]: any }, p2: { [x: string]: any }) {
		if (!p1 || !p2) {
			return false
		}
		for (const pk1 in p1) {
			if (p1[pk1] !== p2[pk1]) {
				return false
			}
		}
		for (const pk2 in p2) {
			if (p1[pk2] !== p2[pk2]) {
				return false
			}
		}
		return true
	}
	class SSEClientComp extends React.Component<P, SSEClientCompState> {

		rpcService: RPCClient = null
		sseClient: SSEClient = null

		state: SSEClientCompState = {
			sseData: null
		}

		onSSEData = (data) => {
			this.setState({
				sseData: data
			})
		}

		initSSE = () => {
			const params = paramsMapper(this.props)
			if (params) {
				this.sseClient = this.rpcService.openSSE(servicePath, this.onSSEData, params)
			}
		}

		stopSSE = () => {
			if (this.sseClient && !this.sseClient.isClosed()) {
				this.sseClient.close()
				this.sseClient = null
			}
			this.setState({
				sseData: null
			})
		}

		componentDidUpdate(prevProps: P) {
			const prevParams = paramsMapper(prevProps)
			const thisParams = paramsMapper(this.props)
			if (prevProps.rpcBaseUrl !== this.props.rpcBaseUrl) {
				this.stopSSE()
				if (this.props.rpcBaseUrl) {
					this.rpcService = createRPCClient(this.props.rpcBaseUrl)
					this.initSSE()
				}
			} else if (!paramsEquals(prevParams, thisParams)) {
				this.stopSSE()
				this.initSSE()
			}
		}

		componentDidMount() {
			const { rpcBaseUrl } = this.props
			if (rpcBaseUrl) {
				this.rpcService = createRPCClient(rpcBaseUrl)
				this.initSSE()
			}
		}

		componentWillUnmount() {
			this.stopSSE()
			this.rpcService = null
		}

		render() {
			const sseDataObj = {
				[dataPropName]: this.state.sseData
			}
			return (
				<Comp {...this.props} {...sseDataObj} />
			)
		}
	}
	return SSEClientComp as React.ComponentType<P>
}

export function withHTTPClient<P extends RPCCompProps, K extends keyof P>(Comp: React.ComponentType<P>,
	servicePath: string, paramsMapper: ParamsMapper<P>, interval: number, dataPropName: K, errorPropName?: K) {
	interface HTTPClientCompState {
		httpData: any
		error: any
	}
	class HTTPClientComp extends React.Component<P, HTTPClientCompState> {

		rpcService: RPCClient = null
		timer: any = null

		state: HTTPClientCompState = {
			httpData: null,
			error: null
		}

		onTick = () => {
			if (this.rpcService) {
				this.rpcService.httpGet(servicePath, paramsMapper(this.props)).then((result) => {
					this.setState({
						httpData: result,
						error: null
					})
				}).catch((e) => {
					this.setState({
						httpData: null,
						error: e
					})
				})
			}
		}

		componentDidUpdate(prevProps: P) {
			if (prevProps.rpcBaseUrl !== this.props.rpcBaseUrl) {
				this.timer && clearInterval(this.timer)
				this.timer = null
				if (this.props.rpcBaseUrl) {
					this.rpcService = createRPCClient(this.props.rpcBaseUrl)
					this.onTick()
					this.timer = setInterval(this.onTick, interval)
				}
			}
		}

		componentDidMount() {
			const { rpcBaseUrl } = this.props
			if (rpcBaseUrl) {
				this.rpcService = createRPCClient(rpcBaseUrl)
				this.onTick()
				this.timer = setInterval(this.onTick, interval)
			}
		}

		componentWillUnmount() {
			this.timer && clearInterval(this.timer)
			this.timer = null
			this.rpcService = null
		}

		render() {
			const httpDataObj = {
				[dataPropName]: this.state.httpData
			}
			if (errorPropName) {
				httpDataObj[errorPropName] = this.state.error
			}
			return (
				<Comp {...this.props} {...httpDataObj} />
			)
		}
	}
	return HTTPClientComp as React.ComponentType<P>
}
