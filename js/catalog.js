function showAll() {	
	for (let item of document.querySelectorAll('.catalog_item')) {
		item.style.display = "block";
	}
}

function showOnly(atrName, atrValue) {		
	for (let item of document.querySelectorAll('.catalog_item')) {
		item.style.display = "none";
	}
	for (let item of document.querySelectorAll('.catalog_item')) {
		
		if (item.getAttribute(atrName) == atrValue)
		{
			item.style.display = "block";
		}		
	}
}


document.addEventListener('click', function(e) {
        if (e.target.classList.contains('searchAttribute')) {
            let atrName = e.target.getAttribute('atrName');
			let atrValue = e.target.getAttribute('atrValue');
			showOnly(atrName, atrValue);
        }
    });