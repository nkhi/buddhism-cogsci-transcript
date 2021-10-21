// run the code below in the console on any youtube video page, after clicking CC and "Open Transcript"
// used to scrape the "Awakening From The Meaning Crisis" series by Professor John Vervaeke for my midterm
// (function () {...})();
// ^^ syntax for a nameless function you can run in a console
// from https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript

(function () {
    downloadScript=function(name="script.txt") {

        // pull elems from page
        var filename = name;
        let timestamps=document.getElementsByClassName('cue-group-start-offset');
        let words=document.getElementsByClassName('cues');
        let rawFile = "";
        var textFile = null;
    
        // concat strings with newline
        if (timestamps.length == words.length) {
            for (var i = 0; i < words.length; i++) {
                let row = "(" + timestamps[i].innerHTML.trim() + ") " + words[i].children[0].innerHTML.trim()+"\n";
                rawFile+=row
            }
        }
    
        // open file
        var data = new Blob([rawFile], {type: 'text/plain'});
    
        // If file exists, clear to avoid memleak
        if (textFile !== null) { window.URL.revokeObjectURL(textFile);}
    
        // output text to file
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }
    
    // make download link appear on page

    // down.href=downloadScript();
    videoName = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];
    videoName.innerHTML = "<a download='info.txt' id='downloadlink' style='display: block'>Download</a>";
    videoName.children[0].href=downloadScript();
    console.log("Click the link!");
})();