import fileToObject from "./fileToObject.js";
import serverTest from "./serverTest.js";

/*
fetch('./extracted_objects/test/2002.json')
.then(response => response.json())
.then(data => console.log(data));
*/

serverTest();
const userFile = document.querySelector("#user-file");
userFile.addEventListener("change", handleChange);
const downloadDiv = document.querySelector("#downloads");


function handleChange(event) {
    const userFiles = event.target.files;

    if (userFiles.length === 0) {
        return;
    }
    if (userFiles.length > 1) {
        const downloadAll = document.createElement("button");
        downloadAll.className = 'button';
        downloadAll.innerText = `Download ALL`;
        downloadAll.addEventListener("click", () => handleDownloadAll());
        downloadDiv.append(downloadAll);
    }

    const handleDownloadAll = () => {
        const allLinks = document.querySelectorAll(".download-link");
        for (let link of allLinks) {
            link.click();
        }
    }

    for (let file of userFiles) {
        const fileName = file.name.replace(".PGN", ".json");
        const reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", () => {
            handleLoad(reader.result, fileName);
        });
    }

    const handleLoad = (upload, fileName) => {
        const games = fileToObject(upload);
        const jsonFile = JSON.stringify(games);
        const newFile = new Blob([jsonFile], { type: "application/json" });
        const url = URL.createObjectURL(newFile);
        const newAnchor = document.createElement("a");
        newAnchor.className = 'button download-link';
        newAnchor.href = url;
        newAnchor.download = fileName;
        newAnchor.innerText = `Download ${fileName}`;
        downloadDiv.append(newAnchor);
    }




}



