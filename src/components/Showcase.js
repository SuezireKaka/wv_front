

import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import SeriesCards from "component-showcase/SeriesCards";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";
import axios from "api/axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AppContext from "context/AppContextProvider";
import { useContext } from "react";

export default function ShowcaseList() {
    const location = useLocation();
    const { auth } = useContext(AppContext);

    let state = location.state;
    console.log("==========")
    console.log(state);
    console.log(state);

 
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <div>
        {!auth.roles || auth.roles.length === 0?"":
            <Link to={`/series/mng`} state={{seriesId:state.seriesId, state, parentId : "", boardId:state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile:[] }}}>
            <Button variant="outline-primary">신규</Button><br/><br/>
            </Link>}
            <SeriesCards />
    </div>
}
  