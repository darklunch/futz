// ==UserScript==
// @name         FUTz: The Fair Use & Accessibility Toolkit
// @namespace    https://github.com/darklunch/futz/
// @version      1.0
// @description  Provides a suite of client-side tools to aid researchers, journalists, and users with disabilities in accessing and reading web content under the Fair Use doctrine.
// @author       unsoundlogic (Dark Lunch Studios)
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_cookie
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_openInTab
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    /**
     * @file A client-side toolkit for exercising Fair Use and improving web accessibility.
     * This script provides user-controlled tools and does not perform any automatic actions.
     * The user is solely responsible for ensuring their use of this tool is lawful.
     */

    // --- 1. STORAGE MANIPULATION ---

    /**
     * Clears all client-side storage (Cookies, Local Storage, Session Storage).
     * Useful for resetting site state or metered access for research purposes.
     */
    function clearAllStorageAndReload() {
        GM_notification({ text: 'Clearing all site storage...', title: 'FUTz Toolkit', timeout: 2000 });
        localStorage.clear();
        sessionStorage.clear();
        GM_cookie('list', { url: window.location.href }, (cookies, error) => {
            if (error || !cookies || cookies.length === 0) {
                GM_notification({ text: 'Local/Session storage cleared. No cookies. Reloading...', title: 'FUTz Toolkit', timeout: 2000 });
                window.location.reload();
                return;
            }
            let clearedCount = 0;
            const totalCookies = cookies.length;
            cookies.forEach(cookie => {
                GM_cookie('delete', { name: cookie.name, domain: cookie.domain, path: cookie.path }, () => {
                    clearedCount++;
                    if (clearedCount === totalCookies) {
                        GM_notification({ text: `All storage cleared (${clearedCount} cookies). Reloading...`, title: 'FUTz Toolkit', timeout: 2000 });
                        window.location.reload();
                    }
                });
            });
        });
    }

    // --- 2. ON-PAGE DOM MANIPULATION ---

    /**
     * Aggressively removes common obstructive elements like overlays, modals, and banners.
     * Restores scrolling capabilities. Aids in accessing content blocked by visual annoyances.
     */
    function aggressiveDomReset() {
        GM_notification({ text: 'Removing obstructive elements...', title: 'FUTz Toolkit', timeout: 3000 });
        GM_addStyle(`body, html { overflow: auto !important; height: auto !important; position: static !important; } * { filter: none !important; }`);
        const selectors = ['[class*="paywall"]', '[class*="modal"]', '[class*="overlay"]', '[id*="paywall"]', '[id*="modal"]', '[id*="overlay"]', '[class*="ad-"]'];
        document.querySelectorAll(selectors.join(', ')).forEach(el => el.remove());
        document.querySelectorAll('*').forEach(el => {
            if (window.getComputedStyle(el).position === 'fixed' || window.getComputedStyle(el).position === 'sticky') {
                el.remove();
            }
        });
        GM_notification({ text: 'Visual reset complete. Obstructive elements removed.', title: 'FUTz Toolkit', timeout: 3000 });
    }

    /**
     * Attempts to identify the main article content and rebuilds it in a clean, readable view.
     * This is an accessibility feature to help users focus on content without distractions.
     */
    function enterReaderMode() {
        GM_notification({ text: 'Entering Reader Mode...', title: 'FUTz Toolkit', timeout: 2000 });
        let articleNode;
        const selectors = ['article', '[class*="article-body"]', '[class*="post-content"]', '[id*="article"]', 'main'];
        for (let selector of selectors) {
            articleNode = document.querySelector(selector);
            if (articleNode) break;
        }
        if (!articleNode) {
            GM_notification({ text: 'Could not identify main article content.', title: 'FUTz Toolkit', timeout: 3000 });
            return;
        }
        const articleHtml = articleNode.innerHTML;
        document.body.innerHTML = '';
        GM_addStyle(`
            #reader-view-container { font-family: serif; line-height: 1.6; font-size: 18px; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #f9f9f9; color: #111; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
            #reader-view-container img, figure, video { max-width: 100%; height: auto; margin: 20px 0; }
            #reader-view-container a { color: #005a9c; text-decoration: none; }
            #reader-view-container a:hover { text-decoration: underline; }
            #reader-view-container button { font-family: sans-serif; margin-top: 20px; padding: 10px 15px; cursor: pointer; border: 1px solid #ccc; background-color: #f0f0f0; }
        `);
        const container = document.createElement('div');
        container.id = 'reader-view-container';
        container.innerHTML = articleHtml;
        const reloadButton = document.createElement('button');
        reloadButton.textContent = 'Exit Reader Mode & Reload Page';
        reloadButton.onclick = () => window.location.reload();
        container.prepend(reloadButton);
        document.body.appendChild(container);
        document.body.style.backgroundColor = '#e9e9e9';
    }

    // --- 3. EXTERNAL LOOKUP & REFERER TOOLS ---

    /**
     * Finds the main headline of the article for use in search lookups.
     * @returns {string|null} The headline text or null if not found.
     */
    function getArticleHeadline() {
        const selectors = ['h1', '.headline', '[class*="headline"]', '[id*="headline"]'];
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element.textContent.trim();
        }
        return null;
    }

    /**
     * Opens a Google search for the current article's headline.
     * This helps users find the canonical source or other versions of an article.
     */
    function searchHeadlineOnGoogle() {
        const headline = getArticleHeadline();
        if (headline) {
            GM_notification({ text: 'Searching headline on Google...', title: 'FUTz Toolkit', timeout: 2000 });
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(headline)}`;
            GM_openInTab(googleUrl, { active: true });
        } else {
            GM_notification({ text: 'Could not find a clear article headline to search.', title: 'FUTz Toolkit', timeout: 3000 });
        }
    }

    /**
     * Redirects to an external archiving or caching service.
     * A crucial tool for researchers looking for historical snapshots of a page.
     */
    function redirectToExternalService() {
        const services = [
            { name: 'Archive.today / .ph', url: 'https://archive.today/latest/' },
            { name: '12ft.io', url: 'https://12ft.io/' },
            { name: 'Google Web Cache', url: 'https://webcache.googleusercontent.com/search?q=cache:' }
        ];
        let promptText = 'Choose an external lookup service:\n';
        services.forEach((s, i) => { promptText += `${i + 1}. ${s.name}\n`; });
        const choice = prompt(promptText, "1");
        if (choice === null) return;
        const index = parseInt(choice, 10) - 1;
        if (index >= 0 && index < services.length) {
            GM_notification({ text: `Redirecting to ${services[index].name}...`, title: 'FUTz Toolkit', timeout: 2000 });
            window.location.href = services[index].url + window.location.href;
        }
    }

    // --- Register All Menu Commands ---
    GM_registerMenuCommand("Clear Site Storage & Reload", clearAllStorageAndReload);
    GM_registerMenuCommand("Remove Obstructive Elements", aggressiveDomReset);
    GM_registerMenuCommand("Enter Reader Mode", enterReaderMode);
    GM_registerMenuCommand("Search Headline on Google", searchHeadlineOnGoogle);
    GM_registerMenuCommand("Lookup in External Archives", redirectToExternalService);

})();
