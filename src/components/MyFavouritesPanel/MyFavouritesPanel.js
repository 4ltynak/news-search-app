import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomButton from '../custom-components/CustomButton';

function MyFavouritesPanel({myFavourites, clearMyFavourites}) {

    return(
        <Grid container sx={{width: "100%", height: "90vh"}}>   
            <Grid container direction={{xs:"column", lg: "row"}} gap={{xs: 2, lg:4}} p={2}
            sx={{width: "100%", height: "min-content", alignItems: "center", justifyContent:"space-between", backgroundColor: "#5b84ff", color:"white", flexShrink: 0}}>
                <Typography variant="h6">My Favourites: {myFavourites.length}</Typography>
                <CustomButton variant="contained"  
                onClick={clearMyFavourites}>
                Clear Favourites
                </CustomButton>
            </Grid>
            <Grid container direction="column" p={2}
            sx={{height:"100%", width: "100%", overflowY: "auto", backgroundColor: "#f0f2f8"}}>
            {
                myFavourites.map((article) => {
                    return ( 
                        <Grid key={article.url}
                        onClick={() => window.open(article.url, "_blank")}
                        borderBottom={"1px solid"} p={2} 
                        sx={{overflow:"hidden", maxHeight: "15%", transition: "0.2s ease",
                            width: "100%",
                            "&:hover":{
                                backgroundColor: "#cee1ff",
                                cursor: "pointer",
                                
                            }
                        }}>
                            <Typography variant="body1">{article.title}</Typography>

                        </Grid>
                            
                    )
                    
                })
            }
            </Grid>
        </Grid>
    )
}

export default MyFavouritesPanel;