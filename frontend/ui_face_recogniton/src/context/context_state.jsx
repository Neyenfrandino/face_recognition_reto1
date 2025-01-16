import { useState, createContext, useEffect } from "react";
import face_recognition_api from "../utils/face_recognition_api";

export const ContextState = createContext({
    faces: null,
    setFaces: () => {},
    loading: false,
    setLoading: () => {},
    error: null,
    setError: () => {},
    response: null,
    setResponse: () => {},
});

const ContextStateProvider = ({ children }) => {
    const [faces, setFaces] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (faces) {
            setLoading(true);
            const fetchedFaces = async () =>{
                try {
                    console.log(typeof(faces));
                    const response = await face_recognition_api(faces);
                    console.log(response.is_same_person);
                    setResponse(response.is_same_person);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError(error);
                }
            }
            fetchedFaces();
        }
    }, [faces]);

    const value = { faces, setFaces,loading, setLoading, error, setError, response, setResponse };

    return (
        <ContextState.Provider
            value={{
                ...value,
            }}
        >
            {children}
        </ContextState.Provider>
    );
};

export default ContextStateProvider;
