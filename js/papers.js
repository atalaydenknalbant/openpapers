(function(){
  const DB_NAME = 'openpapers-db';
  const STORE = 'papers';
  const VERSION = 1;
  let dbPromise;

  function openDB(){
    if(dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, VERSION);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        const store = db.createObjectStore(STORE, {keyPath: 'id', autoIncrement: true});
        // Built-in papers
        store.add({
          id: 1,
          title: 'The Treaty of Versailles',
          summary: 'The Treaty of Versailles was the peace settlement signed after World War One had ended in 1918. It was the product of the German Armistice.',
          image: 'img/treaty%20of%20versailles.png',
          pdf: 'treaty.pdf',
          date: '28 June 1919',
          signers: 'Germany and Allies',
          location: 'Hall of Mirrors in the Palace of Versailles, Paris, France'
        });
        store.add({
          id: 2,
          title: 'The Paris Agreement',
          summary: 'The Paris Agreement is an agreement within the United Nations, dealing with greenhouse-gas-emissions mitigation, adaptation, and finance.',
          image: 'img/paris-agreement.png',
          pdf: 'english_paris_agreement.pdf',
          date: '22 April 2016',
          signers: 'All Countries except United States,Nicaragua,Syria',
          location: 'New York City, United States'
        });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return dbPromise;
  }

  function getStore(mode){
    return openDB().then(db => db.transaction(STORE, mode).objectStore(STORE));
  }

  window.addPaper = function(data){
    return getStore('readwrite').then(store => {
      return new Promise((resolve, reject) => {
        const req = store.add(data);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  };

  function getPaper(id){
    return getStore('readonly').then(store => {
      return new Promise((resolve, reject) => {
        const req = store.get(Number(id));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }

  function getAllPapers(){
    return getStore('readonly').then(store => {
      return new Promise((resolve, reject) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }

  window.renderPapersList = function(){
    const container = document.getElementById('dynamic-papers');
    if(!container) return;
    getAllPapers().then(papers => {
      papers.filter(p => p.id > 2).forEach(p => {
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
    });
  };

  window.renderDynamicPaper = function(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if(!id) return;
    getPaper(id).then(paper => {
      if(!paper) return;
      document.getElementById('paper-title').textContent = paper.title;
      document.getElementById('paper-summary').innerHTML = `<p>${paper.summary}</p>`;
      const loc = document.getElementById('paper-location');
      if(loc) loc.textContent = paper.location || '';
      const dateEl = document.getElementById('paper-date');
      if(dateEl) dateEl.textContent = paper.date || '';
      const sign = document.getElementById('paper-signers');
      if(sign) sign.textContent = paper.signers || '';
      const img = document.getElementById('paper-image');
      if(img) img.src = paper.image;
      const link = document.getElementById('paper-download');
      if(link) link.href = paper.pdf;
    });
  };
})();
