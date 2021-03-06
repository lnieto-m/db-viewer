import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Modal from '@mui/material/Modal';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import { Box } from "@mui/system";
import { useState } from "react";

export interface Fanart {
    author: string;
    url: string;
    postDate: string;
    tags: string[];
}

interface props {
    entryList: Fanart[];
    profilePage: boolean;
}

function Fanarts(props: props) {

    const [open, setOpen] = useState(false);
    const [modalLink, setModalLink] = useState('');
    const handleOpen = (url: string) => {
        setModalLink(url);
        setOpen(true);
        
    }
    const handleClose = () => {
        setOpen(false);
        setModalLink('');
    }

    const saveImage = (url: string) => {
        const name = url.split('/');
        saveAs(url, name[name.length - 1]);
    }

    const setTitle = function(item: Fanart): string {
        let title: string = "";
        if (!props.profilePage) { title += `@${item.author} -- `}
        title += `Posted: ${new Date(item.postDate).toUTCString()}`;
        return title;
    } 

    return(
    <ImageList
        sx={{
            width: 1020,
            height: 575,
            margin: 'auto',
            marginBottom: '0.5em',
            transform: 'translateZ(0)'
        }}
        rowHeight={330}
        cols={3}
        gap={1}
    >
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <>
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,
                        maxWidth: '90%',
                        maxHeight: '90%'
                    }}
                    component="img"
                    onClick={() => window.open(modalLink, '_blanck').focus()}
                    alt={modalLink}
                    src={modalLink}
                >
                </Box>
            </>
        </Modal>
        {props.entryList.map((item) => {
            return (<ImageListItem key={item.url} cols={1} rows={1}>
                <Box
                    onClick={(e) => { handleOpen(item.url) }}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/db-viewer/404.png"
                    }}
                    component='img'
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        backgroundColor: 'black'
                    }}
                    alt={item.author}
                    src={item.url}
                    loading="lazy"
                />
                <div title={setTitle(item)}>
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        title={<a style={{ textDecoration: 'none', color: 'white'}} href={`https://www.twitter.com/${item.author}`}>{setTitle(item)}</a>}
                        position="top"
                        actionIcon={
                            <IconButton
                                sx={{ color: 'white'}}
                                aria-label={item.author}
                                onClick={(e) => saveImage(item.url)}
                            >
                                <FileDownloadIcon />
                            </IconButton>
                        }
                    />
                </div>
            </ImageListItem>);
        })}
    </ImageList>
    );
}

export default Fanarts;