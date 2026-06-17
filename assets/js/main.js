/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();

/* Post share button */
(function () {
    const shareButton = document.querySelector('.gh-button-share');
    if (!shareButton) return;
    if (shareButton.dataset.shareReady === 'true') return;
    shareButton.dataset.shareReady = 'true';

    const originalText = shareButton.textContent.trim();
    const shareUrl = shareButton.dataset.shareUrl || window.location.href;
    const shareTitle = shareButton.dataset.shareTitle || document.title;

    function showTemporaryLabel(label) {
        shareButton.textContent = label;
        setTimeout(function () {
            shareButton.textContent = originalText;
        }, 1800);
    }

    async function copyShareUrl() {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareUrl);
        } else {
            const input = document.createElement('textarea');
            input.value = shareUrl;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.left = '-9999px';
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
        }
    }

    shareButton.addEventListener('click', async function (event) {
        event.preventDefault();

        try {
            if (navigator.share) {
                await navigator.share({
                    title: shareTitle,
                    url: shareUrl
                });
                return;
            }

            await copyShareUrl();
            showTemporaryLabel('Link kopyalandı');
        } catch (error) {
            if (error && error.name === 'AbortError') return;
            showTemporaryLabel('Kopyalanamadı');
        }
    });
})();
