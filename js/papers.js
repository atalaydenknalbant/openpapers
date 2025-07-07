(function(){
  const STORAGE_KEY = 'papers';

  function getPapers(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ return []; }
  }

  function savePapers(papers){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
  }

  window.addPaper = function(data){
    const papers = getPapers();
    data.id = papers.length + 3; // built-in papers are 1 and 2
    papers.push(data);
    savePapers(papers);
    return data.id;
  };

  window.renderPapersList = function(){
    const container = document.getElementById('dynamic-papers');
    if(!container) return;
    const papers = getPapers();
    papers.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-lg-6';
      col.innerHTML = `
          <a class="paper-item" href="paper.html?id=${p.id}">
            <span class="caption">
              <span class="caption-content">
                <h1>${p.title}</h1>
                <p class="mb-0">${p.summary}</p>
              </span>
            </span>
            <img class="img-fluid" src="${p.image}" alt="">
          </a>`;
      container.appendChild(col);
    });
  };

  window.renderDynamicPaper = function(){
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'),10);
    if(!id) return;
    const paper = getPapers().find(p=>p.id===id);
    if(!paper) return;
    document.getElementById('paper-title').textContent = paper.title;
    document.getElementById('paper-summary').innerHTML = `<p>${paper.summary}</p>`;
    const img = document.getElementById('paper-image');
    if(img){ img.src = paper.image; }
    const link = document.getElementById('paper-download');
    if(link){ link.href = paper.pdf; }
  };
})();
