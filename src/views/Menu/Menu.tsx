import { useEffect, useState, useContext, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { GiVote } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { fetchDoc, update, type Document } from "../../services/firebase/hosts";
import Cover from "./components/Cover";
import AppContext from "../../contexts/AppContext";
import Reviewers from "./components/Reviewers";
import { BackContainer } from "../../Components/BackButton";
import { storage } from "../../services/firebase/database";
import FileUploader from "../../Components/FileUploader/FileUploader";
import dayjs from "dayjs";

const Feelings = lazy(() => import('./components/Feelings'));

const Container = styled.div`
  height: 100%;
`;

const ContentContainer = styled.div`
  position: relative;
  padding: 15px;
  padding-bottom: 60px;
  h1,
  h2 {
    text-align: center;
    color: #355764;
  }
  p {
    text-align: center;
  }
`;

const VoteContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background-color: #355764;
  padding: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
`;

const EditContainer = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
  a {
    text-decoration: none;
    display: flex;
    color: black;
  }
  a:visited {
    text-decoration: none;
    color: black;
  }
  a:focus {
    text-decoration: none;
    color: black;
  }
  a:active {
    text-decoration: none;
    color: teal;
  }
`;

const CenteredParagraph = styled.p`
  margin-top
  text-align: center;
`;

function Home() {
  const { id } = useParams();
  const [document, setDocument] = useState<Document>();
  const [percent, setPercent] = useState<number>(0);
  const app = useContext(AppContext);

  useEffect(() => {
    id &&
      fetchDoc(id).then((data) => {
        setDocument(data);
        console.log(data);
      });
  }, [id]);

  function isGuest() {
    return app?.guestId && document && app!.guestId !== document?.id;
  }

  function isHost() {
    return document && app!.guestId === document?.id;
  }

  function notReviewed() {
    if (document && !app!.guestId) return false;
    return document!.reviews.every((review) => review.guestId !== app!.guestId);
  }

  function userNotGiveFeeling() {
    if (document && !app!.guestId) return false;
    return document!.feelings.every((feeling) => feeling.guestId !== app!.guestId);
  }

  function isIncomming() {
    return dayjs().subtract(1,'day').isBefore(dayjs(document!.event_date))
  }

  function menuIsFullFilled() {
    return document?.menu.apero && document.menu.dessert && document.menu.entree && document.menu.entree && document.menu.plat
  }
  

  function handleFile(file: File) {
    if (!id || !app!.guestId) {
      return;
    }

    const storageRef = ref(storage, `/${id}/${app!.guestId}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
          const feelings = [
            ...document!.feelings,
            { guestId: app!.guestId as string, url },
          ];

          update(id, {
            feelings,
          });

          setDocument({ ...document!, feelings });
        });
      }
    );
  }

  function goToMap() {
    const link = window.document.createElement("a");
    link.href = `https://maps.apple.com/maps?q=${document?.address}`;
    link.click();
    link.remove();
  }

  return (
    <Container>
      <BackContainer>
        <Link to="/">
          <IoIosArrowBack size={20} />
        </Link>
      </BackContainer>
      {isHost() && (
        <EditContainer>
          <Link to="edit">
            <MdModeEditOutline size={20} />
          </Link>
        </EditContainer>
      )}
      {document?.image && <Cover target={document.image} />}
      <ContentContainer>
        <h1>{document?.menu.theme}</h1>
        {document?.address && app?.guestId && (
          <CenteredParagraph onClick={goToMap}>
            <GrMapLocation size={30} />
          </CenteredParagraph>
        )}
        {document?.menu.apero && (
          <>
            <h2>Apéro</h2>
            <p>{document?.menu.apero}</p>
          </>
        )}
        {document?.menu.entree && (
          <>
            <h2>Entrée</h2>
            <p>{document?.menu.entree}</p>
          </>
        )}
        {document?.menu.plat && (
          <>
            <h2>Plat</h2>
            <p>{document?.menu.plat}</p>
          </>
        )}
        {document?.menu.dessert && (
          <>
            <h2>Dessert</h2>
            <p>{document?.menu.dessert}</p>
          </>
        )}

        {(isGuest() && menuIsFullFilled() && isIncomming()) || (isGuest() && document?.feelings.length) ? (
          <>
            <h2>
              <i>Que pensez vous manger&nbsp;?</i>
            </h2>
            <Suspense>
              <Feelings feelings={document!.feelings} />
            </Suspense>
          </>
        ) : null}

        {isGuest() && isIncomming() && userNotGiveFeeling() && menuIsFullFilled() && (
          <CenteredParagraph>
            <FileUploader
              handleFile={handleFile}
              accept="video/mp4,video/x-m4v,video/*"
            />
          </CenteredParagraph>
        )}

        {document?.reviews.length ? (
          <>
            <h2>
              <i>Ceux qui ont voté</i>
            </h2>
            <Reviewers reviews={document.reviews} />
          </>
        ) : null}

        {isGuest() && notReviewed() && document?.open_vote && (
          <VoteContainer>
            <Link to="review">
              <GiVote size={30} color="#fff" />
            </Link>
          </VoteContainer>
        )}
      </ContentContainer>
    </Container>
  );
}

export default Home;
