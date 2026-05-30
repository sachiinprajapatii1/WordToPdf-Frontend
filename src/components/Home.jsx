import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setConvert("");
    setDownloadError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setConvert("Please Select A File First");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${API_URL}/convertFile`,
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");

      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error(error);

      if (error.response?.status === 400) {
        setDownloadError(
          "Error Occurred: " + error.response.data.message
        );
      } else {
        setDownloadError(
          "Conversion Failed. Please try again."
        );
      }

      setConvert("");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert Word to PDF Online
          </h1>

          <p className="text-sm text-center mb-5">
            Easily Convert Word To PDF Format Online Without Installing Any
            Software
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              className="hidden"
              type="file"
              id="fileInput"
              accept=".doc,.docx"
              onChange={handleFileChange}
            />

            <label
              htmlFor="fileInput"
              className="w-full flex items-center justify-center px-4 gap-2 text-2xl py-6 bg-slate-200 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 hover:text-white duration-300"
            >
              <FaFileWord />
              <span className="text-xl">
                {selectedFile ? selectedFile.name : "Choose File"}
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="px-4 py-2 bg-blue-500 disabled:bg-gray-400 hover:text-white hover:bg-blue-700 rounded-md"
            >
              Convert File
            </button>

            {convert && (
              <div className="text-green-500 text-center">
                {convert}
              </div>
            )}

            {downloadError && (
              <div className="text-red-500 text-center">
                {downloadError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;