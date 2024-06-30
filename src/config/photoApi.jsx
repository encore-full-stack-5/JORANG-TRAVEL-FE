import { api } from "./network";

export const savePhotos = async (photoRequestDto) => {
    try {
        await api("/api/v1/photos", "post", photoRequestDto);       
    } catch(error) {
        console.error("Error in savePhotos", error);
    }
    
}