import { createTheme } from "@mui/material"

const PrimaryTheme = createTheme({
    palette: {
        primary: {
            main: "#d4d5d5"
        },
        secondary: {
            main: "#d4d5d5"
        }
    },
    components: {
        MuiIconButton: {
          styleOverrides: {
            sizeMedium: {
              color: "#d4d5d5"
            }
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: "#d4d5d5"
            }
          }
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: "#d4d5d5"
            }
          }
        }
      }
});

export default PrimaryTheme;