import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    div:first-child {
        border-radius: 8px 0 0 8px;
    }
    div:last-child {
        border-radius: 0 8px 8px 0;
    }
`

type RateProps = {
    selected: boolean
}

const Rate = styled.div<RateProps>`
    flex: 1;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #355764;
    ${props => {
		return props.selected && 'background-color: rgba(53, 87, 100, 0.2); font-weight: bold;'
	}}
`

type RatingsProps = {
    setRate: (rate: number) => void
}

function Ratings({ setRate }: RatingsProps) {
	const [selected, setSelected] = useState<number>(0)

	function select(rate: number) {
		setSelected(rate)
		setRate(rate)
	}

	return (
		<Container>
			{
				Array(10).fill(null).map((_, i) => {
					return <Rate key={i} selected={selected >= i + 1} onClick={() => {
						return select(i + 1)
					}}>{i + 1}</Rate>
				})
			}
		</Container>
	)
}

export default Ratings
