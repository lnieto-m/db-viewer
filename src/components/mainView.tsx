import React, { useReducer, useState } from 'react'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import mainViewReducer, { initialState } from '../reducer/mainViewReducer';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Container, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import list from './tagList.json';
import axios from 'axios';
import Fanarts, { Fanart } from './fanartsView';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme({
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
})

function MainView() {

    const [state, dispatch] = useReducer(mainViewReducer, initialState);
    const [fanartList, setFanartList] = useState<Fanart[]>([]);

    const requestFanartData = async () => {
        let tags: string[] = [];
        Object.keys(state.filters).forEach(function(key, index) {
            if (state.filters[key] === true) { tags.push(list[key]) }
        })
        dispatch({ type: 'setLoading', payload: true});
        const resp = await axios.get('https://fanart-bot.herokuapp.com/getFanarts', {
            params: {
                startDate: state.dates.startDate,
                endDate: state.dates.endDate,
                tags: tags
            }
        });
        setFanartList(resp.data);
        dispatch({type: 'setLoading', payload: false});
    }

    return (<Container maxWidth='lg' sx={{ flexGrow: 1}}>
        <ThemeProvider theme={theme}>
            <Container sx={{
                padding: '1em',
                color: '#d4d5d5'
            }}>
                <Stack spacing={1} direction="row" alignItems='center' justifyContent="center">
                    <Button color="primary" disabled={state.loading} variant={!state.filters.inart ? "outlined" : "contained"} id='inart' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #inart</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.callillust ? "outlined" : "contained"} id='callillust' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #callillust</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.ameliart ? "outlined" : "contained"} id='ameliart' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #ameliart</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.gawrt ? "outlined" : "contained"} id='gawrt' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #gawrt</Button>

                </Stack>
                <Stack spacing={1} direction="row" alignItems='center' justifyContent="center">
                    <Button color="primary" disabled={state.loading} variant={!state.filters.artsofashes ? "outlined" : "contained"} id='artofashes' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #artsofashes</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.irysart ? "outlined" : "contained"} id='irysart' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #irysart</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.kronillust ? "outlined" : "contained"} id='kronillust' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #kronillust</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.drawmei ? "outlined" : "contained"} id='drawmei' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #drawmei</Button>
                </Stack>
                <Stack spacing={1} direction="row" alignItems='center' justifyContent="center">
                    <Button color="primary" disabled={state.loading} variant={!state.filters.illustraybae ? "outlined" : "contained"} id='illustraybae' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #illustraybae</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.galaxillust ? "outlined" : "contained"} id='galaxillust' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #galaxillust</Button>
                    <Button color="primary" disabled={state.loading} variant={!state.filters.finefaunart ? "outlined" : "contained"} id='finefaunart' onClick={(e) => dispatch({ type: "addTag", payload: e.currentTarget.id})}> #finefaunart</Button>
                </Stack>
            </Container>

            <Stack spacing={1} direction={"row"} alignItems='center' justifyContent="center" sx={{ padding: '0.4em'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        disabled={state.loading}
                        renderInput={(props) => <TextField {...props} />}
                        label="StartDate"
                        value={state.dates.startDate}
                        onChange={(newValue) => dispatch({ type: "updateStartDate", payload: newValue})}
                        maxDateTime={state.dates.endDate}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        disabled={state.loading}
                        renderInput={(props) => <TextField {...props} />}
                        label="EndDate"
                        value={state.dates.endDate}
                        onChange={(newValue) => dispatch({ type: "updateEndDate", payload: newValue})}
                        maxDateTime={new Date(Date.now())}
                    />
                </LocalizationProvider>
            </Stack>

            <LoadingButton
                sx={{ padding: '0.4em' }}
                loading={state.loading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                onClick={(e) => requestFanartData()}
            >
                Go !
            </LoadingButton>

            <Container
                sx={{
                    display: 'flex'
                }}
            >
                {state.firstLoaded
                    ? <>{fanartList.length > 0
                        ? <Fanarts entryList={fanartList}/>
                        : <Container sx={{ justifyContent: 'center' }}> 
                            <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: '#d4d5d5', paddingTop: '48px'}}
                            >
                                Nothing to see here...
                            </Typography> 
                        </Container>
                        }</>
                    : <></>
                }
            </Container>
        </ThemeProvider>
    </Container>)
}

export default MainView;