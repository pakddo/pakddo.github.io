// This should be included from instagram.html

$(function(){

	function loadInstagrams(max_id) {

		var userid = 1463008;
		var baseurl = "http://pakddo.herokuapp.com/feed/" + userid;
		var url = typeof max_id != 'undefined' ? baseurl + "?max_id=" + max_id : baseurl;

		$.getJSON(url,
		  function(res) {

			var length = typeof res.data != 'undefined' ? res.data.length : 0;
			var next_max_id = typeof res.pagination.next_max_id != 'undefined' ? res.pagination.next_max_id : 0;

			if(length > 0) {

				$('.instagram').append('<div class="chunk" id="' + next_max_id + '"></div>');
				var chunk = '.chunk[id="' + next_max_id + '"]';
				for(var i = 0; i < res.data.length; i++) {
			    	$('.instagram > ' + chunk).append(
						createPhotoElement(res.data[i])
				  );
			    }

				$(chunk).fadeIn(500, function() {

					if ($(chunk).position().top > 100) {
						$('html,body').animate({ scrollTop: $(chunk).offset().top }, 500, 'easeInOutSine');
					}
					if (next_max_id != 0) {
						$('.load-more')
							.attr('id', next_max_id)
							.fadeIn(250);
					} else {
						$('.load-more').hide();
					}
				});

		    }
			else {
		      $('.instagram').append(createEmptyElement());
		    }

		  })

		.error(function() { $('.error').fadeIn(250); }

		);
	}

	function createPhotoElement(photo) {
	  var thecap = photo.caption != null ? photo.caption.text : ""
      return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', photo.id)
        .append(
          $('<a>')
            .attr('target', '_blank')
            .attr('href', photo.link)
            .attr('title', thecap)
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', photo.images.thumbnail.url)
                //.attr('src', photo.images.low_resolution.url)
            )
        );
    }

    function createEmptyElement() {
      return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', 'empty')
        .append($('<p>').html('No photos found...  Sorry!'));
    }

    loadInstagrams();

	$('.load-more').click(function(){
	    loadInstagrams(this.id);
	})

});
