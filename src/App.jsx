import {useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {

    const [image, setImage] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3456/images")
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    const saveImage = (e) => {
        e.preventDefault();
        const opts = {
            method: "POST", headers: {
                "Accept": "application/json", "Content-Type": "application/json"
            }, body: JSON.stringify(image)
        };
        fetch("http://localhost:3456/images", opts)
            .then(res => res.json())
            .then(data => setImages([...images, data]));
    };

    return (<div className="App">
            <form onSubmit={saveImage}>
                <input type={"file"} onChange={(event) => {
                    let img = event.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result;
                        setImage({data: base64String.toString()});
                    };
                    reader.readAsDataURL(img);
                }}/>
                <button type={"submit"}>Save</button>
            </form>
        {images.length > 0 && images.map((image) => <img key={image.id} src={image["data"]} alt="Image not found"/>)}
        </div>);
}

export default App;
