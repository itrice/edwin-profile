/* ==========================================================================
   安仕平 · 个人主页 —— 交互脚本
   无依赖，原生 JavaScript / 现代浏览器
   ========================================================================== */
(function () {
  'use strict';

  var motionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  var reduceMotion = Boolean(motionQuery && motionQuery.matches);

  var profile = typeof PROFILE !== 'undefined' && PROFILE ? PROFILE : null;
  var site = typeof SITE !== 'undefined' && SITE ? SITE : null;
  var skillGroups = typeof SKILL_GROUPS !== 'undefined' && Array.isArray(SKILL_GROUPS)
    ? SKILL_GROUPS
    : [];
  var jobs = typeof EXPERIENCE !== 'undefined' && Array.isArray(EXPERIENCE)
    ? EXPERIENCE.slice()
    : [];
  var researchItems = typeof RESEARCH !== 'undefined' && Array.isArray(RESEARCH)
    ? RESEARCH.slice()
    : [];

  researchItems.sort(function (a, b) {
    return String(b.date || '').localeCompare(String(a.date || ''));
  });

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node && value != null) node.textContent = value;
  }

  function isSafeHref(href) {
    return typeof href === 'string' &&
      /^(https?:\/\/|mailto:|#)/i.test(href);
  }

  function applyLink(anchor, href) {
    if (!anchor || !isSafeHref(href)) return false;
    anchor.href = href;
    if (/^https?:\/\//i.test(href)) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    return true;
  }

  function setMeta(selector, value) {
    if (value == null) return;
    var node = document.querySelector(selector);
    if (node) node.setAttribute('content', String(value));
  }

  /**
   * 仅允许 <strong> 标签的内联强调，其余内容一律按文本处理。
   * 数据来自本地文件，但仍按白名单方式避免注入。
   */
  function setEmphasizedText(parent, raw) {
    var parts = String(raw == null ? '' : raw)
      .split(/(<strong>[\s\S]*?<\/strong>)/g);
    parts.forEach(function (part) {
      if (!part) return;
      var match = part.match(/^<strong>([\s\S]*)<\/strong>$/);
      if (match) parent.appendChild(el('strong', null, match[1]));
      else parent.appendChild(document.createTextNode(part));
    });
  }

  function renderSite() {
    if (!site) return;

    var navLinksEl = document.getElementById('navLinks');
    if (navLinksEl) {
      navLinksEl.innerHTML = '';
      (site.navLinks || []).forEach(function (item) {
        if (!item || !item.label || !isSafeHref(item.href)) return;
        var link = el('a', item.className || null, item.label);
        link.href = item.href;
        navLinksEl.appendChild(link);
      });
    }

    setText('heroStatus', site.hero && site.hero.status);

    Object.keys(site.sections || {}).forEach(function (key) {
      var section = document.getElementById(key);
      var copy = site.sections[key];
      if (!section || !copy) return;
      var number = section.querySelector('[data-section-number]');
      var title = section.querySelector('[data-section-title]');
      var description = section.querySelector('[data-section-description]');
      if (number) number.textContent = copy.number || '';
      if (title) title.textContent = copy.title || '';
      if (description) description.textContent = copy.description || '';
    });

    var skillsEl = document.getElementById('skillGroups');
    if (skillsEl) {
      skillsEl.innerHTML = '';
      skillGroups.forEach(function (group) {
        if (!group || !group.title || !Array.isArray(group.items)) return;
        var groupEl = el('div', 'skill-group');
        groupEl.appendChild(el('h3', null, group.title));
        var tags = el('div', 'skill-tags');
        group.items.forEach(function (item) {
          tags.appendChild(el('span', null, item));
        });
        groupEl.appendChild(tags);
        skillsEl.appendChild(groupEl);
      });
    }

    var empty = site.researchEmpty || {};
    setText('researchEmptyStatus', empty.status);
    setText('researchEmptyTitle', empty.title);
    setText('researchEmptyDescription', empty.description);

    setText('footerContactTitle', site.footer && site.footer.contactTitle);
    setText('footerBuiltWith', site.footer && site.footer.builtWith);
  }

  function renderProfile(data) {
    if (!data) return;

    setText('profileBrandName', data.name);
    setText('profileBrandEn', data.enName);
    setText('profileName', data.name);
    setText('profileHeroTitle', data.heroTitle);
    setText('profileCopyright', data.name);

    var rolesEl = document.getElementById('profileRoles');
    if (rolesEl && Array.isArray(data.roles) && data.roles.length) {
      rolesEl.innerHTML = '';
      data.roles.forEach(function (role, index) {
        if (index > 0) rolesEl.appendChild(el('span', 'sep', '/'));
        rolesEl.appendChild(document.createTextNode(role));
      });
    }

    var ledeEl = document.getElementById('profileLede');
    if (ledeEl && data.lede) {
      ledeEl.innerHTML = '';
      setEmphasizedText(ledeEl, data.lede);
    }

    var bioEl = document.getElementById('profileBio');
    if (bioEl && Array.isArray(data.bio) && data.bio.length) {
      bioEl.innerHTML = '';
      data.bio.forEach(function (paragraph) {
        var paragraphEl = el('p');
        setEmphasizedText(paragraphEl, paragraph);
        bioEl.appendChild(paragraphEl);
      });
    }

    var statsEl = document.getElementById('profileStats');
    if (statsEl && Array.isArray(data.stats) && data.stats.length) {
      statsEl.innerHTML = '';
      data.stats.forEach(function (stat) {
        var item = el('div', 'item');
        item.appendChild(el('span', 'k', stat.label));
        item.appendChild(el('span', 'v', stat.value));
        statsEl.appendChild(item);
      });
    }

    var factsEl = document.getElementById('profileFacts');
    if (factsEl && Array.isArray(data.facts) && data.facts.length) {
      factsEl.innerHTML = '';
      data.facts.forEach(function (fact) {
        var row = el('div', 'facts-row');
        row.appendChild(el('dt', null, fact.label));
        var value = el('dd');
        if (fact.href && applyLink(document.createElement('a'), fact.href)) {
          var link = value.appendChild(el('a', null, fact.value));
          applyLink(link, fact.href);
        } else {
          value.textContent = fact.value;
        }
        row.appendChild(value);
        factsEl.appendChild(row);
      });
    }

    var mottoEl = document.getElementById('profileMotto');
    if (mottoEl && Array.isArray(data.motto) && data.motto.length) {
      mottoEl.innerHTML = '';
      data.motto.forEach(function (motto) {
        var cell = el('div', 'motto-cell');
        cell.appendChild(el('div', 'k', motto.key));
        cell.appendChild(el('div', 'v', motto.value));
        mottoEl.appendChild(cell);
      });
    }

    if (data.contact) {
      setText('profileContactIntro', data.contact.intro);
      var linksEl = document.getElementById('profileContactLinks');
      if (linksEl && Array.isArray(data.contact.links)) {
        linksEl.innerHTML = '';
        data.contact.links.forEach(function (item) {
          var link = el('a', null, item.label);
          if (applyLink(link, item.href)) linksEl.appendChild(link);
        });
      }
    }

    var noteEl = document.getElementById('profileFooterNote');
    if (noteEl) {
      noteEl.textContent = data.name + (data.enName ? ' · ' + data.enName : '');
      noteEl.appendChild(document.createElement('br'));
      noteEl.appendChild(document.createTextNode((data.roles || []).join(' / ')));
    }

    var githubButton = document.getElementById('profileGithub');
    setText('profileGithubLabel', site && site.hero && site.hero.githubLabel);
    var githubFact = (data.facts || []).filter(function (fact) {
      return fact.href && /github/i.test(fact.label);
    })[0];
    if (githubButton && githubFact) applyLink(githubButton, githubFact.href);

    var primary = document.getElementById('heroPrimaryCta');
    var secondary = document.getElementById('heroSecondaryCta');
    var primaryCta = researchItems.length
      ? site && site.hero && site.hero.primaryCta
      : site && site.hero && site.hero.primaryFallbackCta;
    var secondaryCta = researchItems.length
      ? site && site.hero && site.hero.secondaryCta
      : site && site.hero && site.hero.secondaryFallbackCta;

    if (primary && primaryCta) {
      if (applyLink(primary, primaryCta.href)) {
        var primaryLabel = document.getElementById('heroPrimaryLabel');
        if (primaryLabel) primaryLabel.textContent = primaryCta.label || '';
      }
    }
    if (secondary && secondaryCta) {
      if (applyLink(secondary, secondaryCta.href)) {
        var secondaryLabel = document.getElementById('heroSecondaryLabel');
        if (secondaryLabel) secondaryLabel.textContent = secondaryCta.label || '';
      }
    }

    var meta = data.meta || {};
    var role = (data.roles && data.roles[0]) || '个人主页';
    var pageTitle = data.name + ' · ' + role + ' | 个人主页';
    document.title = pageTitle;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', data.name + ' · ' + role);
    setMeta('meta[property="og:description"]', meta.shareDescription);
    setMeta('meta[name="twitter:title"]', data.name + ' · ' + role);
    setMeta('meta[name="twitter:description"]', meta.shareDescription);

    var schemaEl = document.getElementById('personSchema');
    if (schemaEl) {
      var emailFact = (data.facts || []).filter(function (fact) {
        return /^email$/i.test(fact.label);
      })[0];
      var socialLinks = [];
      (data.facts || []).concat((data.contact && data.contact.links) || [])
        .forEach(function (item) {
          if (item.href && /^https:\/\//i.test(item.href) &&
              socialLinks.indexOf(item.href) === -1) {
            socialLinks.push(item.href);
          }
        });

      var schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        alternateName: data.enName,
        jobTitle: role,
        description: meta.shareDescription,
        knowsAbout: meta.knowsAbout || [],
        sameAs: socialLinks
      };
      if (emailFact) schema.email = emailFact.value;
      schemaEl.textContent = JSON.stringify(schema, null, 2);
    }
  }

  function isCurrentJob(job) {
    if (typeof job.current === 'boolean') return job.current;
    return job.end === '至今' || job.end === null || job.end === undefined;
  }

  function buildJob(job, index) {
    var isCurrent = isCurrentJob(job);
    var item = el('article', 'exp-item reveal' + (isCurrent ? ' is-current' : ''));
    if (job.id) item.id = 'exp-' + job.id;
    if (index < 2) item.classList.add('is-visible');

    var head = el('div', 'exp-head');
    head.appendChild(el('h3', 'exp-title', job.title || '未命名经历'));
    if (job.role) head.appendChild(el('span', 'exp-role', job.role));

    var start = job.start || '';
    var end = job.end === null || job.end === undefined ? '至今' : String(job.end);
    if (start || end) {
      head.appendChild(el('span', 'exp-date', start + ' — ' + end));
    }
    item.appendChild(head);

    if (job.desc) item.appendChild(el('p', 'exp-desc', job.desc));

    if (Array.isArray(job.points) && job.points.length) {
      var list = el('ul', 'exp-points');
      job.points.forEach(function (point) {
        var pointEl = el('li');
        setEmphasizedText(pointEl, point);
        list.appendChild(pointEl);
      });
      item.appendChild(list);
    }

    if (Array.isArray(job.stack) && job.stack.length) {
      var stack = el('div', 'stack');
      job.stack.forEach(function (technology) {
        stack.appendChild(el('span', null, technology));
      });
      item.appendChild(stack);
    }

    return item;
  }

  function renderExperience() {
    var list = document.getElementById('expList');
    if (!list) return;
    list.innerHTML = '';
    jobs.forEach(function (job, index) {
      list.appendChild(buildJob(job, index));
    });
    list.setAttribute('aria-busy', 'false');
  }

  function dateLabel(date) {
    if (!date) return '';
    return String(date).replace(/-/g, '.');
  }

  function buildCard(item, index) {
    var card = el('article', 'research-card');
    if (item.id) card.id = 'research-' + item.id;

    var main = el('div', 'rc-main');
    var meta = el('div', 'rc-meta');
    if (item.type) meta.appendChild(el('span', 'rc-type', item.type));
    if (item.date) meta.appendChild(el('span', 'rc-date', dateLabel(item.date)));
    if (item.venue) meta.appendChild(el('span', 'rc-venue', item.venue));
    main.appendChild(meta);

    main.appendChild(el('h3', 'rc-title', item.title || '未命名成果'));
    if (item.summary) main.appendChild(el('p', 'rc-summary', item.summary));

    var authors = Array.isArray(item.authors)
      ? item.authors.join('，')
      : item.authors;
    if (authors) main.appendChild(el('p', 'rc-date', authors));

    if (Array.isArray(item.tags) && item.tags.length) {
      var tags = el('div', 'rc-tags');
      item.tags.forEach(function (tag) {
        tags.appendChild(el('span', null, tag));
      });
      main.appendChild(tags);
    }

    if (Array.isArray(item.links) && item.links.length) {
      var links = el('div', 'rc-links');
      item.links.forEach(function (linkItem) {
        if (!linkItem || !linkItem.url) return;
        var link = el('a', null, linkItem.label || '链接');
        if (applyLink(link, linkItem.url)) links.appendChild(link);
      });
      if (links.childNodes.length) main.appendChild(links);
    }

    card.appendChild(main);
    var number = index + 1;
    card.appendChild(el('span', 'rc-index', (number < 10 ? '0' : '') + number));
    return card;
  }

  function renderResearch(filterType) {
    var list = document.getElementById('researchList');
    var empty = document.getElementById('researchEmpty');
    var toolbar = document.getElementById('researchToolbar');
    if (!list) return;

    var shown = researchItems.filter(function (item) {
      return !filterType || filterType === '全部' || item.type === filterType;
    });

    list.innerHTML = '';
    shown.forEach(function (item, index) {
      list.appendChild(buildCard(item, index));
    });
    list.hidden = shown.length === 0;
    if (empty) empty.hidden = researchItems.length !== 0;
    if (researchItems.length === 0 && toolbar) toolbar.hidden = true;
  }

  function renderResearchToolbar() {
    var toolbar = document.getElementById('researchToolbar');
    if (!toolbar || researchItems.length < 5) return;

    var types = [];
    researchItems.forEach(function (item) {
      if (item.type && types.indexOf(item.type) === -1) types.push(item.type);
    });
    if (types.length <= 1) return;

    toolbar.innerHTML = '';
    ['全部'].concat(types).forEach(function (type, index) {
      var button = el(
        'button',
        'filter-btn' + (index === 0 ? ' is-active' : ''),
        type
      );
      button.type = 'button';
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      button.addEventListener('click', function () {
        toolbar.querySelectorAll('.filter-btn').forEach(function (item) {
          item.classList.remove('is-active');
          item.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        renderResearch(type);
      });
      toolbar.appendChild(button);
    });
    toolbar.hidden = false;
  }

  var observer = null;
  function initReveal() {
    var revealElements = Array.prototype.slice.call(
      document.querySelectorAll('.reveal')
    );
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(function (node) {
        node.classList.add('is-visible');
      });
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }

    revealElements.forEach(function (node) {
      if (!node.classList.contains('is-visible')) observer.observe(node);
    });
  }

  function initScrollNavigation() {
    var nav = document.getElementById('nav');
    var progress = document.getElementById('navProgress');
    var navLinksEl = document.getElementById('navLinks');
    if (!navLinksEl) return;

    var navLinks = Array.prototype.slice.call(
      navLinksEl.querySelectorAll('a')
    );
    var sections = [];
    var scheduled = false;

    function buildSections() {
      sections = navLinks
        .filter(function (link) {
          return link.offsetParent !== null;
        })
        .map(function (link) {
          var id = link.getAttribute('href');
          var element = id && id.charAt(0) === '#'
            ? document.querySelector(id)
            : null;
          return element ? { link: link, element: element } : null;
        })
        .filter(Boolean);
    }

    function setActiveSection() {
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      var y = scrollY + 120;
      var root = document.documentElement;
      var atBottom = scrollY + window.innerHeight >= root.scrollHeight - 2;
      var current = null;
      sections.forEach(function (section) {
        if (section.element.offsetTop <= y) current = section;
      });
      if (atBottom && sections.length) current = sections[sections.length - 1];

      navLinks.forEach(function (link) {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      });
      if (current) {
        current.link.classList.add('is-active');
        current.link.setAttribute('aria-current', 'location');
      }
    }

    function updateScrollUI() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y > 20) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');

      if (progress) {
        var root = document.documentElement;
        var maximum = root.scrollHeight - root.clientHeight;
        var percent = maximum > 0 ? (y / maximum) * 100 : 0;
        progress.style.width = Math.min(100, Math.max(0, percent)) + '%';
      }
      setActiveSection();
    }

    function scheduleUpdate() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        updateScrollUI();
        scheduled = false;
      });
    }

    buildSections();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', function () {
      buildSections();
      scheduleUpdate();
    });
    updateScrollUI();
  }

  function restoreHashTarget() {
    if (!window.location.hash) return;
    var id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (error) {
      return;
    }
    var target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ block: 'start' });
  }

  renderSite();
  renderProfile(profile);
  renderExperience();
  renderResearch();
  renderResearchToolbar();
  restoreHashTarget();
  initScrollNavigation();
  initReveal();
})();
