function setGrid(grid)
{
	document.getElementById("grid-info").innerHTML = "&nbsp;&nbsp;Item Info - Grid : " + grid + "&nbsp;&nbsp;";
	document.getElementById("now-grid").innerHTML = grid;

	document.getElementById("item-id").value = document.getElementById("g" + grid + "-id").innerHTML;
	document.getElementById("item-tags").value = document.getElementById("g" + grid + "-tag").innerHTML;
}

function saveItem()
{
	now_grid = parseInt(document.getElementById("now-grid").innerHTML);

	document.getElementById("g" + now_grid + "-id").innerHTML = document.getElementById("item-id").value;
	document.getElementById("g" + now_grid + "-tag").innerHTML = document.getElementById("item-tags").value;
}

var cnt = 1;

function addRecipes()
{
	var Item = "";
	for (var i = 1; i < 9; i++)
	{
		var id = document.getElementById("g" + i.toString() + "-id").innerHTML;
		var tag = document.getElementById("g" + i.toString() + "-tag").innerHTML;

		console.log(i + " : " + id + " / " + tag);

		if(id != '')
		{
			Item += "{" + "Slot:" + (i-1) + "b,id:\"" + id + "\",Count:1b";
			if(tag != '')
				Item += ",tag:{" + tag + "}";
			Item += "},";
		}
	}
	if(Item != '')
	{
		Item = Item.substring(0, Item.length-1);

		var recipe_container = document.createElement("div");
		recipe_container.setAttribute("id", "recipe-" + cnt);
		recipe_container.setAttribute("style","display: flex; flex-direction: row;")
		
			var rec = document.createElement("textarea");
			rec.setAttribute("disabled", "true");
			rec.style = "margin: 10px; resize: none; font: 14px consolas; flex: 0 0 80%";
			rec.innerHTML = Item;

			var delete_rec = document.createElement("button");
			delete_rec.setAttribute("onclick", "delete_recipe(" + cnt + ")");
			delete_rec.style = "margin: 10px; flex: 0 0 10%";
		
		recipe_container.appendChild(rec);
		recipe_container.appendChild(delete_rec);

		document.getElementById("recipes").appendChild(recipe_container);
		cnt++;
	}
}

function delete_recipe(point)
{
	var element = document.getElementById("recipe-" + point.toString());
	console.log(element);
	element.parentNode.removeChild(element);
}

function download_datapack()
{
	var zip = new JSZip();
	var datapack_name = document.getElementById("datapack-name").value;

	zip.file(datapack_name + "/pack.mcmeta", "{\n\t\"pack\": {\n\t\t\"pack_format\": 6,\n\t\t\"description\": \"\"\n\t}\n}");
	zip.file(datapack_name + "/data/minecraft/tags/functions/load.json", "{\n\t\"values\": [\n\t\t\"" + datapack_name + ":load\"\n\t]\n}");
	zip.file(datapack_name + "/data/minecraft/tags/functions/tick.json", "{\n\t\"values\": [\n\t\t\"" + datapack_name + ":tick\"\n\t]\n}");
	zip.file(datapack_name + "/data/" + datapack_name + "/functions/load.mcfunction", "");

	// craft tick
	var recipes_list = document.getElementById("recipes");
	var children = recipes_list.childNodes;
	for(var i = 0; i < children.length; i++)
	{
		var execute = "execute as @e[tag=craft_table] at @s if block ~ ~ ~ minecraft:dropper[facing=up,triggered=false]";
		execute += "{CustomName:\'" + document.getElementById("craft-table-name").value + "\',Items:[";

		execute += children.item(i).childNodes[0].innerHTML;
	
		execute += "]} run function \n";
	}

	zip.file(datapack_name + "/data/" + datapack_name + "/functions/tick.mcfunction", execute);
	
	zip.generateAsync({type:"blob"})
	.then(function (blob) {
		saveAs(blob, datapack_name + ".zip");
	});
}

// function download(filename, text) 
// {
// 	var element = document.createElement('a');
// 	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
// 	element.setAttribute('download', filename);

// 	element.style.visibility = 'none';
// 	document.body.appendChild(element);

// 	element.click();

// 	document.body.removeChild(element);
// }