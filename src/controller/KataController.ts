import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM
import { getAllKatas, getKataById, deleteKataById, updateKataById } from "../domain/orm/Kata.orm";
