import React, { useEffect, useState } from "react";
import jsDocxToHtml from "@ree_n/jsDocxToHtml"
import { Scrollbars } from 'react-custom-scrollbars';
import Collapsible from 'react-collapsible';

import CommentElement from "./CommentElement";

import './DocxViewer.css'

const DocxViewer = (props) => {
    console.log("rendering DocxViewer")
    const [html, setHtml] = useState("");

    const [comments, setComments] = useState([]);
    function resetComments() {
        debugger
    }

    useEffect(
        () => {
            jsDocxToHtml.convertToHtml(props.blob)
                .then((result) => {
                    setHtml(result.html);
                    setComments(result.comments.map((comment) => <CommentElement comment={comment}/>))  
            })
        }, [props.blob])
    

    const viewerStyle = {
        width: props.width || "800px",
        height: props.height || "800px",
        display: "flex",
        margin: "10px"
    }

    const documentStyle = {
        height: props.height || "800px",
        flex: 3, 
        float:"left",
        marginLeft:"5px",
    }

    const menuStyle = {
        height: props.height || "800px",
        flex: 1, 
        float:"left",
        borderRight: '2px solid black',
        paddingRight: "10px",
        verticalAlign:"top"
    }

    const commentsAreaStyle = {
        height: props.height || "800px",
        flex: 1, 
        float:"left",
        borderRight: '2px solid black',
        paddingRight: "10px",
        verticalAlign:"top"
    }

    const collapsibleCommentsTitle = "Комментарии"
    const collapsibleCommentsTitleOpen = "Комментарии"

    return(
        <div id="viewer" style={ viewerStyle }>
            <div id="menuArea" style = {menuStyle}>
                <Collapsible trigger={ collapsibleCommentsTitle } triggerWhenOpen={ collapsibleCommentsTitleOpen } 
                                onOpen={ resetComments } onClose={ resetComments }>
                    <Scrollbars style={ commentsAreaStyle }>
                        {comments}
                    </Scrollbars>
                </Collapsible>
            </div>
            
            <Scrollbars style={ documentStyle }>
                <div dangerouslySetInnerHTML={{__html: html}}></div>
            </Scrollbars>
        </div>
    );
}

export default DocxViewer