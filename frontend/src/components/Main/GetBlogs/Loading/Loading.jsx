import React from "react";
import "./Loading.css";

export default function Loading() {
    return (
        <div className="d-flex justify-content-center loading">
            <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}
