import couple from '../images/couple.jpeg'
import jelo from '../images/jelo.jpg'
import jv from '../images/jv.jpg'
import cle from '../images/cle.jpg'
import quentin from '../images/quentin.jpg'
import raf from '../images/raf.jpg'
import seb from '../images/seb.jpg'
import { Document } from '../services/firebase/hosts'

const imageTargets = {
	jelo,
	jv,
	cle,
	quentin,
	raf,
	seb,
	couple
} as const

export const imageById = {
	'77dBRWbot6MlSeD7V0Lv': raf,
	'7fcC2kVl3Opva07JTKkV': seb,
	'GWqQc9O6cIdQuArYBb7o': cle,
	'KHjjbtIqNNi1umb8VpCY': jelo,
	'KmckzKQ4WdpPQYv0NbLz': jv,
	'rRKWGOPB8OFxPSCrMMWz': quentin
} as const

export function getImageByName(name: Document['image']) {
	return imageTargets[name] ?? couple
}

export function getImageById(id: keyof typeof imageById) {
	return imageById[id] ?? couple
}
