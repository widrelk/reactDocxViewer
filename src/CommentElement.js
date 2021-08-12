import React from "react";
import "./DocxViewer.css"


const CommentElement = (props) => {

    const content = props.comment.content[0]
    const linkTo = props.comment.linkTo
    const commentClass = props.commentClass
    return( 
        // Почему-то если вынести эти стили в css они перестают работать
        // Кружок вложен в div чтобы вне зависимости от соотношений flex он всегда был нужного размера
        <div className={ commentClass } id={ commentClass + linkTo }  onClick={ () => props.toggleComment(linkTo) }>
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
}

export default CommentElement