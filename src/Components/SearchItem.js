import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const SearchItem = ({ title, thumbnail, infoLink, publisher, authors }) => {
  return (
    <Card style={styles.card}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      >
        <div
          style={{
            width: "40%",
            height: "100%",
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
            alt=""
            src={thumbnail}
          />
        </div>
        <CardContent
          style={{
            width: "60%",
            height: "100%",
            flex: 2,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <p>{title}</p>
          <p>
            <i>{authors ? authors.toString() : ""}</i>
          </p>
          <p>
            <b>{publisher}</b>
          </p>
          <Button
            variant="contained"
            color="primary"
            disabled={infoLink ? false : true}
            href={infoLink}
            target="_blank"
          >
            More Details
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

SearchItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  infoLink: PropTypes.string,
  publisher: PropTypes.string,
  authors: PropTypes.array
};

SearchItem.defaultProps = {
  thumbnail:
    "http://images.clipartpanda.com/open-book-outline-clipart-dcreMKagi.svg"
};

const styles = {
  card: {
    flex: 1,
    height: 340,
    flexBasis: "45%",
    backgroundColor: "#e8e8e4",
    margin: "20px",
    position: "relative"
  }
};

export default SearchItem;
