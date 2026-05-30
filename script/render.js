// Render folder tree.js
(async function() {
    const container = document.getElementById('folder-tree-container');
    const response = await fetch('json/tree.json');
    const data = await response.json();
    renderTree(data, container);
})();

/**
 * Rendering a directory tree from JSON data
 * @param {Array} data -Folder data
 * @param {HTMLElement} container -Container element
 */
function renderTree(data, container) {
    const ul = document.createElement('ul');
    
    data.forEach(item => {
        const li = document.createElement('li');
        
        if (item.type === 'folder') {
            const div = document.createElement('div');
            div.className = 'folder';
            div.textContent = item.name;
            div.onclick = function() {
                this.parentElement.querySelector('.nested').classList.toggle('active');
            };
            li.appendChild(div);
            
            if (item.children && item.children.length > 0) {
                const nestedUl = document.createElement('ul');
                nestedUl.className = 'nested';
                // Recursively render child nodes
                renderTree(item.children, nestedUl);
                li.appendChild(nestedUl);
            }
        } else {
            // File type
            li.className = 'file';
            li.textContent = item.name;
        }
        
        ul.appendChild(li);
    });
    
    container.appendChild(ul);
}