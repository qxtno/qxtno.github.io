export class Folder {
    name: string;
    id: string;
    fileIds: string[];

    constructor(name: string, id: string, fileIds: string[]) {
        this.name = name;
        this.id = id;
        this.fileIds = fileIds;
    }
}
