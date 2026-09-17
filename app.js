(async()=>{
  const agents=await fetch('assets/agents.json').then(r=>r.json());
  const grid=document.querySelector('#agent-grid');
  function selectAgent(agent){
    document.querySelector('#agent-number').textContent=agent.id;
    document.querySelector('#agent-unit').textContent=agent.unit.toUpperCase();
    document.querySelector('#agent-official-name').textContent=agent.officialName || agent.name;
    document.querySelector('#agent-role').textContent=agent.role;
    document.querySelector('#agent-name').textContent=agent.name;
    document.querySelector('#agent-description').textContent=agent.description;
    
    const stageImg = document.querySelector('#agent-stage-img');
    if (stageImg) {
      stageImg.src = agent.pose || agent.portrait;
      stageImg.alt = agent.officialName + ' (' + agent.role + ')';
    }
    
    grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===agent.id)));
  }
  agents.forEach(agent=>{
    const b=document.createElement('button');
    b.className='agent-tile fg-tile';
    b.dataset.id=agent.id;
    b.setAttribute('aria-label',(agent.officialName || agent.name)+', '+agent.role);
    
    const thumbSrc = agent.portrait || agent.pose;
    const thumbHtml = thumbSrc 
      ? '<div class="wireframe-thumb-wrap"><img class="tile-thumb" src="'+thumbSrc+'" alt="" loading="lazy"></div>' 
      : '<b>'+agent.name.slice(0,2)+'</b>';

    const tileLabel = agent.shortName || (agent.officialName ? agent.officialName.split(' ')[0] : agent.name);
    b.innerHTML=thumbHtml+'<span class="wireframe-tile-name">'+tileLabel+'</span><div class="wireframe-tile-bracket"></div>';
    b.addEventListener('click',()=>selectAgent(agent));
    grid.append(b);
  });
  selectAgent(agents.find(a=>a.name==='APEX')||agents[0]);

  // ── VALORANT PANEL NAVIGATION TRANSITION CONTROLLER ──
  const overlay = document.querySelector('#nav-transition-overlay');
  let isTransitioning = false;

  function triggerTransition(onCovered) {
    if (isTransitioning || !overlay) return;
    isTransitioning = true;

    // Phase 1: Swipe In (Staggered cover from left)
    overlay.classList.remove('swipe-out');
    overlay.classList.add('active', 'swipe-in');

    // Covered duration: ~320ms swipe + 80ms stagger = 400ms peak
    setTimeout(() => {
      if (typeof onCovered === 'function') {
        onCovered();
      }

      // Phase 2: Swipe Out (Staggered reveal to right)
      overlay.classList.remove('swipe-in');
      overlay.classList.add('swipe-out');

      // Total sequence complete: ~600ms
      setTimeout(() => {
        overlay.classList.remove('active', 'swipe-out');
        isTransitioning = false;
      }, 350);
    }, 250);
  }

  // Intercept internal link clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const targetElem = document.querySelector(href);
    if (!targetElem) return;

    e.preventDefault();

    triggerTransition(() => {
      targetElem.scrollIntoView({ behavior: 'auto' });
      history.pushState(null, '', href);
    });
  });

  // Handle browser back/forward history navigation
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#home';
    const targetElem = document.querySelector(hash);
    if (targetElem) {
      triggerTransition(() => {
        targetElem.scrollIntoView({ behavior: 'auto' });
      });
    }
  });

})().catch((err)=>{
  console.error(err);
});
