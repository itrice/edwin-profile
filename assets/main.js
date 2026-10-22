/* ==========================================================================
   安仕平 · 个人主页 —— 交互脚本
   无依赖，原生 ES5+ / 现代浏览器
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 2. 导航：滚动分隔线 + 阅读进度 ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('navProgress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) {
      if (y > 20) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- 3. 导航当前区块高亮 ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a')
  );
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute('href');
      var el = id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  function setActive() {
    var y = (window.scrollY || document.documentElement.scrollTop) + 120;
    var current = null;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= y) current = s;
    });
    navLinks.forEach(function (a) { a.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(setActive);
  }, { passive: true });
  setActive();

  /* ---------- 4. 区块进入动画（IntersectionObserver）----------
     注意：数据渲染会往 DOM 里插入新的 .reveal 元素，
     所以观察必须在渲染完成之后进行（见文件末尾 initReveal）。 */
  var io = null;

  function initReveal() {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    revealEls.forEach(function (el) {
      if (!el.classList.contains('is-visible')) io.observe(el);
    });
  }

  /**
   * 仅允许 <strong> 标签的内联强调，其余内容一律按文本处理。
   * 数据来自本地文件，但仍按白名单方式避免注入。
   */
  function setEmphasizedText(parent, raw) {
    var parts = String(raw).split(/(<strong>[\s\S]*?<\/strong>)/g);
    parts.forEach(function (part) {
      if (!part) return;
      var m = part.match(/^<strong>([\s\S]*)<\/strong>$/);
      if (m) parent.appendChild(el('strong', null, m[1]));
      else parent.appendChild(document.createTextNode(part));
    });
  }

  /* ---------- 5. 个人信息渲染（首屏 / 关于 / 页脚）---------- */
  function renderProfile(p) {
    if (!p) return;

    function setText(id, value) {
      var node = document.getElementById(id);
      if (node && value != null) node.textContent = value;
    }

    // 姓名 / 英文标注
    setText('profileName', p.name);
    setText('profileHeroTitle', p.heroTitle);
    setText('profileCopyright', p.name);

    var brand = document.querySelector('.nav-brand');
    if (brand && p.name) {
      Array.prototype.forEach.call(brand.childNodes, function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) n.textContent = p.name;
      });
      var brandEn = brand.querySelector('.en');
      if (brandEn && p.enName) brandEn.textContent = p.enName;
    }

    // 定位（用「/」分隔）
    var rolesEl = document.getElementById('profileRoles');
    if (rolesEl && p.roles && p.roles.length) {
      rolesEl.innerHTML = '';
      p.roles.forEach(function (r, i) {
        if (i > 0) rolesEl.appendChild(el('span', 'sep', '/'));
        rolesEl.appendChild(document.createTextNode(r));
      });
    }

    // 价值主张
    var ledeEl = document.getElementById('profileLede');
    if (ledeEl && p.lede) {
      ledeEl.innerHTML = '';
      setEmphasizedText(ledeEl, p.lede);
    }

    // 首屏数据条
    var statsEl = document.getElementById('profileStats');
    if (statsEl && p.stats && p.stats.length) {
      statsEl.innerHTML = '';
      p.stats.forEach(function (s) {
        var item = el('div', 'item');
        item.appendChild(el('span', 'k', s.label));
        item.appendChild(el('span', 'v', s.value));
        statsEl.appendChild(item);
      });
    }

    // GitHub 按钮（取 facts 里的 GitHub 链接）
    var ghBtn = document.getElementById('profileGithub');
    if (ghBtn) {
      var gh = (p.facts || []).filter(function (f) { return f.href && /github/i.test(f.label); })[0];
      if (gh) ghBtn.href = gh.href;
    }

    // 自我介绍段落
    var bioEl = document.getElementById('profileBio');
    if (bioEl && p.bio && p.bio.length) {
      bioEl.innerHTML = '';
      p.bio.forEach(function (para) {
        var node = el('p');
        setEmphasizedText(node, para);
        bioEl.appendChild(node);
      });
    }

    // 信息表
    var factsEl = document.getElementById('profileFacts');
    if (factsEl && p.facts && p.facts.length) {
      factsEl.innerHTML = '';
      p.facts.forEach(function (f) {
        var row = el('div', 'facts-row');
        row.appendChild(el('dt', null, f.label));
        var dd = el('dd');
        if (f.href) {
          var a = el('a', null, f.value);
          a.href = f.href;
          if (!/^mailto:/i.test(f.href)) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
          }
          dd.appendChild(a);
        } else {
          dd.textContent = f.value;
        }
        row.appendChild(dd);
        factsEl.appendChild(row);
      });
    }

    // 职业理念
    var mottoEl = document.getElementById('profileMotto');
    if (mottoEl && p.motto && p.motto.length) {
      mottoEl.innerHTML = '';
      p.motto.forEach(function (m) {
        var cell = el('div', 'motto-cell');
        cell.appendChild(el('div', 'k', m.key));
        cell.appendChild(el('div', 'v', m.value));
        mottoEl.appendChild(cell);
      });
    }

    // 页脚联系
    if (p.contact) {
      setText('profileContactIntro', p.contact.intro);

      var linksEl = document.getElementById('profileContactLinks');
      if (linksEl && p.contact.links && p.contact.links.length) {
        linksEl.innerHTML = '';
        p.contact.links.forEach(function (l) {
          var a = el('a', null, l.label);
          a.href = l.href;
          if (!/^mailto:/i.test(l.href)) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
          }
          linksEl.appendChild(a);
        });
      }

      var noteEl = document.getElementById('profileFooterNote');
      if (noteEl) {
        noteEl.innerHTML = '';
        noteEl.appendChild(document.createTextNode(
          p.name + (p.enName ? ' · ' + p.enName : '')
        ));
        noteEl.appendChild(document.createElement('br'));
        noteEl.appendChild(document.createTextNode((p.roles || []).join(' / ')));
      }
    }

    // 文档元信息同步
    if (p.name) {
      document.title = p.name + ' · ' + ((p.roles && p.roles[0]) || '个人主页') + ' | 个人主页';
    }
  }

  if (typeof PROFILE !== 'undefined' && PROFILE) {
    renderProfile(PROFILE);
  }

  /* ---------- 6. 工作经历渲染 ---------- */
  var expListEl = document.getElementById('expList');

  var jobs = (typeof EXPERIENCE !== 'undefined' && Array.isArray(EXPERIENCE))
    ? EXPERIENCE.slice()
    : [];

  function isCurrentJob(job) {
    if (typeof job.current === 'boolean') return job.current;
    return job.end === '至今' || job.end === null || job.end === undefined;
  }

  function buildJob(job, index) {
    var isCurrent = isCurrentJob(job);
    var item = el('article', 'exp-item reveal' + (isCurrent ? ' is-current' : ''));
    if (job.id) item.id = 'exp-' + job.id;

    // 头部：标题 / 职位 / 时间
    var head = el('div', 'exp-head');
    head.appendChild(el('h3', 'exp-title', job.title || '未命名经历'));
    if (job.role) head.appendChild(el('span', 'exp-role', job.role));

    var start = job.start || '';
    var end = job.end === null || job.end === undefined ? '至今' : String(job.end);
    if (start || end) {
      head.appendChild(el('span', 'exp-date', start + ' — ' + end));
    }
    item.appendChild(head);

    // 职责摘要
    if (job.desc) {
      var d = el('p', 'exp-desc');
      d.textContent = job.desc;
      item.appendChild(d);
    }

    // 关键成果（允许内联 <strong> 强调，其余内容按纯文本处理）
    if (job.points && job.points.length) {
      var ul = el('ul', 'exp-points');
      job.points.forEach(function (pt) {
        var li = el('li');
        setEmphasizedText(li, pt);
        ul.appendChild(li);
      });
      item.appendChild(ul);
    }

    // 技术栈
    if (job.stack && job.stack.length) {
      var stack = el('div', 'stack');
      job.stack.forEach(function (t) { stack.appendChild(el('span', null, t)); });
      item.appendChild(stack);
    }

    // 首屏可能已进入视口的条目直接显示，避免加载闪烁
    var rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) item.classList.add('is-visible');
    return item;
  }

  if (expListEl && jobs.length) {
    jobs.forEach(function (job, i) {
      expListEl.appendChild(buildJob(job, i));
    });
  }

  /* ---------- 7. 研究成果渲染 ---------- */
  var listEl = document.getElementById('researchList');
  var emptyEl = document.getElementById('researchEmpty');
  var toolbarEl = document.getElementById('researchToolbar');

  // data/research.js 未定义或为空时，保留空状态
  var items = (typeof RESEARCH !== 'undefined' && Array.isArray(RESEARCH))
    ? RESEARCH.slice()
    : [];

  // 按日期倒序
  items.sort(function (a, b) {
    return String(b.date || '').localeCompare(String(a.date || ''));
  });

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function dateLabel(d) {
    if (!d) return '';
    return String(d).replace(/-/g, '.');
  }

  function buildCard(item, index) {
    var card = el('article', 'research-card');
    if (item.id) card.id = 'research-' + item.id;

    var main = el('div', 'rc-main');

    // meta 行
    var meta = el('div', 'rc-meta');
    if (item.type) meta.appendChild(el('span', 'rc-type', item.type));
    if (item.date) meta.appendChild(el('span', 'rc-date', dateLabel(item.date)));
    if (item.venue) meta.appendChild(el('span', 'rc-venue', item.venue));
    main.appendChild(meta);

    // 标题
    main.appendChild(el('h3', 'rc-title', item.title || '未命名成果'));

    // 摘要
    if (item.summary) main.appendChild(el('p', 'rc-summary', item.summary));

    // 作者
    if (item.authors && item.authors.length) {
      main.appendChild(el('p', 'rc-date', item.authors.join('，')));
    }

    // 标签
    if (item.tags && item.tags.length) {
      var tags = el('div', 'rc-tags');
      item.tags.forEach(function (t) { tags.appendChild(el('span', null, t)); });
      main.appendChild(tags);
    }

    // 外链
    if (item.links && item.links.length) {
      var links = el('div', 'rc-links');
      item.links.forEach(function (l) {
        if (!l || !l.url) return;
        var a = el('a', null, l.label || '链接');
        a.href = l.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        links.appendChild(a);
      });
      if (links.childNodes.length) main.appendChild(links);
    }

    card.appendChild(main);
    card.appendChild(el('span', 'rc-index', String(index + 1).padStart(2, '0')));
    return card;
  }

  function render(filterType) {
    if (!listEl) return;
    var shown = items.filter(function (it) {
      return !filterType || filterType === '全部' || it.type === filterType;
    });
    listEl.innerHTML = '';
    shown.forEach(function (it, i) {
      listEl.appendChild(buildCard(it, i));
    });
    listEl.hidden = shown.length === 0;
    if (emptyEl) emptyEl.hidden = shown.length !== 0;
  }

  if (items.length > 0 && listEl) {
    if (emptyEl) emptyEl.hidden = true;
    listEl.hidden = false;

    // 类型筛选：条目 ≥ 5 条时才显示
    var types = [];
    items.forEach(function (it) {
      if (it.type && types.indexOf(it.type) === -1) types.push(it.type);
    });

    if (toolbarEl && types.length > 1 && items.length >= 5) {
      var all = ['全部'].concat(types);
      all.forEach(function (t, i) {
        var btn = el('button', 'filter-btn' + (i === 0 ? ' is-active' : ''), t);
        btn.type = 'button';
        btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        btn.addEventListener('click', function () {
          Array.prototype.forEach.call(
            toolbarEl.querySelectorAll('.filter-btn'),
            function (b) {
              b.classList.remove('is-active');
              b.setAttribute('aria-pressed', 'false');
            }
          );
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
          render(t);
        });
        toolbarEl.appendChild(btn);
      });
      toolbarEl.hidden = false;
    }

    render(null);
  } else if (emptyEl) {
    emptyEl.hidden = false;
  }

  /* ---------- 8. 动画初始化（必须在所有数据渲染之后）---------- */
  initReveal();
})();
