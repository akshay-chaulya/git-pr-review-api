import axios from 'axios';

const fetchDiff = async (prDiffUrl: string) => {
    try {
        const response = await axios.get(prDiffUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3.diff',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the diff:', error);
        return null;
    }
};

export default fetchDiff