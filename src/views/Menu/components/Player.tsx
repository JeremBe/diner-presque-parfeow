import styled from 'styled-components'
import {
	getImageById, imageById
} from '../../../utils/getImage'

const Video = styled.video`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`

type PlayerProps = {
  target: keyof typeof imageById;
  url: string
};

function Player({
	target, url
}: PlayerProps) {
	const imgTarget = getImageById(target)

	function toggleFullScreen() {
		const el = window.document.getElementById('full-screenVideo')
		if (el?.requestFullscreen) {
			el?.requestFullscreen()
		}
	}

	return (
		<Video
			id="full-screenVideo"
			onClick={toggleFullScreen}
			playsInline
			controls
			poster={imgTarget}
		>
			<source src={url} />
		</Video>
	)
}

export default Player
