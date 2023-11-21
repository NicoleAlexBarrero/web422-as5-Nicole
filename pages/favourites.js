import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store.js";
import ArtworkCard from "../components/ArtworkCard.js";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom); //?

  let [artworkList, setArtworkList] = useState([]);

  useEffect(() => {
    setArtworkList(favouritesList);
  }, [favouritesList]);

  return (
    <>
      <Container>
        {artworkList.length > 0 ? (
          <>
            <Row className="gy-4">
              {artworkList.map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Card>
            <Card.Body>
              <p><strong>Nothing Here.</strong> Try searching for something else.</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
