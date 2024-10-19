const express = require('express');
const AlphaBot = require('./alphaBot');

const router = express.Router();
const githubToken = process.env.GITHUB_TOKEN; // Store your GitHub token in environment variables
const repoOwner = process.env.REPO_OWNER; // GitHub repository owner
const repoName = process.env.REPO_NAME; // GitHub repository name

router.post('/start-crawl', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const alphaBot = new AlphaBot(githubToken, repoOwner, repoName);
    await alphaBot.crawl(url);
    await alphaBot.saveResults();
    res.status(200).json({ message: 'Crawling started and results saved!' });
});

module.exports = router;
