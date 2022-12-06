import {
	createContext, useState, type PropsWithChildren, type Dispatch, type SetStateAction
} from 'react'
import { Document } from '../services/firebase/hosts'

type AppContextProps = {
    guestId: string | null
    setGuestId: Dispatch<SetStateAction<string | null>>
    hosts: Document[]
    setHots: Dispatch<SetStateAction<Document[]>>
}

const AppContext = createContext<AppContextProps | null>(null)

export function UserProvider({ children }: PropsWithChildren) {
	const [guestId, setGuestId] = useState<string | null>(localStorage.getItem('guest_id') || null)
	const [hosts, setHots] = useState<Document[]>([])

	return (
		<AppContext.Provider value={{
			guestId,
			setGuestId,
			hosts,
			setHots
		}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext