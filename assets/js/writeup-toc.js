// contents for write-ups and blog posts, built from section headings.
// wide screens: fixed list in the right margin. smaller screens: a button
// at the top right that opens the same list as a panel.
(function () {
    function init() {
        let targets = [...document.querySelectorAll('main section[id]')]
            .filter(s => s.querySelector('h2'))
            .map(s => ({ el: s, id: s.id, text: s.querySelector('h2').textContent }));

        // blog posts: plain h2s inside the article
        if (!targets.length) {
            targets = [...document.querySelectorAll('#blog-content h2')].map((h, i) => {
                if (!h.id) h.id = 'section-' + (i + 1);
                return { el: h, id: h.id, text: h.textContent };
            });
        }
        if (targets.length < 3) return;

        const style = document.createElement('style');
        style.textContent = `
            .wtoc {
                position: fixed; top: 120px; width: 190px; z-index: 900; box-sizing: border-box;
                left: calc(50% + 540px + 40px);
                max-height: calc(100vh - 160px); overflow-y: auto;
                padding-left: 16px; border-left: 1px solid var(--hair, #e4e4df);
                font-family: var(--mono, "JetBrains Mono", monospace); font-size: .72rem; line-height: 1.5;
            }
            .wtoc p { margin: 0 0 12px; color: var(--muted, #56564f); }
            .wtoc a { display: block; margin-bottom: 8px; color: var(--muted, #56564f); text-decoration: none; transition: color 160ms ease; }
            .wtoc a:hover, .wtoc a.on { color: var(--ink, #000); }
            .wtoc-btn { display: none; }

            @media (max-width: 1519px) {
                .wtoc-btn {
                    display: grid; place-items: center;
                    position: fixed; top: 84px; right: 16px; z-index: 950;
                    width: 40px; height: 40px; padding: 0;
                    background: rgba(255, 255, 255, .94); backdrop-filter: blur(6px);
                    border: 1px solid var(--hair, #e4e4df); border-radius: 6px;
                    color: var(--ink, #000); cursor: pointer;
                    transition: transform 160ms cubic-bezier(.23, 1, .32, 1), border-color 160ms ease;
                }
                .wtoc-btn:active { transform: scale(.96); }
                .wtoc-btn[aria-expanded="true"] { border-color: var(--ink, #000); }
                .wtoc {
                    top: 132px; right: 16px; left: auto; width: min(280px, calc(100vw - 32px));
                    max-height: calc(100vh - 160px);
                    padding: 14px 16px; background: #fff;
                    border: 1px solid var(--hair, #e4e4df); border-radius: 6px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, .06);
                    font-size: .78rem;
                    transform-origin: top right;
                    transition: opacity 180ms ease, transform 180ms cubic-bezier(.23, 1, .32, 1), visibility 180ms;
                }
                .wtoc:not(.open) { opacity: 0; transform: scale(.97) translateY(-4px); visibility: hidden; }
            }
            @media (max-width: 768px) {
                .wtoc-btn { top: 60px; right: 12px; }
                .wtoc { top: 108px; right: 12px; }
            }
            @media (prefers-reduced-motion: reduce) { .wtoc, .wtoc-btn { transition: none; } }
        `;
        document.head.appendChild(style);

        const panel = document.createElement('nav');
        panel.className = 'wtoc';
        panel.id = 'wtoc';
        panel.setAttribute('aria-label', 'Contents');
        panel.innerHTML = '<p>contents</p>' + targets
            .map(t => `<a href="#${t.id}">${t.text}</a>`).join('');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'wtoc-btn';
        btn.setAttribute('aria-label', 'Contents');
        btn.setAttribute('aria-controls', 'wtoc');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 4.5h9M6 9h9M6 13.5h9"/><circle cx="2.75" cy="4.5" r=".75" fill="currentColor" stroke="none"/><circle cx="2.75" cy="9" r=".75" fill="currentColor" stroke="none"/><circle cx="2.75" cy="13.5" r=".75" fill="currentColor" stroke="none"/></svg>';

        const setOpen = open => {
            panel.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', String(open));
        };
        btn.addEventListener('click', e => { e.stopPropagation(); setOpen(!panel.classList.contains('open')); });
        panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('click', e => { if (!panel.contains(e.target)) setOpen(false); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

        document.body.append(btn, panel);

        const links = panel.querySelectorAll('a');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id));
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        targets.forEach(t => observer.observe(t.el));
    }

    // run after other DOMContentLoaded handlers (the blog highlighter rewrites the article html)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init));
    } else {
        init();
    }
})();
