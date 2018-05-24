var startExperienteBtn = document.getElementById('start_experience');

startExperienteBtn.onclick = function(){
    document.getElementById('container').outerHTML = '';
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
};

$(document).keypress(function(e){
    var key = e.which;
    if (key === 116) {
        // if the user pressed 't':
        $('#menu').toggle();
    }
});