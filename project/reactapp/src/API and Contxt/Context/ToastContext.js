import { createContext, useContext,useState} from "react";
import ErrorHandling from "../../Components/Errors/ErrorHandling.jsx";

const ToastContext = createContext()

export const useToast = ()=>{
    return useContext(ToastContext)
}

export const ToastProvider = ({children})=>{
    const [toastMessage,setToastMessage]=useState(null)
    const [toastType,setToastType]=useState('')

    const showToast =(message,type)=>{
        setToastMessage(message);
        setToastType(type);
    }
    const clearToast =()=>{
        setToastMessage(null);
        setToastType('');
    }
    return(
        <ToastContext.Provider
        value={{showToast,clearToast, setToastMessage,setToastType, toastMessage,toastType}}>
            {children}
            {toastMessage &&(
                <ErrorHandling message={toastMessage}
                show={!!toastMessage}
                type={toastType}
                onClose={clearToast}/>


            )}
        </ToastContext.Provider>
    )
}