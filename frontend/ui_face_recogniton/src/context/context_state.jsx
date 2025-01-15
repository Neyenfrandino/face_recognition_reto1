import { useState, createContext } from "react";
import face_recognition_api from "../utils/face_recognition_api";

export const ContextState = createContext({
    faces: null,
    setFaces: () => {},
    loading: false,
    setLoading: () => {},
    error: null,
    setError: () => {},
});

const ContextStateProvider = ({ children }) => {
    const [faces, setFaces] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(faces);

    const value = { faces, setFaces,loading, setLoading, error, setError};

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
