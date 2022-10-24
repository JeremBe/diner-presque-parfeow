import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';

import couple from '../../../images/couple.jpeg'
import jelo from '../../../images/jelo.jpg'
import jv from '../../../images/jv.jpg'
import cle from '../../../images/cle.jpg'
import quentin from '../../../images/quentin.jpg'
import raf from '../../../images/raf.jpg'
import seb from '../../../images/seb.jpg'

import AppContext from '../../../contexts/AppContext';

import { Document, getDocList } from '../../../services/firebase/hosts'

const Img = styled.img`
    object-fit: cover;
    object-position: 50% 50%;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 0px 2px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const imageTargets = {
  jelo,
  jv,
  cle,
  quentin,
  raf,
  seb,
  couple
}

function Reviewers({ reviews }: {reviews: Document['reviews']}) {
  const app = useContext(AppContext)
  const [guests, setGuests] = useState<{image: Document['image'] | undefined}[]>([])

  function setGuestArray(hosts: Document[]) {
    setGuests([...reviews.map((review) => {
        const host = hosts.find(host => host.id === review.guestId)
        return { image: host?.image }
    })])
  }

  useEffect(()=> {
    if(app?.hosts.length) {
        setGuestArray(app.hosts)
    } else {
        getDocList().then(hosts => {
            setGuestArray(hosts)
        })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
        {guests.map((guest, index) => (<Img key={index} src={imageTargets[guest.image ?? 'couple']} />))}
    </ Container>
  );
}

export default Reviewers;
