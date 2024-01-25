import axios from "axios";
import React, { useState } from "react";

function Home() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const handleFile1 = (event, fileKey) => {
        setFile1(event.target.files[0]);
    }

    const handleFile2 = (event, fileKey) => {
        setFile2(event.target.files[0]);
    }
     //To do: separate axios
    const handleCompare = () => {
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);

        axios.post("http://localhost:8080/api/pdf/compare", formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }

    return (
        <>
            <div className="home-page">
                <input type="file" onChange={handleFile1} />
                <input type="file" onChange={handleFile2} />
                <button onClick={handleCompare}>Compare</button>
            </div>
        </>
    );
}

export default Home;