const puppeteer = require('puppeteer');

async function extractMetrics(url) {

    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    

    if (!isValidURL(url)) {
        console.error('Invalid URL:', url);
        return {
            fcp: null,
            lcp: null,
        };
    }
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    try{
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        
        const metrics = await page.evaluate(() => {
            const performanceEntries = performance.getEntriesByType('paint');
            const fcp = performanceEntries.find(entry => entry.name === 'first-contentful-paint');
            const lcpEntries = performance.getEntriesByName('largest-contentful-paint');
            console.log('LCP Entries:', lcpEntries);

            return {
                fcp: fcp ? fcp.startTime : null,
                lcp: lcpEntries.length > 0 ? lcpEntries[0].startTime : null
            };
        });
        return metrics;
    }catch(err){
        console.error('Error extracting metrics:', err);
        return {
            fcp: null,
            lcp: null
        };
    }finally{
        await browser.close();
    }
}

module.exports = extractMetrics;