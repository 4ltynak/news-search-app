import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Grid from '@mui/material/Grid';
import MyFavouritesPanel from '../MyFavouritesPanel/MyFavouritesPanel';
import DisplayResults from '../DisplayResults/DisplayResults';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function HomePage() {
    
    const [keyword, setKeyword] = useState("");
    const [myFavourites, setMyFavourites] = useState( JSON.parse(localStorage.getItem("favourites")) ?? [] );
    const [page, setPage] = useState(1);

    const [errorMessage, setErrorMessage] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    const clearMyFavourites = () => {
        setMyFavourites([]);
    }

    const handleError = (msg) => {
        setErrorMessage(msg);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }

        setIsAlertOpen(false);
    }

    
    const handleSetKeyword = (searchTerm) => {
        // input must not be empty
        if (searchTerm || searchTerm.trim().length > 0) {
            setKeyword(searchTerm);
            setPage(1);
        }
        
    }

    const handleNextPage = () => {
        //get next page of results when requested
        setPage(p => p+1);
    }

    const updateMyFavourites = (articleURL, articleToAdd) => {
       
        setMyFavourites(currentFavourites => { 
    
         // Check if already in list
            if (currentFavourites.some(article => article.url === articleURL)){

                setIsAlertOpen(true);
                return currentFavourites;
            }


            return [...currentFavourites, articleToAdd]});
    }

    // show alert on error
    useEffect(() => {
        if (errorMessage.trim().length > 0) {
            setIsAlertOpen(true);
        }
        
    }, [errorMessage]);

    // update localstorage when favourites list changes
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(myFavourites));
    }, [myFavourites]);

    return (
        <Grid container className="main-container" direction="column" rowSpacing={0} sx={{ minHeight: "100vh", width: "100%", overflowY: "hidden"}}>
            <Grid item className="header-container" sx={{width: "100%"}}>
                <Header keyword={keyword} handleSetKeyword={handleSetKeyword} handleError={handleError}/>
            </Grid>
            <Grid item className="content-container" container sx={{ flex: 1, width: "100%", m: 0 }}>
                        <Grid className="left-panel-container" container size={{xs: 12, md: 3}} sx={{height: "100%", backgroundColor: "#C0C9EE"}}>
                            <MyFavouritesPanel 
                            myFavourites={myFavourites}
                            clearMyFavourites={clearMyFavourites}
                            handleSetKeyword={handleSetKeyword}
                            ></MyFavouritesPanel>
                        </Grid>
                        <Grid className="results-container" container spacing={2} size={{xs: 12, md: 9}} sx={{height:"100%",justifyContent:"space-around"}}>
                            <DisplayResults keyword={keyword} page={page} 
                            updateMyFavourites={updateMyFavourites} handleNextPage={handleNextPage} myFavourites={myFavourites}
                            handleError={handleError}/>
                        </Grid>
            </Grid>
            {
                
                <Snackbar open={isAlertOpen} autoHideDuration={1000} onClose={handleClose} 
                slotProps={{ transition: { onExited: () => setErrorMessage("") } }}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}> 

                <Alert variant="filled" onClose={handleClose} severity={errorMessage ? "error" : "info"}>
                    {errorMessage ? errorMessage : "Article already in list."}
                </Alert>
                </Snackbar>

            }
        </Grid>
    );
}

export default HomePage;