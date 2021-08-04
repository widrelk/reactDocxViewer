import React, { useEffect, useState } from "react";
import jsDocxToHtml from "@ree_n/jsDocxToHtml"
import { Scrollbars } from 'react-custom-scrollbars';
import Collapsible from 'react-collapsible';

import './DocxViewer.css'

const DocxViewer = (props) => {
    console.log("rendering DocxViewer")
    const [html, setHtml] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(
        () => {
            jsDocxToHtml.convertToHtml(props.arrayBuffer)
                    .then((result) => {
                        setHtml(result.html);
                        setComments(result.comments.map((comment) => CommentElement(comment)))  
                })
        }, [props.arrayBuffer])
    

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
    // Тут бы обернуть комментарии в какой-нить collapsible, но все, что пробовал, выдают 
    // Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
    return(
        <div id="viewer" style={ viewerStyle }>
            <div id="menuArea" style = {menuStyle}>
                <Collapsible trigger={ collapsibleCommentsTitle } triggerWhenOpen={ collapsibleCommentsTitleOpen } >
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

function CommentElement(comment) {
    const content = comment.content[0]
    const linkTo = comment.linkTo
    return( 
        // Почему-то если вынести эти стили в css они перестают работать
        // Кружок вложен в div чтобы вне зависимости от соотношений flex он всегда был нужного размера
        <div style={{margin:"10px 13px 0 0", padding:"7px", borderRadius:"10px", 
                        border:" 1px solid", fontSize:"small", textAlign:"left"}} onClick={setCommentCss}>
            <a className="commentLink" href={'#' + comment.linkTo}>
                <div style={ { display:"flex"} }>
                    <div style={ {flex:"1"} }>
                        <div style={{width: "22px", height: "22px", borderRadius: "50%",
                                    backgroundColor: "red", color:"white", textAlign:"center"}}>
                                        { comment.authorInitials }
                        </div>
                    </div>
                    <div style={ {lineHeight: "5px", flex:"7"} }>
                        <b>{ comment.authorName}</b>
                        <p style={{margin:"10px 0 5px 0"}}>{ comment.date }: {comment.time}</p>
                    </div>
                </div>
                <div style={{marginTop:"0"}}>
                    <p style={{margin:"0"}}>{ content }</p>
                </div>
            </a>
        </div>
    )
    // TODO: Сделать это нормально через transition
    function setCommentCss() { 
        // document.getElementById(linkTo).focus() Странно, но в css :focus не срабатывало. Изначальный стиль устанавливается и работает, 
        // а дополнительные почему-то нет. Пробовал с setTimeout, тоже не работало.
        // возможно, связано с постоянным ререндером
        document.getElementById(linkTo).classList.toggle("commentArea")
        document.getElementById(linkTo).classList.toggle("commentAreaSelected")

    }
}

export default DocxViewer