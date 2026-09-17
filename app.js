(async()=>{
  const [agents,courses]=await Promise.all([fetch('assets/agents.json').then(r=>r.json()),fetch('assets/courses.json').then(r=>r.json())]);
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

  function selectYear(year){
    document.querySelectorAll('[data-year]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.year===year)));
    const selected=courses.filter(c=>c.year===year);
    const terms=[...new Set(selected.map(c=>c.term))];
    document.querySelector('#course-grid').innerHTML=terms.map(term=>{
      const items=selected.filter(c=>c.term===term);
      return '<section class="term"><h3>'+term+'<span>'+items.reduce((sum,c)=>sum+Number(c.units),0)+' UNITS</span></h3>'+items.map(c=>'<div class="course"><div><code>'+c.code+'</code><strong>'+c.title+'</strong><small>'+c.lecture+' lecture / '+c.lab+' lab–ITC units</small></div><span class="units">'+c.units+' U</span></div>').join('')+'</section>';
    }).join('');
  }
  document.querySelectorAll('[data-year]').forEach(b=>b.addEventListener('click',()=>selectYear(b.dataset.year)));
  selectYear('First Year');
})().catch((err)=>{
  console.error(err);
  document.querySelector('#course-grid').textContent='The curriculum could not load. You can still download the map above.';
});
