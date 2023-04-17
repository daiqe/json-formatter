import React from "react";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/mode/xml";
import "brace/mode/yaml";
import "brace/theme/github";
import style from "./style.module.scss";
function EditorBox({
  value,
  onChange,
  name,
  openFileSelect,
  clearFile,
  downloadJson,
  printFile,
  copyFile,
  mode,
}) {
  return (
    <div className={style.editorBox + " col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12"}>
      <header>
        <div className="flex-center">{name}</div>
        <div className={style.menu}>
          {openFileSelect && (
            <div
              className={style.btn + " pointer"}
              title="Open file"
              onClick={openFileSelect}
            >
              <i className="bi bi-folder2-open"></i>
            </div>
          )}
          {clearFile && (
            <div
              className={style.btn + " pointer"}
              title="Clear"
              onClick={clearFile}
            >
              <i className="bi bi-x-lg"></i>
            </div>
          )}
          {downloadJson && (
            <div
              className={style.btn + " pointer"}
              title="download file"
              onClick={downloadJson}
            >
              <i className="bi bi-download"></i>
            </div>
          )}
          <div
            className={style.btn + " pointer"}
            title="Print file"
            onClick={() => printFile(value)}
          >
            <i className="bi bi-printer"></i>
          </div>
          {copyFile && (
            <div
              className={style.btn + " pointer"}
              title="Copy file"
              onClick={copyFile}
            >
              <i className="bi bi-file-earmark"></i>
            </div>
          )}
        </div>
      </header>
      <AceEditor
        value={value}
        mode={mode}
        theme="github"
        onChange={onChange}
        name={name}
        fontSize={14}
        width="100%"
        wrapEnabled={true}
        showPrintMargin={false}
        editorProps={{
          $blockScrolling: true,
        }}
      />
    </div>
  );
}

export default EditorBox;
