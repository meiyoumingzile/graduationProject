class AdvertiseDev extends Emiter{
    hasRAD = () => true;
    hasIAD = () => true;
    showRAD = async function () {
        await setTimeout(() => {}, 300);
        return Promise.resolve();
    }
    showIAD = async function () {
        await setTimeout(() => {}, 300);
        return Promise.resolve();
    }

    suportAD = () => true;
}