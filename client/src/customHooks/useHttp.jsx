import { useReducer } from "react";

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return { data: null, error: null, status: 'pending' };
        case "SUCCESS":
            // console.log("action >>> ", action);
            
            return { data: action.responseData, error: null, status: 'completed' };
        case "ERROR":
            return { data: null, error: action.errorMessage, status: 'completed' }
    }
}

const useHttp = (requestFunction, startWithPending = false) => {

    const [httpState, dispatch] = useReducer(httpReducer, {
        data: null,
        error: null,
        status: startWithPending ? 'pending' : null
    });

    const sendRequest = async (...args) => {
        try {
            dispatch({ type: 'SEND' });
            // console.log("1 -- in useHttp httpState >> ", httpState);
            
            const responseData = await requestFunction(...args);
            dispatch({ type: 'SUCCESS', responseData:responseData });
            // setTimeout(() => {
            //     // console.log("2 -- in useHttp httpState- responseData >> ", httpState, responseData);
            // }, 1000);

        } catch (error) {
            console.dir(error);
            dispatch({ type: 'ERROR', errorMessage: error.response?.data?.message });
        }
    }

    return{ sendRequest, ...httpState };
}

export default useHttp;