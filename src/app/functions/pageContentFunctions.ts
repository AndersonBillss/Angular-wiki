export function parsePageContent(string: string){
    string = htmlEncode(string)

    for(let i=0; i<string.length; i++){
        const prevLetter = string[i-1]
        const letter = string[i]
        const nextLetter = string[i+1]
        //]]
        if(prevLetter === '!' && letter === "]" && nextLetter === "]"){
            string = string.slice(0,i-1) + ']]' + string.slice(i+2, string.length)
        }
        //[[
        if(letter === "[" && nextLetter === "["){

            //handle escape character
            if(prevLetter === '!'){
                string = string.slice(0,i-1) + '[[' + string.slice(i+2, string.length)

            //replace bracket with anchor element
            } else {
                let linkEnd
                for(let j=i; j<string.length; j++){
                    //]]
                    if(string[j] === "]" && string[j+1] === "]"){
                        if(string[j-1] === "!"){
                            string = string.slice(0,j-1) + ']]' + string.slice(j+2, string.length)
                        } else {
                            linkEnd = j
                            break
                        }
                    }

                    if(string[j-1] === '!' && string[j] === "[" && string[j+1] === "["){
                        string = string.slice(0,j-1) + '[[' + string.slice(j+2, string.length)
                    }
                }
                if(!linkEnd){
                    return
                }
    
                const linkCode = string.slice(i+2, linkEnd)
    
                let seperationIndex
                for(let j=0; j<linkCode.length; j++){
                    if(linkCode[j] === "|"){
                        seperationIndex = j
                    }
                }
                if(!seperationIndex){
                    return
                }
                const linkTarget = linkCode.slice(0, seperationIndex)
                const linkText = linkCode.slice(seperationIndex+1, linkCode.length)
                const anchorElement = `<a href="/page/${linkTarget}">${linkText}</a>`
                
                string = string.slice(0,i) + anchorElement + string.slice(linkEnd+2, string.length)
                
            
                i=anchorElement.length+linkEnd+2

            }
            
        }
    }

    return(string)
}
    




function htmlEncode(str: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        ' ': '&nbsp;',
    };

    return str.replace(/[&<>"' ]/g, function(m) {
        return map[m as keyof typeof map];
    });
}


function htmlDecode(str: string): string {
    const map: { [key: string]: string } = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' '
    };

    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, function(m) {
        return map[m as keyof typeof map];
    });
}




export function encodePageContent(string: string){
    console.log(string)

    string = string.replace(/\[\[/g, '![[')
    string = string.replace(/\]\]/g, '!]]')

    for(let i=0; i<string.length; i++){
        const letter = string[i]
        const nextLetter = string[i+1]

        if(letter === "<" && nextLetter === "a"){

            const targetWord = " href="
            //make sure tag contains " href="
            const validHref = string.slice(i+2,i+2+targetWord.length).toLowerCase() ===  targetWord
            if(!validHref){
                return
            }


            const referenceIndex = i+3+targetWord.length
            let referenceEndIndex
            for(let j=referenceIndex; j<string.length; j++){
                if(string[j] === '"'){
                    referenceEndIndex = j
                    break
                }
            }
            if(!referenceEndIndex){
                return
            }
            const href = string.slice(referenceIndex, referenceEndIndex)
            const location ="/page/"
            const validReference = href.slice(0,location.length).toLowerCase() === location
            //return if tag has no valid reference
            if(!validReference){
                return
            }
            const pageName = href.slice(location.length, href.length)
            //return if pagename has a /, ', ". or `
            const invalidCharsRegex = /[\/'"|\[`]/;
            if(invalidCharsRegex.test(pageName)){
                return
            }


            let linkedWordStart
            let linkedWordEnd
            for(let j=referenceEndIndex; j<string.length; j++){
                if(string[j] === ">"){
                    linkedWordStart = j+1
                    for(let k=j; k<string.length; k++){
                        if(string[k] === "<" && string[k+1] === "/" && string[k+2] === "a" && string[k+3] === ">"){
                            linkedWordEnd = k
                            break
                        }
                    }
                    break
                }
            }
            if(!linkedWordStart || !linkedWordEnd){
                return
            }

            const linkedWord = string.slice(linkedWordStart, linkedWordEnd)

            if(htmlDecode(linkedWord).trim() === ""){
                console.log('empty anchor tag')
                const newString = `${string.slice(0,i)}${string.slice(linkedWordEnd+4, string.length)}`
                string = newString
            } else {
                const newLink=`[[${pageName}|${linkedWord}]]`
                const newString = `${string.slice(0,i)}${newLink}${string.slice(linkedWordEnd+4, string.length)}`
                string = newString
                i+=newLink.length
            }
        }

    }

    return(htmlDecode(string))
}