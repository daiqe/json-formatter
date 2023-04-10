import React from "react";
import { useState } from "react";
import style from "./style.module.scss";
import { json2xml } from "xml-js";
import * as yaml from "js-yaml";
import EditorBox from "../../components/shared/EditorBox/EditorBox";
import MessageBox from "../../components/shared/MessageBox/MessageBox";
import { tabSpaces } from './Jsonformatter.model'

function Jsonformatter() {
  const [jsonOutput, setJsonInput] = useState(null);
  const [jsonSpace, setJsonSpace] = useState(2);
  const [draftInput, setDraftInput] = useState(null);
  const [targetType, setTargetType] = useState("JSON");
  const [active, setActive] = useState(false);
  const [showMessage,setShowMessage] = useState(false);
  const jsonConvert = convertJSON();

  function convertJSON() {
    switch (targetType) {
      case "XML":
        return json2xml(JSON.parse(jsonOutput), {
          compact: true,
          ignoreComment: true,
          spaces: jsonSpace,
        });
      case "YAML":
        return yaml.dump(JSON.parse(jsonOutput), { indent: jsonSpace });
      case "JSON":
        return JSON.stringify(JSON.parse(jsonOutput), null, jsonSpace);
      default:
        return JSON.stringify(JSON.parse(jsonOutput), null, jsonSpace);
    }
  }

  // Event handlers start from here
  const openFileSelect = async () => {
    try {
      const [handle] = await window.showOpenFilePicker();
      const file = await handle.getFile();
      const text = await file.text();
      setDraftInput(text);
      JSON.parse(text);
      setJsonInput(text);
    } catch (error) {
      if(error instanceof DOMException) return;
      setJsonInput(JSON.stringify({ error: error.message }));
    }
  };

  const formatJson = () => {
    try {
      JSON.parse(draftInput);
      setJsonInput(draftInput);
    } catch (error) {
      setJsonInput(JSON.stringify({ error: error.message }));
    }
  };
  // TODO : Add a feature to convert JSON to XML and YAML
  const downloadJson = () => {
    const blob = new Blob([jsonConvert], {
      type: `application/${targetType.toLowerCase()}`,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data.${targetType.toLowerCase()}`;
    a.click();
  };

  const handleJsonSpaceChange = (e) => {
    setJsonSpace(+e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonConvert);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000)
  };

  const printFile = (file) => {
    const printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write(
      `<html><head><title>JSON Data</title></head><body><pre>${file}</pre></body></html>`
    );
    printWindow.print();
  };
  // Event handlers end here

  return (
    <div className={style.jsonFormatter}>
      <MessageBox showMessage={showMessage}>Copied to clipboard</MessageBox >
      <EditorBox
        value={draftInput}
        name="Input JSON"
        clearFile={() => {
          setDraftInput("");
        }}
        openFileSelect={openFileSelect}
        printFile={printFile}
        onChange={(e) => {
          setDraftInput(e);
        }}
        mode="json"
      />
      <div className={style.console}>
        <button onClick={openFileSelect}>Upload data</button>
        <select defaultValue="2" onChange={handleJsonSpaceChange}>
          {tabSpaces.map((s, index) => (
            <option key={index} value={s}>
              {s} tab space
            </option>
          ))}
        </select>
        <button onClick={formatJson}>Format/Beautify</button>
        <button onClick={downloadJson}>Download</button>
        <button
          className="flex-around"
          onClick={() => setActive((active) => !active)}
        >
          <span>Convert JSON to</span>
          <i className="bi bi-caret-down-fill"></i>
        </button>
        {active && (
          <ul className={style.convertTypeList + " pointer"}>
            <li
              onClick={() => {
                setTargetType("XML");
                setActive(false);
              }}
            >
              JSON to XML
            </li>
            <li
              onClick={() => {
                setTargetType("YAML");
                setActive(false);
              }}
            >
              JSON to YAML
            </li>
            <li
              onClick={() => {
                setTargetType("JSON");
                setActive(false);
              }}
            >
              JSON to JSON
            </li>
          </ul>
        )}
      </div>

      <EditorBox
        downloadJson={downloadJson}
        printFile={printFile}
        value={jsonOutput && jsonConvert}
        name={`Formatted ${targetType}`}
        mode={targetType.toLowerCase()}
        copyFile={copyToClipboard}
      />
    </div>
  );
}

export default Jsonformatter;
