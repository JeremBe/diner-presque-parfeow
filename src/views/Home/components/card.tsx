import React from 'react'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Image from './image'
import { type Document } from '../../../services/firebase/hosts'
import dayjs from 'dayjs'

const Container = styled.div`
    display: flex;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
    padding: 6px;
`

const ContentContainer = styled.div`
    flex: 1;
    padding: 0 10px;
`

const FloatRight = styled.span`
    float: right;
`

type CardProps = {
    document: Document
}

function Card({document}: CardProps ) {
    const navigate = useNavigate()

    function goTo() {
        navigate(`menu/${document.id}`)
    }

    return (
        <Container onClick={goTo}>
            <Image target={document.image}/>
            <ContentContainer>
                <p>
                    {document.name}
                    {document.event_date && <FloatRight>{dayjs(document.event_date).format('DD/MM')}</FloatRight>}
                </p>
                <p>
                    Menu {document.menu.theme}
                </p>
            </ContentContainer>
        </Container>
    )
}

export default Card;
