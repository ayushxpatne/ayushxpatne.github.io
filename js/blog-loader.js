// Load and parse markdown using marked.js
// Include this CDN in your HTML: https://cdn.jsdelivr.net/npm/marked/marked.min.js

class BlogLoader {
    constructor() {
        this.blogIndex = null;
    }

    async init() {
        try {
            const response = await fetch('blogs/index.json');
            this.blogIndex = await response.json();
        } catch (error) {
            console.error('Failed to load blog index:', error);
        }
    }

    async loadFeaturedPosts(containerId) {
        if (!this.blogIndex) await this.init();

        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        this.blogIndex.featured.forEach(post => {
            const card = document.createElement('div');
            card.className = 'featured-card';
            card.innerHTML = `
                <span class="featured-label mono">Featured ${post.type}</span>
                <h3 class="card-title">${post.title}</h3>
                <p class="card-meta mono">${post.date} · ${post.readTime}</p>
                <p class="card-description">${post.excerpt}</p>
                <a href="${post.slug ? `blog.html?post=${post.slug}` : post.link}" class="card-link mono">${post['button-text'] || 'Read the full story'} →</a>
            `;
            container.appendChild(card);
        });
    }

    async loadRecentPosts(containerId, limit = 3) {
        if (!this.blogIndex) await this.init();

        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const posts = this.blogIndex.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);

        posts.forEach(post => {
            const card = document.createElement('a');
            card.href = `blog.html?post=${post.slug}`;
            card.className = 'post-card';
            card.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p class="card-meta mono">${post.date} · ${post.readTime}</p>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag mono">${tag}</span>`).join('')}
                </div>
            `;
            container.appendChild(card);
        });
    }

    async loadAllPosts(containerId) {
        if (!this.blogIndex) await this.init();

        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const posts = this.blogIndex.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        posts.forEach(post => {
            const card = document.createElement('a');
            card.href = `blog.html?post=${post.slug}`;
            card.className = 'post-card';
            card.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p class="card-meta mono">${new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} · ${post.readTime}</p>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag mono">${tag}</span>`).join('')}
                </div>
            `;
            container.appendChild(card);
        });
    }

    async loadBlogPost(slug) {
        try {
            const response = await fetch(`blogs/${slug}.md`);
            const markdown = await response.text();

            // Parse markdown to HTML
            const html = marked.parse(markdown);

            document.getElementById('blog-content').innerHTML = html;

            // Generate table of contents
            this.generateTOC();

            // Add syntax highlighting if available
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }

        } catch (error) {
            console.error('Failed to load blog post:', error);
            document.getElementById('blog-content').innerHTML = '<p>Failed to load blog post.</p>';
        }
    }

    generateTOC() {
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
        this.setupTOCActiveState();
    }

    setupTOCActiveState() {
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

    getPostMetadata(slug) {
        if (!this.blogIndex) return null;
        return this.blogIndex.posts.find(post => post.slug === slug);
    }
}

// Initialize blog loader
const blogLoader = new BlogLoader();

// Utility function for scroll to top button
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

// Make nav logo clickable
document.addEventListener('DOMContentLoaded', () => {
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.style.cursor = 'pointer';
        navLogo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});