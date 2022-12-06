import {
	collection, query, orderBy, addDoc, getDoc, getDocs, updateDoc, doc, Timestamp
} from 'firebase/firestore'

import { db } from './database'

import CryptoJS from 'crypto-js'

type Menu = {
    theme: string
    apero: string
    entree: string
    plat: string
    dessert: string
}

export type Review = {
    guestId: string
    apero: number
    entree: number
    plat: number
    dessert: number
    animation: number
    deco: number
}

export type Feeling = {
    guestId: string
    url: string
}

export type Document = {
    id: string
    name: string
    image: 'jelo' |'jv' | 'cle' |'quentin' |'raf' |'seb'
    menu: Menu
    reviews: Review[]
    feelings: Feeling[]
    users: string[]
    address: string
    deco: boolean
    event_date: string
    open_vote: boolean
}

const passphrase = 'Eow!9'

export const encryptWithAES = (text: string) => {
	return CryptoJS.AES.encrypt(text, passphrase).toString()
}

const decryptWithAES = (ciphertext: string) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
	const originalText = bytes.toString(CryptoJS.enc.Utf8)
	return originalText
}

const defaultDocument: Omit<Document, 'id'> = {
	name: 'JV et Bleu',
	image: 'jv',
	menu: {
		theme: 'Surprise',
		apero: '',
		entree: '',
		plat: '',
		dessert: ''
	},
	reviews: [],
	feelings: [],
	address: '',
	deco: false,
	event_date: '',
	users: ['JV', 'Bleu'],
	open_vote: false
}

const hostsCollection = collection(db, 'hosts')

export async function createDoc(data: Partial<Document>) {
	await addDoc(hostsCollection, {
		created_at: Timestamp.now(),
		...defaultDocument
	})
}

export async function fetchDoc(id: string) {
	const docRef = doc(hostsCollection, id)
	const response = await getDoc(docRef)

	const document = response.data()

	return {
		...document,
		id: response.id,
		address: decryptWithAES(document!.address)
	} as Document
}

export async function getDocList() {
	const documentQuery = query(hostsCollection, orderBy('created_at', 'desc'))
	const hostsSnapshot = await getDocs(documentQuery)

	return hostsSnapshot.docs.map(doc => {
		const document = doc.data()

		return {
			...document,
			id: doc.id,
			address: decryptWithAES(document!.address)
		}
	}) as Document[]
}

export async function update(id: string, data: Partial<Document>) {
	const docRef = doc(hostsCollection, id)
	await updateDoc(docRef, data)
}