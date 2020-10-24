
const maxWidth = 20 


class TextFormater {

    public static justify(text: string): string {
        const textWithSpace = this.splitLongWords(text, maxWidth)

        const words = textWithSpace.split(' ')

        let line: Array<string> = [];
        let justifiedText = ""
        
        for (const word of words) {
            if(this.isWordTooBig(line, word)){
                // format whole line
                justifiedText += this.justifyALine(line)
                justifiedText += "\n"
                // reset line
                line = []
            }
            line.push(word)

        }
        console.log(justifiedText)
        return justifiedText
    }


    private static isWordTooBig(currentLine: Array<string>, word: string):boolean{
        const line = currentLine.join(' ')
        return (line.length + word.length + 1) > maxWidth
    }

    private static justifyALine(line: Array<string>):string{
        let words = line.slice()
        const numberOfWords = words.length

        let lineLength = words.join('').length
        let availableLength = maxWidth - lineLength

        while(availableLength > 0){
            if(numberOfWords <= 1){
                break;
            }

            if(availableLength / (numberOfWords - 1) >= 1) {
                words = this.addSpaceToEveryWord(words)
            } else {
                words = this.addSpaceToNWord(words, availableLength)
            }
            lineLength = words.join('').length
            availableLength = maxWidth - lineLength
        } 
        return words.join('')
    }

    private static addSpaceToEveryWord(words: Array<string>):Array<string>{
        const result = words.slice()
        for (let i = 0; i < words.length - 1; i++ ){
            result[i] += ' '
        }
        return result
    }   

    // Add space to N first words
    private static addSpaceToNWord(words: Array<string>, spaceCount: number): Array<string>{
        const result = words.slice()
        for (let i = 0; i < spaceCount; i++){
            result[i] += ' '
        }
        return result
    }

    /**
     * Split long words in a string by inserting a space
     * @param str the string that contain long words
     * @param maxLength the number of char a word can have without being splited 
     */

    private static splitLongWords(str: string, maxLength:number): string {
        const words = str.split(' ')

        for (let i = 0; i < words.length; i++){
            if(words[i].length > maxLength){
                const reg = new RegExp(`(.{${maxLength}})`,'g')
                words[i] = words[i].replace(reg,"$1 ")
            }
        }
        return words.join(' ')
    }   
}

export default TextFormater