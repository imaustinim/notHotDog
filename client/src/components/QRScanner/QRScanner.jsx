import { useState } from "react"

export default QRScanner(props){
    let [result,setResult] = useState('no result');
    return(
        <>
        
        <em>Result: {result}</em>
        </>
    )
}