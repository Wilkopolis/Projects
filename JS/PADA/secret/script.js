window.onload = function() {
	// add my new entry items
	AddNewEntryDiv('equipmentDiv0531');
	AddNewEntryDiv('equipmentDiv0607');
	AddNewEntryDiv('equipmentDiv0610');
	AddNewEntryDiv('equipmentDiv0616');
	AddNewEntryDiv('equipmentDiv0620');
	AddNewEntryDiv('equipmentDiv0624');
	AddNewEntryDiv('equipmentDiv0701');
	AddNewEntryDiv('equipmentDiv0707');
	AddNewEntryDiv('equipmentDiv0713');
	AddNewEntryDiv('equipmentDiv0715');
	AddNewEntryDiv('equipmentDiv0719');
	AddNewEntryDiv('equipmentDiv0722');
	AddNewEntryDiv('equipmentDiv0725');
	AddNewEntryDiv('equipmentDiv0801');
	AddNewEntryDiv('foodDiv0531');
	AddNewEntryDiv('foodDiv0607');
	AddNewEntryDiv('foodDiv0610');
	AddNewEntryDiv('foodDiv0616');
	AddNewEntryDiv('foodDiv0620');
	AddNewEntryDiv('foodDiv0624');
	AddNewEntryDiv('foodDiv0701');
	AddNewEntryDiv('foodDiv0707');
	AddNewEntryDiv('foodDiv0713');
	AddNewEntryDiv('foodDiv0715');
	AddNewEntryDiv('foodDiv0719');
	AddNewEntryDiv('foodDiv0722');
	AddNewEntryDiv('foodDiv0725');
	AddNewEntryDiv('foodDiv0801');

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            populateStuff(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", "getData.php", true);
	xmlhttp.send();
}

function populateStuff(xml) {
	// not really xml
	var data = xml.split("\n");
	var pages = data.slice(5,18);
	for (var i = pages.length - 1; i >= 0; i--) {
		var pageCode = pages[i].split('-')[0];
		var equipment = pages[i].split('-')[1].split('|')[0].split(';');
		for (var j = equipment.length - 1; j >= 0; j--) {
			if (equipment[j] == "")
				continue;
			// equipmentDivDDMM
			var containerId = 'equipmentDiv' + pageCode;
			var div = document.getElementById(containerId);
			var icon = equipment[j].split(',')[0];
			var name = equipment[j].split(',')[1];
			var bringer = equipment[j].split(',')[2];
			AddEntryScript(name, bringer, icon, div);
		}
		var food = pages[i].split('-')[1].split('|')[1].split(';');
		for (var j = food.length - 1; j >= 0; j--) {
			if (food[j] == "")
				continue;
			// foodDivDDMM
			var containerId = 'foodDiv' + pageCode;
			var div = document.getElementById(containerId);
			var icon = food[j].split(',')[0];
			var name = food[j].split(',')[1];
			var bringer = food[j].split(',')[2];
			AddEntryScript(name, bringer, icon, div);
		}		
	}
}

function select(button) {
	var id = button.id;
	var pageId = id == "homeButton" ? "homeDiv" : "page" + id.substring(6,10);
	// hide current page
	var currentPage = document.getElementsByClassName("visiblePage")[0];
	var currentButton = document.getElementsByClassName("selectedPageButton")[0];
	// already visible, return
	if (currentPage.id == pageId)
		return;
	// hide it
	currentPage.className = "hiddenPage";
	// deslect currentButton
	currentButton.className = "pageButton";
	// reset its color	
	currentButton.style.background = currentButton.id == "homeButton" ? "#191919" : "";
	// select currentButton
	button.className = "pageButton selectedPageButton";
	// unhide new page
	document.getElementById(pageId).className = "visiblePage";
	// add the specific art depending on which game
	button.style.background = colorSchemes[pageId].primary;
}

function AddNewEntryDiv(targetId) {
	var result = document.createElement('div');
	result.id = targetId + 'newItemDiv';
	result.style.height = '64px';
	result.style.position = "relative";
	result.style.marginTop = "8px";
	result.style.left = '10%';
	result.style.transitionDuration = "1s";

	// add the icon dropdown
	var selectDiv = document.createElement('div');
	selectDiv.style.float = 'left';
	var select = document.createElement('select');
	select.id = targetId + 'newItemIconDropDown' + count++;
	$(selectDiv).append(select);
	$(result).append(selectDiv);
	$('#' + targetId).append(result);

	var data = equipmentIconPaths;
	if (targetId.substring(0,1) == 'f')
		data = foodIconPaths;
    $(select).ddslick({
    	data: data,
    	width: 64,
    	height: 150,
    	defaultSelectedIndex:0
	});

    // add the item name form
    var inputDiv = document.createElement("div");
    inputDiv.style.float = "left";
    inputDiv.style.paddingLeft = '12px';
	var itemName = document.createElement("input");
	itemName.type = "text";
	itemName.className += "dropShadow textInput";
    inputDiv.appendChild(itemName);
	result.appendChild(inputDiv);

    // add the item name form
    var thing = document.createElement("p");
    thing.innerHTML = '.';
    thing.style.fontSize = '40pt';
    thing.style.paddingLeft = '6px';
    thing.className = 'itemName';
	result.appendChild(thing);

	// add the bringer name form
    var inputDiv = document.createElement("div");
    inputDiv.style.float = "left";
    inputDiv.style.paddingLeft = '6px';
	var itemName = document.createElement("input");
	itemName.type = "text";
	itemName.className += "dropShadow textInput";
    inputDiv.appendChild(itemName);
	result.appendChild(inputDiv);
	$(itemName).keyup(function(event){
    	if(event.keyCode == 13) {
        	addEntry({currentTarget:this.parentNode});
        	$(this.parentNode.parentNode.children[1].children[0]).focus();
    	}
	});

    var addButton = document.createElement("div");
    addButton.style.float = "left";
	addButton.style.position = "relative";
    addButton.style.top = "12px";
	addButton.style.left = "15px";
	addButton.innerHTML = '<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 42 42" style="enable-background:new 0 0 42 42;" xml:space="preserve" width="32px" height="32px"><path d="M37.059,16H26V4.941C26,2.224,23.718,0,21,0s-5,2.224-5,4.941V16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16v11.059  C16,39.776,18.282,42,21,42s5-2.224,5-4.941V26h11.059C39.776,26,42,23.718,42,21S39.776,16,37.059,16z" fill="#191919"/></svg>'
	addButton.style.cursor = 'pointer';
	addButton.onclick = addEntry;
	result.appendChild(addButton);
}

function buildDataString(div) {
	var result = '';
	// equipment
	var equipmentDiv = div.parentNode.children[2];
	var foodDiv = div.parentNode.children[4];
	for (var i = equipmentDiv.children.length - 2; i >= 0; i--) {
		var data = equipmentDiv.children[i].data;
		result += data.icon + ',' + data.item + ',' + data.bringer + ';';
	}
	// trim the last ; cause lazy
	result = result.substring(0, result.length - 1);
	// deliniate
	result += '|';
	// food
	for (var i = foodDiv.children.length - 2; i >= 0; i--) {
		var data = foodDiv.children[i].data;
		result += data.icon + ',' + data.item + ',' + data.bringer + ';';
	}
	// trim the last ; cause lazy
	if (foodDiv.children.length > 1 )
		result = result.substring(0, result.length - 1);
	return result;
}

function addEntry(e) {
	var entryDiv = e.currentTarget.parentNode.parentNode;
	// add entry
	AddEntryDiv(e.currentTarget.parentNode, entryDiv);
	// build data string
	var data = buildDataString(entryDiv);
	// update data
	var xmlhttp = new XMLHttpRequest();
	var id = e.currentTarget.parentNode.parentNode.id
	var name = id.substring(id.length - 4, id.length);
	xmlhttp.open("POST", "updateData.php?name=" + name + "&data=" + data, true);
	xmlhttp.send();
	// clear this
	e.currentTarget.parentNode.children[1].children[0].value = '';
	e.currentTarget.parentNode.children[3].children[0].value = '';

	// focus new item name field
    $(e.currentTarget.parentNode.children[1].children[0]).focus();
}

function removeEntry(e) {
	var entryDiv = e.currentTarget.parentNode.parentNode;
	
	$(e.currentTarget.parentNode).remove();

	// build data string
	var data = buildDataString(entryDiv);
	// update data
	var xmlhttp = new XMLHttpRequest();
	var id = entryDiv.id
	var name = id.substring(id.length - 4, id.length);
	xmlhttp.open("POST", "updateData.php?name=" + name + "&data=" + data, true);
	xmlhttp.send();
}

function AddEntryScript(name, bringer, icon, div) {
	var result = document.createElement('div');
	result.data = {item:name, bringer:bringer, icon:icon};
	result.style.width = '550px';
	result.style.height = '45px';
	result.style.position = "relative";
	result.style.paddingTop = "13px";
	result.style.paddingBottom = "2px";
	result.style.left = '10%';
	
	var data = equipmentIconPaths;
	if (div.id.substring(0,1) == 'f')
		data = foodIconPaths;

	// add the icon dropdown
	var iconDiv = document.createElement('div');
	iconDiv.className = 'iconDiv';
	iconDiv.style.background = 'url("' + data[result.data.icon].imageSrc + '") no-repeat';
	$(result).append(iconDiv);

    // add the item name p
    var itemName = document.createElement("p");
    itemName.className = "itemName";
    itemName.style.textAlign = 'left';
    itemName.innerHTML = name + '.';
	result.appendChild(itemName);

	// // add the bringer name P
    var bringerName = document.createElement("p");
    bringerName.className = "bringerName";
    bringerName.style.textAlign = 'left';
    bringerName.innerHTML = bringer;
	result.appendChild(bringerName);

	// // delete
    var removeButton = document.createElement("div");
    removeButton.style.float = "left";
	removeButton.style.position = "relative";
    removeButton.style.top = "3px";
	removeButton.style.left = "15px";
	removeButton.innerHTML = '<svg id="Capa_1" x="0px" y="0px" opacity=".4" viewBox="0 0 47.095 47.095" style="enable-background:new 0 0 47.095 47.095;" xml:space="preserve" width="32px" height="32px"><path d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21   L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831   c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0   C47.673,42.282,47.672,38.54,45.363,36.234z" fill="#D80027"/></svg>'
	removeButton.style.cursor = 'pointer';
	removeButton.onclick = removeEntry;
	result.appendChild(removeButton);

	if (div.children.length % 2 == 0) {
		result.style.background = colorSchemes['page' + div.id.substring(div.id.length - 4, div.id.length)].secondary;
	}

	$(div.children[div.children.length - 1]).before(result);
}

var count = 1;
function AddEntryDiv(entry, div) {
	// get the entry stuff
	var ddData = $(entry.children[0].children[0]).data('ddslick');
	var name = entry.children[1].children[0].value;
	var bringer = entry.children[3].children[0].value;

	var result = document.createElement('div');
	result.data = {item:name, bringer:bringer, icon:ddData.selectedIndex}
	result.style.width = '550px';
	result.style.height = '45px';
	result.style.position = "relative";
	result.style.paddingTop = "13px";
	result.style.paddingBottom = "2px";
	result.style.left = '10%';
	
	var data = equipmentIconPaths;
	if (div.id.substring(0,1) == 'f')
		data = foodIconPaths;

	// add the icon dropdown
	var iconDiv = document.createElement('div');
	iconDiv.className = 'iconDiv';
	iconDiv.style.background = 'url("' + data[result.data.icon].imageSrc + '") no-repeat';
	$(result).append(iconDiv);

    // add the item name p
    var itemName = document.createElement("p");
    itemName.className = "itemName";
    itemName.style.textAlign = 'left';
    itemName.innerHTML = name + '.';
	result.appendChild(itemName);

	// // add the bringer name P
    var bringerName = document.createElement("p");
    bringerName.className = "bringerName";
    bringerName.style.textAlign = 'left';
    bringerName.innerHTML = bringer;
	result.appendChild(bringerName);

	// delete
    var removeButton = document.createElement("div");
    removeButton.style.float = "left";
	removeButton.style.position = "relative";
    removeButton.style.top = "3px";
	removeButton.style.left = "15px";
	removeButton.innerHTML = '<svg id="Capa_1" opacity=".4" x="0px" y="0px" viewBox="0 0 47.095 47.095" style="enable-background:new 0 0 47.095 47.095;" xml:space="preserve" width="32px" height="32px"><path d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21   L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831   c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0   C47.673,42.282,47.672,38.54,45.363,36.234z" fill="#D80027"/></svg>'
	removeButton.style.cursor = 'pointer';
	removeButton.onclick = removeEntry;
	result.appendChild(removeButton);

	// onhover

	if (div.children.length % 2 == 0) {
		result.style.background = colorSchemes['page' + div.id.substring(div.id.length - 4, div.id.length)].secondary;
	}

	$(entry).before(result);
}

var colorSchemes = {
	'homeDiv' : {primary:'#C63D0F', secondary:'#123456'},
	'page0531' : {primary:'#FDF3E7', secondary:'#F2E8DC'},
	'page0607' : {primary:'#9ABCDF', secondary:'#A4CDE8'},
	'page0610' : {primary:'#EEAA7B', secondary:'#E09C6B'},
	'page0616' : {primary:'#C1E1A6', secondary:'#AFD194'},
	'page0620' : {primary:'#F3FAB6', secondary:'#E2E295'},
	'page0624' : {primary:'#9099A2', secondary:'#99A6AF'},
	'page0701' : {primary:'#EFEFEF', secondary:'#E8E3E3'},
	'page0707' : {primary:'#E9C893', secondary:'#EDD29C'},
	'page0713' : {primary:'#DCD0C0', secondary:'#EADDCC'},
	'page0715' : {primary:'#98B06F', secondary:'#A2BA7A'},
	'page0719' : {primary:'#B4DBC0', secondary:'#A9D1B5'},
	'page0722' : {primary:'#DC8239', secondary:'#E28C4A'},
	'page0725' : {primary:'#FEDCD2', secondary:'#F4D1C6'},
	'page0801' : {primary:'#DF744A', secondary:'#E58159'}};

var equipmentIconPaths = [{imageSrc:'images/grill.png'},
		{imageSrc:'images/table.png'},
		{imageSrc:'images/fire.png'},
		{imageSrc:'images/plates.png'},
		{imageSrc:'images/spat.png'},
		{imageSrc:'images/util.png'},
		{imageSrc:'images/koala.png'}]

var foodIconPaths = [{imageSrc:'images/chicken.png'},
		{imageSrc:'images/sausage.png'},
		{imageSrc:'images/hamburger.png'},
		{imageSrc:'images/dog.png'},
		{imageSrc:'images/taco.png'},
		{imageSrc:'images/bread.png'},
		{imageSrc:'images/steak.png'},
		{imageSrc:'images/pizza.png'},
		{imageSrc:'images/fish.png'},
		{imageSrc:'images/cheese.png'},
		{imageSrc:'images/ketchup.png'},
		{imageSrc:'images/mustard.png'},
		{imageSrc:'images/mayo.png'},
		{imageSrc:'images/cookie.png'},
		{imageSrc:'images/donut.png'},
		{imageSrc:'images/drink.png'},
		{imageSrc:'images/berry.png'},
		{imageSrc:'images/veggie.png'},
		{imageSrc:'images/snack.png'},
		{imageSrc:'images/sandwich.png'},
		{imageSrc:'images/misc.png'},
		{imageSrc:'images/koala.png'}];