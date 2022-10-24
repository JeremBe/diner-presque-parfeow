import React,  { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../contexts/AppContext';


import { fetchDoc, update, type Document, type Review } from '../../services/firebase/hosts';
import Ratings from './components/Ratings';

const Container = styled.div`
    height: 100%;
    padding: 15px;
    h1 {
        text-align: center;
    }
    h1, h2 {
        color: #355764;
    }
`

const CenteredParagraph = styled.p`
    text-align: center;
    margin-top: 40px;
`

const SubmitButton = styled.button`
    background-color: #355764;
    border-radius: 10px;
    border: none;
    color: white;
    margin-left: 20px;
    padding: 15px 32px;
    ${(props) => props.disabled && `
        background-color: #cccccc;
        color: #666666;
    `}
`

const Button = styled.button`
    background-color: #333;
    border-radius: 10px;
    border: none;
    color: white;
    padding: 15px 32px;
`

const FloatingRight = styled.span`
    float: right;
    margin-right: 10px;
`

const emojis = ['🤮','🤢','😵‍💫','🥴','🤐','😊','😋','🤤','🥹','🤩']
const emojisAnimation = ['😴','🥱','😵‍💫','🥴','🤐','😊','😁','😆','🥳','🤣']

function Rates() {
    const { id } = useParams()
    const [document, setDocument] = useState<Document>()
    const app = useContext(AppContext)
    const navigate = useNavigate()

    const [rating, setRating] = useState<Review>({
        guestId: app!.guestId || '',
        apero: 0,
        entree: 0,
        plat: 0,
        dessert: 0,
        animation: 0,
        deco: 0
    })

    const isAuthorized = (doc: Document) =>{
        if(doc.id === app!.guestId) {
            navigate(`/menu/${doc?.id}`, {replace: true})
            
            return false
        }

        if(!app!.guestId) {
            navigate(`/menu/${doc?.id}`, {replace: true})
            
            return false
        }

        if(doc?.reviews.find(review => review.guestId === app!.guestId)) {
            navigate(`/menu/${doc?.id}`, {replace: true})
            
            return false
        }

        return true
    }

    const isCompleted = () => {
        return  rating.apero > 0 && rating.entree > 0 && rating.plat > 0 && 
                rating.dessert > 0 && rating.animation > 0 && (document?.deco ? rating.deco > 0 : true)
    }

    useEffect(()=> {
        id && fetchDoc(id).then(doc => {
            isAuthorized(doc)

            setDocument(doc)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    async function onSubmit() {
        if(!id) return navigate(`/menu/${document?.id}`, {replace: true})

        const doc = await fetchDoc(id)

        const access = isAuthorized(doc)

        if(access) await update(id, {reviews: [...document!.reviews ?? [], rating]})

        navigate(`/menu/${document?.id}`, {replace: true})
    }

    return (
        <Container>
            <h1>Noter le menu</h1>
            <h1>{document?.menu.theme}</h1>
            <h2>Apéro {rating.apero !== 0 && (<FloatingRight>{emojis[rating.apero-1]}</FloatingRight>)}</h2>
            <Ratings setRate={(rate) => setRating({...rating, apero: rate})} />

            <h2>Entrée {rating.entree !== 0 && (<FloatingRight>{emojis[rating.entree-1]}</FloatingRight>)}</h2>
            <Ratings setRate={(rate) => setRating({...rating, entree: rate})} />

            <h2>Plat {rating.plat !== 0 && (<FloatingRight>{emojis[rating.plat-1]}</FloatingRight>)}</h2>
            <Ratings setRate={(rate) => setRating({...rating, plat: rate})} />

            <h2>Dessert {rating.dessert !== 0 && (<FloatingRight>{emojis[rating.dessert-1]}</FloatingRight>)}</h2>
            <Ratings setRate={(rate) => setRating({...rating, dessert: rate})} />

            <h2>Animation {rating.animation !== 0 && (<FloatingRight>{emojisAnimation[rating.animation-1]}</FloatingRight>)}</h2>
            <Ratings setRate={(rate) => setRating({...rating, animation: rate})} />

            {
                document?.deco ? (
                    <>
                        <h2>Déco {rating.deco !== 0 && (<FloatingRight>{emojis[rating.deco-1]}</FloatingRight>)}</h2>
                        <Ratings setRate={(rate) => setRating({...rating, deco: rate})} />
                    </>
                ) : null
            }
            
            <CenteredParagraph>
                <Button onClick={() =>  navigate(`/menu/${document?.id}`)}>
                    Annuler
                </Button>
                {isCompleted()}
                <SubmitButton onClick={onSubmit} disabled={!isCompleted()}>Valider ma note !</SubmitButton>
            </CenteredParagraph>
        </Container>
    );
}

export default Rates;
