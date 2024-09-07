import { environment } from "src/config/environment/environment";
import { Media } from "../entities/media.schema";

export const transformMediaToImage = (media: Media) => {
    const { path, disk } = media;
    return `${environment().MINIO.PUBLIC}/${disk}/${path}`;
};
