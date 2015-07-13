/*****
 * pretty-pre & codeBox
 * by Alfredo Cosco 2015
 * @orazio_nelson
 * alfredo.cosco@gmail.com
 * sources of inspiration 
 * http://stackoverflow.com/questions/4631646/how-to-preserve-whitespace-indentation-of-text-enclosed-in-html-pre-tags-exclu
 * https://perishablepress.com/perfect-pre-tags/
 * http://www.moyablog.com/2011/10/06/innerouter-xhtml-or-how-to-get-truly-original-source-of-element-in-javascript/
 * 
 * see also:
 * http://orazionelson.github.io/prettypre/
 * 
 * */
(function ( $ ) {
	/**
	 * 
	 * Make a pretty 'pre' for your code
	 * by Alfredo Cosco 2015
	 * 
	 **/
	$.fn.prettyPre = function (){
		var preEl = $(this);
		for (var i = 0; i < preEl.length; i++)
			{	
			var content = $(preEl[i]).html()
					.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
					;						
			var tabs_to_remove = '';
			while (content.indexOf('\t') == '0')
			{
			  tabs_to_remove += '\t';
			  content = content.substring(1);
			}
			var re = new RegExp('\n' + tabs_to_remove, 'g');
			content = content.replace(re, '\n');              
			$(preEl[i]).html(content);
			}	
		};

	/**
	 * 
	 * Build a box with source code
	 * by Alfredo Cosco 2015
	 * 
	 * **/	

	$.fn.codeBox = function (){
		
		var newselect = $(this).selector;
		
		$.ajax({
			url : document.location.href,
			async: false,
			//context: document,
			success : function (data,stato) {

				var portion = $(data).find(newselect);

				$(newselect)
					.after('<div class="show-me-the-code"></div>')
					.each(function(i, tab) {
						console.log($(this)[i]);
						var snippet = $(portion[i]).html();			
						tab.id = "code-box-" + (i+1); //i starts at 0	
						$(this)
						.next()
						.append('<pre class="pretty-pre expand" name="code-box-' + (i+1) + '">'+snippet+'</pre>')
						;
				})
			},
			error : function (richiesta,stato,errori) {
				alert("Error: "+stato);
			}
		});

		$('.show-me-the-code pre').prettyPre();
	};		

}( jQuery ));
