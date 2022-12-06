import styled from 'styled-components'

import { Document } from '../../../services/firebase/hosts'

import couple from '../../../images/couple.jpeg'
import jelo from '../../../images/jelo.jpg'
import jv from '../../../images/jv.jpg'
import cle from '../../../images/cle.jpg'
import quentin from '../../../images/quentin.jpg'
import raf from '../../../images/raf.jpg'
import seb from '../../../images/seb.jpg'

const Img = styled.img`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 100px;
    width: 100px;
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

function Image({ target }: {target: Document['image']}) {
	const imgTarget = imageTargets[target]

	return (
		<Img src={imgTarget} />
	)
}

export default Image
