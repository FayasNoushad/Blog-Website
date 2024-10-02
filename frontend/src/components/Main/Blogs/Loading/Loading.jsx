import React from "react";
import "./Loading.css";

export default function Loading() {
    return (
        <div class="d-flex justify-content-center loading">
            <div class="spinner-border loading-spinner" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    );
}
