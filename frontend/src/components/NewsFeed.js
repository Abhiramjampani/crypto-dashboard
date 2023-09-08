import { useEffect, useState } from "react";
import axios from "axios";
const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://crypto-news-live9.p.rapidapi.com/news/CryptoNews",
      headers: {
        "X-RapidAPI-Key": "dd62c51c00msh8365891e0b230d8p1c2b70jsna3dd52f29a8a",
        "X-RapidAPI-Host": "crypto-news-live9.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((responce) => {
        console.log(responce.data);
        setArticles(responce.data);
        let article=articles[0];
        console.log(article.url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(articles);

  const first7Articles = true;

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {first7Articles
        ? (articles.map((article, _index)=> {
            return (
              <div key={_index}>
                <a href={article.url}>
                  <p>{article.title}</p>
                </a>
              </div>
            );
          }))
        : null}
    </div>
  );
};

export default NewsFeed;
