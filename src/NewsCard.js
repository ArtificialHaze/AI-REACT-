import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./NewsCard-styles";
import classNames from "classnames";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  index,
  activeArticle,
}) => {
  const classes = useStyles();

  const [elementRefs, setElementRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElementRefs((refs) =>
      Array(20)
        .fill()
        .map((_, index) => refs[index] || createRef())
    );
  }, []);

  useEffect(() => {
    if (index === activeArticle && elementRefs[activeArticle]) {
      scrollToRef(elementRefs[activeArticle]);
    }
  }, [index, activeArticle, elementRefs]);

  return (
    <Card
      ref={elementRefs[index]}
      className={classNames(
        classes.card,
        activeArticle === index && classes.activeCard
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || "NO IMAGE"} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component={"h2"}>
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component={"h2"}>
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography color="textSecondary" component={"p"} variant="body2">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn more
        </Button>
        <Typography color="textSecondary" variant="h5">
          {index + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
