import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext<any>({} as any);

const ContextProvider = (props: any) => {
    const [input, setInput] = useState<string>("");
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [prevPrompts, setPrevPromts] = useState<string[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const response = await runChat(input);
        setResultData(response);
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPromts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;