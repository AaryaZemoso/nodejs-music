import assert from "assert";
import { NextFunction, Request, Response } from "express";
import { Song } from "../../model/song";
import PlaylistService from "../../service/playlist";
import { addNewSongToPlaylist, deleteSongFromPlaylist, listPlaylistByID } from "../playlist";

const httpMocks = require('node-mocks-http');

jest.mock('../../service/playlist');

describe("Test Suite - Playlist Controller", () => {

    it("test - adding new song", () => {
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/1/song',
            params: {
                playlistID: 1
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        jest
            .spyOn(PlaylistService.prototype, 'addNewSongToPlaylist')
            .mockImplementation(async (_x: string, _y: Song) => {
                // @ts-ignore
            });
        
        addNewSongToPlaylist(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 201);
    });

    it("test - adding new song", () => {
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/1/song',
            params: {
                playlistID: 1
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        jest
            .spyOn(PlaylistService.prototype, 'deleteSongFromPlaylist')
            .mockImplementation(async (_x: string, _y: string) => {
                // @ts-ignore
            });
        
        deleteSongFromPlaylist(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 200);
    });

    it("test - adding new song", () => {
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/1/song',
            params: {
                playlistID: 1
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        jest
            .spyOn(PlaylistService.prototype, 'listAllSongsFromPlaylist')
            .mockImplementation(async (_x: string) => {
               return [];
            });
        
        listPlaylistByID(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 200);
    });
});