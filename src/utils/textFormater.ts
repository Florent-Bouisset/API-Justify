
const maxWidth = 20 


class TextFormater {


    /**
     * justify a text
     * @param text the string to justify
     * @returns the string justified
     */
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

    /**
     * evaluate if a word is too big to long to be on the given line
     * @param currentLine the array of word composing the current line
     * @param word the word you want to add to the line
     * @returns true if word is too long
     */

    private static isWordTooBig(currentLine: Array<string>, word: string):boolean{
        const line = currentLine.join(' ')
        return (line.length + word.length + 1) > maxWidth
    }


    /**
     * justify a line
     * @param line the array of words representing a line
     * @return return the line justified as a string
     */
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

    /**
     * Add space at the end of every words of the array
     * @param words the array of word
     * @returns a new array with space added
     */
    private static addSpaceToEveryWord(words: Array<string>):Array<string>{
        const result = words.slice()
        for (let i = 0; i < words.length - 1; i++ ){
            result[i] += ' '
        }
        return result
    }   

    
    /**
     * Add one space at the N first words of the array
     * @param words the array of word
     * @param spaceCount the N amount of space to add
     * @returns a new array with space added
     */
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
     * @returns a string without long words 
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