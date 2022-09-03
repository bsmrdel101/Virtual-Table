export class Token {
    id: string;
    image: string;
    size: string;
    relative: any;
    constructor(id: string, image: string, size: string, relative: any) {
        this.id = id;
        this.image = image;
        this.size = size;
        this.relative = relative;
    }
}