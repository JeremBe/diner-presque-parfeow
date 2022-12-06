import React, {
	useContext, useEffect, useState
} from 'react'

import {
	useParams, useNavigate
} from 'react-router-dom'
import styled from 'styled-components'
import {
	Formik, Form, Field, FieldInputProps, FormikState
} from 'formik'
import dayjs from 'dayjs'

import AppContext from '../../contexts/AppContext'
import {
	encryptWithAES, fetchDoc, update, type Document
} from '../../services/firebase/hosts'
import Checkbox from '../../Components/Form/Checkbox'

const Container = styled.div`
    height: 100%;
    padding: 30px;
    h1 {
        text-align: center;
        color: #355764;
    }
    label {
        color: #355764;
        font-weight: bold;
    }
`

type FormGroupProps = {
    spaceBetween?: boolean
}

const FormGroup = styled.div<FormGroupProps>`
    padding-top: 20px;
    ${(props) => {
		return props.spaceBetween && `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `
	}}
`

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    border-radius: 6px;
    border: 2px solid #3333336b;
    padding: 0px 10px;
`
const TextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    min-height: 90px;
    border-radius: 6px;
    border: 2px solid #3333336b;
    padding: 10px 10px;
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
`

const Button = styled.button`
    background-color: #333;
    border-radius: 10px;
    border: none;
    color: white;
    padding: 15px 32px;
`

type FormType = {
    theme: string
    apero: string
    entree: string
    plat: string
    dessert: string
    event_date: string
    address: string
    deco: boolean
}

const FormikInput = ({
	field,
	form,
	...props
}: {
    field: FieldInputProps<any>;
    form: FormikState<any>;
  }) => {
	return <Input {...field} {...props} />
}

const FormikTextArea = ({
	field,
	form,
	...props
}: {
    field: FieldInputProps<any>;
    form: FormikState<any>;
  }) => {
	return <TextArea {...field} {...props} />
}

function Edit() {
	const { id } = useParams()
	const [document, setDocument] = useState<Document>()
	const app = useContext(AppContext)
	const navigate = useNavigate()

	const isAuthorized = (doc: Document) => {
		if(!app!.guestId) {
			navigate(`/menu/${doc?.id}`, { replace: true })

			return false
		}

		if(doc.id !== app!.guestId) {
			navigate(`/menu/${doc?.id}`, { replace: true })

			return false
		}
	}

	useEffect(() => {
		id && fetchDoc(id).then(doc => {
			isAuthorized(doc)

			setDocument(doc)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const goToMenu = () => {
		navigate(`/menu/${document?.id}`)
	}

	async function onSubmit(values: FormType) {
		if(!id) return navigate(`/menu/${document?.id}`, { replace: true })

		const formatedValues = {
			address: values.address ? encryptWithAES(values.address) : '',
			event_date: values.event_date ? new Date(values.event_date).toISOString() : '',
			deco: values.deco,
			menu: {
				...document!.menu,
				theme: values.theme,
				apero: values.apero,
				entree: values.entree,
				plat: values.plat,
				dessert: values.dessert
			}
		}

		await update(id, formatedValues)

		goToMenu()
	}

	return (
		<Container>
			<h1>Éditer</h1>
			<Formik
				enableReinitialize={true}
				initialValues={{
					theme: document?.menu.theme ?? '',
					apero: document?.menu.apero ?? '',
					entree: document?.menu.entree ?? '',
					plat: document?.menu.plat ?? '',
					dessert: document?.menu.dessert ?? '',
					event_date: document?.event_date ? dayjs(document?.event_date).format('YYYY-MM-DD') : '',
					address: document?.address ?? '',
					deco: document?.deco ?? false
				}}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => {
					return (
						<Form>
							<FormGroup>
								<label htmlFor='theme'>Thème</label>
								<Field name="theme" type='text' component={FormikInput} />
							</FormGroup>
							<FormGroup>
								<label htmlFor='apero'>Apéro</label>
								<Field name="apero" component={FormikTextArea} />
							</FormGroup>
							<FormGroup>
								<label htmlFor='entree'>Entrée</label>
								<Field name="entree" component={FormikTextArea} />
							</FormGroup>
							<FormGroup>
								<label htmlFor='plat'>Plat</label>
								<Field name="plat" component={FormikTextArea} />
							</FormGroup>
							<FormGroup>
								<label htmlFor='dessert'>Dessert</label>
								<Field name="dessert" component={FormikTextArea} />
							</FormGroup>
							<FormGroup>
								<label htmlFor='address'>Adresse</label>
								<Field type='address' name="address" component={FormikInput} />
							</FormGroup>
							<FormGroup spaceBetween>
								<label htmlFor='event_date'>Date</label>
								<Field type='date' name="event_date" component={FormikInput} />
							</FormGroup>
							<FormGroup spaceBetween>
								<label htmlFor='deco'>Noter la déco ?</label>
								<Field type='checkbox' name="deco" component={Checkbox} />
							</FormGroup>
							<CenteredParagraph>
								<Button onClick={goToMenu}>
                                Annuler
								</Button>
								<SubmitButton type="submit" disabled={isSubmitting}>
                                Enregistrer
								</SubmitButton>
							</CenteredParagraph>
						</Form>
					)
				}}
			</Formik>
		</Container>
	)
}

export default Edit
