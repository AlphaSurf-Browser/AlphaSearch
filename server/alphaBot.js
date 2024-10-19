const axios = require('axios');
const cheerio = require('cheerio');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');

class AlphaBot {
    constructor(githubToken, repoOwner, repoName) {
        this.visitedUrls = new Set();
        this.crawlResults = [];
        this.githubToken = githubToken; // GitHub personal access token
        this.repoOwner = repoOwner; // GitHub repository owner
        this.repoName = repoName; // GitHub repository name
    }

    async crawl(url) {
        if (this.visitedUrls.has(url)) return;
        this.visitedUrls.add(url);

        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const pageContent = $('body').text();

            console.log(`Crawling: ${url}`);
            console.log(`Title: ${$('title').text()}`);

            this.crawlResults.push({ url, title: $('title').text(), content: pageContent });

            $('a').each((_, element) => {
                const link = $(element).attr('href');
                if (link && !this.visitedUrls.has(link) && this.isValidUrl(link)) {
                    this.crawl(link);
                }
            });
        } catch (error) {
            console.error(`Failed to crawl ${url}:`, error.message);
        }
    }

    isValidUrl(url) {
        return url.startsWith('http') || url.startsWith('https');
    }

    async saveResults() {
        const branchName = `crawl-results-${Date.now()}`;
        const filePath = 'crawl-results.json';
        fs.writeFileSync(filePath, JSON.stringify(this.crawlResults, null, 2));

        const octokit = new Octokit({ auth: this.githubToken });
        await octokit.git.createRef({
            owner: this.repoOwner,
            repo: this.repoName,
            ref: `refs/heads/${branchName}`,
            sha: (await octokit.repos.getBranch({ owner: this.repoOwner, repo: this.repoName, branch: 'main' })).data.commit.sha,
        });

        await octokit.repos.createOrUpdateFileContents({
            owner: this.repoOwner,
            repo: this.repoName,
            path: filePath,
            message: `Add crawl results`,
            content: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
            branch: branchName,
        });

        await octokit.pulls.create({
            owner: this.repoOwner,
            repo: this.repoName,
            title: 'Crawl Results',
            head: branchName,
            base: 'main',
            body: 'This pull request contains the results of the site crawl.',
        });

        console.log(`Crawl results saved and PR created: ${branchName}`);
    }
}

module.exports = AlphaBot;
