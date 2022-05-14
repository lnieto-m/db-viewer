import { Box, Typography } from "@mui/material";

function Footer() {
    return(<Box
        component="div"
        sx={{
            width: '100%',
            height: 32,
            backgroundColor: '#202225'
        }}
    >
        <div style={{
            padding: 8,
            fontFamily: 'monospace',
            color: '#d4d5d5'
        }}>
            ©2022 - Made with React and MaterialUI
        </div>
    </Box>)
}

export default Footer;