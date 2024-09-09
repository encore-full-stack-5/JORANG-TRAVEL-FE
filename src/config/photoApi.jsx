import { api } from "./network";

export const savePhotos = async (formData) => {
  try {
    await api("/api/v1/photos", "post", formData);
  } catch (error) {
    console.error("Error in savePhotos", error);
  }
};

export const deletePhotosByDiaryId = async (diaryId) => {
  try {
    await api(`/api/v1/photos/${diaryId}`, "delete");
  } catch (error) {
    console.error("Error in deletePhotosByDiaryId", error);
  }
};
