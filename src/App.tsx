import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./auth/Login";
import QuestPage from "./questpage/QuestPage";
import { IAppProps } from "./model/IAppProps";
import "./styles/bulma.css";
import "./styles/custom.css";
import BadgePage from "./badgepage/BadgePage";
import { QuestProvider } from "./questpage/questAll/QuestProvider";
import RankingPage from "./rankingpage/RankingPage";


const App = (props: IAppProps) => {
    return (
        <AuthProvider>
            <QuestProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/quests" element={<QuestPage pageHeight={props.pageHeight} pageWidth={props.pageWidth}  />} />
                        <Route path="/badges" element={<BadgePage pageHeight={props.pageHeight} pageWidth={props.pageWidth} />} />
                        <Route path="/ranking" element={<RankingPage pageHeight={props.pageHeight} pageWidth={props.pageWidth} />} />
                        <Route path="/" element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </QuestProvider>
        </AuthProvider>
    );
};

export default App;
