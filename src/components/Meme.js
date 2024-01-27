import React from 'react';

export default function Meme(){

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomIMG: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    //API
    React.useEffect(() => {
        fetch("http://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    /*using async
    React.useEffect(() => {
        async function getMemes(){
            const res = await fetch("http://i.imgflip.com/1bij.jpg")
            const data - await res.json()
        }
        getMemes()
        return() =>{
            
        }
     }, [])
     */

    function getMemeIMG(){
        const randomNum = Math.floor(Math.random()*allMemes.length)
        const getUrl = allMemes[randomNum].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomIMG: getUrl

        }))
    }

    function handleText(event){
        const {name, value} = event.target
        setMeme(prevMeme =>({
            ...prevMeme,
            [name] : value
        }))
    }

    return(
        <main>
            <div className="form">
                <div>
                    <label className="form-label"> Top Text</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Shut up"
                        name="topText"
                        value={meme.topText}
                        onChange={handleText}
                    />
                </div>
                <div>
                    <label className="form-label"> Bottom Text</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Take My Money"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleText}
                    />
                </div>
                <button 
                    className="form-button"
                    onClick={getMemeIMG}
                >
                        Generate a New Image! 🖼 
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomIMG} className="meme-image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}