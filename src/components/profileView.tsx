import { LineAxisOutlined } from "@mui/icons-material";
import { Container, Autocomplete, TextField, Typography, Stack, ThemeProvider, AutocompleteChangeReason } from "@mui/material";
import axios from "axios";
import { profile } from "console";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState } from "react";
import FollowerCount from "../utils/metricCountFormatter";
import ResolveShortURL from "../utils/shortURLResolver";
import PrimaryTheme from "../utils/themes";
import Fanarts, { Fanart } from "./fanartsView";
import '../styles/profileView.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

interface ProfileInfo {
    username: string;
    name: string;
    id: string;
    url: string;
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
    const [inputValue, setInputValue] = useState<string>('');
    const [fanartList, setFanartList] = useState<Fanart[]>([]);
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const requestFanartList = async (query: string) => {
        try {
            setLoading(true);
            const resp = await axios.get('https://fanart-bot.herokuapp.com/User', {
                params: {
                    username: query
                }
            });
            if (resp.data.userData.url) {
                const urlDecoded = await ResolveShortURL(resp.data.userData.url);
                resp.data.userData.url = urlDecoded;
            }
            setProfileInfo(resp.data.userData);
            setFanartList(resp.data.fanartList);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
        
    }

    const requestOptions = async (query: string) => {
        try {
            const resp = await axios.get('https://fanart-bot.herokuapp.com/UsersCompletion', {
                params: {
                    username: query
                }
            });
            setOptions(resp.data);
        } catch (e) {
            console.error(e);
        }
    }

    const debouncedRequest = useMemo(() => debounce(value => requestOptions(value), 500), [inputValue]);

    // useEffect(() => {
    //     return () => {
    //         debouncedRequest.cancel();
    //     }
    // }, [debouncedRequest]);

    const inputChangeHandler = (event, inputValue: string) => {
        setInputValue(inputValue);
        if (inputValue.length >= 3) { 
            debouncedRequest(inputValue);
            // requestOptions(inputValue);
        } else {
            // debouncedRequest.cancel();
            setOptions([]);
        }
    }

    const handleSelect = async (event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteChangeReason) => {
        if (reason !== 'selectOption') return;
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
                disabled={loading}
                onInputChange={inputChangeHandler}
                includeInputInList
                onChange ={handleSelect}
                renderInput={(params) => <TextField {...params} label="Username" fullWidth/>}
            />
            <Container disableGutters maxWidth='md' sx={{ display: 'flex'}}>
                <Backdrop
                    open={loading}
                    sx={{ zIndex: 3}}
                >
                    <CircularProgress sx={{ color: 'white' }} />
                </Backdrop>
                {profileInfo?
                    <Stack sx={{width: '100%'}} direction='column' spacing={2}>
                        <Stack direction={{xs: 'column', lg: 'row'}} spacing={1} sx={{padding: '12px 12px 0px 12px'}}>
                            <Box
                                component="img"
                                sx={{
                                    borderRadius: '50%',
                                    width: '134px',
                                    height: '134px',
                                    margin: { xs: 'auto', lg:0}
                                }}
                                src={profileInfo.profile_image_url.replace('normal', '400x400')}
                                alt="Profile picture"
                            />
                            <Stack direction='column'>
                                <Typography
                                    variant="h4"
                                    noWrap
                                    component="div"
                                    sx={{ textAlign: {xs: 'center', lg: 'left'}, color: PrimaryTheme.palette.primary.main }}
                                >
                                    {profileInfo.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{ textAlign: {xs: 'center', lg: 'left'}, color: PrimaryTheme.palette.primary.main }}
                                    component="div"
                                >
                                    @{profileInfo.username}
                                </Typography>
                                <Typography sx={{ textAlign: {xs: 'center', lg: 'left'}, color: PrimaryTheme.palette.primary.main}} >
                                    {profileInfo.description}
                                </Typography>
                                <Typography sx={{ margin: { xs: 'auto', lg:0}, color: PrimaryTheme.palette.primary.main, display: 'flex', justifyContent: 'flex-start'}} >
                                    <TwitterIcon /><FollowerCount count={profileInfo.public_metrics.followers_count} />
                                    {profileInfo.url
                                        ? <><LinkIcon /><a className="profile-link" href={profileInfo.url}> {profileInfo.url.replace(/https:\/\/www.|https:\/\//g, '')} </a></>
                                        : <></>
                                    }
                                </Typography>
                            </Stack>
                        </Stack>
                        <Container disableGutters sx={{ display: 'flex', marginTop: 0, borderTop: '1px solid #2a2b30'}}>
                            <Fanarts entryList={fanartList} profilePage />
                        </Container>
                        </Stack>
                    :<></>
                }
            </Container> 
        </ThemeProvider>
    </Container>);
}

export default ProfileView;