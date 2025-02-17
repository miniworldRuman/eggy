document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    if (!searchInput || !searchResults) return;
  
    searchInput.addEventListener('input', function () {
      const query = this.value.trim();
      if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
      }
  
      fetch('/search.xml')
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const items = xmlDoc.getElementsByTagName('item');
  
          let resultsHTML = '';
          for (let item of items) {
            const title = item.getElementsByTagName('title')[0].textContent;
            const link = item.getElementsByTagName('link')[0].textContent;
            const content = item.getElementsByTagName('content')[0].textContent;
  
            if (title.toLowerCase().includes(query.toLowerCase()) || content.toLowerCase().includes(query.toLowerCase())) {
              resultsHTML += `<li><a href="${link}">${title}</a></li>`;
            }
          }
  
          searchResults.innerHTML = resultsHTML;
        })
        .catch(error => console.error('搜索失败:', error));
    });
  });