import axios from "axios";

async function ResolveTwitterShortURL(link: string) {
    const rgx = /(https|http):\/\/(.+)">/g;
    try {
        const resp = await axios({
            method: 'get',
            url: link,
            maxRedirects: 1
        })
        console.log(resp.data)
        const match = (resp.data as string).match(rgx)[0].replace('">', '');
        return match;
    } catch (e) {
        console.error(e);
        return link;
    }
} 

export default ResolveTwitterShortURL;