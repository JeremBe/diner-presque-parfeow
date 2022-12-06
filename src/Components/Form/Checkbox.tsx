import styled from 'styled-components'
import {
	FieldInputProps, FormikState
} from 'formik'

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
`

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span {
        background-color: #2196F3;
    }
    &:focus + span {
        box-shadow: 0 0 1px #2196F3;
    }
    &:checked + span:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
`

const Checkbox = ({
	field,
	form,
	...props
}: {
    field: FieldInputProps<any>;
    form: FormikState<any>;
  }) => {
	return (
		<Switch>
			<Input {...field} {...props} />
			<Slider />
		</Switch>
	)
}

export default Checkbox