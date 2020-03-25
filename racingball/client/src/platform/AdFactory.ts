class ADFactory {
    static create() {
        let ad;
        if (!!window["FBInstant"]) {
            const [
                iad_high,   //small
                rad_high,
            ] = [
                    "578524932929486_578527119595934",
                    "578524932929486_578526956262617",
              
                ];
            ad = new AdvertiseFB(
                [iad_high],
                [rad_high]
            );
        } else {
            ad = new AdvertiseDev();
        }
        return ad;
    }
}