(function() {
	var introSection = document.querySelector(".intro");
	var sliderSection = document.querySelector(".slider");
	var uploadSection = document.querySelector(".upload-images");	

	var area = document.querySelector(".upload-images__wrap");
	var areaSlider = document.querySelector(".slider");
	var template = document.querySelector("#image-template").innerHTML;
	var slide = document.querySelector("#slider-template").innerHTML;
	var links = [];
	

	document.querySelector(".main-header__link").addEventListener("click", function(event) {
		event = event || window.event;
  	if (event.preventDefault) { 
	    event.preventDefault();
	  } else {
	  	event.returnValue = false;
	  }
	  location.reload();
	});


	document.querySelector("#upload_photos").addEventListener("click", function() {
		var inputText = document.querySelector("#text-field").value;
		inputText = inputText.replace(/'/g, '"');
		try {
			links = JSON.parse(inputText);
		} catch (e) {
			alert( "Извините, передан некорректного вида массив" );
			location.reload();
		}
		for (var i = 0; i < links.length; i++) {
			preview(links[i]);
		}
		addButton();

		introSection.classList.add("hide");
	});


	function preview(file) {
		var html = template.replace("{{image}}", file);
		var html = Mustache.render(template, {
			"image": file
		});
		var li = document.createElement("li");
		li.classList.add("upload-images__item");
		li.innerHTML = html;
		area.appendChild(li);
		li.querySelector(".upload-images__del-link").addEventListener("click",
			function(event) {
				event = event || window.event;
				if (event.preventDefault) {
					event.preventDefault(); 
				} else { 
					event.returnValue = false;
				}
				removePreview(li, file);
			});
	};


	function addButton () { 
		var saveButton = document.createElement("button");
		saveButton.classList.add("btn");
		var t = document.createTextNode("Save");
		saveButton.appendChild(t);
		saveButton.addEventListener('click', function() {
			makeSliderGallery();
			uploadSection.classList.add("hide");
		});
		area.appendChild(saveButton);
	}


	function removePreview(li, file) {
		links = links.filter(function(item) {
			return item != file;
		});
		li.parentNode.removeChild(li);
	}


	function makeSliderGallery() {
		var comments = document.querySelectorAll("#comment");
		for (var i = 0; i < comments.length; i++) {
			var html = Mustache.render(slide, {
				"image": links[i],
				"text": comments[i].value
			});
			var div = document.createElement("div");
			div.classList.add("slider__wrap");
			div.innerHTML = html;
			areaSlider.appendChild(div);			
		}


		//slider "slick"
		$(document).ready(function(){
			$('.slider').slick({
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				adaptiveHeight: true,
				autoplay: true,
  			autoplaySpeed: 2000,
			});
		});
	}
})();


