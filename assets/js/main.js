// Scroll to top button functionality
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Generate Table of Contents for blog posts
function generateTOC() {
    const content = document.getElementById('blog-content');
    const tocList = document.getElementById('toc-list');

    if (!content || !tocList) return;

    const headings = content.querySelectorAll('h2, h3');
    tocList.innerHTML = '';

    headings.forEach((heading, index) => {
        // Add ID to heading for linking
        const id = `heading-${index}`;
        heading.id = id;

        // Create TOC item
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            a.classList.add('toc-h3');
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Active TOC highlighting on scroll
    setupTOCActiveState();
}

// Active TOC highlighting on scroll
function setupTOCActiveState() {
    const tocLinks = document.querySelectorAll('#toc-list a');

    window.addEventListener('scroll', () => {
        let current = '';

        document.querySelectorAll('#blog-content h2, #blog-content h3').forEach(heading => {
            const top = heading.offsetTop;
            if (window.scrollY >= top - 100) {
                current = heading.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add language labels to code blocks
function addCodeLanguageLabels() {
    if (typeof Prism === 'undefined') return;
    
    document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
        const match = pre.className.match(/language-(\w+)/);
        if (match) {
            const language = match[1];
            const label = document.createElement('div');
            label.className = 'code-language-label';
            label.textContent = language;
            pre.style.position = 'relative';
            pre.insertBefore(label, pre.firstChild);
        }
    });
}

// Make nav logo clickable
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll to top
    initScrollTop();

    // Highlight Engine: Replaces ::y::text:: with pastel spans
    html = html.replace(/::y::(.*?)::/g, '<span class="hlt-y">$1</span>');
    html = html.replace(/::b::(.*?)::/g, '<span class="hlt-b">$1</span>');
    html = html.replace(/::p::(.*?)::/g, '<span class="hlt-p">$1</span>');
    html = html.replace(/::g::(.*?)::/g, '<span class="hlt-g">$1</span>');
    html = html.replace(/::r::(.*?)::/g, '<span class="hlt-r">$1</span>');
    body.innerHTML = html;
    
    // Generate TOC if on blog post page
    if (document.getElementById('blog-content')) {
        generateTOC();
    }
    
    // Add code language labels
    addCodeLanguageLabels();
});