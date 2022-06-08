const httpMocks = require('node-mocks-http');
import { searchYoutubeSong, streamYoutubeSong } from "../song";
import assert from "assert";
import { SongStream } from "../../model/songstream";
import { Readable } from "stream";

jest.mock('../../service/music', () => {
    return {
        streamSong: (_name: string): Promise<SongStream> => {
            const r = new Readable();
            r._read = () => { 
                // @ts-ignore
            }
            return Promise.resolve({
                contentLength: 0,
                stream: r
            });
        },
        searchYoutube: (_searchText: string): Promise<string[]> => {
            return Promise.resolve([]);
        }
    }
});

describe("Test Suite - Song Controller", () => {

    it("test streamYoutubeSong with name query param", () => {

        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/song?name=Test'
        });

        const mockResponse = httpMocks.createResponse();

        streamYoutubeSong(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 200);
    });

    it("test streamYoutubeSong without name query param", () => {

        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/song'
        });

        const mockResponse = httpMocks.createResponse();

        streamYoutubeSong(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 400);
    });

    it("test streamYoutubeSong with name query param", () => {

        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/song?name=Test'
        });

        const mockResponse = httpMocks.createResponse();

        searchYoutubeSong(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 200);
    });

    it("test streamYoutubeSong without name query param", () => {

        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/song'
        });

        const mockResponse = httpMocks.createResponse();

        searchYoutubeSong(mockRequest, mockResponse, () => {
            // @ts-ignore
        });

        assert.equal(mockResponse.statusCode, 400);
    });

});