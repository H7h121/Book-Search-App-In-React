import React from 'react'

const EmbedViewer = (props) => {
    let google1 = window.google;

    return (
        <div id="viewerCanvas" style={{ width: "600px", height: "500px" }}>
            {google1.books.load()}
            {google1.books.setOnLoadCallback(function initialize() {
                let viewer = new window.google.books.DefaultViewer(
                    document.getElementById("viewerCanvas")
                );
                viewer.load(`ISBN:${props.ISBNBook}`);
            })}
        </div>
    );
}

export default EmbedViewer