import axios from "axios";
import React, { useState } from "react";
import "./Home.css"

function Home() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [compareDisabled, setCompareDisabled] = useState(true);

    const handleFile1 = (event, fileKey) => {
        setFile1(event.target.files[0]);
        updateCompareButton(event.target.files[0], file2);
    }

    const handleFile2 = (event, fileKey) => {
        setFile2(event.target.files[0]);
        updateCompareButton(file1, event.target.files[0]);
    }

    const updateCompareButton = (file1, file2) => {
        const areFilesSelected = file1 !== null && file2 !== null;

        setCompareDisabled(!areFilesSelected);
    }

     //To do: separate axios
    const handleCompare = () => {
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);

        axios.post("http://localhost:8080/api/pdf/compare", formData)
            .then(response => {
                console.log(response.data);
                setDownloadDisabled(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }

    const handleDownload = () => {
        window.open("http://localhost:8080/api/pdf/download");
    }

    return (
        <>
            <div className="home-page">
                <div className="table-container">
                    <input type="file" onChange={handleFile1} />
                    <input type="file" onChange={handleFile2} />
                    <button onClick={handleDownload} disabled={downloadDisabled}>Compared File</button>
                    <div className="button-container">
                        <button onClick={handleCompare} disabled={compareDisabled}>Compare</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;