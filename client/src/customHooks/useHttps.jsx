import { useState } from "react"

const useHttps = (requestFunction, startWithPending=false) => {

    const[isLoading, setIsLoading] = useState(startWithPending);
    const[responseData, setResponseData] = useState(null);
    const[error, setError] = useState(false);

    const sendRequest = async(args) => {
        // console.log("useHttp > sendRequest > args : ", args);
        
        setIsLoading(true);
        try {
            const data  = await requestFunction(args);
            // console.log("useHttp > sendRequest > requestFunction > data ", data);
            
            setIsLoading(false);
            setResponseData(data);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        } 
    }


    return{isLoading, responseData, error, sendRequest}
}

export default useHttps;