export class InvalidFileFormatError extends Error {
    constructor() {
        super('Invalid file format. Upload an Excel file (.xlsx).')
    }
}
