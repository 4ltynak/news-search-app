import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import NewsItem from '../NewsItem/NewsItem';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import OrangeButton from '../custom-components/CustomButton';

function DisplayResults({keyword, page, updateMyFavourites, handleNextPage, handleError, myFavourites}) {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const GNewsApiKey = process.env.REACT_APP_GNEWS_API_KEY;

    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchArticles = async (keyword, page) => {
        
        // initial render only
        if (news === null){
            setIsLoading(true);
        }   

        if (keyword.length > 0 ){

            try {
                
                //let URL = `https://newsapi.org/v2/everything?apiKey=${apiKey}&sortBy=publishedAt&q=${keyword}&pageSize=12&page=${page}&searchIn=title&language=en`;
                let URL = `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=8&page=${page}&apikey=${GNewsApiKey}`;

                const response = await fetch(URL);
                const data = await response.json();
                const articles = data.articles;

                // check if the returned list is not empty
                if(articles.length > 0) {

                    // if on first search or on new search
                    if (news === null || page === 1)
                    {
                        setNews(articles);
                    } else {
                        setNews(current => [...current, ...articles]);
                    }
                    
                } else {
                    handleError("No more articles to retrieve.");
                }

            } catch (err) {
                console.log("Search error: ", err);
            } finally {
                setIsLoading(false);
            }
        }
    
    }

    useEffect(() => {
        console.log("News: ", news);
        if (keyword.length > 0){
            if (page === 1) {
                setIsLoading(true);
            }
            fetchArticles(keyword, page);
        }
        
    }
    , [page, keyword]);


    return (
        <Grid container sx={{justifyContent: "center", overflowY: "auto", width: "100%", height: "100%"}}>
            {isLoading ? 
            <Grid size={12}>
                <LinearProgress sx={{ width: "100%", mb: 2 , mt: 2}}/>
            </Grid>
             : 
                !news ? <Typography variant="h3" sx={{alignSelf:"center"}}>Seach for a related topic.</Typography> :
                    news.length === 0 ? <Typography color="#221266">No search results found.</Typography> : 
                    (
                        <>
                        <Grid container size={12} className="results-container" p={2} rowSpacing={2} columnSpacing={3}>
                        {
                        news.length > 0 && 
                        news.map((article) => (
                            <Grid size={{xs: 12, sm: 6, lg: 3}}>
                                <NewsItem article={article} key={article.url} 
                            updateMyFavourites={updateMyFavourites} myFavourites={myFavourites}/>
                            </Grid>
                        
                        ))
                        }
                        
                        </Grid>
                        <Grid className="button" sx={{alignItems: "center"}} p={2}>
                            <OrangeButton variant="contained" onClick={handleNextPage}>Load More</OrangeButton>
                        </Grid>
                        </>
                    )
            }
        </Grid>
    )
}

export default DisplayResults;