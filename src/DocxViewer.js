import React, { useState }from "react";
import mammoth from "pammoth";
//import 'babel-polyfill';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function DocxViewer(){
    const [html, setHtml] = useState("");

    const options = {
        styleMap: [
            // Стиль указывается так как записан в редакторе word
            "p[style-name='style1'] => h3:fresh",
            "p[style-name='Subsection Title'] => h2:fresh",
        ]
    }

    // TODO: Получаем blob с сервера
    fetch("test.docx", {}).then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(arrayBuffer => {
            mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options)
            .then((result) => {
                setHtml(result.value);
            })
            .done();
        })
    
    // Возвращаем CKEditor.
    // TODO: разобраться с конструктором
    return(
        <CKEditor
            editor={ ClassicEditor }
            data={ html }
            onReady={ (editor) => {
                
                }
            }
        />
    );
}