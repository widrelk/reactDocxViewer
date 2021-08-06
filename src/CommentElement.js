import React, { useEffect, useState } from "react";
import "./CommentElement.css"


const CommentElement = (props) => {
    const [commentSelected, toggleComment] = useState(false)

    const content = props.comment.content[0]
    const linkTo = props.comment.linkTo
    return( 
        // Почему-то если вынести эти стили в css они перестают работать
        // Кружок вложен в div чтобы вне зависимости от соотношений flex он всегда был нужного размера
        <div className={ constants.commentDefStyle }  onClick={setCommentCss}>
            <a className="commentLink" href={'#' + props.comment.linkTo}>
                <div style={ { display:"flex"} }>
                    <div style={ {flex:"1"} }>
                        <div style={{width: "22px", height: "22px", borderRadius: "50%",
                                    backgroundColor: "red", color:"white", textAlign:"center"}}>
                                        { props.comment.authorInitials }
                        </div>
                    </div>
                    <div style={ {lineHeight: "5px", flex:"7"} }>
                        <b>{ props.comment.authorName}</b>
                        <p style={{margin:"10px 0 5px 0"}}>{ props.comment.date }: { props.comment.time }</p>
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

const constants = {
    commentClass: "comment",
    commentDefStyle: "Comment__default",
    commentToggledStyle: "Comment__toggled"
}

export default CommentElement