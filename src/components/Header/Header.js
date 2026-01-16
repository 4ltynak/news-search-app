import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomButton from '../custom-components/CustomButton';

function Header ({keyword, handleSetKeyword, handleError}) {

    const [searchTerm, setSearchTerm] = useState(keyword ?? "");
    const [isEmpty, setIsEmpty] = useState(true);

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);

        if (e.target.value.trim().length > 0) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    }

    const onSearchClick = () => {
        if (isEmpty) {
            handleError("Search field cannot be empty.");
        } else {
            handleSetKeyword(searchTerm);
        }
        
    }

    return (
        <AppBar position="static" elevation={4} sx={{flexShrink: 0, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)"}}>
                <Toolbar>
                    <Grid container sx={{width:"100%",  flexDirection: "row", alignItems: "center"}}>
                        <Grid size={3}>
                            <Typography variant="h6">Find My News</Typography>
                        </Grid>
                        <Grid container spacing={2} size={6} justifyContent="center" alignItems="center">
                            <Grid size={5}>
                                <TextField 
                                p={2}
                                fullWidth
                                id="searchfield" 
                                variant="standard" 
                                size="small"
                                label="Search news by topic (e.g. Tesla)"
                                value={searchTerm}
                                onChange={handleOnChange}
                                sx={{backgroundColor: "#E6F0FF", borderRadius: "5px"}}
                                /> 
                            </Grid>
                            <Grid>  
                                <CustomButton variant="contained"
                                size="large"
                                sx={{alignSelf: "center", fontWeight: "bold"}}
                                onClick={onSearchClick}>
                                Search News
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Toolbar>

        </AppBar>
    );
}

export default Header;