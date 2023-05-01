import React from 'react';
import download from "downloadjs";

const GeneratedImage = ({generatedImage}) => {
    const handleDownload = () => {
        download(generatedImage.stl, "generated_file.stl");
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Generated Image</h1>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    {/*<img src={`data:image/png;base64,${generatedImage.png}`} className="img-fluid" alt="Generated" />*/}
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Download STL file</h4>
                            <button className="btn btn-primary" onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedImage;