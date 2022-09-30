import "./App.css";
import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./NewsCards";
import useStyles from "./App-styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "e1f95d422d98afb480bb2f5f68ad94182e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        switch (command) {
          case "newHeadlines":
            setNewsArticles(articles);
            setActiveArticle(-1);
            break;
          case "highlight":
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            break;
          case "open":
            const parsedNumber =
              number.length > 2
                ? wordsToNumbers(number, { fuzzy: true })
                : number;
            const article = articles[parsedNumber - 1];
            if (parsedNumber > 20) {
              alanBtn().playText("Please try again!");
            } else if (article) {
              window.open(article.url, "_blank");
              alanBtn.playText(`Opening ${article}`);
            }
            break;
          default:
            break;
        }
      },
    });
  }, []);

  const alanLogoSrc =
    "https://miro.medium.com/max/1200/1*HQrTZ0sZd6m3XigurzBsGA.png";

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} alt="alan logo" className={classes.alanLogo} />
      </div>
      <NewsCards activeArticle={activeArticle} articles={newsArticles} />
    </div>
  );
};

export default App;
