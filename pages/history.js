import React from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import styles from "../styles/History.module.css";

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => { //
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  return (
    <>
      <Container>
        {parsedHistory.length > 0 ? (
          <>
            <ListGroup>
              {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item
                  onClick={(e) => historyClicked(e, index)}
                  className={styles.historyListItem} //
                  key={index}
                >
                  {Object.keys(historyItem).map((key) => (
                    <React.Fragment key={key}>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </React.Fragment>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <Card>
            <Card.Body>
              <p><strong>Nothing Here.</strong> Try searching for some artwork</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
