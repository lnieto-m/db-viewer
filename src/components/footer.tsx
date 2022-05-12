import { Box, Typography } from "@mui/material";

function Footer() {
    return(<Box
        component="div"
        sx={{
            width: '100%',
            height: 32,
            backgroundColor: '#42444b'
        }}
    >
        <div style={{
            padding: 8,
            fontFamily: 'monospace',
            color: 'white'
        }}>
            ©2022 - Made with React and MaterialUI
        </div>
    </Box>)
}

export default Footer;