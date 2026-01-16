import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import placeholderImg from '../../img/placeholder-img.png'
import CustomButton from '../custom-components/CustomButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
function NewsItem({article, updateMyFavourites, myFavourites}) {

    const addToFavourites = () => {
        updateMyFavourites(article.url, article);
    }
    
    // check if current article is in favourites list
    const isDuplicate = myFavourites.some((fav) => fav.url === article.url);


    // If source includes "The", remove The and show the initial of next word as avatar
    const avatar = article.source.name.includes("The") ? article.source.name[4] : article.source.name[0];

    // Extract only date and not time of article published
    const publishDate = article.publishedAt.split("T")[0]

        const [isHovered, setIsHovered] = useState(false);

        function handleMouseOver(){
            setIsHovered(true);
        }

        function handleMouseExit(){
            setIsHovered(false);
        }

        // to handle broken images from api response
        function handleImageError(e){
            e.target.src= placeholderImg;
        }

       /*  return (
        <Grid container direction="column" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseExit}>
            {!isHovered ? (
                <Card component={Grid} container sx={{height: "100%", maxWidth: "100%"}}>
                    <Grid>
                        <CardHeader sx={{height: "30px"}}
                        avatar={<Avatar sx={{bgcolor: "#64748B"}}>{avatar}</Avatar>}
                        title={article.source.name}
                        subheader={publishDate}
                        >
                        </CardHeader>
                    </Grid>
                    <Grid sx={{width: "100%"}}>
                    <CardMedia
                        component="img"
                        height="150px"
                        image={article.image || placeholderImg}
                        onError={handleImageError}
                        sx={{
                            objectFit: "cover"
                        }}
                    ></CardMedia>
                    <CardContent sx={{height: "100px", overflow: "hidden"}}>
                        <Typography variant="body2" sx={{textAlign: "justify"}} >
                            {article.title}
                        </Typography>
                    </CardContent>
                    </Grid>
                <Grid>
                <CardActions>
                        <IconButton aria-label="add to favourites" onClick={addToFavourites}>
                            {isFavourite ? <FavoriteIcon sx={{color: "crimson"}}/> :  <FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                </CardActions>
                </Grid>
        </Card>
            ) : (
                <Card Card component={Grid} container sx={{height: "100%", maxWidth: "100%"}}>
                    <Grid>
                        <CardHeader sx={{height: "30px"}}
                        avatar={<Avatar sx={{bgcolor: "#64748B"}}>{avatar}</Avatar>}
                        title={article.source.name}
                        subheader={publishDate}
                        >
                        </CardHeader>
                    </Grid>
                    <Grid display="flex" sx={{cursor: "pointer", width: "100%"}}>
                        <CardContent sx={{height: "250px", width:"100%", overflow:"hidden", display: "flex", flexDirection: "column"}}>
                        <Typography variant="body2" sx={{overflowY: "auto", marginTop: "auto", textAlign: "center"}}>
                            {article.title}
                        </Typography>
                        <OrangeButton variant="contained" onClick={() => window.open(article.url, "_blank")} sx={{marginTop: "auto", alignSelf:"center"}}>Read More</OrangeButton>
                        </CardContent>
                    </Grid>
                    <Grid>
                        <CardActions>
                            <IconButton aria-label="add to favourites" onClick={addToFavourites}> 
                                {isDuplicate ? <isFavourite sx={{color: "crimson"}}/> :  <FavoriteBorderOutlinedIcon/>}
                            </IconButton>
                        </CardActions>
                    </Grid>
        </Card>
            ) }
        
        </Grid>
        );
 */
        return (
            <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column' }} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseExit}>
                    <CardHeader sx={{ height: "60px" }}
                        avatar={<Avatar sx={{bgcolor: "#64748B"}}>{avatar}</Avatar>}
                        title={article.source.name}
                        subheader={publishDate}></CardHeader>
                    <Box className="contentbox" sx={{ height: "250px", position: 'relative' }}>
                        {!isHovered ? (
                            <>
                            <CardMedia component="img" height="150px" image={article.image || placeholderImg}
                                onError={handleImageError} sx={{ objectFit: "cover"}}></CardMedia>
                            <CardContent sx={{ height: "100%" }}>{article.title}</CardContent>
                            </>
                            ) : (
                            <CardContent sx={{display:"flex", flexDirection:"column", gap:2, justifyContent:"center", alignItems:"center", height: "100%"}}>
                            <Typography variant="body2" sx={{overflowY: "auto", textAlign: "center"}}>
                                {article.title}
                            </Typography>
                            <CustomButton variant="contained" onClick={() => window.open(article.url, "_blank")} sx={{alignSelf:"center"}}>Read More</CustomButton>
                            </CardContent>
                            )
                        }
                    </Box>
                <CardActions>
                        <IconButton aria-label="add to favourites" onClick={addToFavourites}>
                            {isDuplicate ? <FavoriteIcon sx={{color: "crimson"}}/> :  <FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                </CardActions>
                </Card>
        )
    }

export default NewsItem;
