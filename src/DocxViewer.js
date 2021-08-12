import React, { useEffect, useState } from "react";
import jsDocxToHtml from "@ree_n/jsDocxToHtml"
import { Scrollbars } from 'react-custom-scrollbars';
import Collapsible from 'react-collapsible';

import CommentElement from "./CommentElement";

import './DocxViewer.css'

const DocxViewer = (props) => {
    console.log("rendering DocxViewer")
    const [html, setHtml] = useState("")
    const [comments, setComments] = useState([])

    useEffect(
        () => {
            jsDocxToHtml.convertToHtml(props.blob)
                .then((result) => {
                    setHtml(result.html);
                    setComments(result.comments.map((comment) => 
                                <CommentElement comment={comment} toggleComment={toggleComment} commentClass={ "Comment" }/>))  
            })
        }, [props.blob])
        
    // TODO: make this fire only once when document is loaded    
    useEffect(() => {
        let pagesCount = document.getElementById("DocxContainer").childElementCount
        if (pagesCount > 0) {
            for (let page = 0; page < pagesCount; page++) {
                let header = document.getElementById(`header_pg${page}`)
                if (header) {
                    let headerTop = window.getComputedStyle(header).marginTop
                    let margin = parseFloat(header.clientHeight) + parseFloat(headerTop.substring(0, headerTop.length - 2))
                    document.getElementById(`content_pg${page}`).style.marginTop = `${margin}px`
                }
            }
        }
    })

    let toggledComment = ""
    let commentsOpened = false
    const highlightComponents = () => {
        comments.forEach( comment => {
            let element = document.getElementById(comment.props.comment.linkTo)
            element.classList.toggle("active")
            element.onmouseover = () => {
                if (commentsOpened) {
                    toggleComment(comment.props.comment.linkTo)
                }
            }
        })
        commentsOpened = true
    }


    /**
     * Removes ".active" and ".toggled" styles for every comment in the document section
     */
    const resetComments = () => {
        comments.forEach( comment => {
            document.getElementById(comment.props.comment.linkTo).classList.remove("active", "toggled")
        })
    }


    /**
     * Adds ".toggled" style for the commentElement and comment <span> with given ID.
     * Resets previously active toggle
     * @param {string} commentId String with and ID of the element
     */
    const toggleComment = (commentId) => {
        if (toggledComment !== "") {
            document.getElementById(toggledComment).classList.remove("toggled")
            document.getElementById("Comment" + toggledComment).classList.remove("toggled")
        }
        toggledComment = commentId
        document.getElementById(commentId).classList.toggle("toggled")
        document.getElementById("Comment" + commentId).classList.toggle("toggled")
    }

    const closeComments = () => {
        resetComments()
        commentsOpened = false
    }
    
    
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
        height: props.height || "760px",
        flex: 1, 
        float:"left",
        overflowY: "hidden",
        borderRight: '2px solid black',
        verticalAlign: "top",
        padding: "5px",
        marginRight: "10px",
        // TODO: сделать красивое выделение бокового меню
        //boxShadow: "5px 5px 3px rgba(0, 0, 0, 0.4)"
    }

    const commentsAreaStyle = {
        height: props.height || "800px",
        flex: 1, 
        float:"left",
        verticalAlign:"top"
    }

    const collapsibleCommentsTitle = "Комментарии"
    const collapsibleCommentsTitleOpen = "Комментарии"

    return(
        <div>
            <div id="DocxViewerHeader" style={{width: props.width || "800px"}}>
                    <p>{ props.title }</p>
            </div>
            <div id="DocxViewerBody" style={ viewerStyle }>
                <div id="menuArea" style = {menuStyle}>
                    <Collapsible trigger={ collapsibleCommentsTitle } triggerWhenOpen={ collapsibleCommentsTitleOpen } 
                                    onOpening={ highlightComponents } onClosing={ closeComments }>
                        <Scrollbars style={ commentsAreaStyle }>
                            <p style={{borderBottom: "1px solid black", paddingBottom:"5px", marginRight:"10px"}}>
                                Все комментарии в документе подсвечены{'\u00A0'}
                                <span style={{backgroundColor:"lightgreen"}}>светло-зелёным</span>.
                            </p>
                            {comments}
                        </Scrollbars>
                    </Collapsible>
                </div>
                
                <Scrollbars style={ documentStyle }>
                    <div id="DocxContainer"dangerouslySetInnerHTML={{__html: html}}></div>
                </Scrollbars>
            </div>
        </div>
    );
}

export default DocxViewer