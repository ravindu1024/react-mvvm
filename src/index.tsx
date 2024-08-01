import React from 'react'
import {createRoot} from "react-dom/client";

// this is to tell the js engine that we need to load these into memory or it wont work
import './Utils/Extensions'
import './App/Styles/Common.css'
import {App} from "./App/Design/Layouts/App";

createRoot(document.getElementById("root")!).render(
    <App></App>
)
