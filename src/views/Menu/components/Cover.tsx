import React from 'react';
import styled from 'styled-components';

import { Document } from '../../../services/firebase/hosts'
import { getImageByName } from '../../../utils/getImage';

const Img = styled.img`
    object-fit: cover;
    object-position: 50% 50%;
    height: 60vh;
    width: 100%;
`

function Image({ target }: {target: Document['image']}) {
  const imgTarget = getImageByName(target)

  return (
    <Img src={imgTarget} />
  );
}

export default Image;
