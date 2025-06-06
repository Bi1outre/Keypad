$(document).ready(function() {
	success = 1234
	start();

	window.addEventListener('message', function(event) {
		var item = event.data
		if(item !== undefined && item.type == "display"){
            if(item.display){
                document.body.style.display = "flex";
            }
            else if(item.display === false){
                document.body.style.display = "none";
            }
        }
	});
});

function start(){
	window.tries = 0;
	
	$(".key").click(function(){
		var act = $(this).attr('id');
		var n = $(this).html();
		
		if(act == "Del"){
			$('.screen').html('');
			window.tries = 0;
			updateFlasher();
		}else if(act == "Val"){
			validate();
		}else if(act == "Help"){
			console.log("Player asking for Help")
		}else if(act == "Cor"){
			if(window.tries > 0){
				var text = $('.screen').text();
				$('.screen').text(text.slice(0, -1));
				window.tries--;
				updateFlasher();
			}
		}
		else{
			if($('.screen').text().length <4){
				$('.screen').append( n );
				window.tries++;
				updateFlasher();
			}
		}
	});

}

function updateFlasher(){
	if (window.tries <=3){
		var dis = 13 + (window.tries) * 21;
		$('.flasher').css({
			'left' : dis + '%',
			'display' : 'block'
		});
	}
	else{
		$('.flasher').css({
			'display' : 'none'
		});
	}
}

function validate(){
	checkWin();
	$('.screen').html('');
	window.tries = 0;
}

async function checkWin(){
    var w = $('.screen').html();

    // Masquer l'élément flasher
	$('.flasher').css({'display' : 'none'});
	
    if (w == success){
        $('.success').show().delay(5000).queue(function(n) {
            $('.success').hide();
            $('.flasher').css('display', 'block');
			window.tries = 0;
            updateFlasher()
            n();
        });
    }else{
        $('.error').show().delay(1000).queue(function(n) {
            $('.error').hide();
            $('.flasher').css('display', 'block');
			window.tries = 0;
            updateFlasher()
            n();
        });
    }
}