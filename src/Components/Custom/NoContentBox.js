// IMPORTING MODULES/PACKAGES
import { Box, Typography } from '@mui/material';
import React from 'react';

/**
 * @name NoContentBox
 * @description COMPONENT TO DEPICT NO EXISTING COMPONENTS
 * @param {*} props COMPONENT PROPS
 * @returns <NoContentBox /> (JSX)
 */
const NoContentBox = (props) => {

    // GETTING COMPONENT PROPS
    const { imgSrc, text } = props;

    return (
        <Box sx={{
            py: "1.75em",
            width: "100%",
            display: "flex",
            borderWidth: "1px",
            borderRadius: "5px",
            borderStyle: "solid",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "primary.main",
        }}>
            <img src={imgSrc} alt={text} style={{ width: "45%" }} />
            <Typography variant="h6" sx={{ mt: "10px" }}>{text}</Typography>
        </Box>
    );
};

export default NoContentBox;