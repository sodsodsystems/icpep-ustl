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
})().catch((err)=>{
  console.error(err);
});
