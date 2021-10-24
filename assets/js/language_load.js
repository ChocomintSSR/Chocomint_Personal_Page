var current_supports_language = ["zh-TW","en-US"]
var load_language = function()
{
	var loop_locked = false
	var loop_until_success = function()
	{
		var lang = "en-US";
		var req = new XMLHttpRequest()

		if(current_supports_language.includes(navigator.language))
			lang = navigator.language
		
		req.open("GET","https://chocomint-page.yuhengsu0405.repl.co/languages/"+lang+".json")
		
		var onReady = function(response)
		{
			var language = JSON.parse(response)
			var language_key = Object.keys(language)
			for (var i=0;i<=language_key.length;i++)
			{
				if (document.getElementById(language_key[i]))
				{
					document.getElementById(language_key[i]).innerHTML = language[language_key[i]]
				}
			}
		}
		req.onreadystatechange = function(){
			if (!loop_locked){
				if (req.readyState == 4 && req.status == 200){
					onReady(req.responseText.replaceAll("\n","").replaceAll("\t",""))
					//這裡fail 所以沒辦法鎖住
					console.log(req.responseText)
					loop_locked = true
				}else{
					loop_until_success()
				}
			}
		}
		req.send(null)
	}
	loop_until_success()
}