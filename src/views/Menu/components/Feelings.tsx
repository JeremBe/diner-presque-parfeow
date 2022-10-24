import React from 'react';

import { Feeling } from "../../../services/firebase/hosts";
import { imageById } from "../../../utils/getImage";
import Player from "./Player";


type FeelingsProps = {
    feelings: Feeling[]
};

function Feelings({ feelings }: FeelingsProps) {
  
  return (
    <>
        {feelings.map(feeling => <Player target={feeling.guestId as keyof typeof imageById} url={feeling.url} />)}
    </>
  );
}

export default Feelings;
