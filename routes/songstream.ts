import { Router } from "express";
import { searchYoutubeSong, streamYoutubeSong } from "../controller/song";

export const router = Router();

// Route the search endpoint
router.get("/", searchYoutubeSong);

// Route the streaming endpoint
router.get("/stream", streamYoutubeSong);
