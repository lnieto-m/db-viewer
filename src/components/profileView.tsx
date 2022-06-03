import { Container, Autocomplete, TextField, Typography, Stack, ThemeProvider } from "@mui/material";
import axios from "axios";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState } from "react";
import PrimaryTheme from "../utils/themes";
import Fanarts, { Fanart } from "./fanartsView";

interface ProfileInfo {
    username: string;
    name: string;
    id: string;
    description: string;
    public_metrics: {
        followers_count: number;
        following_count: number;
        tweet_count: number;
        listed_count: number;
    };
    profile_image_url: string;
}

function ProfileView() {

    const [options, setOptions] = useState<string[]>([]);
    const [value, setValue] = useState<string>('');
    const [fanartList, setFanartList] = useState<Fanart[]>([]);
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>(null);

    const requestFanartList = async (query: string) => {
        const resp = await axios.get('https://fanart-bot.herokuapp.com/User', {
            params: {
                username: query
            }
        });
        setProfileInfo(resp.data.userData);
        setFanartList(resp.data.fanartList);
    }

    const requestOptions = async (query: string) => {
        const resp = await axios.get('https://fanart-bot.herokuapp.com/UsersCompletion', {
            params: {
                username: query
            }
        });
        setOptions(resp.data);
    }

    const throttledRequest = useMemo(
        () => throttle(requestOptions, 500),
        [value]
    )

    useEffect(() => {
        return () => {
            throttledRequest.cancel();
        }
    }, []);

    const inputChangeHandler = async (event, inputValue: string) => {
        setValue(inputValue);
        if (value.length >= 3) { 
            throttledRequest(value);
        } else {
            throttledRequest.cancel();
            setOptions([]);
        }
    }

    const handleKeydown = async (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter') return;
        await requestFanartList(value);
    }

    return (
    <Container
        maxWidth='md'
        disableGutters
        sx={{
            flexGrow: 1,
            padding: '0px',
            borderRight: '1px solid #2a2b30',
            borderLeft: '1px solid #2a2b30'
        }}
    >
        <ThemeProvider theme={PrimaryTheme}>
            <Autocomplete
                sx={{ margin: '12px 12px 0px 12px'}}
                id="test"
                filterOptions={(x) => x}
                options={options}
                color='primary'
                onInputChange={inputChangeHandler}
                onKeyDown={(e) => handleKeydown(e)}
                renderInput={(params) => <TextField {...params} label="Username" fullWidth/>}
            />
            <Container disableGutters maxWidth='md' sx={{ display: 'flex'}}>
                {profileInfo?
                    <Stack sx={{width: '100%'}} direction='column' spacing={2}>
                        <Stack direction='row' spacing={1} sx={{padding: '12px 12px 0px 12px'}}>
                            <img
                                style={{
                                    borderRadius: '50%',
                                    width: '134px',
                                    height: '134px',
                                }}
                                src={profileInfo.profile_image_url.replace('normal', '400x400')}
                                alt="Profile picture"
                            />
                            <Stack direction='column'>
                                <Typography
                                    variant="h4"
                                    noWrap
                                    component="div"
                                    sx={{ textAlign: 'left', color: PrimaryTheme.palette.primary.main }}
                                >
                                    {profileInfo.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{ textAlign: 'left', color: PrimaryTheme.palette.primary.main }}
                                    component="div"
                                >
                                    @{profileInfo.username}
                                </Typography>
                                <Typography sx={{ textAlign: 'left' , color: PrimaryTheme.palette.primary.main}} >
                                    {profileInfo.description}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Container disableGutters sx={{ display: 'flex', marginTop: 0, borderTop: '1px solid #2a2b30'}}>
                            <Fanarts entryList={fanartList}/>
                        </Container>
                        </Stack>
                    :<></>
                }
            </Container> 
        </ThemeProvider>
    </Container>);
}

export default ProfileView;