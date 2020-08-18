function rock(){
    const artist = document.getElementById('artistName').value;
    fetch(`https://api.lyrics.ovh/suggest/${artist}`)
    .then(response => response.json())
    .then(data => {

        let lead = document.getElementById('lead');
        let htmlTemplate = ``;
        
        // collect 10 data
        for(let i = 0; i < 10; i++){
            let title = data.data[i].title;
            let album = data.data[i].album.title;
            let artist = data.data[i].artist.name;
            htmlTemplate += `<p class="author lead">
            <strong id="title">${title}</strong> 
            Album by <span id="album">${album}</span> 
            <button class="btn btn-success" id="lyricsAll" 
            onclick="
                return fetch('https://api.lyrics.ovh/v1/${artist}/${title}')
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('song-title').innerHTML = '${title}'
                        document.getElementById('fullLyrics').innerHTML = data.lyrics
                    })
             ">Get Lyrics</button></p>`
            
            lead.innerHTML = htmlTemplate; 
        }// for loop end
    })
    .catch(error => console.log(error))
}