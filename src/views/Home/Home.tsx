import React, {
	useEffect, useState, useContext
} from 'react'
import styled from 'styled-components'

import {
	getDocList, type Document
} from '../../services/firebase/hosts'
import Card from './components/card'
import AppContext from '../../contexts/AppContext'
import dayjs from 'dayjs'

const Container = styled.div`
    height: 100%;
    padding: 15px;
    div:not(:last-child) {
        margin-bottom: 15px;
    }
    h1 {
        color: #355764
    }
    h1:last-of-type {
        margin-top: 40px;
    }
`

function Home() {
	const [incomingEvent, setIncomingEvent] = useState<Document[]>([])
	const [passedEvents, setPassedEvents] = useState<Document[]>([])
	const app = useContext(AppContext)

	const sortEventDate = (list: Document[]) => {
		return list.sort((a, b) => {
			return (!a.event_date && !b.event_date && -1) ||
        b.event_date.localeCompare(a.event_date)
		})
	}

	const filterPassedEvents = (list: Document[]) => {
		return list.filter(event => {
			if(!event.event_date) return false
			return dayjs().subtract(1, 'day').isAfter(dayjs(event.event_date))
		})
	}

	const filterIncommingEvents = (list: Document[]) => {
		return list.filter(event => {
			if(!event.event_date) return true
			return dayjs().subtract(1, 'day').isBefore(dayjs(event.event_date))
		})
	}

	useEffect(() => {
		// createDoc({})
		// update('rRKWGOPB8OFxPSCrMMWz', { feelings: [] })
		getDocList().then(documentsList => {
			setIncomingEvent(filterIncommingEvents(documentsList))
			setPassedEvents(filterPassedEvents(documentsList))
            app!.setHots(documentsList)
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Container>
			{
				incomingEvent.length ?
					<>
						<h1>Évènements à venir</h1>
						{ sortEventDate(incomingEvent).map(document => {
							return (<Card key={document.id} document={document} />)
						}) }
					</> :
					null
			}
			{
				passedEvents.length ?
					<>
						<h1>Évènements passés</h1>
						{sortEventDate(passedEvents).map(document => {
							return (<Card key={document.id} document={document} />)
						})}
					</> :
					null
			}
		</Container>
	)
}

export default Home
