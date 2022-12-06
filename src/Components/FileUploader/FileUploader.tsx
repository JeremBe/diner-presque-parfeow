import React, {
	useRef, useState
} from 'react'

import styled from 'styled-components'

const SubmitButton = styled.button`
  background-color: #355764;
  border-radius: 10px;
  border: none;
  color: white;
  margin-left: 20px;
  padding: 15px 32px;
  ${(props) => {
		return props.disabled &&
    `
        background-color: #cccccc;
        color: #666666;
    `
	}}
`

type FileUploaderType = {
  handleFile: (file: File) => void;
  accept?: string;
};

const InputFile = styled.input`
  display: none;
`

const FileUploader: React.FunctionComponent<FileUploaderType> = ({
	handleFile,
	accept,
	...props
}) => {
	const [isHidden, setIsHidden] = useState(true)
	const hiddenFileInput = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		setIsHidden(false)
		setTimeout(() => {
			return hiddenFileInput?.current?.click()
		})
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files?.[0]) {
			handleFile(event.target.files[0])
		}
		setIsHidden(true)
	}

	return (
		<>
			<SubmitButton {...props} onClick={handleClick}>
        Partagez vos ideés !
			</SubmitButton>
			{!isHidden && (
				<InputFile
					type="file"
					ref={hiddenFileInput}
					onChange={handleChange}
					accept={accept}
				/>
			)}
		</>
	)
}

export default FileUploader
