class PlatformFactory {
    static create() {
        if (!!window["FBInstant"]) {
            return new PlatformFB();
        } else {
            return new PlatformDev();
        }
    }
}